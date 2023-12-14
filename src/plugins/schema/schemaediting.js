/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import SchemaCommand from './schemacommand.js';	

export default class SchemaEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();
        
        this.editor.commands.add(
            'addSchema', new SchemaCommand(this.editor)
        );
	}
	_defineSchema() {
		const schema = this.editor.model.schema;

		// Define the schema attribute
        schema.extend('$text', { allowAttributes: 'data-schemaorg' });
        schema.extend('$block', { allowAttributes: 'data-schemaorg' });
	}

	_defineConverters() {
		const conversion = this.editor.conversion;
		
        conversion.for('upcast').attributeToAttribute({
            view: 'data-schemaorg',
            model: 'data-schemaorg'
        });
        
        // Downcast converter
        conversion.for('downcast').attributeToAttribute({
            model: 'data-schemaorg',
            view: 'data-schemaorg'
        });
	}
}
