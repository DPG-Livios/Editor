import { Command } from '@ckeditor/ckeditor5-core';

export default class IframeCommand extends Command {

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection.getFirstPosition().parent;
        console.log(selection)
        this.isEnabled = true;
        this.value = selection.name == "iframe";
    }

    execute({src, width, height}) {
        const model = this.editor.model;
        var style = 'width: '+width+'; height: '+height;
        console.info(src, width, height, style)
        model.change(writer => {
            const iframeElement = writer.createElement('iframe', 
            { 
                src: src, 
                style: style,
                width: width,
                height: height
            });
			
            model.insertContent(iframeElement );
        });
    }
}