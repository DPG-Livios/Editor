import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import faqIcon from './faq.svg';

export default class Faq extends Plugin {
    init() {
        const editor = this.editor;

        this.defineSchema();
        this.defineConverters();

        editor.ui.componentFactory.add('faq', locale => {
            const view = new ButtonView(locale);
            view.set({
                label: 'Q&A',
                icon: faqIcon,
                tooltip: true
            });
            
            view.on('execute', () => {

                editor.model.change(writer => {
                    const selectedElement = editor.model.document.selection.getFirstPosition().parent;
                    const accordionElement = this.findAccordionElement(selectedElement);
                    if (accordionElement) {
                        this.addAccordionItem(accordionElement, writer);
                    } else {
                        this.insertAccordion(writer, editor);
                    }
                });

            });
            return view;
        });
    }

    

    defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'accordion', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );
        schema.register( 'accordion-item', {
            allowIn: 'accordion',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'accordion-header', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'accordion-item',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'accordion-body', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'accordion-item',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );
    }

    defineConverters() {
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'accordion',
            view: {
                name: 'div',
                classes: 'accordion'
            }
        } );

        conversion.elementToElement( {
            model: 'accordion-item',
            view: {
                name: 'div',
                classes: 'accordion-item'
            }
        } );

        conversion.elementToElement( {
            model: 'accordion-header',
            view: {
                name: 'div',
                classes: 'accordion-header'
            }
        } );

        conversion.elementToElement( {
            model: 'accordion-body',
            view: {
                name: 'div',
                classes: 'accordion-body'
            }
        } );
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