import { createElement, TEXT_ELEMENT, AnuElement, Props } from '../elements';
import { createContext } from './Context';

const _Intl = createContext<{ locale?: string; messages?: Record<string, string> }>({});

type MessagesContext = {
    locale: string | undefined;
    messages: Record<string, string>;
};

let __messagesContext: MessagesContext = {
    locale: undefined,
    messages: {}
};

export interface IntlProviderProps extends Props {
    locale: string | null;
    messages: Record<string, Record<string, string>>;
    defaultLocale?: string;
}

export interface FormattedMessageProps extends Props {
    id: string;
    values?: Record<string, string | number>;
    defaultMessage?: string;
}

export interface AbbreviateNumberOptions {
    units?: string[];
    decimalPlaces?: number;
    decimalSign?: string;
}

// `Intl.NumberFormatOptions` here refers to the global ECMAScript Intl namespace
// (type space), not the local `Intl` API object declared at the bottom of this
// file — a `const` introduces only a value binding, so the type reference is safe.
export interface FormatNumberOptions extends Intl.NumberFormatOptions {
    locale?: string;
}

export interface ParseNumberOptions {
    locale?: string;
}

const IntlProvider = ({ locale, messages, defaultLocale, children }: IntlProviderProps): AnuElement | null => {
    let selectedMessage: Record<string, string> | undefined;

    try {
        if (locale === null) {
            throw new Error(
                'Property "locale" must be defined and must not be a string reference to the selected language in "messages"!'
            );
        }

        if (!messages) {
            throw new Error('Property "messages" must be defined!');
        }

        if (locale && messages[locale]) {
            selectedMessage = messages[locale];
        } else if (defaultLocale && messages[defaultLocale]) {
            selectedMessage = messages[defaultLocale];
        }

        if (!selectedMessage) {
            throw new Error('No messages can be found in "messages" by the value of "locale" or "defaultLocale"!');
        } else {
            __messagesContext = {
                locale: locale as string,
                messages: { ...selectedMessage }
            };

            return createElement(
                _Intl.ContextProvider,
                {
                    locale,
                    messages: selectedMessage
                },
                children
            );
        }
    } catch (err) {
        console.error(err);

        return null;
    }
};

const interpolateValues = (text: string, values: Record<string, string | number>): string => {
    let result = text;

    Object.keys(values).forEach((key) => {
        const variablePattern = `{${key}}`;

        if (result.indexOf(variablePattern) > -1) {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(values[key]));
        }
    });

    return result;
};

const FormattedMessage = ({ id, values, defaultMessage }: FormattedMessageProps): AnuElement =>
    createElement(
        _Intl.ContextConsumer,
        {},
        ({ value: { messages } }: { value: { messages?: Record<string, string> } }): AnuElement | null => {
            let textValue: string;

            try {
                if (messages && messages[id]) {
                    textValue = messages[id];
                } else if (defaultMessage) {
                    textValue = defaultMessage;
                } else {
                    textValue = id;
                }

                if (textValue.length === 0) {
                    throw new Error('No text or fallback value to return.');
                } else {
                    if (values && typeof values === 'object' && values !== null) {
                        textValue = interpolateValues(textValue, values);
                    }

                    return createElement(TEXT_ELEMENT, { nodeValue: textValue });
                }
            } catch (err) {
                console.error(err);

                return null;
            }
        }
    );

const formatMessage = (id: string, values?: Record<string, string | number>, defaultMessage?: string): string => {
    let textValue = '';

    try {
        if (__messagesContext.messages[id]) {
            textValue = __messagesContext.messages[id];
        } else if (defaultMessage) {
            textValue = defaultMessage;
        } else {
            textValue = id;
        }

        if (textValue.length === 0) {
            throw new Error('No text or fallback value to return.');
        }
    } catch (err) {
        console.error(err);
    }

    if (values && typeof values === 'object' && values !== null) {
        textValue = interpolateValues(textValue, values);
    }

    return textValue;
};

// Reduce any BCP 47 tag to its lowercase language subtag, e.g. 'hu-HU' / 'HU' → 'hu'.
// Used for the exact dictionary-key lookups below (UNITS / DECIMAL_SIGN), which key
// on the language only — so a Provider locale of 'hu', 'HU', or 'hu-HU' all resolve
// to the same Hungarian entry. (formatNumber/parseNumber keep the full tag, since the
// region subtag is meaningful to Intl.NumberFormat — e.g. en-US vs en-GB vs en-IN.)
const getLanguageSubtag = (locale?: string): string | undefined =>
    locale ? locale.toLowerCase().split('-')[0] : undefined;

const abbreviateNumber = (value: number, options: AbbreviateNumberOptions = {}): string | number => {
    const getByLocale = (values: Record<string, any>): any =>
        values[getLanguageSubtag(__messagesContext.locale) || 'default'] || values['default'];

    const UNITS: Record<string, string[]> = {
        hu: ['E', 'm', 'M', 'b'],
        default: ['K', 'M', 'B', 'T']
    };
    const DECIMAL_SIGN: Record<string, string> = {
        hu: ',',
        default: '.'
    };

    if (typeof value === 'number' && !isNaN(value)) {
        const defaultAbbreviateNumberOptions: Required<AbbreviateNumberOptions> = {
            units: getByLocale(UNITS) as string[],
            decimalPlaces: 2,
            decimalSign: getByLocale(DECIMAL_SIGN) as string
        };
        const isNegative = value < 0;
        const opts: Required<AbbreviateNumberOptions> = {
            ...defaultAbbreviateNumberOptions,
            ...options
        };
        const { units, decimalPlaces, decimalSign } = opts;
        const decPlaces = Math.pow(10, decimalPlaces);
        let unit = '';
        let result: number = Math.abs(value);

        for (let i = units.length - 1; i >= 0; i--) {
            const size = Math.pow(10, (i + 1) * 3);

            if (size <= result) {
                result = Math.round((result * decPlaces) / size) / decPlaces;

                if (result === 1000 && i < units.length - 1) {
                    result = 1;
                    i++;
                }

                unit = units[i];

                break;
            }
        }

        let resultStr = `${result}`;
        
        if (decimalSign) {
            resultStr = resultStr.replace('.', decimalSign);
        }

        return `${isNegative ? '-' : ''}${resultStr}${unit}`;
    }

    return value;
};

// The local `Intl` object below shadows the global ECMAScript `Intl`, so number
// formatting/parsing must reach the real `Intl.NumberFormat` via `globalThis.Intl`.
const resolveLocale = (locale?: string): string | undefined => locale || __messagesContext.locale || undefined;

const formatNumber = (value: number, options: FormatNumberOptions = {}): string => {
    const { locale, ...numberFormatOptions } = options;

    if (typeof value !== 'number' || isNaN(value)) {
        return String(value);
    }

    try {
        return new globalThis.Intl.NumberFormat(resolveLocale(locale), numberFormatOptions).format(value);
    } catch (err) {
        console.error(err);

        return String(value);
    }
};

const parseNumber = (text: string, options: ParseNumberOptions = {}): number | null => {
    if (typeof text !== 'string') {
        return null;
    }

    try {
        // Discover the locale's grouping/decimal/minus marks from a known sample,
        // then normalize the input back into a plain JS-parseable number string.
        const parts = new globalThis.Intl.NumberFormat(resolveLocale(options.locale)).formatToParts(-12345.6);
        const groupSign = parts.find((p) => p.type === 'group')?.value ?? '';
        const decimalSign = parts.find((p) => p.type === 'decimal')?.value ?? '.';
        const minusSign = parts.find((p) => p.type === 'minusSign')?.value ?? '-';

        let normalized = text.trim();
        const isNegative = normalized.indexOf('-') > -1 || (!!minusSign && normalized.indexOf(minusSign) > -1);

        // Drop grouping separators: the explicit locale group sign plus any
        // whitespace (JS `\s` covers NBSP/NNBSP, which several locales group with).
        if (groupSign) {
            normalized = normalized.split(groupSign).join('');
        }

        normalized = normalized.replace(/\s/g, '');

        // Convert the locale decimal sign to a dot.
        if (decimalSign && decimalSign !== '.') {
            normalized = normalized.split(decimalSign).join('.');
        }

        // Keep only digits and the decimal dot; sign is reapplied from isNegative.
        normalized = normalized.replace(/[^0-9.]/g, '');

        if (normalized === '' || normalized === '.') {
            return null;
        }

        const result = Number(normalized);

        if (isNaN(result)) {
            return null;
        }

        return isNegative ? -result : result;
    } catch (err) {
        console.error(err);

        return null;
    }
};

const Intl = {
    abbreviateNumber,
    formatNumber,
    parseNumber,
    FormattedMessage,
    formatMessage,
    Provider: IntlProvider
};

export default Intl;

export const __testing = {
    reset(): void {
        if (process.env.NODE_ENV !== 'test') {
            return;
        }
        
        __messagesContext = { locale: undefined, messages: {} };
    }
};
