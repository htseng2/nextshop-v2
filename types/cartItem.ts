import { Image } from "sanity";
import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}
