import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import path from "path";

export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@components": path.resolve("./src/components"),
        "@pages": path.resolve("./src/pages"),
        "@stores": path.resolve("./src/stores"),
        "@assets": path.resolve("./src/assets"),
        "@utils": path.resolve("./src/utils"),
        "@hooks": path.resolve("./src/hooks"),},
    },
  },
});
