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
    children?: AnuElement[];
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

const IntlProvider = ({ locale, messages, defaultLocale, children }: IntlProviderProps): AnuElement | undefined => {
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

        return undefined;
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

const FormattedMessage = ({ id, values, defaultMessage }: FormattedMessageProps): AnuElement | undefined =>
    createElement(
        _Intl.ContextConsumer,
        {},
        ({ value: { messages } }: { value: { messages?: Record<string, string> } }) => {
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

                return undefined;
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

const abbreviateNumber = (value: number, options: AbbreviateNumberOptions = {}): string | number => {
    const getByLocale = (values: Record<string, any>): any =>
        values[__messagesContext.locale || 'default'] || values['default'];

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

const Intl = {
    abbreviateNumber,
    FormattedMessage,
    formatMessage,
    Provider: IntlProvider
};

export default Intl;
