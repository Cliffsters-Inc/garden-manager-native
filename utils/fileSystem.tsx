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

/**
 * @param DirUri - directory URI
 */
type DirUri = string;

const rootDocumentLocation = FileSystem.documentDirectory;
const rootCacheLocation = FileSystem.cacheDirectory;

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

const _getDirectoryContents = (dirUri: DirUri) =>
  FileSystem.readDirectoryAsync(dirUri);
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

const _delete = (itemUri: ItemUri) => FileSystem.deleteAsync(itemUri);
const deleteItem = {
  byUri: _delete,
  inDocs: (itemName: ItemName) => _delete(rootDocumentLocation + itemName),
  inCache: (itemName: ItemName) => _delete(rootCacheLocation + itemName),
};

type MoveItemArgs = { fromUri: ItemUri; toUri: ItemUri };
const moveItem = ({ fromUri, toUri }: MoveItemArgs) => {
  return FileSystem.moveAsync({ from: fromUri, to: toUri });
};

export const FS = {
  rootDocumentLocation,
  rootCacheLocation,
  checkItemExists,
  createDirectory,
  getDirectoryContents,
  deleteItem,
  moveItem,
};
