/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Command } from 'ckeditor5/src/core';
import { findOptimalInsertionRange } from 'ckeditor5/src/widget';
import { getSelectedVideoWidget, insertVideo } from './utils';
/**
 * The insert media command.
 *
 * The command is registered by the {@link module:media-embed/mediaembedediting~MediaEmbedEditing} as `'mediaEmbed'`.
 *
 * To insert media at the current selection, execute the command and specify the URL:
 *
 * ```ts
 * editor.execute( 'mediaEmbed', 'http://url.to.the/media' );
 * ```
 */
export default class VideoEmbedCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const selectedMedia = getSelectedVideoWidget(selection);
        this.title = selectedMedia ? selectedMedia.getAttribute('data-title') : undefined;
        this.description = selectedMedia ? selectedMedia.getAttribute('data-description') : undefined;
        this.set('webm', selectedMedia ?  Array.from(selectedMedia.getChildren()).find(child => child.getAttribute('type') === 'video/webm')?.getAttribute('src') : undefined);
        this.set('mp4', selectedMedia ?  Array.from(selectedMedia.getChildren()).find(child => child.getAttribute('type') === 'video/mp4')?.getAttribute('src') : undefined);
        this.isEnabled = isVideoSelected(selection) || isAllowedInParent(selection, model);
    }
    /**
     * Executes the command, which either:
     *
     * * updates the URL of the selected media,
     * * inserts the new media into the editor and puts the selection around it.
     *
     * @fires execute
     * @param url The URL of the media.
     */
    execute(title, description, webm, mp4) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const selectedVideo = getSelectedVideoWidget(selection);
        if (selectedVideo) {
            console.log(selectedVideo)
            model.change(writer => {
                writer.setAttribute('data-title', title, selectedVideo);
                writer.setAttribute('data-description', description, selectedVideo);
                // Remove existing source elements
                Array.from(selectedVideo.getChildren()).forEach(child => {
                    writer.remove(child);
                });
                
                // Create source elements and append them to the video element
                const sourceElement1 = writer.createElement('source', {
                    src: webm ,
                    type: 'video/webm',
                });
                const sourceElement2 = writer.createElement('source', {
                    src: mp4,
                    type: 'video/mp4',
                });
                writer.append(sourceElement1, selectedVideo);
                writer.append(sourceElement2, selectedVideo);
            });
        }
        else {
            insertVideo(model, title, description, webm, mp4, selection, true);
        }
    }
}
/**
 * Checks if the media embed is allowed in the parent.
 */
function isAllowedInParent(selection, model) {
    const insertionRange = findOptimalInsertionRange(selection, model);
    let parent = insertionRange.start.parent;
    // The model.insertContent() will remove empty parent (unless it is a $root or a limit).
    if (parent.isEmpty && !model.schema.isLimit(parent)) {
        parent = parent.parent;
    }
    return model.schema.checkChild(parent, 'video');
}
/**
 * Checks if the media object is selected.
 */
function isVideoSelected(selection) {
    const element = selection.getSelectedElement();
    return !!element && element.name === 'video';
}
