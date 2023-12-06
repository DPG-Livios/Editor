declare class ClassicEditor extends ClassicEditorBase {
}
declare namespace ClassicEditor {
    const builtinPlugins: (typeof AutoLink | typeof Bold | typeof Essentials | typeof Heading | typeof Image | typeof ImageCaption | typeof Indent | typeof Italic | typeof Link | typeof List | typeof MediaEmbed | typeof Paragraph | typeof PasteFromOffice | typeof SpecialCharacters | typeof SpecialCharactersCurrency | typeof SpecialCharactersEssentials | typeof SpecialCharactersText | typeof Subscript | typeof Superscript | typeof WordCount)[];
    namespace defaultConfig {
        namespace toolbar {
            const items: string[];
        }
        const language: string;
        namespace mediaEmbed {
            const previewsInData: boolean;
        }
    }
}
export default ClassicEditor;
import { ClassicEditor as ClassicEditorBase } from "@ckeditor/ckeditor5-editor-classic";
import { AutoLink } from "@ckeditor/ckeditor5-link";
import { Bold } from "@ckeditor/ckeditor5-basic-styles";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Image } from "@ckeditor/ckeditor5-image";
import { ImageCaption } from "@ckeditor/ckeditor5-image";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { SpecialCharacters } from "@ckeditor/ckeditor5-special-characters";
import { SpecialCharactersCurrency } from "@ckeditor/ckeditor5-special-characters";
import { SpecialCharactersEssentials } from "@ckeditor/ckeditor5-special-characters";
import { SpecialCharactersText } from "@ckeditor/ckeditor5-special-characters";
import { Subscript } from "@ckeditor/ckeditor5-basic-styles";
import { Superscript } from "@ckeditor/ckeditor5-basic-styles";
import { WordCount } from "@ckeditor/ckeditor5-word-count";
