import { Command } from '@ckeditor/ckeditor5-core';

export default class FaqCommand extends Command {

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection.getFirstPosition().parent;

        this.isEnabled = true;
        this.value =  this.findAccordionElement(selection);
    }
    execute() {
        const model = this.editor.model;

        model.change(writer => {
            const selectedElement = this.editor.model.document.selection.getFirstPosition().parent;
            const accordionElement = this.findAccordionElement(selectedElement);
            if (accordionElement) {
                this.addAccordionItem(accordionElement, writer);
            } else {
                this.insertAccordion(writer, this.editor);
            }
        });
    }

    findAccordionElement(selectedElement) {
        if (!selectedElement) {
            return null;
        }

        if (selectedElement.is('element') && selectedElement.name === 'accordion') {
            return selectedElement;
        }

        return this.findAccordionElement(selectedElement.parent);
    }

    insertAccordion(writer, editor) {
        const accordionElement = writer.createElement('accordion', { class: 'accordion' });
        const accordionItem = writer.createElement('accordion-item', { class: 'accordion-item' });
        const accordionHeader = writer.createElement('accordion-header', { class: 'accordion-header' });
        const accordionBody = writer.createElement('accordion-body', { class: 'accordion-body' });

        writer.insertText('Vraag', accordionHeader);
        writer.insertText('Antwoord', accordionBody);

        writer.append(accordionHeader, accordionItem);
        writer.append(accordionBody, accordionItem);
        writer.append(accordionItem, accordionElement);

        editor.model.insertContent(accordionElement, editor.model.document.selection);
    }

    addAccordionItem(accordionElement, writer) {
        const accordionItem = writer.createElement('accordion-item', { class: 'accordion-item' });
        const accordionHeader = writer.createElement('accordion-header', { class: 'accordion-header' });
        const accordionBody = writer.createElement('accordion-body', { class: 'accordion-body' });

        writer.insertText('Vraag', accordionHeader);
        writer.insertText('Antwoord', accordionBody);

        writer.append(accordionHeader, accordionItem);
        writer.append(accordionBody, accordionItem);

        writer.append(accordionItem, accordionElement);
    }
}