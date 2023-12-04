ClassicEditor
    .create(document.querySelector('.editor'), {
        toolbar: ['undo', 'redo',
            '|', 'bold', 'italic', 'subscript', 'superscript',
            '|', 'outdent', 'indent', 'bulletedList', 'numberedList',
            '|', 'link', 'mediaEmbed', 'specialcharacters', 'pastefromoffice'],
        mediaEmbed: { previewsInData: true },
        language: "nl-BE"
    })
	.then( editor => {
		window.editor = editor;
	} )
    .catch((error) => {
        const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

        const message = [
            'Oops, something went wrong!',
            `Please, report the following error on ${issueUrl} with the build id "y20w2tflmd55-do5q4gutap8d" and the error stack trace:`
        ].join('\n');

        console.error(message);
        console.error(error);
    });