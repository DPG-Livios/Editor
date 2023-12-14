import { Command } from '@ckeditor/ckeditor5-core';

export default class SchemaCommand extends Command {

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection.getFirstPosition().parent;

        this.isEnabled = true;
        this.value = selection.getAttribute('data-schemaorg');
    }
    execute(element, value) {
        const model = this.editor.model;

        model.change(writer => {
            if (value) {
                writer.setAttribute('data-schemaorg', value, element);
            } else {
                writer.removeAttribute('data-schemaorg', element);
            }
        });
    }
}