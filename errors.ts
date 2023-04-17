export class ReadFragmentFileError extends Error {
  code = 'read-fragment-file';
  filePath: string;
  cause?: unknown;

  constructor(filePath: string, cause: unknown) {
    super('Can not read the file to process a fragment', { cause });
    this.filePath = filePath;
  }
}

export class FragmentHasNoIdError extends Error {
  code = 'fragment-no-id';

  constructor() {
    super('Dataset need a id attribute to become a fragment');
  }
}

export class FragmentHasNoTitleError extends Error {
  code = 'fragment-no-title';

  constructor() {
    super('Dataset need a title attribute to become a fragment');
  }
}
