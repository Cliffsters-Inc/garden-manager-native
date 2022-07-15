import * as FileSystem from "expo-file-system";

/** can be a directory or file name and should not begin with "/", eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir" */
type ItemName = string;
/** should not begin with "/", eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir" */
type DirName = string;
/** can be a directory or file URI */
type ItemUri = string;
type DirUri = string;

const rootDocumentLocation = FileSystem.documentDirectory;
const rootCacheLocation = FileSystem.cacheDirectory;

/** createIfNonExistent - defaults to false if not provided */
type CheckItemExistsOptions = { createIfNonExistent?: boolean };
const _checkItemExists = async (
  itemUri: ItemUri,
  options?: CheckItemExistsOptions
) => {
  const { exists, isDirectory } = await FileSystem.getInfoAsync(itemUri);
  if (options?.createIfNonExistent && isDirectory && !exists) {
    await FileSystem.makeDirectoryAsync(itemUri, { intermediates: true });
    return true;
  }
  return exists;
};

const checkItemExists = {
  byUri: (itemUri: ItemUri, options?: CheckItemExistsOptions) =>
    _checkItemExists(itemUri, options),
  inDocs: (itemName: ItemName, options?: CheckItemExistsOptions) =>
    _checkItemExists(rootDocumentLocation + itemName, options),
};

const createDirectory = async (dirName: DirName) => {
  const dirAlreadyExists = await checkItemExists.inDocs(dirName);
  if (!dirAlreadyExists)
    return FileSystem.makeDirectoryAsync(rootDocumentLocation + dirName, {
      intermediates: true,
    });
};

const _getDirectoryContents = async (dirUri: DirUri): Promise<ItemUri[]> => {
  const contents = await FileSystem.readDirectoryAsync(dirUri);
  if (contents) {
    const itemUris = contents.map((item) => `${dirUri}/${item}`);
    return itemUris;
  } else {
    return [];
  }
};
const getDirectoryContents = {
  byUri: _getDirectoryContents,
  inDocs: (dirName?: DirName) => {
    if (!dirName) dirName = "";
    return _getDirectoryContents(rootDocumentLocation + dirName);
  },
  inCache: (dirName?: DirName) => {
    if (!dirName) dirName = "";
    return _getDirectoryContents(rootCacheLocation + dirName);
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
      async (itemUri) => await moveItem({ fromUri: itemUri, toUri: toUri })
    );
    await Promise.all(movePromises);
  }
};

export const FS = {
  rootDocumentLocation,
  rootCacheLocation,
  checkItemExists,
  createDirectory,
  getDirectoryContents,
  deleteItem,
  moveItem,
  moveDirContents,
};
