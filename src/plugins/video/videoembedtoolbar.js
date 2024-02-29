/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module media-embed/mediaembedtoolbar
 */
import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { getSelectedMediaViewWidget } from './utils';
/**
 * The media embed toolbar plugin. It creates a toolbar for media embed that shows up when the media element is selected.
 *
 * Instances of toolbar components (e.g. buttons) are created based on the
 * {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#toolbar `media.toolbar` configuration option}.
 */
export default class VideoEmbedToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [WidgetToolbarRepository];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'VideoEmbedToolbar';
    }
    /**
     * @inheritDoc
     */
    afterInit() {
        const editor = this.editor;
        const t = editor.t;
        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
        widgetToolbarRepository.register('video', {
            ariaLabel: t('Media toolbar'),
            items: editor.config.get('video.toolbar') || [],
            getRelatedElement: getSelectedMediaViewWidget
        });
    }
}
