/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module media-embed/mediaembedui
 */
import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, CssTransitionDisablerMixin } from 'ckeditor5/src/ui';
import VideoFormView from './ui/videoformview';
import VideoEmbedEditing from './videoembedediting';
import mediaIcon from './theme/icons/media.svg';
/**
 * The media embed UI plugin.
 */
export default class VideoEmbedUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [VideoEmbedEditing];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'VideoEmbedUI';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const command = editor.commands.get('video');
        editor.ui.componentFactory.add('video', locale => {
            const dropdown = createDropdown(locale);
            this._setUpDropdown(dropdown, command);
            return dropdown;
        });
    }
    _setUpDropdown(dropdown, command) {
        const editor = this.editor;
        const t = editor.t;
        const button = dropdown.buttonView;
        const registry = editor.plugins.get(VideoEmbedEditing).registry;
        dropdown.once('change:isOpen', () => {
            const form = new (CssTransitionDisablerMixin(VideoFormView))(getFormValidators(editor.t), editor.locale);
            dropdown.panelView.children.add(form);
            // Note: Use the low priority to make sure the following listener starts working after the
            // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
            // invisible form/input cannot be focused/selected.
            button.on('open', () => {
                form.disableCssTransitions();
                // Make sure that each time the panel shows up, the URL field remains in sync with the value of
                // the command. If the user typed in the input, then canceled (`urlInputView#fieldView#value` stays
                // unaltered) and re-opened it without changing the value of the media command (e.g. because they
                // didn't change the selection), they would see the old value instead of the actual value of the
                // command.
                //form.titleInputView = command.value || '';
                console.log(form.titleInputView)
                form.titleInputView.fieldView.select();
                form.enableCssTransitions();
            }, { priority: 'low' });
            dropdown.on('submit', () => {
                if (form.isValid()) {
                    editor.execute('video', form.url);
                    editor.editing.view.focus();
                }
            });
            dropdown.on('change:isOpen', () => form.resetFormStatus());
            dropdown.on('cancel', () => {
                editor.editing.view.focus();
            });
            form.delegate('submit', 'cancel').to(dropdown);
            form.titleInputView.fieldView.bind('value').to(command, 'value');
            // Form elements should be read-only when corresponding commands are disabled.
            form.titleInputView.bind('isEnabled').to(command, 'isEnabled');
        });
        dropdown.bind('isEnabled').to(command);
        button.set({
            label: t('Insert media'),
            icon: mediaIcon,
            tooltip: true
        });
    }
}
function getFormValidators(t) {
    return [
        (input) => {
            console.log(input)
            if (!input.length) {
                return t('The URL must not be empty.');
            }
        },
        (input, type) => {
            var re = /(?:\.([^.]+))?$/;
            console.log(input)
            var ext = re.exec(input)[1];
            
            if (ext !== type) {
                return t('This media URL is not supported.');
            }
        }
    ];
}
