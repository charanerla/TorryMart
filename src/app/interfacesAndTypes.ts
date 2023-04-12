export interface UserDetails {
  userName: string;
  password: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  images: string[];
  category: string;
}

export type CartProduct = Product & { quantity: number };
