import { readFile } from 'node:fs';
import { parse } from 'yaml';
import { fragment } from '../types';
import { FragmentHasNoIdError, FragmentHasNoTitleError, ReadFragmentFileError } from '../errors.js';

export function readFragmentFile(filePath: string): Promise<fragment> {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new ReadFragmentFileError(filePath, err));
      }

      const ymlFm = readYamlFrontMatter(data);

      if (!ymlFm['id']) {
        reject(new FragmentHasNoIdError());
      }
      if (!ymlFm['title']) {
        reject(new FragmentHasNoTitleError());
      }

      resolve({
        ...(ymlFm as any as fragment),
      });
    });
  });
}

export function readYamlFrontMatter(fileContent: string): {
  [key: string]: string;
  __content: string;
} {
  // Thanks to https://github.com/dworthen/js-yaml-front-matter/blob/master/src/index.js
  const regex = new RegExp(/^(-{3}(?:\n|\r)(?<yaml>[\w\W]+?)(?:\n|\r)-{3})?(?<content>[\w\W]*)*/);

  let attrs = {};
  let __content = '';

  const result = regex.exec(fileContent);
  if (result === null || !result?.groups) {
    return {
      ...attrs,
      __content,
    };
  }

  if (result.groups.content) {
    __content = result.groups.content;
  }

  if (result.groups.yaml) {
    attrs = parse(result.groups.yaml, { schema: 'failsafe' }) as object;
  } else {
    return {
      ...attrs,
      __content,
    };
  }

  return {
    ...attrs,
    __content,
  };
}
