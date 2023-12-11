import { type SchemaTypeDefinition } from "sanity";
import product from "./schema/product";
import banner from "./schema/banner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, banner],
};
