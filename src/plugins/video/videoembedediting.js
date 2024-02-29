/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module media-embed/mediaembedediting
 */
import { Plugin } from 'ckeditor5/src/core';
import VideoEmbedCommand from './videoembedcommand';
import './theme/videoembedediting.css';
/**
 * The media embed editing feature.
 */
export default class VideoEmbedEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'VideoEmbedEditing';
    }
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        editor.commands.add('video', new VideoEmbedCommand(editor));
        // Configure the schema.
        editor.model.schema.register('video', {
            isObject: true,
            isBlock: true,
            allowWhere: '$block',
            allowAttributes: ['class', 'data-title', 'data-description', 'controls'],
            allowContent: 'source',
        });
        editor.conversion.for('upcast').elementToElement({
            view: 'video',
            model: (viewElement, modelWriter) => {
                const srcElements = viewElement.getChild('source');
                const srcs = srcElements.map(srcElement => srcElement.getAttribute('src')).toArray();

                return modelWriter.createElement('video', {
                    class: viewElement.getAttribute('class'),
                    'data-title': viewElement.getAttribute('data-title'),
                    'data-description': viewElement.getAttribute('data-description'),
                    controls: viewElement.getAttribute('controls'),
                    src: srcs,
                });
            },
        });

        // Define a converter from the model to the view
        editor.conversion.for('dataDowncast').elementToElement({
            model: 'video',
            view: (modelElement, viewWriter) => {
                const video = viewWriter.createContainerElement('video', {
                    class: modelElement.getAttribute('class'),
                    'data-title': modelElement.getAttribute('data-title'),
                    'data-description': modelElement.getAttribute('data-description'),
                    controls: modelElement.getAttribute('controls'),
                });

                modelElement.getAttributeKeys().forEach(key => {
                    if (key.startsWith('data-')) {
                        video.setAttribute(key, modelElement.getAttribute(key));
                    }
                });

                modelElement.getChild('src').forEach(child => {
                    const src = viewWriter.createAttributeElement('source', {
                        src: child.getAttribute('src'),
                        type: child.getAttribute('type'),
                    });
                    viewWriter.insert(video, viewWriter.createPositionAt(video, 'end'), src);
                });

                return toWidget(video, viewWriter, { label: 'video widget' });
            },
        });
    }
}