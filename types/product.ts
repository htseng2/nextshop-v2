import { Image } from "sanity";

export type Product = {
  image: Image[];
  name: string;
  slug: string;
  price: number;
  details: string;
};
