import {add} from '@ckeditor/ckeditor5-utils/src/translation-service';

export function getLocalizedOptions(editor) {
    const t = editor.t;

    add( 'fr', {
        'Title': [ 'Titre' ]
    } );
    add( 'nl', {
        'Title': [ 'Titel' ]
    } );

    const translateVariableKey = editor.locale.t;
    const localizedTitles = {
        'Paragraph': t('Paragraph'),
        'Heading 1': t('Heading 1'),
        'Heading 2': t('Heading 2'),
        'Heading 3': t('Heading 3'),
        'Heading 4': t('Heading 4'),
        'Heading 5': t('Heading 5'),
        'Heading 6': t('Heading 6')
    };
    return editor.config.get('heading.options').map(option => {
        const title = localizedTitles[option.title];
        if (title && title != option.title) {
            option.title = title;
        }else{
            option.title = translateVariableKey(option.title);
        }
        return option;
    });
}