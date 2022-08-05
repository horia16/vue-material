/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import esLint from "vite-plugin-eslint";
import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    include: ["./src/**/*.test.ts"],
    environment: "happy-dom"
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    },
    dedupe: ["vue"]
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "VueMaterial",
      fileName: (format) => `vue-material.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vue(),
    esLint(),
    dts(),
    autoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts"
    })
  ]
});
