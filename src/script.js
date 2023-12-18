import Editor from './ckeditor';
//import Anchor from '@ckeditor/ckeditor5-anchor/src/anchor';


console.log(Editor)
Editor
    // Note that you do not have to specify the plugin and toolbar configuration — using defaults from the build.
    .create( document.querySelector( '.editor' ))
    .then( editor => {
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );