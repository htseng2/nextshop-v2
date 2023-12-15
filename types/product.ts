import { Image, Slug } from "sanity";

export type Product = {
  _id: string;
  image: Image[];
  name: string;
  slug: Slug;
  price: number;
  details: string;
};
