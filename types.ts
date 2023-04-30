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
  canOpen?: boolean;
}

export type formField = {
  value: string;
  hasError: boolean;
};

export interface CustomError {
  code: string;
  message: string;
}

export type menuItem = {
  id: string;
  label: string;
  disable: boolean;
  accelerator?: string;
  sub?: menuItem[];
  onClick?: () => void;
};
