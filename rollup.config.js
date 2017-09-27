import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
    entry: 'src/processing.js',
    plugins: [
        babel(babelrc())
    ],
    targets: [
        {
            dest: 'processing-sk.js',
            format: 'umd',
            moduleName: 'ProcessingSk'
        }
    ]
}