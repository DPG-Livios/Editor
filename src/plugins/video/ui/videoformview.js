/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module media-embed/ui/mediaformview
 */
import { ButtonView, FocusCycler, LabeledFieldView, View, ViewCollection, createLabeledInputText, submitHandler } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';
import VideoFormRowView from './videoformrowview';
// See: #8833.
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import '../theme/videoform.css';
/**
 * The media form view controller class.
 *
 * See {@link module:media-embed/ui/mediaformview~MediaFormView}.
 */
export default class VideoFormView extends View {
    /**
     * @param validators Form validators used by {@link #isValid}.
     * @param locale The localization services instance.
     */
    constructor(validators, locale) {
        super(locale);
        const t = locale.t;
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        this.set('videoTitleInputValue', '');
        this.titleInputView = this._createInput(t('Titel'), (field) => {this.videoTitleInputValue = field.element.value.trim();});
        this.set('videoDescriptionInputValue', '');
        this.descriptionInputView = this._createInput(t('Beschrijving'), (field) => {this.videoDescriptionInputValue = field.element.value.trim();});
        this.set('videoWebmInputValue', '');
        this.webmInputView = this._createInput(t('WebM URL'), (field) => {this.videoWebmInputValue = field.element.value.trim();});
        this.set('videoMP4InputValue', '');
        this.mp4InputView = this._createInput(t('MP4 URL'), (field) => {this.videoMP4InputValue = field.element.value.trim();});

        const { saveButtonView, cancelButtonView } = this._createActionButtons(locale);
        this.saveButtonView = saveButtonView;
        this.cancelButtonView = cancelButtonView;
        this._focusables = new ViewCollection();
        this._focusCycler = new FocusCycler({
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the <kbd>Shift</kbd> + <kbd>Tab</kbd> keystroke.
                focusPrevious: 'shift + tab',
                // Navigate form fields forwards using the <kbd>Tab</kbd> key.
                focusNext: 'tab'
            }
        });
        this._validators = validators;
        this.setTemplate({
            tag: 'form',
            attributes: {
                class: [
                    'ck',
                    'ck-media-form'
                ],
                tabindex: '-1'
            },
            children: [
                this.titleInputView,
                this.descriptionInputView,
                this.webmInputView,
                this.mp4InputView,
                new VideoFormRowView(locale, {
                    children: [
                        this.saveButtonView,
                        this.cancelButtonView
                    ],
                    class: 'ck-image-insert-form__action-row'
                })
            ]
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        submitHandler({
            view: this
        });
        const childViews = [
            this.titleInputView,
            this.descriptionInputView,
            this.webmInputView,
            this.mp4InputView,
            this.saveButtonView,
            this.cancelButtonView
        ];
        childViews.forEach(v => {
            // Register the view as focusable.
            this._focusables.add(v);
            // Register the view in the focus tracker.
            this.focusTracker.add(v.element);
        });
        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo(this.element);
        const stopPropagation = (data) => data.stopPropagation();
        // Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
        // keystroke handler would take over the key management in the URL input. We need to prevent
        // this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
        this.keystrokes.set('arrowright', stopPropagation);
        this.keystrokes.set('arrowleft', stopPropagation);
        this.keystrokes.set('arrowup', stopPropagation);
        this.keystrokes.set('arrowdown', stopPropagation);
    }
    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }
    /**
     * Focuses the fist {@link #_focusables} in the form.
     */
    focus() {
        this._focusCycler.focusFirst();
    }
    
    isValid() {
        this.resetFormStatus();
        var value = true;
        var inputs = [
            {input:this.titleInputView, validators: [this._validators[0]], type: "title"},
            {input:this.descriptionInputView, validators: [this._validators[0]], type: "description"},
            {input:this.webmInputView, validators: this._validators, type: "webm"},
            {input:this.mp4InputView, validators: this._validators, type: "mp4"}
        ];
        inputs.forEach(input => {
            for (const validator of input.validators) {
                const errorText = validator(input.input, input.type);
                if (errorText) {
                    input.input.errorText = errorText;
                    value = false;
                }
            }
        });
        return value;
    }
    /**
     * Cleans up the supplementary error and information text of the {@link #urlInputView}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    resetFormStatus() {
        this.titleInputView.errorText = null;
        this.descriptionInputView.errorText = null;
        this.webmInputView.errorText = null;
        this.mp4InputView.errorText = null;
    }
    /**
     * Creates a labeled input view.
     *
     * @returns Labeled input view instance.
     */
    _createInput(label, event) {
        const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);
        const inputField = labeledInput.fieldView;
        labeledInput.label = label;
        labeledInput.fieldView.placeholder = ' ';
        inputField.on('input',  () => { event(inputField); });
        return labeledInput;
    }
    _createActionButtons(locale) {
        const t = locale.t;
        const saveButtonView = new ButtonView(locale);
        const cancelButtonView = new ButtonView(locale);
        saveButtonView.set({
            label: t('Save'),
            icon: icons.check,
            class: 'ck-button-save',
            type: 'submit',
            withText: true,
            isEnabled: this.videoTitleInputValue && this.videoDecriptionInputValue 
                        && this.videoWebmInputValue && this.videoMP4InputValue
        });
        cancelButtonView.set({
            label: t('Cancel'),
            icon: icons.cancel,
            class: 'ck-button-cancel',
            withText: true
        });
        saveButtonView.bind('isEnabled').to(this, 'videoWebmInputValue', value => !!value);
        //insertButtonView.delegate('execute').to(this, 'submit');
        cancelButtonView.delegate('execute').to(this, 'cancel');
        return { saveButtonView, cancelButtonView };
    }
}
