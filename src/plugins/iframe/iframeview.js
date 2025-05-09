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
import { IconCheck, IconCancel } from '@ckeditor/ckeditor5-icons';

export default class IframeView extends View {
	constructor( locale ) {
		super( locale );

		this.srcInputView = this._createInput( 'Add iframe url' );
		this.widthInputView = this._createInput( 'Width', 500);
		this.heightInputView = this._createInput( 'Height', 300);

		this.saveButtonView = this._createButton( 'Save', IconCheck, 'ck-button-save' );
		// Submit type of the button will trigger the submit event on entire form when clicked 
        // (see submitHandler() in render() below).
		this.saveButtonView.type = 'submit';

		this.cancelButtonView = this._createButton( 'Cancel', IconCancel, 'ck-button-cancel' );

		// Delegate ButtonView#execute to FormView#cancel
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

		this.childViews = this.createCollection( [
			this.srcInputView,
			this.widthInputView,
			this.heightInputView,
			this.saveButtonView,
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

	_createButton( label, icon, className ) {
		const button = new ButtonView();

		button.set( {
			label,
			icon,
			tooltip: true,
			class: className
		} );

		return button;
	}
}