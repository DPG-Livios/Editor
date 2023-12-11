/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

import { Bold, Italic, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Image, ImageInsert, ImageUpload, ImageCaption } from '@ckeditor/ckeditor5-image';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import {
	SpecialCharacters,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
import Anchor from './plugins/anchor/anchor.js';
import UploadImage from './plugins/upload/image.js';
import Faq from './plugins/faq/faq.js';
import Schema from './plugins/schema/schema.js';
import Iframe from './plugins/iframe/iframe.js';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';


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
		UploadImage,
		FindAndReplace,
		Image,
		ImageInsert,
		ImageUpload,
		Paragraph,
		ShowBlocks,
		Faq, Schema, Iframe,
		SourceEditing
	];

	ClassicEditor.defaultConfig = {
		toolbar: {
			items: ['undo', 'redo',
			     '|', 'bold', 'italic', 'subscript', 'superscript',
			     '|', 'outdent', 'indent', 'bulletedList', 'numberedList',
			     '|', 'imageUpload', 'uploadImage', 'insertImage', 'showBlocks',
			     '|', 'link', 'findAndReplace',  'mediaEmbed', 'specialcharacters', 'pastefromoffice', 
				 '|', 'anchor', 'faq', 'schema', 'iframe',
				 '|', 'sourceEditing']
		},
		language: 'nl',
		mediaEmbed: { previewsInData: true }
	};
