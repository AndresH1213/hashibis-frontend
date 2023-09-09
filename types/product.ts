export enum ProductFormActions {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface ProductForm {
  name: string;
  code: string;
  description: string;
  category: string;
  images: string[];
  price: string | number;
  concentration: string | number;
  measureUnitConcentration: string;
  tags: string[];
  benefits: string[];
  personalDosis: string;
  recommendation: string;
  scientificResearch: string[];
}

export interface ProductInterface {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  images: string[];
  benefits?: string[];
  concentration?: number;
  measureUnitConcentration?: string;
  views?: number;
  likes?: number;
  personalDosis?: string;
  recommendation?: string;
  scientificResearch?: string[];
}

export interface ImageInterface {
  data: string;
  name?: string;
  type?: string;
}
