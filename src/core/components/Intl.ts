import { createElement, TEXT_ELEMENT, AnuElement, Props } from '../elements';
import { createContext } from './Context';

const _Intl = createContext<{ locale?: string; messages?: Record<string, string> }>({});

type AggregatedOptions = Intl.NumberFormatOptions & AbbreviateNumberOptions;

type MessagesContext = {
    locale: string | undefined;
    messages: Record<string, string>;
    options: AggregatedOptions;
};

let __messagesContext: MessagesContext = {
    locale: undefined,
    messages: {},
    options: {}
};

export interface IntlProviderProps extends Props {
    locale: string | null;
    messages: Record<string, Record<string, string>>;
    defaultLocale?: string;
    options?: FormatNumberOptions & AbbreviateNumberOptions;
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

export interface FormatNumberOptions extends Intl.NumberFormatOptions {
    locale?: string;
}

export interface ParseNumberOptions {
    locale?: string;
}

const ABBREVIATE_KEYS = ['units', 'decimalPlaces', 'decimalSign'];

const pickNumberFormatOptions = (options: Record<string, any>): Intl.NumberFormatOptions => {
    const result: Record<string, any> = {};

    Object.keys(options).forEach((key) => {
        if (key !== 'locale' && ABBREVIATE_KEYS.indexOf(key) === -1 && options[key] !== undefined) {
            result[key] = options[key];
        }
    });

    return result as Intl.NumberFormatOptions;
};

const computeAggregatedOptions = (locale: string | null, userOptions: AggregatedOptions = {}): AggregatedOptions => {
    const engineDefaults: Record<string, any> = {};

    try {
        Object.assign(engineDefaults, new globalThis.Intl.NumberFormat(locale || undefined).resolvedOptions());
        delete engineDefaults.locale;
    } catch (err) {
        console.error(err);
    }

    const abbreviateOptions: Record<string, any> = {};

    ABBREVIATE_KEYS.forEach((key) => {
        if ((userOptions as Record<string, any>)[key] !== undefined) {
            abbreviateOptions[key] = (userOptions as Record<string, any>)[key];
        }
    });

    return {
        ...engineDefaults,
        ...pickNumberFormatOptions(userOptions),
        ...abbreviateOptions
    };
};

const IntlProvider = ({ locale, messages, defaultLocale, options, children }: IntlProviderProps): AnuElement | null => {
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
                messages: { ...selectedMessage },
                options: computeAggregatedOptions(locale, options)
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

const getLanguageSubtag = (locale?: string): string | undefined =>
    locale ? locale.toLowerCase().split('-')[0] : undefined;

const resolveLocale = (locale?: string): string | undefined => locale || __messagesContext.locale || undefined;

const getAggregatedNumberFormatOptions = (): Intl.NumberFormatOptions =>
    pickNumberFormatOptions(__messagesContext.options || {});

const getDecimalSeparator = (locale?: string, numberingSystem?: string): string => {
    try {
        const parts = new globalThis.Intl.NumberFormat(
            resolveLocale(locale),
            (numberingSystem ? { numberingSystem } : {}) as Intl.NumberFormatOptions
        ).formatToParts(1.1);

        return parts.find((p) => p.type === 'decimal')?.value ?? '.';
    } catch {
        return '.';
    }
};

const abbreviateNumber = (
    value: number | string | null | undefined,
    options: FormatNumberOptions & AbbreviateNumberOptions = {}
): string | number | null | undefined => {
    let numericValue: number;

    if (typeof value === 'string') {
        const parsed = parseNumber(value, options.locale ? { locale: options.locale } : {});

        if (parsed === null) {
            return value;
        }

        numericValue = parsed;
    } else if (typeof value === 'number' && !isNaN(value)) {
        numericValue = value;
    } else {
        return value;
    }

    const merged: AggregatedOptions = { ...(__messagesContext.options || {}), ...options };
    const decimalPlaces = merged.decimalPlaces ?? 2;
    const customDecimalSign = merged.decimalSign;

    const getByLocale = (values: Record<string, any>): any =>
        values[getLanguageSubtag(options.locale || __messagesContext.locale) || 'default'] || values['default'];

    const UNITS: Record<string, string[]> = {
        hu: ['E', 'm', 'M', 'b'],
        default: ['K', 'M', 'B', 'T']
    };
    const units = merged.units ?? (getByLocale(UNITS) as string[]);

    const isNegative = numericValue < 0;
    const decPlaces = Math.pow(10, decimalPlaces);
    let unit = '';
    let result: number = Math.abs(numericValue);

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

    const numberFormatOptions = pickNumberFormatOptions(options);
    let resultStr = formatNumber(result, {
        maximumFractionDigits: decimalPlaces,
        ...numberFormatOptions,
        locale: options.locale
    });

    if (customDecimalSign) {
        const localeDecimal = getDecimalSeparator(
            options.locale,
            (numberFormatOptions as any).numberingSystem ?? (__messagesContext.options as any).numberingSystem
        );

        if (localeDecimal && localeDecimal !== customDecimalSign) {
            resultStr = resultStr.split(localeDecimal).join(customDecimalSign);
        }
    }

    return `${isNegative ? '-' : ''}${resultStr}${unit}`;
};

const formatNumber = (value: number, options: FormatNumberOptions = {}): string => {
    const { locale } = options;

    if (typeof value !== 'number' || isNaN(value)) {
        return String(value);
    }

    const effective = { ...getAggregatedNumberFormatOptions(), ...pickNumberFormatOptions(options) };

    try {
        return new globalThis.Intl.NumberFormat(resolveLocale(locale), effective).format(value);
    } catch (err) {
        console.error(err);

        return String(value);
    }
};

const parseNumber = (text: string, options: ParseNumberOptions = {}): number | null => {
    if (typeof text !== 'string') {
        return null;
    }

    const numberingSystem =
        (options as any).numberingSystem ?? (__messagesContext.options as any).numberingSystem;

    try {
        const parts = new globalThis.Intl.NumberFormat(resolveLocale(options.locale), {
            ...(numberingSystem ? { numberingSystem } : {}),
            useGrouping: true
        } as Intl.NumberFormatOptions).formatToParts(-12345.6);
        const groupSign = parts.find((p) => p.type === 'group')?.value ?? '';
        const decimalSign = parts.find((p) => p.type === 'decimal')?.value ?? '.';
        const minusSign = parts.find((p) => p.type === 'minusSign')?.value ?? '-';

        let normalized = text.trim();
        const isNegative = normalized.indexOf('-') > -1 || (!!minusSign && normalized.indexOf(minusSign) > -1);

        if (groupSign) {
            normalized = normalized.split(groupSign).join('');
        }

        normalized = normalized.replace(/\s/g, '');

        if (decimalSign && decimalSign !== '.') {
            normalized = normalized.split(decimalSign).join('.');
        }

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
        
        __messagesContext = { locale: undefined, messages: {}, options: {} };
    }
};
