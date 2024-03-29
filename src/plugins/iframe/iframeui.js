/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView, ContextualBalloon, clickOutsideHandler } from '@ckeditor/ckeditor5-ui';
import IframeView from './iframeview.js';
import iframeIcon from './iframe.svg';

export default class IframeUI extends Plugin {
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		const editor = this.editor;

        // Create the balloon and the form view.
		this._balloon = this.editor.plugins.get( ContextualBalloon );
		this.formView = this._createFormView();

		editor.ui.componentFactory.add( 'iframe', () => {
			const button = new ButtonView();
			const iframeCommand = editor.commands.get( 'addIframe' );

			button.label = 'Iframe';
			button.icon = iframeIcon;
			button.tooltip = true;
			button.withText = false;
		
			button.bind( 'isEnabled' ).to( iframeCommand, 'isEnabled' );
			button.bind( 'isOn' ).to( iframeCommand, 'value', value => !!value );

			// Show the UI on button click.
			this.listenTo( button, 'execute', () => {
				this._showUI();
			} );

			return button;
		} );
	}

	_createFormView() {
		const editor = this.editor;
		const formView = new IframeView( editor.locale );

		// Execute the command after clicking the "Save" button.
		this.listenTo( formView, 'submit', () => {
			// Grab values from the abbreviation and title input fields.
			const src = formView.srcInputView.fieldView.element.value;
			const width = formView.widthInputView.fieldView.element.value;
			const height = formView.heightInputView.fieldView.element.value;			
			
			editor.execute( 'addIframe', {src, width, height} );

            // Hide the form view after submit.
			this._hideUI();
		} );

		// Hide the form view after clicking the "Cancel" button.
		this.listenTo( formView, 'cancel', () => {
			this._hideUI();
		} );

		// Hide the form view when clicking outside the balloon.
		clickOutsideHandler( {
			emitter: formView,
			activator: () => this._balloon.visibleView === formView,
			contextElements: [ this._balloon.view.element ],
			callback: () => this._hideUI()
		} );

		return formView;
	}

	_showUI() {
		const selectedElement = this.editor.model.document.selection.getSelectedElement();

		if(selectedElement?.name == "iframe"){
			this.formView.element?.reset();
			this.formView.srcInputView.fieldView.element.value = selectedElement.getAttribute("src");
			this.formView.widthInputView.fieldView.element.value = selectedElement.getAttribute("width")?.replace("px","");
			this.formView.heightInputView.fieldView.element.value = selectedElement.getAttribute("height")?.replace("px","");
		}else{
			this.formView.element?.reset();
			this.formView.srcInputView.fieldView.value = '';
			this.formView.widthInputView.fieldView.value = '500';
			this.formView.heightInputView.fieldView.value = '300';
		}

		this._balloon.add( {
			view: this.formView,
			position: this._getBalloonPositionData()
		} );

		this.formView.focus();
	}

	_hideUI() {
		// Clear the input field values and reset the form.
		this.formView.element.reset();
		
		this.formView.srcInputView.fieldView.value = '';
		this.formView.widthInputView.fieldView.value = '500';
		this.formView.heightInputView.fieldView.value = '300';

		this._balloon.remove( this.formView );

		// Focus the editing view after inserting the abbreviation so the user can start typing the content
		// right away and keep the editor focused.
		this.editor.editing.view.focus();
	}

	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		let target = null;

		// Set a target position by converting view selection range to DOM
		target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

		return {
			target
		};
	}
}