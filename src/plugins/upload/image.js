import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-icons/theme/icons/image.svg';

export default class UploadImage extends Plugin {
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add( 'uploadImage', locale => {
            const view = new ButtonView( locale );
            view.set( {
                label: 'Insert image',
                icon: imageIcon,
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