const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const { CKEditorTranslationsPlugin } = require( '@ckeditor/ckeditor5-dev-translations' );

const dirName = 'build';

module.exports = (env, argv) => {
    return {
        mode: argv.mode === "production" ? "production" : "development",
        entry: {
            editor: './src/editor.js',
        },
        output: {
            filename: '[name].js',
            assetModuleFilename: '[name][ext][query]',
            path: path.resolve(__dirname, dirName)
        },
        plugins: [
            // More plugins.
            // ...
    
            new CKEditorTranslationsPlugin( {
                // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                language: 'nl'
            } )
        ],
        module: {
            rules: [
                {
                    test: /\.svg$/i,
                    use: 'raw-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(sass|css)$/,
                    use:
                    [
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
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename:'[name].css'
            }),
            new CompressionPlugin(),
        ],
        optimization: {
            minimize: argv.mode === "production",
            minimizer: [
                '...',
                new CssMinimizerPlugin()
            ],
        }
    };
};
