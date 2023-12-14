import { Command } from '@ckeditor/ckeditor5-core';

export default class SchemaCommand extends Command {
    
    refresh() {
    const model = this.editor.model;
    const selection = model.document.selection.getFirstPosition().parent;

    this.isEnabled = true;
    this.value = selection.getAttribute( 'data-schemaorg' );

    // The command is enabled when the "abbreviation" attribute
    // can be set on the current model selection.
    // this.isEnabled = model.schema.checkAttributeInSelection(
    //     selection, 'addSchema'
    // );
}
    execute( element, value ) {
        const model = this.editor.model;

        model.change(writer => {
			if(value){
				writer.setAttribute('data-schemaorg', value, element);
			}else	{
				writer.removeAttribute('data-schemaorg', element);
			}
        });

        /*model.change( writer => {
            model.insertContent(
                writer.createText( abbr, { abbreviation: title } )
            );
        } );*/

    }
}