/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";
import { builderDevTools } from "@builder.io/dev-tools/vite";
import { partytownVite } from "@builder.io/partytown/utils";
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import tailwindcss from '@tailwindcss/vite'

type PkgDep = Record<string, string>;
const { dependencies = {}, devDependencies = {} } = pkg as any as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};
errorOnDuplicatesPkgDeps(devDependencies, dependencies);

function monacoEditorPlugin() {
  /**
   * This plugin addresses two issues with Monaco Editor:
   * 1. It makes sure workers are properly bundled
   * 2. It ensures Monaco is only loaded on the client side
   */
  return {
    name: 'monaco-editor-plugin',
    configureServer(server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void; }; }) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url?.includes('monaco-editor/') && req.url?.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
          }
          next();
        });
      };
    },
    closeBundle() {
      // Create Monaco editor workers in the public directory
      const outDir = 'dist';
      const monacoDir = join(outDir, 'monaco-editor');

      try {
        mkdirSync(monacoDir, { recursive: true });

        // Create a simple worker loader for each worker type
        const files = [
          'editor.worker.js',
          'json.worker.js',
          'css.worker.js',
          'html.worker.js',
          'ts.worker.js'
        ];

        for (const file of files) {
          const content = `
            self.MonacoEnvironment = {
              baseUrl: '/'
            };
            importScripts('/node_modules/monaco-editor/esm/vs/base/worker/workerMain.js');
          `;
          writeFileSync(join(monacoDir, file), content);
        }

        console.log('Monaco editor workers created successfully');
      } catch (error) {
        console.error('Failed to create Monaco editor workers:', error);
      }
    }
  };
}

export default defineConfig(({ command, mode }): UserConfig => {
  return {
    plugins: [
      tailwindcss(),
      builderDevTools(),
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
      monacoEditorPlugin()
    ],
    // Consolidated optimizeDeps configuration
    optimizeDeps: {
      include: ['monaco-editor'],
      exclude: []
    },
    ssr: {
      // These packages should not be included in SSR
      noExternal: [
        'monaco-editor',
        'yjs',
        'y-monaco',
        'y-protocols',
        'lib0'
      ]
    },
    build: {
      rollupOptions: {
        // Ensure monaco-editor is only loaded on the client side
        external: ['monaco-editor'],
      }
    },
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

// *** utils ***
/**
 * Function to identify duplicate dependencies and throw an error
 * @param {Object} devDependencies - List of development dependencies
 * @param {Object} dependencies - List of production dependencies
 */
function errorOnDuplicatesPkgDeps(
    devDependencies: PkgDep,
    dependencies: PkgDep,
) {
  let msg = "";
  // Create an array 'duplicateDeps' by filtering devDependencies.
  // If a dependency also exists in dependencies, it is considered a duplicate.
  const duplicateDeps = Object.keys(devDependencies).filter(
      (dep) => dependencies[dep],
  );
  // include any known qwik packages
  const qwikPkg = Object.keys(dependencies).filter((value) =>
      /qwik/i.test(value),
  );
  // any errors for missing "qwik-city-plan"
  // [PLUGIN_ERROR]: Invalid module "@qwik-city-plan" is not a valid package
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  // Format the error message with the duplicates list.
  // The `join` function is used to represent the elements of the 'duplicateDeps' array as a comma-separated string.
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  // Throw an error with the constructed message.
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}