/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { isWidget, toWidget } from 'ckeditor5/src/widget';
/**
 * Converts a given {@link module:engine/view/element~Element} to a media embed widget:
 * * Adds a {@link module:engine/view/element~Element#_setCustomProperty custom property} allowing to recognize the media widget element.
 * * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
 *
 * @param writer An instance of the view writer.
 * @param label The element's label.
 */
export function toMediaWidget(viewElement, writer, label) {
    writer.setCustomProperty('media', true, viewElement);
    return toWidget(viewElement, writer, { label });
}
/**
 * Returns a media widget editing view element if one is selected.
 */
export function getSelectedMediaViewWidget(selection) {
    const viewElement = selection.getSelectedElement();
    if (viewElement && isMediaWidget(viewElement)) {
        return viewElement;
    }
    return null;
}
/**
 * Checks if a given view element is a media widget.
 */
export function isMediaWidget(viewElement) {
    return !!viewElement.getCustomProperty('media') && isWidget(viewElement);
}
/**
 * Creates a view element representing the media. Either a "semantic" one for the data pipeline:
 *
 * ```html
 * <figure class="media">
 * 	<oembed url="foo"></oembed>
 * </figure>
 * ```
 *
 * or a "non-semantic" (for the editing view pipeline):
 *
 * ```html
 * <figure class="media">
 * 	<div data-oembed-url="foo">[ non-semantic media preview for "foo" ]</div>
 * </figure>
 * ```
 */
export function createVideoElement(writer, registry, url, options) {
    return writer.createContainerElement('video', { class: 'ratio ratio-16x9', controls:'' }, [
        registry.getMediaViewElement(writer, url, options),
        writer.createSlot()
    ]);
}
/**
 * Returns a selected media element in the model, if any.
 */
export function getSelectedVideoWidget(selection) {
    const selectedElement = selection.getSelectedElement();
    if (selectedElement && selectedElement.is('element', 'video')) {
        return selectedElement;
    }
    return null;
}
/**
 * Creates a media element and inserts it into the model.
 *
 * **Note**: This method will use {@link module:engine/model/model~Model#insertContent `model.insertContent()`} logic of inserting content
 * if no `insertPosition` is passed.
 *
 * @param url An URL of an embeddable media.
 * @param findOptimalPosition If true it will try to find optimal position to insert media without breaking content
 * in which a selection is.
 */
export function insertVideo(model, title, description, webm, mp4, selectable, findOptimalPosition) {
    model.change(modelWriter => {

        // Create source elements and append them to the video element
        const sourceElement1 = modelWriter.createElement('source', {
            src: webm ,
            type: 'video/webm',
        });
        const sourceElement2 = modelWriter.createElement('source', {
            src: mp4,
            type: 'video/mp4',
        });
        const videoElement = modelWriter.createElement('video', {
            class: 'ratio ratio-16x9',
            'data-title': title,
            'data-description': description,
            //source: [sourceElement1, sourceElement2]
            //controls: '',
        });
        modelWriter.append(sourceElement1, videoElement);
        modelWriter.append(sourceElement2, videoElement);
        
        
            model.insertContent(videoElement);
        
        /*
        model.insertObject(videoElement, selectable, null, {
            setSelection: 'on',
            findOptimalPosition: findOptimalPosition ? 'auto' : undefined
        });*/
    });
}
