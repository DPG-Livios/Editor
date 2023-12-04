/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Bold, Italic, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import {
	SpecialCharacters,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
//import { Anchor } from '@ckeditor/ckeditor5-anchor/src/anchor';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	builtinPlugins = [
		AutoLink,
		Bold,
		Essentials,
		Heading,
		Image,
		ImageCaption,
		Indent,
		Italic,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		SpecialCharacters,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersText,
		Subscript,
		Superscript,
		WordCount,
		//Anchor
	];

	defaultConfig = {
		toolbar: {
			items: [
				'bold',
				'italic',
				'subscript',
				'superscript',
				'specialCharacters',
				'bulletedList',
				'numberedList',
				'|',
				'link',
				'mediaEmbed',
				'|',
				'outdent',
				'indent',
				'|',
				'undo',
				'redo',
				//'anchor'
			]
		},
		language: 'nl'
	};
}

export default Editor;
