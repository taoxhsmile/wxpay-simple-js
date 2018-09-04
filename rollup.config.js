// import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
// import { eslint } from 'rollup-plugin-eslint';



export default {
  input: 'src/main.js',
  output: {
    name: 'main',
    file: './dist/wxpay-simple-min.js',
    format: 'es',
  },
  plugins: [
    resolve({
      jsnext: true, // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true, // Default: true 
      browser: true // Default: false
    }),
    commonjs(),
    // replace({
    //   ENVIRONMENT: JSON.stringify('production')
    // }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**', // 排除node_modules 下的文件
    }),
    terser()
  ]
}
