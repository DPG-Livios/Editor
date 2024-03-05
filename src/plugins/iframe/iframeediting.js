/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';
import IframeCommand from './iframecommand.js';

export default class IframeEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

	init() {
		this._defineSchema();
		this._defineConverters();
        
        this.editor.commands.add(
            'addIframe', new IframeCommand(this.editor)
        );
	}
	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'iframe', {
			allowAttributes: [ 'src', 'style', 'width', 'height' ],
            isSelectable: true,
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );
	}
	_defineConverters() {
		const conversion= this.editor.conversion;
		
		conversion.for('upcast').elementToElement({
            model: 'iframe',
            view: {
                name: 'iframe',
                attributes: {
                    'style': /^width:\s*(\d+(px)?)?;\s*height:\s*(\d+(px)?)?;$/,
                    'src': true,
                    'frameborder': '0'
                }
            }
        });
        
        conversion.for('dataDowncast').elementToElement({
            model: 'iframe',
            view: (modelElement, { writer }) => {
                const style = `width: ${modelElement.getAttribute('width')}; height: ${modelElement.getAttribute('height')};padding:10px`;
                return writer.createAttributeElement('iframe', {
                    style,
                    src: modelElement.getAttribute('src'),
                    frameborder: '0'
                });
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: 'iframe',
            view: (modelElement, { writer }) => {
                const iframeView = writer.createContainerElement('iframe', {
                    class: 'ck-widget ck-widget-selected',
                    'style': modelElement.getAttribute('style'),
                    'src': modelElement.getAttribute('src'),
                    'frameborder': '0'
                });
    
                return toWidget(iframeView, writer, 'iframe');
            }
        });
	}
}
