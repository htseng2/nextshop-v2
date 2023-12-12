import { Image } from "sanity";

export type Product = {
  _id: string;
  image: Image[];
  name: string;
  slug: string;
  price: number;
  details: string;
};
