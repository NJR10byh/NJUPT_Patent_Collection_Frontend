import { ConfigEnv, loadEnv, UserConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

import path from "path";

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve("src/style/variables.less")}";`
          },
          math: "strict",
          javascriptEnabled: true
        }
      }
    },

    plugins: [
      createVuePlugin(),
      vueJsx(),
      // viteMockServe({
      //   mockPath: 'mock',
      //   localEnabled: true,
      // }),
      svgLoader()
    ],

    server: {
      port: 8907,
      host: "localhost",
      proxy: {
        // 本地环境
        "/collection_dev": {
          target: "http://localhost:8089",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/collection_dev/, "")
        }
        // "/collection_dev": "http://cgzh.njupt.edu.cn:8080" // 开发环境
      }
    }
  };
};
