/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

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
import Anchor from './plugins/anchor/anchor.js';
import UploadImage from './plugins/upload/image.js';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
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
	    Anchor,
		UploadImage
	];

	ClassicEditor.defaultConfig = {
		toolbar: {
			items: ['undo', 'redo',
			     '|', 'bold', 'italic', 'subscript', 'superscript',
			     '|', 'outdent', 'indent', 'bulletedList', 'numberedList',
			     '|', 'link', 'mediaEmbed', 'specialcharacters', 'pastefromoffice', 'anchor', 'insertImage']
		},
		language: 'nl',
		mediaEmbed: { previewsInData: true }
	};
