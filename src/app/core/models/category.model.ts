export interface ProductRef {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  products: ProductRef[];
}
