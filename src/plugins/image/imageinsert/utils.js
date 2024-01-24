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
        'insertImageViaUrl': createLabeledInputView(editor.locale, 'Url afbeelding','https://example.com/image.png'),
        'imageSizeInputValue': createLabeledSwitchView(editor.locale, "Type afbeelding", "Size"),
        'imageCaptionInputValue': createLabeledTextareaView(editor.locale, "Bijschrift", " "),
        'imageSEOInputValue': createLabeledTextareaView(editor.locale, "Seo beschrijving", " "),
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
