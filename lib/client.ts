import sanityClient from "@sanity/client";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "ms4hpjqh",
  dataset: "production",
  apiVersion: "2023-12-11",
  useCdn: false,
});
