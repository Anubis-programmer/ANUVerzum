import Anu from 'anu-verzum';

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

type TagUnionIsLiteral = string extends keyof JSX.IntrinsicElements ? false : true;
type NumericKeyExcluded = number extends keyof JSX.IntrinsicElements ? false : true;

const assertLiteralTagUnion: Expect<Equal<TagUnionIsLiteral, true>> = true;
const assertNoNumericKey: Expect<Equal<NumericKeyExcluded, true>> = true;

const knownTag: keyof JSX.IntrinsicElements = 'section';
const dynamicTag: keyof JSX.IntrinsicElements = knownTag;

const divProps: JSX.IntrinsicElements['div'] = { className: 'x', id: 'y', children: 'hi', style: { color: 'red' } };
const anchorProps: JSX.IntrinsicElements['a'] = { href: 'https://example.com', target: '_blank', children: 'link' };
const inputProps: JSX.IntrinsicElements['input'] = { type: 'email', value: 'a@b.c', disabled: true };
const svgProps: JSX.IntrinsicElements['circle'] = { cx: 10, cy: 10, r: 5, fill: 'blue' };
const dataProps: JSX.IntrinsicElements['div'] = { 'data-testid': 'node', 'aria-label': 'node' };

type AnyTagProps = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];
const spreadableProps: AnyTagProps = { children: 'x' };

const clickable: JSX.IntrinsicElements['button'] = {
    onClick: (event) => {
        void event.currentTarget;
    }
};

const elementTypeAdmitsString: JSX.ElementType = 'div';

// @ts-expect-error unknown tags are rejected by the concrete map
const rejectedTag: keyof JSX.IntrinsicElements = 'not-a-real-tag';

// @ts-expect-error button type is a strict literal union
const rejectedButtonType: JSX.IntrinsicElements['button'] = { type: 'nonsense' };

describe('JSX.IntrinsicElements concrete tag map', () => {
    test('type-level assertions compile', () => {
        expect(
            [
                knownTag,
                dynamicTag,
                divProps,
                anchorProps,
                inputProps,
                svgProps,
                dataProps,
                spreadableProps,
                clickable,
                elementTypeAdmitsString,
                rejectedTag,
                rejectedButtonType,
                assertLiteralTagUnion,
                assertNoNumericKey
            ].length
        ).toBe(14);
    });

    test('a dynamic string-union tag renders through createElement', () => {
        const tag: keyof JSX.IntrinsicElements = 'section';
        const element = Anu.createElement(tag, { className: 'dynamic' }, 'content');

        expect(element.type).toBe('section');
        expect(element.props.className).toBe('dynamic');
        expect(element.props.children).toBe('content');
    });
});
