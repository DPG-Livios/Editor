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
            inheritAllFrom: '$blockObject',
            isSelectable: true,
            allowAttributes: ['class', 'data-title', 'data-description', 'controls'],
            allowContent: 'source',
        });
        editor.model.schema.register('source', {
            inheritAllFrom: '$blockObject',
            isSelectable: true,
            allowAttributes: ['src', 'type'],
            allowWhere: 'video'
        });
        // Define a conversion for upcasting
        editor.conversion.for('upcast').elementToElement({
            view: 'video',
            model: (viewElement, { writer }) => {                
                const title = viewElement.getAttribute('data-title') || '';
                const description = viewElement.getAttribute('data-description') || '';

                const videoElement = writer.createElement('video', {
                    class: viewElement.getAttribute('class'),
                    'data-title': title,
                    'data-description': description,
                    controls: viewElement.hasAttribute('controls'),
                });

                Array.from(viewElement.getChildren('source'))
                .forEach(child => {
                    var sourceElement = writer.createElement('source', 
                    {
                        src: child.getAttribute('src'),
                        type: child.getAttribute('type'),
                    });
                    writer.append(sourceElement, videoElement); 
                }) 
                
                return videoElement;
            },
        });
        // Define a conversion for upcasting
        editor.conversion.for('upcast').elementToElement({
            view: 'source',
            model: (viewElement, { writer }) => {
                const sourceElement = writer.createElement('source', {
                    src: viewElement.getAttribute('src'),
                    type: viewElement.getAttribute('type')
                });

                return sourceElement;
            },
        });

        // Define a conversion for downcasting
        editor.conversion.for('downcast').elementToElement({
            model: 'video',
            view: (modelElement, { writer }) => {
                const title = modelElement.getAttribute('data-title') || '';
                const description = modelElement.getAttribute('data-description') || '';
                
                const videoElement = writer.createContainerElement('video', {
                    class: modelElement.getAttribute('class'),
                    'data-title': title,
                    'data-description': description,
                    controls: '',
                });

                return videoElement;
            },
        });
        // Define a conversion for downcasting
        editor.conversion.for('downcast').elementToElement({
            model: 'source',
            view: (modelElement, { writer }) => {
                return writer.createContainerElement('source', {
                    src: modelElement.getAttribute('src'),
                    type: modelElement.getAttribute('type'),
                });
            },
        });
    }
}