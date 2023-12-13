/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export default class IframeEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();
	}
	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'iframe', {
			allowAttributes: [ 'src', 'style' ],
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );
	}
	_defineConverters() {
		const conversion = this.editor.conversion;
		
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

        conversion.for('downcast').elementToElement({
            model: 'iframe',
            view: (modelElement, { writer }) => {
                const style = `width: ${modelElement.getAttribute('style').width}; height: ${modelElement.getAttribute('style').height}`;
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
                return toWidget(writer, modelElement, 'iframe');
            }
        });




	}
}
