export type appInformations = {
  name: string;
  version: string;
};

export type fragment = {
  id: string;
  title: string;
  content: string;
  author?: string;
  keywords?: string[];
  cssImport?: string;
  jsImport?: string;
};