import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

import { Bold, Italic, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Heading } from './plugins/heading';
import { Image, ImageInsert } from './plugins/image';
import { AutoLink, Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import {
	SpecialCharacters,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
import Anchor from './plugins/anchor/anchor.js';
import UploadImage from './plugins/upload/image.js';
import Faq from './plugins/faq/faq.js';
import Schema from './plugins/schema/schema.js';
import Iframe from './plugins/iframe/iframe.js';
import Tip from './plugins/tip/tip.js';
import { Video } from './plugins/video/video.js';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';

export default class Editor extends ClassicEditorBase {}

Object.assign( window.CKEDITOR_TRANSLATIONS[ 'nl' ].dictionary, {
    'Insert media': 'Media toevoegen'
} );

Editor.builtinPlugins = [
	AutoLink,
	BlockQuote,
	Bold,
	Essentials,
	FindAndReplace,
	Heading,
	Image,
	ImageInsert,
	// ImageUpload,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	ShowBlocks,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersText,
	Subscript,
	Superscript,
	Table,
	TableToolbar,
	Undo,
	WordCount,
	Faq, Schema, Iframe,
	Anchor,
	UploadImage, Tip,
	GeneralHtmlSupport,
	Video
];

Editor.defaultConfig = {
	htmlSupport: {	
		allow: [
			{
				name : 'a',
				attributes: {
					'data-categoryid' : true,
					'data-article' : true,
					'localLink' : true
				}
			}
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			// { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'H2 titel', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'H3 titel', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'H4 titel', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'H5 titel', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'H6 titel', class: 'ck-heading_heading6' }
		]
	},
	toolbar: {
		items: [
			'undo', 'redo',
			'|', 'heading',
			'|', 'bold', 'italic', 'subscript', 'superscript', 'bulletedList', 'numberedList', 'blockQuote',
			'|', 'link', 'imageUpload', 'insertTable', /*'mediaEmbed',*/ 'video', 'imageInsert', 'specialCharacters',
			'|', 'sourceEditing', 'removeFormat', 'showBlocks',
			'|', 'findAndReplace',
			'|', 'anchor', 'faq', 'schema', 'iframe', 'tip'
		]
	},
	language: 'nl',
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
};

window.Editor = Editor;