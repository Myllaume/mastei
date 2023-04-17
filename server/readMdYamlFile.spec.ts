import path from 'node:path';
import { readFragmentFile, readYamlFrontMatter } from './readMdYamlFile';
import { FragmentHasNoTitleError, FragmentHasNoIdError } from '../errors';

describe('Read files', () => {
  test('should get attributes and content from each file', async () => {
    const result = await readFragmentFile(path.join(__dirname, '../fixtures/', 'fragment.md'));
    expect(result).toEqual(
      expect.objectContaining({
        id: '8fc4c03f-79f2-4587-b3c7-f373eb4140f0',
        title: 'Exemple de fragment',
        author: 'Jacques Audiard',
        keywords: ['décision'],
        cssImport: './styles.css',
        jsImport: './scripts.js',
        __content: expect.stringContaining('grande porte'),
      })
    );
  });

  test('should throw error if no title', () => {
    expect(
      readFragmentFile(path.join(__dirname, '../fixtures/', 'no-title-fragment.md'))
    ).rejects.toBeInstanceOf(FragmentHasNoTitleError);
  });

  test('should throw error if no id', () => {
    expect(
      readFragmentFile(path.join(__dirname, '../fixtures/', 'no-id-fragment.md'))
    ).rejects.toBeInstanceOf(FragmentHasNoIdError);
  });
});

describe('Read markdown files and Yaml Front Matter', () => {
  // prettier-ignore
  const ymlFm =
`---
id: 20220801238906
title: Sample fragment
---

Text content
`;

  test('should get attributes and content', () => {
    expect(readYamlFrontMatter(ymlFm)).toEqual({
      id: '20220801238906',
      title: 'Sample fragment',
      __content: '\n\nText content\n',
    });
  });

  // prettier-ignore
  const ymlFmWhiteContent =
`---
id: 20220801238906
title: Sample fragment
---
`;

  test('should get attributes and white content', () => {
    expect(readYamlFrontMatter(ymlFmWhiteContent)).toEqual({
      id: '20220801238906',
      title: 'Sample fragment',
      __content: '\n',
    });
  });

  // prettier-ignore
  const ymlFmEmptyContent =
`---
id: 20220801238906
title: Sample fragment
---`;

  test('should get attributes and empty content', () => {
    expect(readYamlFrontMatter(ymlFmEmptyContent)).toEqual({
      id: '20220801238906',
      title: 'Sample fragment',
      __content: '',
    });
  });

  // prettier-ignore
  const ymlFmContentOnly =
`TextContent`;

  test('should get no attributes and content', () => {
    expect(readYamlFrontMatter(ymlFmContentOnly)).toEqual({
      __content: 'TextContent',
    });
  });

  const ymlFmEmpty = '';

  test('should get no attributes and empty content', () => {
    expect(readYamlFrontMatter(ymlFmEmpty)).toEqual({
      __content: '',
    });
  });

  // prettier-ignore
  const ymlFmNoAttributes =
`---
---`;

  test('should get no attributes and seperators as content', () => {
    expect(readYamlFrontMatter(ymlFmNoAttributes)).toEqual({
      __content: '---\n---',
    });
  });
});
