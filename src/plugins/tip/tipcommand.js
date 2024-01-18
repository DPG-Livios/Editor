import { Command } from '@ckeditor/ckeditor5-core';

export default class TipCommand extends Command {

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        
        var selectedElement = selection.getFirstPosition().parent;
        
        selectedElement = this.findTipElement(selectedElement);
        this.isEnabled = true;
        this.value = selectedElement;
    }

    execute() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;

        model.change(writer => {
            
            var selectedElement = selection.getFirstPosition().parent;
            selectedElement = this.findTipElement(selectedElement);
            if (selectedElement) {

                writer.unwrap(selectedElement);
            } else {
                const tipDiv = writer.createElement('tip', { class: 'tip' });
                writer.wrap(writer.createRangeOn(selection.getFirstPosition().parent), tipDiv);
            }

        });
    }

    findTipElement(selectedElement) {
        if (!selectedElement) {
            return null;
        }
        const hasTipClass = selectedElement.hasAttribute('class') && selectedElement.getAttribute('class').split(' ').includes('tip');
        if (hasTipClass) {
            
            return selectedElement;
        }

        return this.findTipElement(selectedElement.parent);
    }
}