/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import SchemaEditing from './schemaediting';
import SchemaUI from './schemaui';

export default class Schema extends Plugin {
	static get requires() {
		return [ SchemaEditing, SchemaUI ];
	}
}