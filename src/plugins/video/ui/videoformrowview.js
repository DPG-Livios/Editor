/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { View } from 'ckeditor5/src/ui';
import './../theme/videoformrowview.css';
/**
 * The class representing a single row in a complex form,
 * used by {@link module:image/imageinsert/ui/imageinsertpanelview~ImageInsertPanelView}.
 *
 * **Note**: For now this class is private. When more use cases appear (beyond `ckeditor5-table` and `ckeditor5-image`),
 * it will become a component in `ckeditor5-ui`.
 *
 * @private
 */
export default class VideoFormRowView extends View {
    /**
     * Creates an instance of the form row class.
     *
     * @param locale The locale instance.
     * @param options.labelView When passed, the row gets the `group` and `aria-labelledby`
     * DOM attributes and gets described by the label.
     */
    constructor(locale, options = {}) {
        super(locale);
        const bind = this.bindTemplate;
        this.set('class', options.class || null);
        this.children = this.createCollection();
        if (options.children) {
            options.children.forEach(child => this.children.add(child));
        }
        this.set('_role', null);
        this.set('_ariaLabelledBy', null);
        if (options.labelView) {
            this.set({
                _role: 'group',
                _ariaLabelledBy: options.labelView.id
            });
        }
        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-form__row',
                    bind.to('class')
                ],
                role: bind.to('_role'),
                'aria-labelledby': bind.to('_ariaLabelledBy')
            },
            children: this.children
        });
    }
}
