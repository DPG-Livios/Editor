/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import IframeEditing from './iframeediting';
import IframeUI from './iframeui';

export default class Iframe extends Plugin {
	static get requires() {
		return [ IframeEditing, IframeUI ];
	}
}