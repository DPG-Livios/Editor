/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module image/imageinsert/imageinsertui
 */
import { Plugin } from 'ckeditor5/src/core';
import { IconImage } from 'ckeditor5/src/icons';
import { SplitButtonView, createDropdown } from 'ckeditor5/src/ui';
import ImageInsertPanelView from './ui/imageinsertpanelview';
import { prepareIntegrations } from './utils';
/**
 * The image insert dropdown plugin.
 *
 * For a detailed overview, check the {@glink features/images/image-upload/image-upload Image upload feature}
 * and {@glink features/images/images-inserting Insert images via source URL} documentation.
 *
 * Adds the `'insertImage'` dropdown to the {@link module:ui/componentfactory~ComponentFactory UI component factory}
 * and also the `imageInsert` dropdown as an alias for backward compatibility.
 */
export default class ImageInsertUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageInsertUI';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const componentCreator = (locale) => {
            return this._createDropdownView(locale);
        };
        // Register `insertImage` dropdown and add `imageInsert` dropdown as an alias for backward compatibility.
        editor.ui.componentFactory.add('insertImage', componentCreator);
        editor.ui.componentFactory.add('imageInsert', componentCreator);
    }
    /**
     * Creates the dropdown view.
     *
     * @param locale The localization services instance.
     */
    _createDropdownView(locale) {
        const editor = this.editor;
        const t = locale.t;
        const uploadImageCommand = editor.commands.get('uploadImage');
        const insertImageCommand = editor.commands.get('insertImage');
        this.dropdownView = createDropdown(locale); //,uploadImageCommand ? SplitButtonView : undefined);
        const buttonView = this.dropdownView.buttonView;
        const panelView = this.dropdownView.panelView;
        buttonView.set({
            label: 'Afbeelding toevoegen',
            icon: IconImage,
            tooltip: true
        });
        panelView.extendTemplate({
            attributes: {
                class: 'ck-image-insert__panel'
            }
        });

        /*buttonView.on('execute', () => {
            console.log(this.dropdownView)
            // Open the dropdown when the button is clicked
            this.dropdownView.fire("change:isOpen")// ? this.dropdownView.close() : this.dropdownView.open();
        });/*

        /*if (uploadImageCommand) {
            const splitButtonView = this.dropdownView.buttonView;
            // We are injecting custom button replacement to readonly field.
            splitButtonView.actionView = editor.ui.componentFactory.create('uploadImage');
            // After we replaced action button with `uploadImage` component,
            // we have lost a proper styling and some minor visual quirks have appeared.
            // Brining back original split button classes helps fix the button styling
            // See https://github.com/ckeditor/ckeditor5/issues/7986.
            splitButtonView.actionView.extendTemplate({
                attributes: {
                    class: 'ck ck-button ck-splitbutton__action'
                }
            });
        }*/
        return this._setUpDropdown(insertImageCommand);
    }
    /**
     * Sets up the dropdown view.
     *
     * @param command An uploadImage or insertImage command.
     */
    _setUpDropdown(command) {
        const editor = this.editor;
        const t = editor.t;
        const dropdownView = this.dropdownView;
        const panelView = dropdownView.panelView;
        const imageUtils = this.editor.plugins.get('ImageUtils');
        const replaceImageSourceCommand = editor.commands.get('replaceImageSource');
        let imageInsertView;
        dropdownView.bind('isEnabled').to(command);
        dropdownView.once('change:isOpen', () => {
            imageInsertView = new ImageInsertPanelView(editor.locale, prepareIntegrations(editor));
            imageInsertView.delegate('submit', 'cancel').to(dropdownView);
            panelView.children.add(imageInsertView);
        });
        dropdownView.on('change:isOpen', () => {
            const selectedElement = editor.model.document.selection.getSelectedElement();
            const insertButtonView = imageInsertView.insertButtonView;
            const insertImageViaUrlForm = imageInsertView.getIntegration('insertImageViaUrl');
            if (dropdownView.isOpen) {
                if (imageUtils.isImage(selectedElement)) {
                    imageInsertView.imageURLInputValue = replaceImageSourceCommand.value;
                    imageInsertView.imageSizeInputValue = replaceImageSourceCommand.size;
                    imageInsertView.imageCaptionInputValue = replaceImageSourceCommand.caption;
                    imageInsertView.imageSEOInputValue = replaceImageSourceCommand.seo;
                    insertButtonView.label = 'Updaten';
                    //insertImageViaUrlForm.label = t('Update image URL');
                }
                else {
                    imageInsertView.imageURLInputValue = '';
                    imageInsertView.imageSizeInputValue = 'm';
                    imageInsertView.imageCaptionInputValue = '';
                    imageInsertView.imageSEOInputValue = '';
                    insertButtonView.label = 'Toevoegen';
                    //insertImageViaUrlForm.label = t('Insert image via URL');
                }
            }
            // Note: Use the low priority to make sure the following listener starts working after the
            // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
            // invisible form/input cannot be focused/selected.
        }, { priority: 'low' });
        this.delegate('cancel').to(dropdownView);
        dropdownView.on('submit', () => {
            closePanel();
            onSubmit();
        });
        dropdownView.on('cancel', () => {
            closePanel();
        });
        function onSubmit() {
            const selectedElement = editor.model.document.selection.getSelectedElement();
            
            if (imageUtils.isImage(selectedElement)) {
                editor.execute('replaceImageSource', { 
                    source: imageInsertView.imageURLInputValue,
                    size: imageInsertView.imageSizeInputValue,
                    caption: imageInsertView.imageCaptionInputValue,
                    seo: imageInsertView.imageSEOInputValue
                });
            }
            else {
                editor.execute('insertImage', { 
                    source: imageInsertView.imageURLInputValue,
                    size: imageInsertView.imageSizeInputValue,
                    caption: imageInsertView.imageCaptionInputValue,
                    seo: imageInsertView.imageSEOInputValue
                 });
            }
        }
        function closePanel() {
            editor.editing.view.focus();
            dropdownView.isOpen = false;
        }
        return dropdownView;
    }
}
