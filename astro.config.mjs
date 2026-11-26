// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.sachinthax.live",
  output: "static",
  trailingSlash: "ignore",
  compressHTML: true,
});
