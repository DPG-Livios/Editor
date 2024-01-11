/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	View,
	LabeledFieldView,
	createLabeledInputText,
	ButtonView,
	submitHandler
} from '@ckeditor/ckeditor5-ui';
import { icons } from '@ckeditor/ckeditor5-core';

export default class SchemaView extends View {
	constructor( editor ) {
		super( editor.locale );
		this.editor = editor;

		this.faqTitleButtonView = this._createButton( 'FAQ title', 'faq_title', undefined, 'ck-button_with-text' );
		this.faqParagraphButtonView = this._createButton( 'FAQ paragraph', 'faq_paragraph', undefined, 'ck-button_with-text' );

		this.cancelButtonView = this._createButton( 'Cancel', undefined, icons.cancel, 'ck-button-cancel' );

		// Delegate ButtonView#execute to FormView#cancel
		//this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

		this.childViews = this.createCollection( [
			this.faqTitleButtonView,
			this.faqParagraphButtonView,
			this.cancelButtonView
		] );

		this.setTemplate( {
			tag: 'form',
			attributes: {
				class: [ 'ck', 'ck-abbr-form' ],
				tabindex: '-1'
			},
			children: this.childViews
		} );
	}

	render() {
		super.render();

		// Submit the form when the user clicked the save button or pressed enter in the input.
		submitHandler( {
			view: this
		} );
	}

	focus() {
		this.childViews.first.focus();
	}

	_createInput( label, defaultValue ) {
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

		labeledInput.label = label;
		
		if(defaultValue){
			labeledInput.fieldView.value = defaultValue;
		}
		return labeledInput;
	}

	_createButton(label, schemaValue, icon, className) {
        const button = new ButtonView();

        button.set({
            label,
            icon,
			isOn: false,
            tooltip: true,
            class: className
        });

        button.on('execute', () => {
            const selectedElement = this._getSelectedElement();
            if (selectedElement) {
				this.editor.execute( 'addSchema', selectedElement, schemaValue );
            }

			button.delegate( 'execute' ).to( this, 'cancel' );
        });

        return button;
    }

    _getSelectedElement() {
		const selectedElement = this.editor.model.document.selection.getFirstPosition().parent;

        return selectedElement;
    }

    _addSchemaAttribute(element, value) {
        this.editor.model.change(writer => {
			
			if(value){
				writer.setAttribute('data-schemaorg', value, element);
			}else	{
				writer.removeAttribute('data-schemaorg', element);
			}
        });
    }
}