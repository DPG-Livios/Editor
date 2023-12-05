import CKEditor from './ckeditor';

CKEditor.create(document.querySelector('#' + "id") as HTMLElement, {
    // toolbar: ['undo', 'redo',
    //     '|', 'bold', 'italic', 'subscript', 'superscript',
    //     '|', 'outdent', 'indent', 'bulletedList', 'numberedList',
    //     '|', 'link', 'mediaEmbed', 'specialcharacters', 'pastefromoffice', 'anchor'],
    // mediaEmbed: { previewsInData: true },
    //language: language,
    //isReadOnly: disabled
})

//import './translations/fr.js';

/*var _editors = new Array();

export function init(id, language, disabled, inst) {
    _editors[id] = new ckEditor(id, language, disabled, inst);
}

export function setData(id, data) {
    _editors[id].setData(data);
}
export function setReadOnlyMode(id, disabled) {
    _editors[id].setReadOnlyMode(disabled);
}

class ckEditor {

    editor;
    instance;
    
    constructor(id, language, disabled, inst) {
        var that = this;
        that.instance = inst;
        CKEditor.create(document.querySelector('#' + id) as HTMLElement, {
            // toolbar: ['undo', 'redo',
            //     '|', 'bold', 'italic', 'subscript', 'superscript',
            //     '|', 'outdent', 'indent', 'bulletedList', 'numberedList',
            //     '|', 'link', 'mediaEmbed', 'specialcharacters', 'pastefromoffice', 'anchor'],
            // mediaEmbed: { previewsInData: true },
            language: language,
            //isReadOnly: disabled
        })
        .then(e => {
            that.editor = e;
            that.editor.model.document.on('change:data', () => {
                that.instance.invokeMethodAsync('OnTextChanged', that.editor.plugins.get('WordCount')._getText());
                that.instance.invokeMethodAsync('OnValueChanged', that.editor.getData());
            });
        })
        .catch((error) => {
            const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

            const message = [
                'Oops, something went wrong!',
                `Please, report the following error on ${issueUrl} with the build id "y20w2tflmd55-do5q4gutap8d" and the error stack trace:`
            ].join('\n');

            console.error(message);
            console.error(error);
        });

    }

    

    public setData (data) {
        this.editor.setData(data);
    };

    public setReadOnlyMode (disabled) {
        if (disabled) {
            this.editor.enableReadOnlyMode("id");
        } else {
            this.editor.disableReadOnlyMode("id");
        };
    };
}*/