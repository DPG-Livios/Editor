import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import TipCommand from './tipcommand.js';
import tipIcon from './tip.svg';

export default class Tip extends Plugin {
    init() {
        const editor = this.editor;

        this.defineSchema();
        this.defineConverters();
        
        editor.commands.add('addTip', new TipCommand(editor));

        editor.ui.componentFactory.add('tip', locale => {

            const view = new ButtonView(locale);
			const tipCommand = editor.commands.get( 'addTip' );
            
            view.set({
			    isEnabled: true,
                label: 'Tip toevoegen',
                icon: tipIcon,
                tooltip: true
            });

			    // Bind button to the command.
			view.bind( 'isEnabled' ).to( tipCommand, 'isEnabled' );
			view.bind( 'isOn' ).to( tipCommand, 'value', value => !!value );

            view.on('execute', () => {
				this.editor.execute( 'addTip' );
                editor.editing.view.focus();

            });
            return view;
        });
    }
    

    defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'tip', {
            inheritAllFrom: '$container'
            /*allowWhere: '$block',
            
            allowChildren: '*',
            isBlock :true,
            isContent :false,
            isInline : false,
            isLimit : false,
            isObject : false,
            isSelectable : false,*/
        } );
    }

    defineConverters() {
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'tip',
            view: {
                name: 'div',
                classes: 'tip'
            }
        } );
    }
}