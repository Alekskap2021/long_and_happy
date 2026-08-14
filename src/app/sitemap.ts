import type { MetadataRoute } from "next";

import {
  getDiagnostics,
  getMaterials,
  getProducts,
  getPublishedThemes,
} from "@/content/repository";

const staticRoutes = [
  "",
  "/besplatno",
  "/temy",
  "/kursy",
  "/konsultacii",
  "/o-nas",
  "/oplata",
  "/konfidencialnost",
  "/obrabotka-dannyh",
  "/kontakty",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({ url: route || "/", lastModified: now })),
    ...getPublishedThemes().map((theme) => ({
      url: `/temy/${theme.slug}`,
      lastModified: now,
    })),
    ...getMaterials().map((material) => ({
      url: `/besplatno/${material.slug}`,
      lastModified: now,
    })),
    ...getProducts().map((product) => ({
      url: `/kursy/${product.slug}`,
      lastModified: now,
    })),
    ...getDiagnostics().map((diagnostic) => ({
      url: `/diagnostika/${diagnostic.slug}`,
      lastModified: now,
    })),
  ];
}
