import Anu from '../../index';
import { render } from '../index';
import { __testing as intlTesting } from '../../core/components/Intl';

const renderProvider = (locale: string, options?: Record<string, any>): void => {
    render(
        Anu.createElement(Anu.Intl.Provider, {
            locale,
            messages: { [locale]: { stat: 'Total: {count}' } },
            options
        }, Anu.createElement('span', {}, 'child'))
    );
};

describe('Intl.Provider aggregated options', () => {
    afterEach(() => intlTesting.reset());

    test('Provider options become formatNumber defaults', () => {
        renderProvider('en-US', { minimumFractionDigits: 2 });
        expect(Anu.Intl.formatNumber(5)).toBe('5.00');
    });

    test('per-call options override Provider options', () => {
        renderProvider('en-US', { minimumFractionDigits: 2 });
        expect(Anu.Intl.formatNumber(5, { minimumFractionDigits: 0 })).toBe('5');
    });

    test('user options are polyfilled with the engine defaults for the locale', () => {
        // Only minimumFractionDigits is given; grouping + decimal sign still come from de-DE defaults.
        renderProvider('de-DE', { minimumFractionDigits: 2 });
        expect(Anu.Intl.formatNumber(1234.5)).toBe('1.234,50');
    });

    test('with no Provider, formatNumber behaves as before (per-call only)', () => {
        expect(Anu.Intl.formatNumber(1234.56, { locale: 'en-US' })).toBe('1,234.56');
    });
});

describe('abbreviateNumber composition with formatNumber / parseNumber', () => {
    afterEach(() => intlTesting.reset());

    test('accepts the string output of formatNumber', () => {
        renderProvider('hu');
        const formatted = Anu.Intl.formatNumber(1500000); // locale-grouped string
        expect(Anu.Intl.abbreviateNumber(formatted)).toBe('1,5m');
    });

    test('accepts the number output of parseNumber', () => {
        renderProvider('hu');
        const parsed = Anu.Intl.parseNumber('1 500 000');
        expect(Anu.Intl.abbreviateNumber(parsed as number)).toBe('1,5m');
    });

    test('parses a plain locale-formatted string argument directly', () => {
        renderProvider('en-US');
        expect(Anu.Intl.abbreviateNumber('1,500,000')).toBe('1.5M');
    });

    test('returns null unchanged (e.g. parseNumber miss)', () => {
        renderProvider('en-US');
        expect(Anu.Intl.abbreviateNumber(null)).toBeNull();
    });

    test('returns an unparseable string unchanged', () => {
        renderProvider('en-US');
        expect(Anu.Intl.abbreviateNumber('not a number')).toBe('not a number');
    });

    test('mantissa picks up the locale decimal sign via formatNumber', () => {
        renderProvider('hu');
        expect(Anu.Intl.abbreviateNumber(1500000)).toBe('1,5m');
        expect(Anu.Intl.abbreviateNumber(1500000, { locale: 'en-US' })).toBe('1.5M');
    });

    test('Provider number-format options flow into the abbreviated mantissa', () => {
        renderProvider('hu', { minimumFractionDigits: 2 });
        expect(Anu.Intl.abbreviateNumber(1500000)).toBe('1,50m');
    });

    test('per-call decimalPlaces controls precision', () => {
        renderProvider('en-US');
        expect(Anu.Intl.abbreviateNumber(1234, { decimalPlaces: 1 })).toBe('1.2K');
    });

    test('composes into formatMessage values', () => {
        renderProvider('hu');
        expect(Anu.Intl.formatMessage('stat', { count: Anu.Intl.abbreviateNumber(1500000) as string }))
            .toBe('Total: 1,5m');
    });
});
