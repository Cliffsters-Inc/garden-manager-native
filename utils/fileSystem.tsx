import * as FileSystem from "expo-file-system";

/**
 * @param itemName - can be a directory or file name and should not begin with "/",
 * eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir"
 */
type ItemName = string;

/**
 * @param dirName - should not begin with "/",
 * eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir"
 */
type DirName = string;

/**
 * @param itemUri - can be a directory or file URI
 */
type ItemUri = string;

const rootDocumentLocation = () => FileSystem.documentDirectory;
const rootCacheLocation = () => FileSystem.cacheDirectory;

const _checkItemExist = async (itemUri: ItemUri) => {
  const { exists } = await FileSystem.getInfoAsync(itemUri);
  return exists;
};
const checkItemExists = {
  inDocs: (itemName: ItemName) =>
    _checkItemExist(rootDocumentLocation + itemName),
  byUri: (itemUri: ItemUri) => _checkItemExist(itemUri),
};

const createDirectory = async (dirName: DirName) => {
  const dirAlreadyExists = await checkItemExists.inDocs(dirName);
  if (!dirAlreadyExists)
    return FileSystem.makeDirectoryAsync(rootDocumentLocation + dirName, {
      intermediates: true,
    });
};

const getDirectoryContents = (dirName: DirName) => {
  return FileSystem.readDirectoryAsync(rootDocumentLocation + dirName);
};

const _delete = (itemUri: ItemUri) => FileSystem.deleteAsync(itemUri);
const deleteItem = {
  inDocs: (itemName: ItemName) => {
    return _delete(rootDocumentLocation + itemName);
  },
  byUri: (itemUri: ItemUri) => {
    return _delete(itemUri);
  },
};

type MoveFileArgs = { fromUri: ItemUri; toUri: ItemUri };
const moveFile = ({ fromUri, toUri }: MoveFileArgs) => {
  return FileSystem.moveAsync({ from: fromUri, to: toUri });
};

const moveCacheItemToDocDirectory = ({
  fromCacheUri,
  toDocName,
}: {
  fromCacheUri: ItemUri;
  toDocName: ItemName;
}) => {
  return moveFile({
    fromUri: fromCacheUri,
    toUri: rootDocumentLocation + toDocName,
  });
};

export const FS = {
  rootDocumentLocation,
  rootCacheLocation,
  checkItemExists,
  createDirectory,
  getDirectoryContents,
  deleteItem,
  moveFile,
  moveCacheItemToDocDirectory,
};
