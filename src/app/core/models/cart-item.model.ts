export interface CartItem {
  productId: number;
  name: string;
  price: number;
  unit: string | null;
  image_url: string | null;
  quantity: number;
}
