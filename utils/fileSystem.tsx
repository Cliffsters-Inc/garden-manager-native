import * as FileSystem from "expo-file-system";

/** can be a directory or file name and should not begin with "/", eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir" */
type ItemName = string;
/** should not begin with "/", eg. "myDir" | "parentDir/myDir" and not "/myDir" | "/parentDIr/myDir" */
type DirName = string;
/** can be a directory or file URI */
type ItemUri = string;
type DirUri = string;
type FileUri = string;

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

const _getDirectoryContents = async (dirUri: DirUri): Promise<FileUri[]> => {
  const files = await FileSystem.readDirectoryAsync(dirUri);
  if (files) {
    const fileUris = files.map((file) => `${dirUri}/${file}`);
    return fileUris;
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
