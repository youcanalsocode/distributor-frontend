export interface CategoryRef {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  unit: string | null;
  image_url: string | null;
  category_id: number;
  category: CategoryRef;
}
