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

        editor.ui.componentFactory.add('faq', locale => {

            const view = new ButtonView(locale);
			const faqCommand = editor.commands.get( 'addFaq' );
            
            view.set({
			    isEnabled: true,
                label: 'Q&A',
                icon: faqIcon,
                tooltip: true
            });

			// Bind button to the command.
			view.bind( 'isEnabled' ).to( faqCommand, 'isEnabled' );
			view.bind( 'isOn' ).to( faqCommand, 'value', value => !!value );

            view.on('execute', () => {
				this.editor.execute( 'addFaq' );

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
            inheritAllFrom: '$block',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'accordion-body', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'accordion-item',
            inheritAllFrom: '$block',

            // Allow content which is allowed in the root (e.g. paragraphs).
            //allowContentOf: '$block'
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
}