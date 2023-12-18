// webpack.config.js

const path = require( 'path' );
const { CKEditorTranslationsPlugin } = require( '@ckeditor/ckeditor5-dev-translations' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
    entry: {script:'./src/script.js'},//, ckeditor:'./src/ckeditor.js'},
    output: {
        path: path.resolve( __dirname, 'build' ),
        filename: '[name].js'
    },
    plugins: [
        // More plugins.
        // ...

        new CKEditorTranslationsPlugin( {
            // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
            language: 'nl',
            addMainLanguageTranslationsToAllAssets: true
        } )
    ],
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig( {
                                themeImporter: {
                                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                                },
                                minify: true
                            } )
                        }
                    }
                ]
            }
        ]
    }
};
