/**
 * This is a facade for the "expo-file-system" module, to simplify and improve it's api and documentation.
 *
 * @example usage
 * import { FS } from "../../utils/fileSystem";
 *
 * const deleteItem = async () => await FS.deleteItem.byUri(cachedUri);
 * deleteItem("file://......")
 */

import * as FileSystem from "expo-file-system";

/** can be a directory or file name and should not begin with "/", eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir" */
export type ItemName = string;
/** should not begin with "/", eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir" */
export type DirName = string;
/** can be a directory or file URI */
export type ItemUri = string;
export type DirUri = string;
export type FileUri = string;

const rootDocumentLocation = FileSystem.documentDirectory;
const rootCacheLocation = FileSystem.cacheDirectory;

/** createIfNonExistent - defaults to false if not provided */
type CheckItemExistsOptions = { createIfNonExistent?: boolean };
const _checkItemExists = async (
  itemUri: ItemUri,
  options?: CheckItemExistsOptions
) => {
  const { exists } = await FileSystem.getInfoAsync(itemUri);

  if (options?.createIfNonExistent && !exists) {
    await FileSystem.makeDirectoryAsync(itemUri, {
      intermediates: true,
    });
    return true;
  }
  return exists;
};

const checkItemExists = {
  byUri: _checkItemExists,
  inDocs: (itemName: ItemName, options?: CheckItemExistsOptions) =>
    _checkItemExists(rootDocumentLocation + itemName, options),
};

/** appendUri - defaults to false if not supplied */
type GetDirectoryContentOptions = { appendUri?: boolean };
const _getDirectoryContents = async (
  dirUri: DirUri,
  options?: GetDirectoryContentOptions
) => {
  await checkItemExists.byUri(dirUri, { createIfNonExistent: true });

  const contents = await FileSystem.readDirectoryAsync(dirUri);
  if (contents) {
    return options?.appendUri
      ? contents.map((item) => `${dirUri}/${item}/`)
      : contents;
  } else {
    return [];
  }
};
const getDirectoryContents = {
  byUri: _getDirectoryContents,
  inDocs: (dirName?: DirName, options?: GetDirectoryContentOptions) => {
    if (!dirName) dirName = "";
    return _getDirectoryContents(`${rootDocumentLocation}${dirName}/`, options);
  },
  inCache: (dirName?: DirName, options?: GetDirectoryContentOptions) => {
    if (!dirName) dirName = "";
    return _getDirectoryContents(`${rootCacheLocation}${dirName}/`, options);
  },
};

const _delete = (itemUri: ItemUri) =>
  FileSystem.deleteAsync(itemUri, { idempotent: true });
const deleteItem = {
  byUri: _delete,
  inDocs: (itemName: ItemName) => _delete(rootDocumentLocation + itemName),
  inCache: (itemName: ItemName) => _delete(rootCacheLocation + itemName),
};

type MoveItemArgs = { fromUri: ItemUri; toUri: DirUri };
/**
 * Caveats
 * - Moving a file to a file overrides the destination file
 * - Moving a file to a folder replaces the folder with the file, instead move file to another file of the same name eg. {from: “old/thing.png”, to: “new/thing.png”}
 */
const moveItem = ({ fromUri, toUri }: MoveItemArgs) =>
  FileSystem.moveAsync({ from: fromUri, to: toUri });

type MoveDirContentsArgs = { fromUri: DirUri; toUri: DirUri };
/** throwOnFromUriNotFound - defaults to false if not supplied */
type MoveDirContentsOptions = { throwOnFromUriNotFound?: boolean };
const moveDirContents = async (
  { fromUri, toUri }: MoveDirContentsArgs,
  options?: MoveDirContentsOptions
) => {
  const fromDirExists = await checkItemExists.byUri(fromUri);
  const resolveOnFromUriNotFound =
    !fromDirExists && !options?.throwOnFromUriNotFound;
  if (resolveOnFromUriNotFound) return;

  const contents = await getDirectoryContents.byUri(fromUri);
  if (contents) {
    await checkItemExists.byUri(toUri, { createIfNonExistent: true });

    const movePromises = contents.map(
      async (itemName) =>
        await moveItem({
          fromUri: `${fromUri}/${itemName}`,
          toUri: `${toUri}/${itemName}`,
        })
    );
    await Promise.all(movePromises);
  }
};

export const FS = {
  rootDocumentLocation,
  rootCacheLocation,
  checkItemExists,
  getDirectoryContents,
  deleteItem,
  moveItem,
  moveDirContents,
};
