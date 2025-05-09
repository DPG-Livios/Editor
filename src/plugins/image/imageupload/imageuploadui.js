/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { IconImage } from 'ckeditor5/src/icons';
import { FileDialogButtonView } from 'ckeditor5/src/ui';
import { createImageTypeRegExp } from './utils';
/**
 * The image upload button plugin.
 *
 * For a detailed overview, check the {@glink features/images/image-upload/image-upload Image upload feature} documentation.
 *
 * Adds the `'uploadImage'` button to the {@link module:ui/componentfactory~ComponentFactory UI component factory}
 * and also the `imageUpload` button as an alias for backward compatibility.
 */
export default class ImageUploadUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'ImageUploadUI';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;
        const componentCreator = (locale) => {
            const view = new FileDialogButtonView(locale);
            const command = editor.commands.get('uploadImage');
            const imageTypes = editor.config.get('image.upload.types');
            const imageTypesRegExp = createImageTypeRegExp(imageTypes);
            view.set({
                acceptedType: imageTypes.map(type => `image/${type}`).join(','),
                allowMultipleFiles: true
            });
            view.buttonView.set({
                label: 'Afbeelding toevoegen',
                icon: IconImage,
                tooltip: true
            });
            view.buttonView.bind('isEnabled').to(command);
            view.on('done', (evt, files) => {
                const imagesToUpload = Array.from(files).filter(file => imageTypesRegExp.test(file.type));
                if (imagesToUpload.length) {
                    editor.execute('uploadImage', { file: imagesToUpload });
                    editor.editing.view.focus();
                }
            });
            return view;
        };
        // Setup `uploadImage` button and add `imageUpload` button as an alias for backward compatibility.
        editor.ui.componentFactory.add('uploadImage', componentCreator);
        editor.ui.componentFactory.add('imageUpload', componentCreator);
    }
}
