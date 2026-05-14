import { createElement, TEXT_ELEMENT } from '../elements';
import { createContext } from './Context';

const _Intl = createContext({});
let __messagesContext = {
    locale: undefined,
    messages: {}
};

const IntlProvider = ({ locale, messages, defaultLocale, children }) => {
    let selectedMessage;

    try {
        if (locale === null) {
            throw new Error('Property "locale" must be defined and must not be a string reference to the selected language in "messages"!');
        }

        if (!messages) {
            throw new Error('Property "messages" must be defined!');
        }

        if (messages[locale]) {
            selectedMessage = messages[locale];
        } else if (messages[defaultLocale]) {
            selectedMessage = messages[defaultLocale];
        }

        if (!selectedMessage) {
            throw new Error('No messages can be found in "messages" by the value of "locale" or "defaultLocale"!');
        } else {
            __messagesContext = {
                locale,
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
    }
};

const FormattedMessage = ({ id, values, defaultMessage }) => (
    createElement(
        _Intl.ContextConsumer,
        {},
        ({ value: { messages } }) => {
            let textValue = '';

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
                        Object.keys(values).forEach(key => {
                            const variablePattern = `{${key}}`;

                            if (textValue.indexOf(variablePattern) > -1) {
                                textValue = textValue.replace(variablePattern, values[key]);
                            }
                        });
                    }

                    return createElement(TEXT_ELEMENT, { nodeValue: textValue });
                }
            } catch (err) {
                console.error(err);
            }
        }
    )
);

const formatMessage = (id, values, defaultMessage) => {
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
        Object.keys(values).forEach(key => {
            const variablePattern = `{${key}}`;

            if (textValue.indexOf(variablePattern) > -1) {
                textValue = textValue.replace(variablePattern, values[key]);
            }
        });
    }

    return textValue;
};

const abbreviateNumber = (value, options = {}) => {
    const getByLocale = values =>
        values[__messagesContext.locale] || values['default'];

    const UNITS = {
        'hu': ['E', 'm', 'M', 'b'],
        'default': ['K', 'M', 'B', 'T']
    };
    const DECIMAL_SIGN = {
        'hu': ',',
        'default': '.'
    };

    if (typeof value === 'number' && !isNaN(value)) {
        const defaultAbbreviateNumberOptions = {
            units: getByLocale(UNITS),
            decimalPlaces: 2,
            decimalSign: getByLocale(DECIMAL_SIGN)
        };
        const isNegative = value < 0;
        const opts = {
            ...defaultAbbreviateNumberOptions,
            ...options
        };
        const { units, decimalPlaces, decimalSign } = opts;
        const decPlaces = Math.pow(10, decimalPlaces);
        let unit = '';
        let result = Math.abs(value);

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

        if (decimalSign) {
            result = `${result}`.replace('.', decimalSign);
        }

        return `${isNegative ? '-' : ''}${result}${unit}`;
    }

    return value;
};

const Intl = {
    abbreviateNumber,
    FormattedMessage,
    formatMessage,
    Provider: IntlProvider,
};

export default Intl;