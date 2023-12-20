import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

import { Bold, Italic, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageInsert, ImageUpload } from '@ckeditor/ckeditor5-image';
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

export default class Editor extends ClassicEditorBase { }

Editor.builtinPlugins = [
	AutoLink,
	BlockQuote,
	Bold,
	Essentials,
	FindAndReplace,
	Heading,
	Image,
	ImageInsert,
	ImageUpload,
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
	UploadImage,
];

Editor.defaultConfig = {
	toolbar: {
		items: [
			'undo', 'redo',
			'|', 'heading',
			'|', 'bold', 'italic', 'subscript', 'superscript', 'bulletedList', 'numberedList', 'blockQuote',
			'|', 'link', 'imageUpload', 'insertTable', 'mediaEmbed', 'imageInsert', 'specialCharacters',
			'|', 'sourceEditing', 'removeFormat', 'showBlocks',
			'|', 'findAndReplace',
			'|', 'anchor', 'faq', 'schema', 'iframe'
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