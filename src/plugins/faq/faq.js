import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import FaqCommand from './faqcommand.js';
import faqIcon from './faq.svg';

export default class Faq extends Plugin {
    init() {
        const editor = this.editor;

        this.defineSchema();
        this.defineConverters();

        editor.commands.add(
            'addFaq', new FaqCommand(editor)
        );

        editor.keystrokes.set('Enter', (data, stop) => {
            const selection = editor.model.document.selection;
            const position = selection.getFirstPosition();

            const accordionElement = this.findAccordionElement(position);
            if (accordionElement) {
                editor.execute('insertParagraph', {
                    position: editor.model.createPositionAfter(accordionElement)
                });
                stop();
            }
        });

        editor.ui.componentFactory.add('faq', locale => {

            const view = new ButtonView(locale);
            const faqCommand = editor.commands.get('addFaq');

            view.set({
                isEnabled: true,
                label: 'Q&A',
                icon: faqIcon,
                tooltip: true
            });

            // Bind button to the command.
            view.bind('isEnabled').to(faqCommand, 'isEnabled');
            view.bind('isOn').to(faqCommand, 'value', value => !!value);

            view.on('execute', () => {
                this.editor.execute('addFaq');

            });
            return view;
        });
    }

    defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('accordion', {
            isLimit: true,
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$container',
            allowChildren: 'accordion-item'
        });
        schema.register('accordion-item', {
            allowIn: 'accordion',
            inheritAllFrom: '$container',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowChildren: ['accordion-header', 'accordion-body']
        });

        schema.register('accordion-header', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'accordion-item',
            inheritAllFrom: '$block',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        });

        schema.register('accordion-body', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'accordion-item',
            inheritAllFrom: '$container',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        });
    }

    defineConverters() {
        const conversion = this.editor.conversion;

        conversion.elementToElement({
            model: 'accordion',
            view: {
                name: 'div',
                classes: 'accordion'
            }
        });

        conversion.elementToElement({
            model: 'accordion-item',
            view: {
                name: 'div',
                classes: 'accordion-item'
            }
        });

        conversion.elementToElement({
            model: 'accordion-header',
            view: {
                name: 'div',
                classes: 'accordion-header'
            }
        });

        conversion.elementToElement({
            model: 'accordion-body',
            view: {
                name: 'div',
                classes: 'accordion-body'
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
}