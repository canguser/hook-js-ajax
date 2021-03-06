import resolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import {terser} from 'rollup-plugin-terser';

const {NODE_ENV = 'normal'} = process.env;
const pkg = require('./package') || {};
const {
    main = 'dist/index.js',
    mainMini = 'dist/index.mini.js',
    module = 'dist/index.es.js',
    moduleOrigin = 'dist/index.origin.esm.js',
    libName = '$func'
} = pkg;

const isESM = ['esm', 'esm5'].includes(NODE_ENV);
const isProd = ['prod'].includes(NODE_ENV);
const usingBabel = ['prod', 'normal', 'esm5'].includes(NODE_ENV);
const extensions = ['.js', '.ts'];

const fileMapper = {
    esm5: module,
    prod: mainMini,
    normal: main,
    esm: moduleOrigin
};

export default {
    input: './main/index.ts',
    output: {
        file: fileMapper[NODE_ENV] || main,
        format: isESM ? 'esm' : 'umd',
        name: libName
    },
    plugins: [
        resolve({
            extensions,
            modulesOnly: true
        }),
        commonjs(),
        ...usingBabel ? [babel(
            {
                exclude: 'node_modules/**', // 防止打包node_modules下的文件
                babelHelpers: 'runtime',       // 使plugin-transform-runtime生效
                extensions
            }
        )] : [],
        ...isProd ? [terser()] : []
    ]
}