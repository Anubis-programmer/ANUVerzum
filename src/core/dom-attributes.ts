import { AnuNode, AnuCSSProperties, Ref } from './elements';

export type AnuEventHandler<E extends Event, T> = (event: E & { currentTarget: T }) => void;

export type ClipboardEventHandler<T> = AnuEventHandler<ClipboardEvent, T>;
export type CompositionEventHandler<T> = AnuEventHandler<CompositionEvent, T>;
export type DragEventHandler<T> = AnuEventHandler<DragEvent, T>;
export type FocusEventHandler<T> = AnuEventHandler<FocusEvent, T>;
export type FormEventHandler<T> = AnuEventHandler<Event, T>;
export type InputEventHandler<T> = AnuEventHandler<InputEvent, T>;
export type SubmitEventHandler<T> = AnuEventHandler<SubmitEvent, T>;
export type KeyboardEventHandler<T> = AnuEventHandler<KeyboardEvent, T>;
export type MouseEventHandler<T> = AnuEventHandler<MouseEvent, T>;
export type PointerEventHandler<T> = AnuEventHandler<PointerEvent, T>;
export type TouchEventHandler<T> = AnuEventHandler<TouchEvent, T>;
export type UIEventHandler<T> = AnuEventHandler<UIEvent, T>;
export type WheelEventHandler<T> = AnuEventHandler<WheelEvent, T>;
export type AnimationEventHandler<T> = AnuEventHandler<AnimationEvent, T>;
export type TransitionEventHandler<T> = AnuEventHandler<TransitionEvent, T>;
export type GenericEventHandler<T> = AnuEventHandler<Event, T>;

export type Booleanish = boolean | 'true' | 'false';
export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export type HTMLAttributeReferrerPolicy =
    | ''
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';

export type HTMLAttributeAnchorTarget = '_self' | '_blank' | '_parent' | '_top' | (string & {});

export type AriaRole =
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'button'
    | 'cell'
    | 'checkbox'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'feed'
    | 'figure'
    | 'form'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem'
    | (string & {});

export interface AriaAttributes {
    'aria-activedescendant'?: string;
    'aria-atomic'?: Booleanish;
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    'aria-busy'?: Booleanish;
    'aria-checked'?: Booleanish | 'mixed';
    'aria-colcount'?: number;
    'aria-colindex'?: number;
    'aria-colspan'?: number;
    'aria-controls'?: string;
    'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-disabled'?: Booleanish;
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    'aria-errormessage'?: string;
    'aria-expanded'?: Booleanish;
    'aria-flowto'?: string;
    'aria-grabbed'?: Booleanish;
    'aria-haspopup'?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-hidden'?: Booleanish;
    'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
    'aria-keyshortcuts'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-level'?: number;
    'aria-live'?: 'off' | 'assertive' | 'polite';
    'aria-modal'?: Booleanish;
    'aria-multiline'?: Booleanish;
    'aria-multiselectable'?: Booleanish;
    'aria-orientation'?: 'horizontal' | 'vertical';
    'aria-owns'?: string;
    'aria-placeholder'?: string;
    'aria-posinset'?: number;
    'aria-pressed'?: Booleanish | 'mixed';
    'aria-readonly'?: Booleanish;
    'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals';
    'aria-required'?: Booleanish;
    'aria-roledescription'?: string;
    'aria-rowcount'?: number;
    'aria-rowindex'?: number;
    'aria-rowspan'?: number;
    'aria-selected'?: Booleanish;
    'aria-setsize'?: number;
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    'aria-valuemax'?: number;
    'aria-valuemin'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
}

export interface DOMAttributes<T> {
    children?: AnuNode;
    ref?: Ref<any> | null;
    key?: string | number | null;

    onCopy?: ClipboardEventHandler<T>;
    onCut?: ClipboardEventHandler<T>;
    onPaste?: ClipboardEventHandler<T>;

    onCompositionEnd?: CompositionEventHandler<T>;
    onCompositionStart?: CompositionEventHandler<T>;
    onCompositionUpdate?: CompositionEventHandler<T>;

    onFocus?: FocusEventHandler<T>;
    onBlur?: FocusEventHandler<T>;
    onFocusIn?: FocusEventHandler<T>;
    onFocusOut?: FocusEventHandler<T>;

    onChange?: FormEventHandler<T>;
    onBeforeInput?: InputEventHandler<T>;
    onInput?: InputEventHandler<T>;
    onReset?: FormEventHandler<T>;
    onSubmit?: SubmitEventHandler<T>;
    onInvalid?: FormEventHandler<T>;

    onLoad?: GenericEventHandler<T>;
    onError?: GenericEventHandler<T>;

    onKeyDown?: KeyboardEventHandler<T>;
    onKeyPress?: KeyboardEventHandler<T>;
    onKeyUp?: KeyboardEventHandler<T>;

    onAbort?: GenericEventHandler<T>;
    onCanPlay?: GenericEventHandler<T>;
    onCanPlayThrough?: GenericEventHandler<T>;
    onDurationChange?: GenericEventHandler<T>;
    onEmptied?: GenericEventHandler<T>;
    onEncrypted?: GenericEventHandler<T>;
    onEnded?: GenericEventHandler<T>;
    onLoadedData?: GenericEventHandler<T>;
    onLoadedMetadata?: GenericEventHandler<T>;
    onLoadStart?: GenericEventHandler<T>;
    onPause?: GenericEventHandler<T>;
    onPlay?: GenericEventHandler<T>;
    onPlaying?: GenericEventHandler<T>;
    onProgress?: GenericEventHandler<T>;
    onRateChange?: GenericEventHandler<T>;
    onSeeked?: GenericEventHandler<T>;
    onSeeking?: GenericEventHandler<T>;
    onStalled?: GenericEventHandler<T>;
    onSuspend?: GenericEventHandler<T>;
    onTimeUpdate?: GenericEventHandler<T>;
    onVolumeChange?: GenericEventHandler<T>;
    onWaiting?: GenericEventHandler<T>;

    onAuxClick?: MouseEventHandler<T>;
    onClick?: MouseEventHandler<T>;
    onContextMenu?: MouseEventHandler<T>;
    onDoubleClick?: MouseEventHandler<T>;
    onMouseDown?: MouseEventHandler<T>;
    onMouseEnter?: MouseEventHandler<T>;
    onMouseLeave?: MouseEventHandler<T>;
    onMouseMove?: MouseEventHandler<T>;
    onMouseOut?: MouseEventHandler<T>;
    onMouseOver?: MouseEventHandler<T>;
    onMouseUp?: MouseEventHandler<T>;

    onDrag?: DragEventHandler<T>;
    onDragEnd?: DragEventHandler<T>;
    onDragEnter?: DragEventHandler<T>;
    onDragExit?: DragEventHandler<T>;
    onDragLeave?: DragEventHandler<T>;
    onDragOver?: DragEventHandler<T>;
    onDragStart?: DragEventHandler<T>;
    onDrop?: DragEventHandler<T>;

    onPointerDown?: PointerEventHandler<T>;
    onPointerMove?: PointerEventHandler<T>;
    onPointerUp?: PointerEventHandler<T>;
    onPointerCancel?: PointerEventHandler<T>;
    onPointerEnter?: PointerEventHandler<T>;
    onPointerLeave?: PointerEventHandler<T>;
    onPointerOver?: PointerEventHandler<T>;
    onPointerOut?: PointerEventHandler<T>;
    onGotPointerCapture?: PointerEventHandler<T>;
    onLostPointerCapture?: PointerEventHandler<T>;

    onTouchCancel?: TouchEventHandler<T>;
    onTouchEnd?: TouchEventHandler<T>;
    onTouchMove?: TouchEventHandler<T>;
    onTouchStart?: TouchEventHandler<T>;

    onScroll?: UIEventHandler<T>;
    onWheel?: WheelEventHandler<T>;

    onAnimationStart?: AnimationEventHandler<T>;
    onAnimationEnd?: AnimationEventHandler<T>;
    onAnimationIteration?: AnimationEventHandler<T>;
    onTransitionEnd?: TransitionEventHandler<T>;

    onSelect?: GenericEventHandler<T>;
    onToggle?: GenericEventHandler<T>;
}

export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Anu-specific naming (mirrors the DOM IDL property names the reconciler sets)
    className?: string;
    htmlFor?: string;
    style?: AnuCSSProperties;

    // Standard global HTML attributes
    accessKey?: string;
    autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | (string & {});
    autoFocus?: boolean;
    contentEditable?: Booleanish | 'inherit' | 'plaintext-only';
    contextMenu?: string;
    dir?: 'ltr' | 'rtl' | 'auto';
    draggable?: Booleanish;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    hidden?: boolean;
    id?: string;
    inert?: boolean;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    lang?: string;
    nonce?: string;
    role?: AriaRole;
    slot?: string;
    spellCheck?: Booleanish;
    tabIndex?: number;
    title?: string;
    translate?: 'yes' | 'no';

    // Popover
    popover?: '' | 'auto' | 'manual';
    popoverTarget?: string;
    popoverTargetAction?: 'toggle' | 'show' | 'hide';

    // RDFa / microdata
    about?: string;
    content?: string;
    datatype?: string;
    property?: string;
    rel?: string;
    resource?: string;
    typeof?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;

    // Living-standard extras
    is?: string;
    unselectable?: 'on' | 'off';

    [dataAttribute: `data-${string}`]: any;
}

export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    ping?: string;
    target?: HTMLAttributeAnchorTarget;
    type?: string;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
}

export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    coords?: string;
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    rel?: string;
    shape?: string;
    target?: string;
}

export type AudioHTMLAttributes<T> = MediaHTMLAttributes<T>;

export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
}

export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}

export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: 'submit' | 'reset' | 'button';
    value?: string | readonly string[] | number;
}

export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
}

export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
    width?: number | string;
}

export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
}

export interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | readonly string[] | number;
}

export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
    name?: string;
}

export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}

export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}

export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
}

export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    name?: string;
}

export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string;
    action?: string;
    autoComplete?: string;
    encType?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;
}

export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string;
}

export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string;
    allowFullScreen?: boolean;
    height?: number | string;
    loading?: 'eager' | 'lazy';
    name?: string;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    sandbox?: string;
    src?: string;
    srcDoc?: string;
    width?: number | string;
}

export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    crossOrigin?: CrossOrigin;
    decoding?: 'async' | 'auto' | 'sync';
    fetchPriority?: 'high' | 'low' | 'auto';
    height?: number | string;
    loading?: 'eager' | 'lazy';
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    sizes?: string;
    src?: string;
    srcSet?: string;
    useMap?: string;
    width?: number | string;
}

export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}

export type HTMLInputTypeAttribute =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | (string & {});

export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    alt?: string;
    autoComplete?: string;
    capture?: boolean | 'user' | 'environment';
    checked?: boolean;
    crossOrigin?: CrossOrigin;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxLength?: number;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: HTMLInputTypeAttribute;
    value?: string | readonly string[] | number;
    width?: number | string;
}

export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    challenge?: string;
    disabled?: boolean;
    form?: string;
    keyType?: string;
    keyParams?: string;
    name?: string;
}

export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
}

export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | readonly string[] | number;
}

export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string;
    crossOrigin?: CrossOrigin;
    fetchPriority?: 'high' | 'low' | 'auto';
    href?: string;
    hrefLang?: string;
    integrity?: string;
    media?: string;
    imageSrcSet?: string;
    imageSizes?: string;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    sizes?: string;
    type?: string;
    charSet?: string;
}

export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
}

export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
}

export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean;
    controls?: boolean;
    controlsList?: string;
    crossOrigin?: CrossOrigin;
    loop?: boolean;
    mediaGroup?: string;
    muted?: boolean;
    playsInline?: boolean;
    preload?: string;
    src?: string;
}

export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string;
    httpEquiv?: string;
    media?: string;
    name?: string;
}

export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | readonly string[] | number;
}

export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    useMap?: string;
    width?: number | string;
    wmode?: string;
}

export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean;
    start?: number;
    type?: '1' | 'a' | 'A' | 'i' | 'I';
}

export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
}

export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string | readonly string[] | number;
}

export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
    name?: string;
}

export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
    value?: string | readonly string[] | number;
}

export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string;
    value?: string | readonly string[] | number;
}

export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}

export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean;
    charSet?: string;
    crossOrigin?: CrossOrigin;
    defer?: boolean;
    integrity?: string;
    noModule?: boolean;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    src?: string;
    type?: string;
}

export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: string | readonly string[] | number;
}

export interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
}

export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    media?: string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    type?: string;
    width?: number | string;
}

export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    scoped?: boolean;
    type?: string;
}

export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right';
    bgcolor?: string;
    border?: number;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    frame?: boolean;
    rules?: 'none' | 'groups' | 'rows' | 'columns' | 'all';
    summary?: string;
    width?: number | string;
}

export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
    abbr?: string;
    height?: number | string;
    width?: number | string;
    valign?: 'top' | 'middle' | 'bottom' | 'baseline';
}

export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string;
    cols?: number;
    dirName?: string;
    disabled?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | readonly string[] | number;
    wrap?: string;
}

export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
    abbr?: string;
}

export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string;
}

export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srcLang?: string;
}

export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string;
    playsInline?: boolean;
    poster?: string;
    width?: number | string;
    disablePictureInPicture?: boolean;
    disableRemotePlayback?: boolean;
}

export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean;
    allowpopups?: boolean;
    autosize?: boolean;
    disablewebsecurity?: boolean;
    httpreferrer?: string;
    nodeintegration?: boolean;
    partition?: string;
    plugins?: boolean;
    preload?: string;
    src?: string;
    useragent?: string;
    webpreferences?: string;
}

// --- SVG ---

export type SVGAttributeNumber = number | string;

export interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    id?: string;
    lang?: string;
    tabIndex?: number;
    role?: AriaRole;
    style?: AnuCSSProperties;

    color?: string;
    height?: SVGAttributeNumber;
    max?: SVGAttributeNumber;
    media?: string;
    method?: string;
    min?: SVGAttributeNumber;
    name?: string;
    target?: string;
    type?: string;
    width?: SVGAttributeNumber;

    // SVG-specific presentation & geometry attributes (hyphenated names kept verbatim)
    'accent-height'?: SVGAttributeNumber;
    accumulate?: 'none' | 'sum';
    additive?: 'replace' | 'sum';
    'alignment-baseline'?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit';
    allowReorder?: 'no' | 'yes';
    alphabetic?: SVGAttributeNumber;
    amplitude?: SVGAttributeNumber;
    'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated';
    ascent?: SVGAttributeNumber;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: Booleanish;
    azimuth?: SVGAttributeNumber;
    baseFrequency?: SVGAttributeNumber;
    'baseline-shift'?: SVGAttributeNumber;
    baseProfile?: SVGAttributeNumber;
    bbox?: SVGAttributeNumber;
    begin?: SVGAttributeNumber;
    bias?: SVGAttributeNumber;
    by?: SVGAttributeNumber;
    calcMode?: SVGAttributeNumber;
    'cap-height'?: SVGAttributeNumber;
    clip?: SVGAttributeNumber;
    clipPath?: string;
    'clip-path'?: string;
    clipPathUnits?: SVGAttributeNumber;
    'clip-rule'?: SVGAttributeNumber;
    'color-interpolation'?: SVGAttributeNumber;
    'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
    'color-profile'?: SVGAttributeNumber;
    'color-rendering'?: SVGAttributeNumber;
    contentScriptType?: SVGAttributeNumber;
    contentStyleType?: SVGAttributeNumber;
    cursor?: SVGAttributeNumber;
    cx?: SVGAttributeNumber;
    cy?: SVGAttributeNumber;
    d?: string;
    decelerate?: SVGAttributeNumber;
    descent?: SVGAttributeNumber;
    diffuseConstant?: SVGAttributeNumber;
    direction?: SVGAttributeNumber;
    display?: SVGAttributeNumber;
    divisor?: SVGAttributeNumber;
    'dominant-baseline'?: SVGAttributeNumber;
    dur?: SVGAttributeNumber;
    dx?: SVGAttributeNumber;
    dy?: SVGAttributeNumber;
    edgeMode?: SVGAttributeNumber;
    elevation?: SVGAttributeNumber;
    'enable-background'?: SVGAttributeNumber;
    end?: SVGAttributeNumber;
    exponent?: SVGAttributeNumber;
    fill?: string;
    'fill-opacity'?: SVGAttributeNumber;
    'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    filterRes?: SVGAttributeNumber;
    filterUnits?: SVGAttributeNumber;
    'flood-color'?: SVGAttributeNumber;
    'flood-opacity'?: SVGAttributeNumber;
    focusable?: SVGAttributeNumber;
    'font-family'?: string;
    'font-size'?: SVGAttributeNumber;
    'font-size-adjust'?: SVGAttributeNumber;
    'font-stretch'?: SVGAttributeNumber;
    'font-style'?: SVGAttributeNumber;
    'font-variant'?: SVGAttributeNumber;
    'font-weight'?: SVGAttributeNumber;
    format?: SVGAttributeNumber;
    fr?: SVGAttributeNumber;
    from?: SVGAttributeNumber;
    fx?: SVGAttributeNumber;
    fy?: SVGAttributeNumber;
    g1?: SVGAttributeNumber;
    g2?: SVGAttributeNumber;
    'glyph-name'?: SVGAttributeNumber;
    'glyph-orientation-horizontal'?: SVGAttributeNumber;
    'glyph-orientation-vertical'?: SVGAttributeNumber;
    glyphRef?: SVGAttributeNumber;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: SVGAttributeNumber;
    'horiz-adv-x'?: SVGAttributeNumber;
    'horiz-origin-x'?: SVGAttributeNumber;
    href?: string;
    ideographic?: SVGAttributeNumber;
    'image-rendering'?: SVGAttributeNumber;
    in2?: SVGAttributeNumber;
    in?: string;
    intercept?: SVGAttributeNumber;
    k1?: SVGAttributeNumber;
    k2?: SVGAttributeNumber;
    k3?: SVGAttributeNumber;
    k4?: SVGAttributeNumber;
    k?: SVGAttributeNumber;
    kernelMatrix?: SVGAttributeNumber;
    kernelUnitLength?: SVGAttributeNumber;
    kerning?: SVGAttributeNumber;
    keyPoints?: SVGAttributeNumber;
    keySplines?: SVGAttributeNumber;
    keyTimes?: SVGAttributeNumber;
    lengthAdjust?: SVGAttributeNumber;
    'letter-spacing'?: SVGAttributeNumber;
    'lighting-color'?: SVGAttributeNumber;
    limitingConeAngle?: SVGAttributeNumber;
    local?: SVGAttributeNumber;
    'marker-end'?: string;
    markerHeight?: SVGAttributeNumber;
    'marker-mid'?: string;
    'marker-start'?: string;
    markerUnits?: SVGAttributeNumber;
    markerWidth?: SVGAttributeNumber;
    mask?: string;
    maskContentUnits?: SVGAttributeNumber;
    maskUnits?: SVGAttributeNumber;
    mathematical?: SVGAttributeNumber;
    mode?: SVGAttributeNumber;
    numOctaves?: SVGAttributeNumber;
    offset?: SVGAttributeNumber;
    opacity?: SVGAttributeNumber;
    operator?: SVGAttributeNumber;
    order?: SVGAttributeNumber;
    orient?: SVGAttributeNumber;
    orientation?: SVGAttributeNumber;
    origin?: SVGAttributeNumber;
    overflow?: SVGAttributeNumber;
    'overline-position'?: SVGAttributeNumber;
    'overline-thickness'?: SVGAttributeNumber;
    'paint-order'?: SVGAttributeNumber;
    'panose-1'?: SVGAttributeNumber;
    path?: string;
    pathLength?: SVGAttributeNumber;
    patternContentUnits?: string;
    patternTransform?: SVGAttributeNumber;
    patternUnits?: string;
    'pointer-events'?: SVGAttributeNumber;
    points?: string;
    pointsAtX?: SVGAttributeNumber;
    pointsAtY?: SVGAttributeNumber;
    pointsAtZ?: SVGAttributeNumber;
    preserveAlpha?: Booleanish;
    preserveAspectRatio?: string;
    primitiveUnits?: SVGAttributeNumber;
    r?: SVGAttributeNumber;
    radius?: SVGAttributeNumber;
    refX?: SVGAttributeNumber;
    refY?: SVGAttributeNumber;
    'rendering-intent'?: SVGAttributeNumber;
    repeatCount?: SVGAttributeNumber;
    repeatDur?: SVGAttributeNumber;
    requiredExtensions?: SVGAttributeNumber;
    requiredFeatures?: SVGAttributeNumber;
    restart?: SVGAttributeNumber;
    result?: string;
    rotate?: SVGAttributeNumber;
    rx?: SVGAttributeNumber;
    ry?: SVGAttributeNumber;
    scale?: SVGAttributeNumber;
    seed?: SVGAttributeNumber;
    'shape-rendering'?: SVGAttributeNumber;
    slope?: SVGAttributeNumber;
    spacing?: SVGAttributeNumber;
    specularConstant?: SVGAttributeNumber;
    specularExponent?: SVGAttributeNumber;
    speed?: SVGAttributeNumber;
    spreadMethod?: string;
    startOffset?: SVGAttributeNumber;
    stdDeviation?: SVGAttributeNumber;
    stemh?: SVGAttributeNumber;
    stemv?: SVGAttributeNumber;
    stitchTiles?: SVGAttributeNumber;
    'stop-color'?: string;
    'stop-opacity'?: SVGAttributeNumber;
    'strikethrough-position'?: SVGAttributeNumber;
    'strikethrough-thickness'?: SVGAttributeNumber;
    string?: SVGAttributeNumber;
    stroke?: string;
    'stroke-dasharray'?: SVGAttributeNumber;
    'stroke-dashoffset'?: SVGAttributeNumber;
    'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit';
    'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit';
    'stroke-miterlimit'?: SVGAttributeNumber;
    'stroke-opacity'?: SVGAttributeNumber;
    'stroke-width'?: SVGAttributeNumber;
    surfaceScale?: SVGAttributeNumber;
    systemLanguage?: SVGAttributeNumber;
    tableValues?: SVGAttributeNumber;
    targetX?: SVGAttributeNumber;
    targetY?: SVGAttributeNumber;
    'text-anchor'?: string;
    'text-decoration'?: SVGAttributeNumber;
    textLength?: SVGAttributeNumber;
    'text-rendering'?: SVGAttributeNumber;
    to?: SVGAttributeNumber;
    transform?: string;
    u1?: SVGAttributeNumber;
    u2?: SVGAttributeNumber;
    'underline-position'?: SVGAttributeNumber;
    'underline-thickness'?: SVGAttributeNumber;
    unicode?: SVGAttributeNumber;
    'unicode-bidi'?: SVGAttributeNumber;
    'unicode-range'?: SVGAttributeNumber;
    'units-per-em'?: SVGAttributeNumber;
    'v-alphabetic'?: SVGAttributeNumber;
    values?: string;
    'vector-effect'?: SVGAttributeNumber;
    version?: string;
    'vert-adv-y'?: SVGAttributeNumber;
    'vert-origin-x'?: SVGAttributeNumber;
    'vert-origin-y'?: SVGAttributeNumber;
    'v-hanging'?: SVGAttributeNumber;
    'v-ideographic'?: SVGAttributeNumber;
    viewBox?: string;
    viewTarget?: SVGAttributeNumber;
    visibility?: SVGAttributeNumber;
    'v-mathematical'?: SVGAttributeNumber;
    widths?: SVGAttributeNumber;
    'word-spacing'?: SVGAttributeNumber;
    'writing-mode'?: SVGAttributeNumber;
    x1?: SVGAttributeNumber;
    x2?: SVGAttributeNumber;
    x?: SVGAttributeNumber;
    xChannelSelector?: string;
    'x-height'?: SVGAttributeNumber;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    xmlBase?: string;
    xmlLang?: string;
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    y1?: SVGAttributeNumber;
    y2?: SVGAttributeNumber;
    y?: SVGAttributeNumber;
    yChannelSelector?: string;
    z?: SVGAttributeNumber;
    zoomAndPan?: string;

    [dataAttribute: `data-${string}`]: any;
}

export interface AnuIntrinsicElements {
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    abbr: HTMLAttributes<HTMLElement>;
    address: HTMLAttributes<HTMLElement>;
    area: AreaHTMLAttributes<HTMLAreaElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    audio: AudioHTMLAttributes<HTMLAudioElement>;
    b: HTMLAttributes<HTMLElement>;
    base: BaseHTMLAttributes<HTMLBaseElement>;
    bdi: HTMLAttributes<HTMLElement>;
    bdo: HTMLAttributes<HTMLElement>;
    big: HTMLAttributes<HTMLElement>;
    blockquote: BlockquoteHTMLAttributes<HTMLQuoteElement>;
    body: HTMLAttributes<HTMLBodyElement>;
    br: HTMLAttributes<HTMLBRElement>;
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
    caption: HTMLAttributes<HTMLTableCaptionElement>;
    cite: HTMLAttributes<HTMLElement>;
    code: HTMLAttributes<HTMLElement>;
    col: ColHTMLAttributes<HTMLTableColElement>;
    colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
    data: DataHTMLAttributes<HTMLDataElement>;
    datalist: HTMLAttributes<HTMLDataListElement>;
    dd: HTMLAttributes<HTMLElement>;
    del: DelHTMLAttributes<HTMLModElement>;
    details: DetailsHTMLAttributes<HTMLDetailsElement>;
    dfn: HTMLAttributes<HTMLElement>;
    dialog: DialogHTMLAttributes<HTMLDialogElement>;
    div: HTMLAttributes<HTMLDivElement>;
    dl: HTMLAttributes<HTMLDListElement>;
    dt: HTMLAttributes<HTMLElement>;
    em: HTMLAttributes<HTMLElement>;
    embed: EmbedHTMLAttributes<HTMLEmbedElement>;
    fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
    figcaption: HTMLAttributes<HTMLElement>;
    figure: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    form: FormHTMLAttributes<HTMLFormElement>;
    h1: HTMLAttributes<HTMLHeadingElement>;
    h2: HTMLAttributes<HTMLHeadingElement>;
    h3: HTMLAttributes<HTMLHeadingElement>;
    h4: HTMLAttributes<HTMLHeadingElement>;
    h5: HTMLAttributes<HTMLHeadingElement>;
    h6: HTMLAttributes<HTMLHeadingElement>;
    head: HTMLAttributes<HTMLHeadElement>;
    header: HTMLAttributes<HTMLElement>;
    hgroup: HTMLAttributes<HTMLElement>;
    hr: HTMLAttributes<HTMLHRElement>;
    html: HtmlHTMLAttributes<HTMLHtmlElement>;
    i: HTMLAttributes<HTMLElement>;
    iframe: IframeHTMLAttributes<HTMLIFrameElement>;
    img: ImgHTMLAttributes<HTMLImageElement>;
    input: InputHTMLAttributes<HTMLInputElement>;
    ins: InsHTMLAttributes<HTMLModElement>;
    kbd: HTMLAttributes<HTMLElement>;
    keygen: KeygenHTMLAttributes<HTMLElement>;
    label: LabelHTMLAttributes<HTMLLabelElement>;
    legend: HTMLAttributes<HTMLLegendElement>;
    li: LiHTMLAttributes<HTMLLIElement>;
    link: LinkHTMLAttributes<HTMLLinkElement>;
    main: HTMLAttributes<HTMLElement>;
    map: MapHTMLAttributes<HTMLMapElement>;
    mark: HTMLAttributes<HTMLElement>;
    menu: MenuHTMLAttributes<HTMLElement>;
    menuitem: HTMLAttributes<HTMLElement>;
    meta: MetaHTMLAttributes<HTMLMetaElement>;
    meter: MeterHTMLAttributes<HTMLMeterElement>;
    nav: HTMLAttributes<HTMLElement>;
    noindex: HTMLAttributes<HTMLElement>;
    noscript: HTMLAttributes<HTMLElement>;
    object: ObjectHTMLAttributes<HTMLObjectElement>;
    ol: OlHTMLAttributes<HTMLOListElement>;
    optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
    option: OptionHTMLAttributes<HTMLOptionElement>;
    output: OutputHTMLAttributes<HTMLOutputElement>;
    p: HTMLAttributes<HTMLParagraphElement>;
    param: ParamHTMLAttributes<HTMLParamElement>;
    picture: HTMLAttributes<HTMLElement>;
    pre: HTMLAttributes<HTMLPreElement>;
    progress: ProgressHTMLAttributes<HTMLProgressElement>;
    q: QuoteHTMLAttributes<HTMLQuoteElement>;
    rp: HTMLAttributes<HTMLElement>;
    rt: HTMLAttributes<HTMLElement>;
    ruby: HTMLAttributes<HTMLElement>;
    s: HTMLAttributes<HTMLElement>;
    samp: HTMLAttributes<HTMLElement>;
    search: HTMLAttributes<HTMLElement>;
    slot: SlotHTMLAttributes<HTMLSlotElement>;
    script: ScriptHTMLAttributes<HTMLScriptElement>;
    section: HTMLAttributes<HTMLElement>;
    select: SelectHTMLAttributes<HTMLSelectElement>;
    small: HTMLAttributes<HTMLElement>;
    source: SourceHTMLAttributes<HTMLSourceElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    strong: HTMLAttributes<HTMLElement>;
    style: StyleHTMLAttributes<HTMLStyleElement>;
    sub: HTMLAttributes<HTMLElement>;
    summary: HTMLAttributes<HTMLElement>;
    sup: HTMLAttributes<HTMLElement>;
    table: TableHTMLAttributes<HTMLTableElement>;
    template: HTMLAttributes<HTMLTemplateElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    td: TdHTMLAttributes<HTMLTableCellElement>;
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    th: ThHTMLAttributes<HTMLTableCellElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    time: TimeHTMLAttributes<HTMLTimeElement>;
    title: HTMLAttributes<HTMLTitleElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    track: TrackHTMLAttributes<HTMLTrackElement>;
    u: HTMLAttributes<HTMLElement>;
    ul: HTMLAttributes<HTMLUListElement>;
    var: HTMLAttributes<HTMLElement>;
    video: VideoHTMLAttributes<HTMLVideoElement>;
    wbr: HTMLAttributes<HTMLElement>;
    webview: WebViewHTMLAttributes<HTMLElement>;

    // SVG — standard tag names
    svg: SVGAttributes<SVGSVGElement>;
    animate: SVGAttributes<SVGElement>;
    animateMotion: SVGAttributes<SVGElement>;
    animateTransform: SVGAttributes<SVGElement>;
    circle: SVGAttributes<SVGCircleElement>;
    clipPath: SVGAttributes<SVGClipPathElement>;
    defs: SVGAttributes<SVGDefsElement>;
    desc: SVGAttributes<SVGDescElement>;
    discard: SVGAttributes<SVGElement>;
    ellipse: SVGAttributes<SVGEllipseElement>;
    feBlend: SVGAttributes<SVGFEBlendElement>;
    feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
    feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
    feComposite: SVGAttributes<SVGFECompositeElement>;
    feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
    feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
    feDistantLight: SVGAttributes<SVGFEDistantLightElement>;
    feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
    feFlood: SVGAttributes<SVGFEFloodElement>;
    feFuncA: SVGAttributes<SVGFEFuncAElement>;
    feFuncB: SVGAttributes<SVGFEFuncBElement>;
    feFuncG: SVGAttributes<SVGFEFuncGElement>;
    feFuncR: SVGAttributes<SVGFEFuncRElement>;
    feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
    feImage: SVGAttributes<SVGFEImageElement>;
    feMerge: SVGAttributes<SVGFEMergeElement>;
    feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
    feMorphology: SVGAttributes<SVGFEMorphologyElement>;
    feOffset: SVGAttributes<SVGFEOffsetElement>;
    fePointLight: SVGAttributes<SVGFEPointLightElement>;
    feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
    feSpotLight: SVGAttributes<SVGFESpotLightElement>;
    feTile: SVGAttributes<SVGFETileElement>;
    feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
    filter: SVGAttributes<SVGFilterElement>;
    foreignObject: SVGAttributes<SVGForeignObjectElement>;
    g: SVGAttributes<SVGGElement>;
    hatch: SVGAttributes<SVGElement>;
    hatchpath: SVGAttributes<SVGElement>;
    image: SVGAttributes<SVGImageElement>;
    line: SVGAttributes<SVGLineElement>;
    linearGradient: SVGAttributes<SVGLinearGradientElement>;
    marker: SVGAttributes<SVGMarkerElement>;
    mask: SVGAttributes<SVGMaskElement>;
    mesh: SVGAttributes<SVGElement>;
    meshgradient: SVGAttributes<SVGElement>;
    meshpatch: SVGAttributes<SVGElement>;
    meshrow: SVGAttributes<SVGElement>;
    metadata: SVGAttributes<SVGMetadataElement>;
    mpath: SVGAttributes<SVGElement>;
    path: SVGAttributes<SVGPathElement>;
    pattern: SVGAttributes<SVGPatternElement>;
    polygon: SVGAttributes<SVGPolygonElement>;
    polyline: SVGAttributes<SVGPolylineElement>;
    radialGradient: SVGAttributes<SVGRadialGradientElement>;
    rect: SVGAttributes<SVGRectElement>;
    set: SVGAttributes<SVGSetElement>;
    stop: SVGAttributes<SVGStopElement>;
    switch: SVGAttributes<SVGSwitchElement>;
    symbol: SVGAttributes<SVGSymbolElement>;
    text: SVGAttributes<SVGTextElement>;
    textPath: SVGAttributes<SVGTextPathElement>;
    tspan: SVGAttributes<SVGTSpanElement>;
    use: SVGAttributes<SVGUseElement>;
    view: SVGAttributes<SVGViewElement>;

    // SVG — anu-verzum aliases (remapped to a/style/title at render time)
    anchor: SVGAttributes<SVGAElement>;
    svgStyle: SVGAttributes<SVGStyleElement>;
    svgTitle: SVGAttributes<SVGTitleElement>;
    unknown: SVGAttributes<SVGElement>;
}
