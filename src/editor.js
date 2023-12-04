import Editor from './ckeditor.js';
import './translations/fr.js';

var _editors = new Array();

export function init(id, language, disabled, inst) {
    _editors[id] = new ckEditor(id, language, disabled, inst);
}

export function setData(id, data) {
    _editors[id].setData(data);
}
export function setReadOnlyMode(id, disabled) {
    _editors[id].setReadOnlyMode(disabled);
}

function ckEditor(id, language, disabled, inst) {
    this.editor;
    this.instance = inst;

    var that = this;
    Editor
        .create(document.querySelector('#' + id), {
            toolbar: ['undo', 'redo',
                '|', 'bold', 'italic', 'subscript', 'superscript',
                '|', 'outdent', 'indent', 'bulletedList', 'numberedList',
                '|', 'link', 'mediaEmbed', 'specialcharacters', 'pastefromoffice', 'anchor'],
            mediaEmbed: { previewsInData: true },
            language: language,
            isReadOnly: disabled
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

    this.setData = function (data) {
        this.editor.setData(data);
    };

    this.setReadOnlyMode = function (disabled) {
        if (disabled) {
            this.editor.enableReadOnlyMode("id");
        } else {
            this.editor.disableReadOnlyMode("id");
        };
    };
}