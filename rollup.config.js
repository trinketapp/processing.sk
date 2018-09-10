import babel from 'rollup-plugin-babel';
export default {
    input: 'src/processing.js',
    plugins: [ babel() ],
    output: [
        {
            file: 'processing-sk.js',
            format: 'umd',
            name: 'ProcessingSk'
        }
    ]
}