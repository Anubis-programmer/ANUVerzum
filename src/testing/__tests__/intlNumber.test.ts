import Anu from '../../index';
import { render } from '../index';
import { __testing as intlTesting } from '../../core/components/Intl';

describe('Anu.Intl.formatNumber', () => {
    afterEach(() => intlTesting.reset());

    test('formats with the en-US grouping and decimal separators', () => {
        expect(Anu.Intl.formatNumber(1234.56, { locale: 'en-US' })).toBe('1,234.56');
    });

    test('formats with the de-DE grouping and decimal separators', () => {
        expect(Anu.Intl.formatNumber(1234.56, { locale: 'de-DE' })).toBe('1.234,56');
    });

    test('passes Intl.NumberFormat options through (e.g. minimumFractionDigits)', () => {
        expect(Anu.Intl.formatNumber(5, { locale: 'en-US', minimumFractionDigits: 2 })).toBe('5.00');
    });

    test('defaults to the Provider locale', () => {
        render(
            Anu.createElement(Anu.Intl.Provider, {
                locale: 'de-DE',
                messages: { 'de-DE': { hello: 'Hallo' } }
            }, Anu.createElement('span', {}, 'child'))
        );

        expect(Anu.Intl.formatNumber(1234.56)).toBe('1.234,56');
    });

    test('returns the string form for non-numeric input rather than throwing', () => {
        expect(Anu.Intl.formatNumber(NaN, { locale: 'en-US' })).toBe('NaN');
    });
});

describe('Anu.Intl.parseNumber', () => {
    afterEach(() => intlTesting.reset());

    test('parses an en-US formatted string', () => {
        expect(Anu.Intl.parseNumber('1,234.56', { locale: 'en-US' })).toBe(1234.56);
    });

    test('parses a de-DE formatted string', () => {
        expect(Anu.Intl.parseNumber('1.234,56', { locale: 'de-DE' })).toBe(1234.56);
    });

    test('parses a negative number', () => {
        expect(Anu.Intl.parseNumber('-1.234,56', { locale: 'de-DE' })).toBe(-1234.56);
    });

    test('is the inverse of formatNumber across locales', () => {
        for (const locale of ['en-US', 'de-DE', 'hu-HU']) {
            const formatted = Anu.Intl.formatNumber(1234567.89, { locale });
            expect(Anu.Intl.parseNumber(formatted, { locale })).toBeCloseTo(1234567.89, 2);
        }
    });

    test('returns null for input with no digits', () => {
        expect(Anu.Intl.parseNumber('abc', { locale: 'en-US' })).toBeNull();
        expect(Anu.Intl.parseNumber('', { locale: 'en-US' })).toBeNull();
    });

    test('defaults to the Provider locale', () => {
        render(
            Anu.createElement(Anu.Intl.Provider, {
                locale: 'de-DE',
                messages: { 'de-DE': { hello: 'Hallo' } }
            }, Anu.createElement('span', {}, 'child'))
        );

        expect(Anu.Intl.parseNumber('1.234,56')).toBe(1234.56);
    });
});

describe('Intl locale normalization', () => {
    afterEach(() => intlTesting.reset());

    const renderWithLocale = (locale: string): void => {
        render(
            Anu.createElement(Anu.Intl.Provider, {
                locale,
                messages: { [locale]: { hello: 'Hello' } }
            }, Anu.createElement('span', {}, 'child'))
        );
    };

    // abbreviateNumber keys on the language subtag only, so every spelling of the
    // Hungarian locale must resolve to the same Hungarian units ('1,5m', not '1.5M').
    test.each(['hu', 'HU', 'hu-HU'])('abbreviateNumber uses Hungarian units for Provider locale "%s"', (locale) => {
        renderWithLocale(locale);
        expect(Anu.Intl.abbreviateNumber(1500000)).toBe('1,5m');
    });

    test('abbreviateNumber falls back to default units for a non-Hungarian locale', () => {
        renderWithLocale('en-US');
        expect(Anu.Intl.abbreviateNumber(1500000)).toBe('1.5M');
    });

    test('formatNumber/parseNumber accept an uppercase Provider locale tag', () => {
        renderWithLocale('HU');
        const formatted = Anu.Intl.formatNumber(1234.56);
        expect(formatted).toContain(','); // Hungarian decimal sign
        expect(Anu.Intl.parseNumber(formatted)).toBeCloseTo(1234.56, 2);
    });
});
