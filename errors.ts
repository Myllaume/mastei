import { CustomError } from './types';

export class ReadFragmentFileError extends Error implements CustomError {
  code = 'read-fragment-file';
  filePath: string;
  cause?: unknown;

  constructor(filePath: string, cause: unknown) {
    super('Can not read the file to process a fragment', { cause });
    this.filePath = filePath;
  }
}

export class FragmentHasNoIdError extends Error implements CustomError {
  code = 'fragment-no-id';

  constructor() {
    super('Dataset need a id attribute to become a fragment');
  }
}

export class FragmentHasNoTitleError extends Error implements CustomError {
  code = 'fragment-no-title';

  constructor() {
    super('Dataset need a title attribute to become a fragment');
  }
}

export class WriteConfigFileError extends Error implements CustomError {
  code = 'write-config-file';
  filePath: string;
  cause?: unknown;

  constructor(filePath: string, cause: unknown) {
    super('Can not write the config file', { cause });
    this.filePath = filePath;
  }
}

export class ReadConfigFileError extends Error implements CustomError {
  code = 'read-config-file';
  filePath: string;
  cause?: unknown;

  constructor(filePath: string, cause: unknown) {
    super('Can not read the config file', { cause });
    this.filePath = filePath;
  }
}

export class MakeConfigDirError extends Error implements CustomError {
  code = 'make-config-directory';
  dirPath: string;
  cause?: unknown;

  constructor(dirPath: string, cause: unknown) {
    super('Can not make config directory', { cause });
    this.dirPath = dirPath;
  }
}

export class ConfigFileNotExistError extends Error implements CustomError {
  code = 'config-file-not-exist';

  constructor() {
    super('Config file does not exist');
  }
}

export class ConfigFileContainsInvalidValueError extends Error implements CustomError {
  code = 'config-file-contains-invalid-value';

  constructor(optionKey: string) {
    super(`Config file contains an invalid value for option ${optionKey}`);
  }
}

export class LibraryDirectoryNotExistError extends Error implements CustomError {
  code = 'library-directory-not-exist';
  dirPath: string;

  constructor(dirPath: string) {
    super(`Library directory does not exist`);
    this.dirPath = dirPath;
  }
}

export class MakeLibraryDirError extends Error implements CustomError {
  code = 'make-library-directory';
  dirPath: string;
  cause?: unknown;

  constructor(dirPath: string, cause: unknown) {
    super('Can not make library directory', { cause });
    this.dirPath = dirPath;
  }
}

export class InvalidRequestKeyError extends Error implements CustomError {
  code = 'invalid-request-key';
  requestAction: string;
  requestObject: string;
  requestKey: string;

  constructor(
    requestAction: 'add' | 'update' | 'remove',
    requestObject: string,
    requestKey: string
  ) {
    super(`Request to ${requestAction} ${requestObject} with invalid ${requestKey}`);
    this.requestAction = requestAction;
    this.requestObject = requestObject;
    this.requestKey = requestKey;
  }
}

export class MakeDataDirError extends Error implements CustomError {
  code = 'make-data-directory';
  dirPath: string;
  cause?: unknown;

  constructor(dirPath: string, cause: unknown) {
    super('Can not make user data directory', { cause });
    this.dirPath = dirPath;
  }
}

export class MakeLibrariesDirError extends Error implements CustomError {
  code = 'make-libraries-directory';
  dirPath: string;
  cause?: unknown;

  constructor(dirPath: string, cause: unknown) {
    super('Can not make libraries directory', { cause });
    this.dirPath = dirPath;
  }
}

export class LibraryDirAlreadyExistError extends Error implements CustomError {
  code = 'librart-directory-already-exist';
  dirPath: string;

  constructor(dirPath: string) {
    super('This library name is already used');
    this.dirPath = dirPath;
  }
}
