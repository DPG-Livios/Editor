/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module image/imageresize/imageresizebuttons
 */
import { Plugin } from 'ckeditor5/src/core';
import { IconObjectSizeCustom,
	IconObjectSizeFull,
	IconObjectSizeLarge,
	IconObjectSizeMedium,
	IconObjectSizeSmall } from 'ckeditor5/src/icons';
import { ButtonView, DropdownButtonView, ViewModel, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import { CKEditorError, Collection } from 'ckeditor5/src/utils';
import ImageResizeEditing from './imageresizeediting';
const RESIZE_ICONS = {
	small: IconObjectSizeSmall,
	medium: IconObjectSizeMedium,
	large: IconObjectSizeLarge,
	custom: IconObjectSizeCustom,
	original: IconObjectSizeFull
};
/**
 * The image resize buttons plugin.
 *
 * It adds a possibility to resize images using the toolbar dropdown or individual buttons, depending on the plugin configuration.
 */
export default class ImageResizeButtons extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [ImageResizeEditing];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageResizeButtons';
    }
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this._resizeUnit = editor.config.get('image.resizeUnit');
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const options = editor.config.get('image.resizeOptions');
        const command = editor.commands.get('resizeImage');
        this.bind('isEnabled').to(command);
        for (const option of options) {
            this._registerImageResizeButton(option);
        }
        this._registerImageResizeDropdown(options);
    }
    /**
     * A helper function that creates a standalone button component for the plugin.
     *
     * @param resizeOption A model of the resize option.
     */
    _registerImageResizeButton(option) {
        const editor = this.editor;
        const { name, value, icon } = option;
        const optionValueWithUnit = value ? value + this._resizeUnit : null;
        editor.ui.componentFactory.add(name, locale => {
            const button = new ButtonView(locale);
            const command = editor.commands.get('resizeImage');
            const labelText = this._getOptionLabelValue(option, true);
            if (!RESIZE_ICONS[icon]) {
                /**
                 * When configuring {@link module:image/imageconfig~ImageConfig#resizeOptions `config.image.resizeOptions`} for standalone
                 * buttons, a valid `icon` token must be set for each option.
                 *
                 * See all valid options described in the
                 * {@link module:image/imageconfig~ImageResizeOption plugin configuration}.
                 *
                 * @error imageresizebuttons-missing-icon
                 * @param option Invalid image resize option.
                */
                throw new CKEditorError('imageresizebuttons-missing-icon', editor, option);
            }
            button.set({
                // Use the `label` property for a verbose description (because of ARIA).
                label: labelText,
                icon: RESIZE_ICONS[icon],
                tooltip: labelText,
                isToggleable: true
            });
            // Bind button to the command.
            button.bind('isEnabled').to(this);
            button.bind('isOn').to(command, 'value', getIsOnButtonCallback(optionValueWithUnit));
            this.listenTo(button, 'execute', () => {
                editor.execute('resizeImage', { width: optionValueWithUnit });
            });
            return button;
        });
    }
    /**
     * A helper function that creates a dropdown component for the plugin containing all the resize options defined in
     * the editor configuration.
     *
     * @param options An array of configured options.
     */
    _registerImageResizeDropdown(options) {
        const editor = this.editor;
        const t = editor.t;
        const originalSizeOption = options.find(option => !option.value);
        const componentCreator = (locale) => {
            const command = editor.commands.get('resizeImage');
            const dropdownView = createDropdown(locale, DropdownButtonView);
            const dropdownButton = dropdownView.buttonView;
            const accessibleLabel = t('Resize image');
            dropdownButton.set({
                tooltip: accessibleLabel,
                commandValue: originalSizeOption.value,
                icon: RESIZE_ICONS.medium,
                isToggleable: true,
                label: this._getOptionLabelValue(originalSizeOption),
                withText: true,
                class: 'ck-resize-image-button',
                ariaLabel: accessibleLabel,
                ariaLabelledBy: undefined
            });
            dropdownButton.bind('label').to(command, 'value', commandValue => {
                if (commandValue && commandValue.width) {
                    return commandValue.width;
                }
                else {
                    return this._getOptionLabelValue(originalSizeOption);
                }
            });
            dropdownView.bind('isEnabled').to(this);
            addListToDropdown(dropdownView, () => this._getResizeDropdownListItemDefinitions(options, command), {
                ariaLabel: t('Image resize list'),
                role: 'menu'
            });
            // Execute command when an item from the dropdown is selected.
            this.listenTo(dropdownView, 'execute', evt => {
                editor.execute(evt.source.commandName, { width: evt.source.commandValue });
                editor.editing.view.focus();
            });
            return dropdownView;
        };
        // Register `resizeImage` dropdown and add `imageResize` dropdown as an alias for backward compatibility.
        editor.ui.componentFactory.add('resizeImage', componentCreator);
        editor.ui.componentFactory.add('imageResize', componentCreator);
    }
    /**
     * A helper function for creating an option label value string.
     *
     * @param option A resize option object.
     * @param forTooltip An optional flag for creating a tooltip label.
     * @returns A user-defined label combined from the numeric value and the resize unit or the default label
     * for reset options (`Original`).
     */
    _getOptionLabelValue(option, forTooltip = false) {
        const t = this.editor.t;
        if (option.label) {
            return option.label;
        }
        else if (forTooltip) {
            if (option.value) {
                return t('Resize image to %0', option.value + this._resizeUnit);
            }
            else {
                return t('Resize image to the original size');
            }
        }
        else {
            if (option.value) {
                return option.value + this._resizeUnit;
            }
            else {
                return t('Original');
            }
        }
    }
    /**
     * A helper function that parses the resize options and returns list item definitions ready for use in the dropdown.
     *
     * @param options The resize options.
     * @param command The resize image command.
     * @returns Dropdown item definitions.
     */
    _getResizeDropdownListItemDefinitions(options, command) {
        const itemDefinitions = new Collection();
        options.map(option => {
            const optionValueWithUnit = option.value ? option.value + this._resizeUnit : null;
            const definition = {
                type: 'button',
                model: new ViewModel({
                    commandName: 'resizeImage',
                    commandValue: optionValueWithUnit,
                    label: this._getOptionLabelValue(option),
                    role: 'menuitemradio',
                    withText: true,
                    icon: null
                })
            };
            definition.model.bind('isOn').to(command, 'value', getIsOnButtonCallback(optionValueWithUnit));
            itemDefinitions.add(definition);
        });
        return itemDefinitions;
    }
}
/**
 * A helper function for setting the `isOn` state of buttons in value bindings.
 */
function getIsOnButtonCallback(value) {
    return (commandValue) => {
        const objectCommandValue = commandValue;
        if (value === null && objectCommandValue === value) {
            return true;
        }
        return objectCommandValue !== null && objectCommandValue.width === value;
    };
}
