/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { LabeledFieldView, createLabeledInputText, createDropdown, addListToDropdown, Model, TextareaView, SwitchButtonView  } from 'ckeditor5/src/ui';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
/**
 * Creates integrations object that will be passed to the
 * {@link module:image/imageinsert/ui/imageinsertpanelview~ImageInsertPanelView}.
 *
 * @param editor Editor instance.
 *
 * @returns Integrations object.
 */
export function prepareIntegrations(editor) {
    const panelItems = editor.config.get('image.insert.integrations');
    const imageInsertUIPlugin = editor.plugins.get('ImageInsertUI');
    const PREDEFINED_INTEGRATIONS = {
        'insertImageViaUrl': createLabeledInputView(editor.locale, 'Insert image via URL','https://example.com/image.png'),
        'imageSizeInputValue': createLabeledSwitchView(editor.locale, "Image size", "Size"),
        'imageCaptionInputValue': createLabeledTextareaView(editor.locale, "Insert image caption", "Image caption"),
        'imageSEOInputValue': createLabeledTextareaView(editor.locale, "Insert SEO description", "SEO description"),
    };
    if (!panelItems) {
        return PREDEFINED_INTEGRATIONS;
    }
    // Prepares ckfinder component for the `openCKFinder` integration token.
    if (panelItems.find(item => item === 'openCKFinder') && editor.ui.componentFactory.has('ckfinder')) {
        const ckFinderButton = editor.ui.componentFactory.create('ckfinder');
        ckFinderButton.set({
            withText: true,
            class: 'ck-image-insert__ck-finder-button'
        });
        // We want to close the dropdown panel view when user clicks the ckFinderButton.
        ckFinderButton.delegate('execute').to(imageInsertUIPlugin, 'cancel');
        PREDEFINED_INTEGRATIONS.openCKFinder = ckFinderButton;
    }
    // Creates integrations object of valid views to pass it to the ImageInsertPanelView.
    return panelItems.reduce((object, key) => {
        if (PREDEFINED_INTEGRATIONS[key]) {
            object[key] = PREDEFINED_INTEGRATIONS[key];
        }
        else if (editor.ui.componentFactory.has(key)) {
            object[key] = editor.ui.componentFactory.create(key);
        }
        return object;
    }, {});
}
/**
 * Creates labeled field view.
 *
 * @param locale The localization services instance.
 */
export function createLabeledInputView(locale, label, placeholder) {
    const t = locale.t;
    const labeledInputView = new LabeledFieldView(locale, createLabeledInputText);
    labeledInputView.set({
        label: t(label)
    });
    labeledInputView.fieldView.placeholder = placeholder;
    return labeledInputView;
}
export function createLabeledTextareaView(locale, label, placeholder) {
    const t = locale.t;
    const labeledInputView = new LabeledFieldView(locale, ( labeledFieldView, viewUid, statusUid ) => {
        const textarea = new TextareaView();

        textarea.set( {
            id: viewUid,
            ariaDescribedById: statusUid,
            minRows: 4,
            maxRows: 10,
            resize: 'vertical'
        } );
    
        textarea.bind( 'isReadOnly' ).to( labeledFieldView, 'isEnabled', value => !value );
        textarea.bind( 'hasError' ).to( labeledFieldView, 'errorText', value => !!value );
    
        return textarea;
    } );

    labeledInputView.set({
        label: t(label),
        placeholder: placeholder
    });
    labeledInputView.fieldView.placeholder = placeholder;
    return labeledInputView;
}


export function createLabeledSwitchView(locale, label, placeholder) {
    const t = locale.t;
    const labeledInputView = new LabeledFieldView(locale, ( labeledFieldView, viewUid, statusUid ) => {
        const switchButton = new SwitchButtonView();

        switchButton.set( {
            id: viewUid,
            ariaDescribedById: statusUid,
            label: "Normaal",
            withText: true,
            isOn: false
        } );
        switchButton.on( 'execute', () => { 
            switchButton.isOn = !switchButton.isOn;
            switchButton.label = switchButton.isOn ? "Infographic" : "Normaal"

         } );
        // switchButton.bind( 'isOn' ).to( labeledFieldView );
    
        //switchButton.bind( 'execute' ).to( labeledFieldView, 'input', value => !value );
        switchButton.bind( 'isReadOnly' ).to( labeledFieldView, 'isEnabled', value => !value );
        switchButton.bind( 'hasError' ).to( labeledFieldView, 'errorText', value => !!value );
    
        return switchButton;
    } );

    labeledInputView.set({
        label: t(label),
        placeholder: placeholder
    });
    labeledInputView.fieldView.placeholder = placeholder;
    return labeledInputView;
}

export function createLabeledSelectView(locale) {
    const titles = {};   
    const t = locale.t;
    const dropdownView = createDropdown( locale);
    dropdownView.set({
        label: t('Image size')
    });

    const options = [
        { label: t('Normaal'), value: 'm' },
        { label: t('Groot'), value: 'l' },
        { label: t('Infographic'), value: 'i' }
    ];

    const itemDefinitions = new Collection();


    for ( const option of options ) {
        const def = {
            id: option.label,
            type: 'button',
            model: new Model( {
                id: option.label,
                label: option.label,
                //class: option.class,
                role: 'menuitemradio',
                withText: true
            } )
        };

        //def.model.bind( 'isOn' ).to( headingCommand, 'value', value => value === option.value );
        def.model.set( {
            commandName: 'setSize',
            commandValue: option.value
        } );

        // Add the option to the collection.
        itemDefinitions.add( def );

        titles[ option.value ] = option.label;
    }
    addListToDropdown( dropdownView, itemDefinitions, {
        ariaLabel: t( 'Image size' ),
        role: 'menu'
    } );

    /*dropdownView.buttonView.bind( 'label' ).to( headingCommand, 'value', paragraphCommand, 'value', ( value, para ) => {
        const whichModel = value || para && 'paragraph';

        if ( typeof whichModel === 'boolean' ) {
            return defaultTitle;
        }

        // If none of the commands is active, display default title.
        if ( !titles[ whichModel ] ) {
            return defaultTitle;
        }

        return titles[ whichModel ];
    } );*/
    return dropdownView;
}
