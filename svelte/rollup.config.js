import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import scssPlugin from "rollup-plugin-scss";
import sass from "sass";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
                stdio: ["ignore", "inherit", "inherit"],
                shell: true,
            });

            process.on("SIGTERM", toExit);
            process.on("exit", toExit);
        },
    };
}

export default [{
    input: "./src/components/index.js",
    output: {
        sourcemap: true,
        format: "iife",
        file: "dist/tocas.js",
    },
    /*output: {
        sourcemap: true,
        format: "es",
        dir: "dist",
    },*/
    plugins: [
        svelte({
            preprocess: sveltePreprocess({
                sourceMap: !production,
                defaults: {
                    style: "sass",
                },
            }),
            compilerOptions: {
                dev: !production,
                customElement: true,
            },
        }),
        css({ output: "bundle.css" }),
        scssPlugin({
            sass: sass,
            indentedSyntax: true,
            output: 'dist/tocas.css',
            sourceMap: true,
            sourceMapEmbed: true,
        }),
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),
        !production && serve(),
        !production && livereload("public"),
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
}]