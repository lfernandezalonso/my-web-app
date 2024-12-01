import { Color } from "../colors/colors.models";

export interface Material {
  id: number;
  name: string;
  description: string;
}

export interface Part {
  id: number;
  name: string;
  description: string;
}

export interface ProductComposition {
  id: number;
  productId: number;
  product?: Product;
  partId: number;
  part?: Part
  materialId: number;
  material: Material;
  percentage: number;
}

export interface Product {
  id: number;
  description: string;
  price: number;
  colorId?: number;
  color?: Color;
  imageSrc?: string;
  productComposition?: ProductComposition[];
  manufactureDate?: Date;
}
