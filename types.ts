export interface AppInformations {
  version: string;
}

export type fragment = {
  id: string;
  title: string;
  content: string;
  author?: string;
  keywords?: string[];
  cssImport?: string;
  jsImport?: string;
};

export interface library {
  id: string;
  title: string;
  directory: string;
  lastEditDate: number;
}
