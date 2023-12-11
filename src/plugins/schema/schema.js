import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import schemaIcon from './schema.svg';

export default class Schema extends Plugin {
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add( 'schema', locale => {
            const view = new ButtonView( locale );
            view.set( {
                label: 'Add Schema.org tags',
                icon: schemaIcon,
                tooltip: true
            } );
            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const imageUrl = prompt( 'Image URL' );
                editor.model.change( writer => {
                    const imageElement = writer.createElement( 'image', {
                        src: imageUrl
                    } );
                    // Insert the image in the current selection location.
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                } );
            } );
            return view;
        } );
    }
}