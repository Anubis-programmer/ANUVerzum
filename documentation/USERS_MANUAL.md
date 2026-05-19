<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong></h1>

<br>

<h3>@author: <strong>Anubis-programmer</strong></h3>
<h3>@license: <strong>MIT</strong></h3>
<h3>@version: <strong>1.22.1</strong></h3>

<br>

<h2>Framework Usage:</h2>

<ul>
    <li>
        <a href="#getting-started">Getting Started</a>
    </li>
    <ul>
        <li>
            <a href="#installation">Installation</a>
        </li>
        <li>
            <a href="#babel-setup">Babel setup</a>
        </li>
        <li>
            <a href="#webpack-setup">Webpack setup</a>
        </li>
        <li>
            <a href="#importing-in-your-files">Importing in your files</a>
        </li>
        <li>
            <a href="#typescript-setup">TypeScript setup</a>
        </li>
    </ul>
    <li>
        <a href="#creating-components-and-rendering">Creating components and rendering</a>
    </li>
    <ul>
        <li>
            <a href="#function-components">Function components</a>
        </li>
        <li>
            <a href="#class-based-components">Class-based components</a>
        </li>
        <li>
            <a href="#rendering-props">Rendering props</a>
        </li>
        <li>
            <a href="#wrapper-components-and-sub-components">Wrapper components and sub-components</a>
        </li>
        <li>
            <a href="#array-rendering">Array rendering</a>
        </li>
        <li>
            <a href="#avoiding-unnecessary-wrapper-elements">Avoiding unnecessary wrapper elements</a>
        </li>
        <li>
            <a href="#list-keys">Keys for dynamic lists</a>
        </li>
        <li>
            <a href="#refs">The refs</a>
        </li>
        <li>
            <a href="#rendering-application">Rendering application</a>
        </li>
    </ul>
    <li>
        <a href="#history-api">Routing - The History API</a>
    </li>
    <ul>
        <li>
            <a href="#linking-and-routing">Linking and routing</a>
        </li>
        <li>
            <a href="#redirecting-with-history-redirect">Redirecting with &lt;Anu.History.Redirect /&gt;</a>
        </li>
        <li>
            <a href="#redirecting-with-history-goto">Redirecting with Anu.History.goTo()</a>
        </li>
        <li>
            <a href="#reading-url-parameters">Reading URL parameters</a>
        </li>
    </ul>
    <li>
        <a href="#server-api">Calling the server asynchronously - The Server API</a>
    </li>
    <ul>
        <li>
            <a href="#configure-base-url">Configuring the base URL</a>
        </li>
        <li>
            <a href="#get-and-delete-methods">GET and DELETE HTTP methods</a>
        </li>
        <li>
            <a href="#post-and-put-methods">POST and PUT HTTP methods</a>
        </li>
        <li>
            <a href="#file-method">FILE HTTP method</a>
        </li>
    </ul>
    <li>
        <a href="#anulytics-api">Tracking users - The Anulytics API</a>
    </li>
    <ul>
        <li>
            <a href="#anulytics-provider">Wrapping up your front-end project within the &lt;Anu.Anulytics.Provider /&gt; component</a>
        </li>
        <li>
            <a href="#anulytics-track-event">tracking events on elements using Anu.Anulytics.trackEvent(event, props)</a>
        </li>
    </ul>
    <li>
        <a href="#context-api">Creating and accessing the context out of the "normal props flow" - The Context API</a>
    </li>
    <ul>
        <li>
            <a href="#creating-context">Creating the context</a>
        </li>
        <li>
            <a href="#usage-of-context-provider-and-consumers">Usage of the context provider and its consumer(s)</a>
        </li>
    </ul>
    <li>
        <a href="#store-api">Storing and mutating the global state on actions dispatched, memoizing complex conversions on the global state and combining reducers - The Store API</a>
    </li>
    <ul>
        <li>
            <a href="#dispatching-actions">Dispatching actions</a>
        </li>
        <li>
            <a href="#handling-actions-with-reducers">Handling actions with reducers</a>
        </li>
        <li>
            <a href="#memoizing-state-conversions">Memoizing (global) state conversions</a>
        </li>
        <li>
            <a href="#combining-reducers">Combining reducers</a>
        </li>
        <li>
            <a href="#creating-the-store">Creating the store</a>
        </li>
    </ul>
    <li>
        <a href="#connector-api">Connecting components to the global state - The Connector API</a>
    </li>
    <ul>
        <li>
            <a href="#connect-to-store">Connect to the store</a>
        </li>
        <li>
            <a href="#create-container-component">Create container component</a>
        </li>
    </ul>
    <li>
        <a href="#intl-api">Supporting multiple languages - The Intl API</a>
    </li>
    <ul>
        <li>
            <a href="#creating-language-objects">Creating the supported language objects</a>
        </li>
        <li>
            <a href="#adding-language-objects-to-provider">Adding the language objects to the Intl provider</a>
        </li>
        <li>
            <a href="#formatting-component-texts">Formatting component texts</a>
        </li>
        <li>
            <a href="#formatting-attribute-texts">Formatting attribute texts</a>
        </li>
        <li>
            <a href="#abbreviating-numbers">Abbreviating numbers</a>
        </li>
    </ul>
    <li>
        <a href="#feature-api">Switching features on / off - The Feature API</a>
    </li>
    <ul>
        <li>
            <a href="#setting-features-list">Setting the features list</a>
        </li>
        <li>
            <a href="#toggling-features">Toggling the features</a>
        </li>
    </ul>
</ul>

<h2>Utilities:</h2>

<ul>
    <li>
        <a href="#deep-equal">Deep equality check for objects using Anu.Utils.deepEqual()</a>
    </li>
</ul>

<h2>Testing:</h2>

<ul>
    <li>
        <a href="#testing">Anu Testing Library (ATL)</a>
    </li>
    <ul>
        <li><a href="#testing-setup">Setup</a></li>
        <li><a href="#testing-render">render()</a></li>
        <li><a href="#testing-queries">Queries</a></li>
        <li><a href="#testing-fire-event">fireEvent</a></li>
        <li><a href="#testing-user-event">userEvent</a></li>
        <li><a href="#testing-wait-for">waitFor and waitForElementToBeRemoved</a></li>
        <li><a href="#testing-act">act()</a></li>
        <li><a href="#testing-rerender">rerender and unmount</a></li>
        <li><a href="#testing-wrappers">Provider wrappers</a></li>
    </ul>
</ul>

<br>
<hr>

<h2 id="getting-started">Getting Started</h2>

<h3 id="installation">Installation</h3>

```bash
npm install anu-verzum
```

<h3 id="babel-setup">Babel setup</h3>

Create a `babel.config.json` in your project root:

```json
{
    "presets": [
        "anu-verzum/babel-preset",
        ["@babel/preset-env", { "targets": "last 2 Chrome versions" }]
    ]
}
```

`anu-verzum/babel-preset` handles two things automatically:

- Transforms JSX to `Anu.createElement()` calls, including the `<>...</>` fragment shorthand (mapped to `Anu.Fragment`).
- Strips TypeScript syntax via `@babel/plugin-transform-typescript` with `jsxPragma: 'Anu'` pre-configured, so the `Anu` import is never incorrectly elided — even in files that only use host elements like `<div>` or `<span>`.

Because the preset handles TypeScript stripping itself, **do not** add `@babel/preset-typescript` separately — running both would transform TypeScript twice and cause errors.

<h3 id="webpack-setup">Webpack setup</h3>

All build tools ship with `anu-verzum` — no separate install needed. Create `webpack.config.js` in your project root:

```js
module.exports = require('anu-verzum/webpack.config')(__dirname);
```

Add scripts to `package.json`:

```json
{
    "scripts": {
        "start": "webpack serve",
        "build": "webpack --mode production"
    }
}
```

The default config targets `src/index.tsx` as the entry point and `index.html` as the HTML template, served on port 3000. Pass an options object to override any of these:

```js
module.exports = require('anu-verzum/webpack.config')(__dirname, {
    entry: './src/main.tsx',
    template: './public/index.html',
    port: 4000
});
```

Use `plugins` to append additional webpack plugins after the built-in `HtmlWebpackPlugin`:

```js
const webpack = require('webpack');

module.exports = require('anu-verzum/webpack.config')(__dirname, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        })
    ]
});
```

<h3 id="importing-in-your-files">Importing in your files</h3>

Every file that contains JSX should import `Anu`, because the JSX transform expands to
`Anu.createElement(...)` calls at compile time. The preset keeps this import in scope
automatically, but it is still required at runtime:

```javascript
import Anu from 'anu-verzum';

const App = () => (
    <div>Hello ANUVerzum!</div>
);

Anu.render(<App />, document.getElementById('root'));
```

<h3 id="typescript-setup">TypeScript setup</h3>

The library ships with declaration files (`.d.ts`) out of the box — no `@types` package is needed.

Install TypeScript for type checking:

```bash
npm install --save-dev typescript
```

> **Note:** `@babel/preset-typescript` is **not** needed — `anu-verzum/babel-preset` already handles TypeScript stripping. Only install `typescript` to get the `tsc` CLI for type checking.

Create `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "jsx": "react",
        "jsxFactory": "Anu.createElement",
        "jsxFragmentFactory": "Anu.Fragment",
        "strict": true,
        "noEmit": true,
        "skipLibCheck": true,
        "esModuleInterop": true
    },
    "include": ["src"]
}
```

| Option | Value | Reason |
|--------|-------|--------|
| `jsx` | `"react"` | Enables JSX type-checking with a custom factory |
| `jsxFactory` | `"Anu.createElement"` | Matches ANUVerzum's JSX transform |
| `jsxFragmentFactory` | `"Anu.Fragment"` | Matches ANUVerzum's fragment syntax |
| `noEmit` | `true` | Type checking only — Babel handles compilation |
| `skipLibCheck` | `true` | Skips type checking inside `node_modules` |
| `moduleResolution` | `"bundler"` | Correct setting for Webpack/Babel projects |
| `target` | `"ES2018"` | Because Babel handles compilation (`noEmit: true`), `target` only controls which TypeScript built-in type definitions are available — it does not affect emitted code. ES2018 is the minimum required to include `Promise.prototype.finally` on values returned by `Anu.ServerAPI` methods. |

#### Typing `process.env`

TypeScript does not know about `process` in a browser project by default — it is a Node.js global. If you reference `process.env.SOME_VAR` in your source (for example, to pass a value injected by webpack `DefinePlugin`), add a declaration file so the type checker can resolve it without pulling in the full Node.js type surface:

Create `src/env.d.ts`:

```typescript
declare const process: { env: Record<string, string | undefined> };
```

This is enough for any `process.env.*` access. If your project already depends on `@types/node` for other reasons, you can skip the declaration file and add `"types": ["node"]` to `compilerOptions` in `tsconfig.json` instead — but prefer the declaration file for a pure browser project to avoid Node-specific type collisions (e.g. `setTimeout` return type, `Buffer`, etc.).

#### Build pipeline

Compilation and type checking are intentionally separate:

```bash
npm start          # dev server — Babel compiles, always succeeds
npx tsc --noEmit   # type check only — surfaces type errors
```

Because compilation goes through Babel, `npm start` and `npm run build` succeed regardless of type errors. Run `npx tsc --noEmit` during development to catch type issues without blocking the build.

#### Typed class components

Use the exported `Component<P, S>` base class to get fully-typed props and state:

```typescript
import Anu, { Component, AnuElement } from 'anu-verzum';

interface CounterProps {
    initialCount: number;
}

interface CounterState {
    count: number;
}

class Counter extends Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = { count: props.initialCount };
    }

    render(): AnuElement { // JSX.Element is an equivalent return type — no import needed
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Increment
                </button>
            </div>
        );
    }
}
```

#### Typed function components

```typescript
import Anu, { AnuElement, Props } from 'anu-verzum';

// Extend Props to inherit children, style, and the open index signature:
interface GreetingProps extends Props {
    name: string;
}
// Plain-type alternative when no inherited fields are needed:
// type GreetingProps = { name: string; };

const Greeting = ({ name }: GreetingProps): AnuElement => <p>Hello, {name}!</p>;
// JSX.Element is an equivalent return type annotation — no import needed
```

#### Exported types

The following types are exported from `anu-verzum` for use in consumer projects:

| Type | Description |
|------|-------------|
| `AnuElement` | The virtual-DOM element descriptor (return type of `createElement`) |
| `AnuChild` | Union of all valid JSX child types: `AnuElement \| string \| number \| boolean \| null \| undefined` |
| `AnuNode` | Recursive child tree type used by `Props.children` — `AnuChild \| AnuNode[]`; accepts single children, arrays, and nested arrays (e.g. from `.map()`). Can also be imported directly to type a `children` field in a plain `type`: `type MyProps = { children?: AnuNode; name: string; }` |
| `AnuCSSProperties` | Style object type used by `Props.style` — `Partial<Record<keyof CSSStyleDeclaration, string \| number>>`; allows numeric values for unitless CSS properties such as `flexShrink`, `zIndex`, `opacity` |
| `Props` | Base props type providing `children?: AnuNode`, `style?: AnuCSSProperties`, and an open index signature. Extend it when a component uses `children` or needs the flexible index signature; for simple prop shapes without `children`, a plain `type` alias works equally well |
| `Ref<T>` | Reference object created by `Anu.createRef<T>()` |
| `Component<P, S>` | Abstract base class for class components |
| `FunctionComponent<P>` | Function component signature |
| `ElementType` | String tag, function component, or class component constructor |
| `ContextValue<T>` | Context value passed to a `Consumer` render-prop: `{ value: Partial<T>; defaultContext: { value: T } }` |
| `ConsumerProps<T>` | Props for a typed context `Consumer` — `children` is the render-prop `(ctx: ContextValue<T>) => AnuElement \| null` |
| `Store<S, A>` | Store instance returned by `Anu.store.createStore` |
| `Reducer<S, A>` | Reducer function signature |
| `Middleware<S, A>` | Middleware function signature |
| `Dispatch<A>` | Dispatch function signature |
| `Action` | Base action type `{ type: string; [key: string]: any }` |
| `ThunkAction<S>` | Thunk action `(dispatch, getState) => any` |
| `SelectorFn<TInput, TOutput>` | Selector function signature for `createSelector` |
| `CreateSelectorFn` | Overloaded interface for `Anu.store.createSelector` — enables full type inference on transformation parameters |
| `ApiSuccessResponse<T>` | Successful HTTP response `{ status: number; response: T \| null }` |
| `ApiErrorResponse` | Error HTTP response `{ status: number; response: null }` |

#### Library development scripts

These scripts are available when working on the library itself:

```bash
npm run clean       # Delete dist/ entirely
npm run build       # Clean, compile TypeScript sources to dist/, and emit .d.ts files
npm run typecheck   # Type-check without emitting any output
npm run lint        # Run ESLint on all source files
npm run format      # Format all source files with Prettier
```

<br>
<hr>

<h2 id="creating-components-and-rendering">Creating components and rendering elements</h2>

Supports both <i>HTML</i> and <i>inline-SVG</i> element creation, "stateful" (or class-based) components and function (currently "stateless") components!<br>
- If you wish to use the SVG <code>&lt;a&gt;</code>, <code>&lt;style&gt;</code> or <code>&lt;title&gt;</code> tags, please use instead <code>&lt;anchor&gt;</code>, <code>&lt;svgStyle&gt;</code> or <code>&lt;svgTitle&gt;</code> respectively)!
- <code>&lt;script&gt;</code> SVG tag is not supported! Please create a separate component for the elements and define their behavior as you would do in case of a regular component!
- When creating <code>&lt;svg&gt;</code> tag, you don't have to define the <code>xmlns</code> attribute. 
- Adding style definition inside <code>&lt;svgStyle&gt;</code> should be done as a string template as <code>children</code>, e.g.:

    ```typescript
    <svg viewBox="0 0 10 10">
        <svgStyle>
            {`circle {
                fill: gold;
                stroke: maroon;
                stroke-width: 2px;
            }`}
        </svgStyle>
        <circle cx="5" cy="5" r="4" />
    </svg>
    ```

<h3 id="function-components">Function components</h3>

- Function components are functions which can receive <code>props</code> and must always return either an <i>HTML element</i>, an <i>inline-SVG element</i>, a <i>Component</i>, a <i>string</i>, a <i>number</i>, a <i>boolean</i>, or <code>NULL</code>.
- Both class-based and function component names must start with a capital letter, inline-SVG-s and HTML element names are lower-case!

    ```typescript
    import Anu, { Props, AnuElement } from 'anu-verzum';

    const FunctionComponent = (props: Props): AnuElement => {
        // ...
        return (
            <HTMLElement_inlineSVGElement_or_Component />
        );
    };
    ```

    <strong>Example</strong> - <i>returning HTML elements</i>:

    ```typescript
    interface TitleBarProps extends Props {
        title: string;
    }
    // Plain-type alternative: type TitleBarProps = { title: string; };

    const MyTitleBar = ({ title }: TitleBarProps): AnuElement => (
        <div>
            <h1>{title}</h1>
        </div>
    );
    ```

    <strong>Example</strong> - <i>returning inline-SVG elements</i>:

    ```typescript
    const MyCircle = (): AnuElement => (
        <svg viewBox="0 0 10 10">
            <svgStyle>
                {`circle {
                    fill: gold;
                    stroke: maroon;
                    stroke-width: 2px;
                }`}
            </svgStyle>
            <circle cx="5" cy="5" r="4" />
        </svg>
    );
    ```

    <strong>Example</strong> - <i>returning composed elements</i>:

    ```typescript
    const TitleWithCircle = (): AnuElement => (
        <div>
            <MyTitleBar title="Hello ANUVerzum!" />
            <MyCircle />
        </div>
    );
    ```

<h3 id="class-based-components">Class-based components</h3>

- Always must extend <code>Anu.Component</code>, always must implement <code>render()</code> method!
- If the component receives <code>props</code> and you want to do additional settings inside the constructor (e.g. binding handlers or setting up initial state),
<code>super(props)</code> should always be the first call inside the <code>constructor(props)</code>!
- You can use <code>setState()</code> to re-render the component.
It takes <strong>ONE</strong> argument which can either be:
    - A <code>state</code> object which will be merged with the old state
    - A <code>setStateCallback</code> function which takes the actual <code>state</code> and <code>props</code> as arguments (useful if <code>state</code> and <code>props</code> were updated asynchronously) and returns the new <code>state</code> value.

        ```typescript
        type SetStateCallbackType<S, P> = (prevState: S, props: P) => S;
        setState(partialState: Partial<S> | SetStateCallbackType<S, P>): void;
        ```

- <strong>NEVER</strong> use <code>setState()</code> in <code>constructor()</code> or <code>componentWillUnmount()</code>!
- The <code>setState()</code> can be called in <code>componentDidMount()</code> and <code>componentDidUpdate()</code>, but only in condition - as you would do in React

    ```typescript
    import Anu, { Props, AnuElement, Component } from 'anu-verzum';

    interface MyProps extends Props {
        // declare your props here
    }
    // Plain-type alternative: type MyProps = { /* your props */ };

    interface MyState {
        // declare your state shape here
    }

    class ClassComponent extends Component<MyProps, MyState> {
        constructor(props: MyProps) {
            super(props);
            // ALWAYS bind methods if passed down to component / HTML element because of "this" keyword:
            this.customMethodName = this.customMethodName.bind(this);
            // Set initial state:
            this.state = { /* ... */ };
        }
        // Lifecycle-methods:
        componentDidMount(): void {
            /**
             *  - Will be called after mounting - if component is inserted in the tree within this loop
             *  - Call "setState()"
             *  - Set up subscriptions -- Destroy them in "componentWillUnmount()"!
             *  - Instantiate network request (load data)
             */
        }
        componentDidUpdate(prevProps: MyProps, prevState: MyState): void {
            /**
             *  - Will be called after mounting - if component is updated within this loop
             *  - Call "setState()" -- Only in condition!
             */
        }
        componentWillUnmount(): void {
            /**
             *  - Will be called before component is removed from the tree
             *  - Perform necessary cleanup -- destroy subscriptions set in "componentDidMount()"!
             */
        }
        // Custom method:
        customMethodName(): void {
            /**
             *  - "setState()" can be used.
             *  - Possible params for "setState()":
             *    - partialState -- object | callback -- The new state object or a callback with params "prevState" and "prevProps"
             */
        }
        render(): AnuElement {
            return (
                <HTMLElement_inline-SVGElement_or_Component
                    onCustomEvent={this.customMethodName}
                />
            );
        }
    }
    ```

<h3 id="rendering-props">Rendering props</h3>

- To render props, store an HTML element, inline-SVG element or component in a variable and when rendering, insert it, e.g.:

    ```typescript
    interface TextProps extends Props {
        text: string;
    }
    // Plain-type alternative: type TextProps = { text: string; };

    const PropsRenderer1 = ({ children }: Props): AnuElement => <div>{children}</div>;
    // Short syntax:
    const PropsRenderer2 = ({ text }: TextProps): AnuElement => <p>{text}</p>;
    ```

<h3 id="wrapper-components-and-sub-components">Wrapper components and related sub-components</h3>

- The approach is the following:
    - First, create a wrapper component which will render its <code>props.children</code>, for example.
    - Then, create wrapped / sub-components.
    - Add the sub-component to the wrapper as a property.

        ```typescript
        // Declare the wrapper type so TypeScript knows about the .Elem sub-component:
        interface ElemWrapperComponent {
            (props: Props): AnuElement;
            Elem: (props: Props) => AnuElement;
        }

        // Wrapper element
        const ElemWrapper = (({ children }: Props): AnuElement => <div>{children}</div>) as ElemWrapperComponent;
        // Sub-component
        ElemWrapper.Elem = ({ children }: Props): AnuElement => <p>{children}</p>;
        // Usage:
        <ElemWrapper>
            <ElemWrapper.Elem>
                Lorem Ipsum Dolor...
            </ElemWrapper.Elem>
            <ElemWrapper.Elem>
                Lorem Ipsum Dolor...
            </ElemWrapper.Elem>
        </ElemWrapper>
        ```

<h3 id="array-rendering">Rendering array</h3>

- When rendering array, you don't return a nested structure but rather an array of elements / components, e.g.:

    ```typescript
    interface ParagraphsProps extends Props {
        firstParagraph: string;
        secondParagraph: string;
    }
    // Plain-type alternative: type ParagraphsProps = { firstParagraph: string; secondParagraph: string; };

    const ArrayRenderer = ({ firstParagraph, secondParagraph }: ParagraphsProps): AnuElement[] => [
        <p>{firstParagraph}</p>,
        <p>{secondParagraph}</p>
    ];

    const ArrayRendererWrapper = ({ firstParagraph, secondParagraph }: ParagraphsProps): AnuElement => (
        <div>
            <ArrayRenderer
                firstParagraph={firstParagraph}
                secondParagraph={secondParagraph}
            />
        </div>
    );
    ```

<h3 id="avoiding-unnecessary-wrapper-elements">Avoiding unnecessary wrapper elements</h3>

- It is useful when you have a list of properties you want to loop through and render them (i.e. not in a nested structure but rather one after the other) but you don't want an extra <code>&lt;div /&gt;</code> element to be rendered.
- Both syntaxes below are equivalent — use whichever you prefer:
    - <code>&lt;Anu.Fragment&gt;...&lt;/Anu.Fragment&gt;</code> — explicit form
    - <code>&lt;&gt;...&lt;/&gt;</code> — shorthand form (available when using the <code>anu-verzum/babel-preset</code>)

    ```typescript
    interface ListProps extends Props {
        somethingToLoop: string[];
    }
    // Plain-type alternative: type ListProps = { somethingToLoop: string[]; };

    // Explicit form:
    const ElemList = ({ somethingToLoop }: ListProps): AnuElement => (
        <Anu.Fragment>
            {somethingToLoop.map((prop, i) => <li key={`list-item-${i}`}>{prop}</li>)}
        </Anu.Fragment>
    );

    // Shorthand form — identical result:
    const ElemList = ({ somethingToLoop }: ListProps): AnuElement => (
        <>
            {somethingToLoop.map((prop, i) => <li key={`list-item-${i}`}>{prop}</li>)}
        </>
    );

    // Usage:
    const OrderedElemList = (): AnuElement => {
        const somethingToLoop: string[] = ['Coffee', 'Tea', 'Pálinka'];
        return (
            <div>
                <h4>Ordered list:</h4>
                <ol>
                    <ElemList somethingToLoop={somethingToLoop} />
                </ol>
            </div>
        );
    };
    ```

<h3 id="list-keys">Keys for dynamic lists</h3>

- Add a <code>key</code> prop to each element in a dynamically rendered list. Keys allow the reconciler to match elements across renders by identity rather than position, so items that move, are inserted, or are removed do not cause unrelated siblings to lose their state or be recreated unnecessarily.
- A key must be unique among siblings. Use a stable, unique identifier from your data (such as a database ID). Only fall back to the array index when the list never reorders and items are never inserted in the middle.

    ```typescript
    interface Item {
        id: string;
        label: string;
    }

    interface ItemListProps extends Props {
        items: Item[];
    }
    // Plain-type alternative: type ItemListProps = { items: Item[]; };

    // Stable IDs — preferred:
    const ItemList = ({ items }: ItemListProps): AnuElement => (
        <ul>
            {items.map(({ id, label }) => (
                <li key={id}>{label}</li>
            ))}
        </ul>
    );

    // Index fallback — only when order never changes:
    const StaticList = ({ items }: ItemListProps): AnuElement => (
        <ul>
            {items.map(({ label }, i) => (
                <li key={`list-item-${i}`}>{label}</li>
            ))}
        </ul>
    );
    ```

<h3 id="refs">The refs</h3>

- In most cases, there is no need to use refs to manage (HTML) sub-components from the parent (class) component.
However, there are some cases
(e.g. focusing an input element after it has been mounted,
uploading files using a custom uploader button,
handling onclick event outside of a given element, etc.)
when you want to imperatively modify a child outside of the typical dataflow.
- Refs can <strong>ONLY BE CREATED IN CLASS COMPONENTS</strong> but can be passed as prop - use different name then!
- Set <code>ref</code> attribute / property <strong>ONLY ON HOST COMPONENT</strong>!

    <strong>Example</strong> - <i>focusing an input element</i>:

    ```typescript
    import Anu, { Props, AnuElement, Component, Ref } from 'anu-verzum';

    class RefTestClass extends Component {
        input: Ref<HTMLInputElement>;

        constructor(props: Props) {
            super(props);
            this.input = Anu.createRef<HTMLInputElement>();
        }
        componentDidMount(): void {
            this.input.current!.focus();
        }
        render(): AnuElement {
            return (
                <label>
                    <input ref={this.input} />
                </label>
            );
        }
    }
    ```

    <strong>Example</strong> - <i>file uploader with preview</i>:

    ```typescript
    interface FilePreview {
        name: string;
        file: File;
    }

    interface FileUploaderState {
        files: FilePreview[];
    }

    class FileUploader extends Component<Props, FileUploaderState> {
        fileInput: Ref<HTMLInputElement>;

        constructor(props: Props) {
            super(props);
            this.fileInput = Anu.createRef<HTMLInputElement>();
            this.state = {
                files: []
            };
            this.uploadFiles = this.uploadFiles.bind(this);
            this.handleFileUploaderClick = this.handleFileUploaderClick.bind(this);
        }
        handleFileUploaderClick(): void {
            this.fileInput.current!.click();
        }
        uploadFiles({ target }: { target: HTMLInputElement }): void {
            const nextState: FileUploaderState = { files: [] };
            for (let i = 0; i < target.files!.length; i++) {
                nextState.files.push({
                    // Creates a name for preview.
                    // Use it as 'src' attribute value in image:
                    name: URL.createObjectURL(target.files![i]),
                    file: target.files![i]
                });
            }
            this.setState(nextState);
        }
        render(): AnuElement {
            const { files } = this.state;
            return (
                <Anu.Fragment>
                    <button
                        className="my-fancy-uploader-button"
                        onClick={this.handleFileUploaderClick}
                    >
                        Feltöltés
                    </button>
                    <input
                        type="file"
                        ref={this.fileInput}
                        multiple
                        onChange={this.uploadFiles}
                        style={{ display: 'none' }}
                    />
                    <ul>
                        {files.length > 0 && files.map(({ name, file }) => (
                            <li key={name}>
                                <img src={name} alt={`Uploaded file name: ${file.name}, type: ${file.type}, size: ${file.size}`} />
                            </li>
                        ))}
                    </ul>
                </Anu.Fragment>
            );
        }
    }
    ```

    <strong>Example</strong> - <i>handling <code>onClick</code> event outside of the referenced element</i>:

    ```typescript
    interface ClickOutsideState {
        show: boolean;
    }

    class ClickOutsideComponent extends Component<Props, ClickOutsideState> {
        myRef: Ref<HTMLDivElement>;

        constructor(props: Props) {
            super(props);
            this.state = { show: true };
            this.myRef = Anu.createRef<HTMLDivElement>();
            this.handleClickOutside = this.handleClickOutside.bind(this);
        }
        componentDidMount(): void {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
        componentWillUnmount(): void {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
        handleClickOutside({ target }: MouseEvent): void {
            if (this.myRef.current && !this.myRef.current.contains(target as Node)) {
                this.setState({ show: false });
            }
        }
        render(): AnuElement | null {
            const { show } = this.state;
            return show ? (
                <div ref={this.myRef}>
                    Content will be hidden after you click outside of this box
                </div>
            ) : null;
        }
    }
    ```

    <strong>Example</strong> - <i>drag-and-drop todo list</i>:

    ```typescript
    const TODO_STATUS = {
        PENDING: 'pending' as const,
        COMPLETED: 'completed' as const
    };

    type TodoStatus = typeof TODO_STATUS[keyof typeof TODO_STATUS];

    interface TodoItem {
        name: string;
        status: TodoStatus;
    }

    interface DraggableTodoListState {
        todoList: TodoItem[];
    }

    class DraggableTodoList extends Component<Props, DraggableTodoListState> {
        constructor(props: Props) {
            super(props);
            this.state = {
                todoList: [
                    { name: 'Coding', status: TODO_STATUS.PENDING },
                    { name: 'German course', status: TODO_STATUS.PENDING },
                    { name: 'Mathematics course', status: TODO_STATUS.PENDING },
                    { name: 'Training', status: TODO_STATUS.PENDING },
                    { name: 'Physics course', status: TODO_STATUS.COMPLETED }
                ]
            };
            this.handleDragStart = this.handleDragStart.bind(this);
            this.handleDragOver = this.handleDragOver.bind(this);
            this.handleDrop = this.handleDrop.bind(this);
        }
        handleDragStart({ dataTransfer }: DragEvent, taskName: string): void {
            dataTransfer!.setData('id', taskName);
        }
        handleDragOver(event: DragEvent): void {
            event.preventDefault();
        }
        handleDrop({ dataTransfer }: DragEvent, status: TodoStatus): void {
            const { todoList } = this.state;
            const id = dataTransfer!.getData('id');
            const list = todoList.map(task => {
                if (task.name === id) {
                    task.status = status;
                }
                return task;
            });
            this.setState({ todoList: list });
        }
        render(): AnuElement {
            const { todoList } = this.state;
            const todoStatus = {
                [TODO_STATUS.PENDING]: [],
                [TODO_STATUS.COMPLETED]: []
            };
            todoList.forEach(task => {
                todoStatus[task.status].push(
                    <div
                        key={task.name}
                        draggable
                        className="todoListItem"
                        onDragStart={event => this.handleDragStart(event, task.name)}
                    >
                        {task.name}
                    </div>
                );
            });
            return (
                <div className="todoListContainer">
                    <div
                        className="todoListContent"
                        onDragOver={this.handleDragOver}
                        onDrop={event => this.handleDrop(event, TODO_STATUS.PENDING)}
                    >
                        <h4>
                            <Anu.Intl.FormattedMessage id="proba.task.pending" defaultMessage="proba.task.pending" />:
                        </h4>
                        {todoStatus[TODO_STATUS.PENDING]}
                    </div>
                    <div
                        className="todoListContent"
                        onDragOver={this.handleDragOver}
                        onDrop={event => this.handleDrop(event, TODO_STATUS.COMPLETED)}
                    >
                        <h4>
                            <Anu.Intl.FormattedMessage id="proba.task.completed" defaultMessage="proba.task.completed" />:
                        </h4>
                        {todoStatus[TODO_STATUS.COMPLETED]}
                    </div>
                </div>
            );
        }
    }
    ```

    <strong>Example</strong> - <i>infinite scroll</i>:

    ```typescript
    interface Photo {
        url: string;
        albumId: number;
    }

    interface PhotosResponse {
        data: Photo[];
    }

    interface ScrollComponentState {
        photos: Photo[];
        loading: boolean;
        page: number;
        prevY: number;
    }

    class ScrollComponent extends Component<Props, ScrollComponentState> {
        loadingRef: Ref<HTMLDivElement>;
        observer?: IntersectionObserver;

        constructor(props: Props) {
            super(props);
            this.state = { photos: [], loading: false, page: 0, prevY: 0 };
            this.loadingRef = Anu.createRef<HTMLDivElement>();
            this.handleObserver = this.handleObserver.bind(this);
            this.getPhotos = this.getPhotos.bind(this);
        }
        getPhotos(page: number): void {
            this.setState({ loading: true });
            Anu
                .ServerAPI
                .get<PhotosResponse>('/app/my/server/url', { page, limit: 10 })
                .then(({ response }) => {
                    const photos = response?.data ?? [];
                    this.setState({ photos: [...this.state.photos, ...photos] });
                    this.setState({ loading: false });
                });
        }
        componentDidMount(): void {
            this.getPhotos(this.state.page);
            const options: IntersectionObserverInit = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            };
            this.observer = new IntersectionObserver(this.handleObserver, options);
            this.observer.observe(this.loadingRef.current!);
        }
        handleObserver(entities: IntersectionObserverEntry[]): void {
            const y = entities[0].boundingClientRect.y;
            if (this.state.prevY > y) {
                const lastPhoto = this.state.photos[this.state.photos.length - 1];
                const curPage = lastPhoto.albumId;
                this.getPhotos(curPage);
                this.setState({ page: curPage });
            }
            this.setState({ prevY: y });
        }
        render(): AnuElement {
            const loadingCSS = { height: '100px', margin: '30px' };
            const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
            return (
                <div className="container">
                    <div style={{ minHeight: '800px' }}>
                        {this.state.photos.map(user => (
                            <img key={user.url} src={user.url} height="100px" width="200px" />
                        ))}
                    </div>
                    <div ref={this.loadingRef} style={loadingCSS}>
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>
            );
        }
    }
    ```

    <strong>Example</strong> - <i>laser pointer</i>:

    ```typescript
    const canvasStyle: Partial<CSSStyleDeclaration> = {
        height: '500px',
        width: '100%',
        border: '1px solid black'
    };
    const laserPointerStyle: Partial<CSSStyleDeclaration> = {
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: '0.6',
        pointerEvents: 'none',
        left: '-20px',
        top: '-20px',
        width: '40px',
        height: '40px',
        zIndex: '10'
    };

    interface LaserPointerState {
        layerX: number;
        layerY: number;
    }

    class LaserPointer extends Component<Props, LaserPointerState> {
        constructor(props: Props) {
            super(props);
            this.state = { layerX: 0, layerY: 0 };
            this.handleMove = this.handleMove.bind(this);
        }
        handleMove({ layerX, layerY }: MouseEvent & { layerX: number; layerY: number }): void {
            this.setState({ layerX, layerY });
        }
        render(): AnuElement {
            const { layerX, layerY } = this.state;
            return (
                <div style={canvasStyle} onMouseMove={this.handleMove}>
                    <div
                        id="laser-pointer"
                        style={{
                            ...laserPointerStyle,
                            transform: `translate(${layerX}px, ${layerY}px)`
                        }}
                    />
                </div>
            );
        }
    }
    ```

    <strong>Example</strong> - <i>paint application with preview (image can be saved as PNG) with <code>canvas</code> API</i>:

    ```typescript
    const canvasHeight = 500;
    const canvasWidth = 975;
    const canvasContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center'
    };
    const drawArea = {
        width: '100%',
        height: '552px',
        border: '1px solid #808080',
        position: 'relative',
        backgroundColor: 'white'
    };
    const canvasMenuStyle = {
        width: '650px',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-evenly',
        borderRadius: '5px',
        alignItems: 'center',
        backgroundColor: '#a3a3a32d',
        margin: '0 auto'
    };
    const canvas = {
        height: `${canvasHeight}px`,
        width: `${canvasWidth}px`,
        cursor: 'crosshair'
    };
    const imgStyle = {
        height: `${canvasHeight}px`,
        width: `${canvasWidth}px`,
        border: '1px solid black'
    };
    const BRUSH_MODES = {
        PEN: 'Pen' as const,
        ERASER: 'Eraser' as const
    };

    type BrushMode = typeof BRUSH_MODES[keyof typeof BRUSH_MODES];

    interface CanvasState {
        isDrawing: boolean;
        lineWidth: number;
        lineColor: string;
        lineOpacity: number;
        brushMode: BrushMode;
        dataUrl?: string;
    }

    class Canvas extends Component<Props, CanvasState> {
        canvasRef: Ref<HTMLCanvasElement>;
        ctxRef: Ref<CanvasRenderingContext2D>;
        imageRef: Ref<HTMLImageElement>;

        constructor(props: Props) {
            super(props);
            this.state = {
                isDrawing: false,
                lineWidth: 1,
                lineColor: 'black',
                lineOpacity: 1,
                brushMode: BRUSH_MODES.PEN,
                dataUrl: undefined
            };
            this.canvasRef = Anu.createRef<HTMLCanvasElement>();
            this.ctxRef = Anu.createRef<CanvasRenderingContext2D>();
            this.imageRef = Anu.createRef<HTMLImageElement>();
            this._reRender = this._reRender.bind(this);
            this.startDrawing = this.startDrawing.bind(this);
            this.endDrawing = this.endDrawing.bind(this);
            this.draw = this.draw.bind(this);
            this.setLineWidth = this.setLineWidth.bind(this);
            this.setLineColor = this.setLineColor.bind(this);
            this.setOpacity = this.setOpacity.bind(this);
            this.setBrushMode = this.setBrushMode.bind(this);
            this.handleSave = this.handleSave.bind(this);
        }
        _reRender(): void {
            const { lineWidth, lineColor, lineOpacity } = this.state;
            const canvasContext = this.canvasRef.current?.getContext('2d');
            if (!canvasContext) return;
            canvasContext.lineCap = "round";
            canvasContext.lineJoin = "round";
            canvasContext.globalAlpha = lineOpacity;
            canvasContext.strokeStyle = lineColor;
            canvasContext.lineWidth = lineWidth;
            this.ctxRef.current = canvasContext;
        }
        componentDidMount(): void {
            this._reRender();
        }
        componentDidUpdate(): void {
            this._reRender();
        }
        startDrawing(event: MouseEvent): void {
            const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.ctxRef.current!.beginPath();
            this.ctxRef.current!.moveTo(x, y);
            this.setState({ isDrawing: true });
        }
        endDrawing(): void {
            this.setState({ isDrawing: false });
        }
        draw(event: MouseEvent): void {
            const { lineWidth, brushMode, isDrawing } = this.state;
            if (!isDrawing) return;
            const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            if (brushMode === BRUSH_MODES.PEN) {
                this.ctxRef.current!.lineTo(x, y);
                this.ctxRef.current!.stroke();
            } else {
                this.ctxRef.current!.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
            }
        }
        setLineWidth({ target }: { target: HTMLInputElement }): void {
            this.setState({ lineWidth: Number(target.value) });
        }
        setLineColor({ target }: { target: HTMLInputElement }): void {
            this.setState({ lineColor: target.value });
        }
        setOpacity({ target }: { target: HTMLInputElement }): void {
            this.setState({ lineOpacity: Number(target.value) / 100 });
        }
        setBrushMode(): void {
            this.setState(prevState => ({
                ...prevState,
                brushMode: prevState.brushMode === BRUSH_MODES.PEN ? BRUSH_MODES.ERASER : BRUSH_MODES.PEN
            }));
        }
        handleSave(): void {
            const dataUrl = this.canvasRef.current!.toDataURL();
            this.setState({ dataUrl });
        }
        render(): AnuElement {
            const {
                lineWidth,
                lineColor,
                lineOpacity,
                brushMode,
                dataUrl
            } = this.state;
            return (
                <div style={canvasContainer}>
                    <h1>Paint App</h1>
                    <div style={drawArea}>
                        <div style={canvasMenuStyle}>
                            <label>
                                Brush Color
                                <input
                                    type="color"
                                    value={lineColor}
                                    onChange={this.setLineColor}
                                />
                            </label>
                            <label>
                                Brush Width
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={lineWidth}
                                    onChange={this.setLineWidth}
                                />
                            </label>
                            <label>
                                Brush Opacity
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={lineOpacity * 100}
                                    onChange={this.setOpacity}
                                />
                            </label>
                            <label>
                                Selected brush type:
                                <button onClick={this.setBrushMode}>
                                    {brushMode}
                                </button>
                            </label>
                            <button onClick={this.handleSave}>Save</button>
                        </div>
                        <canvas
                            style={canvas}
                            onMouseDown={this.startDrawing}
                            onMouseUp={this.endDrawing}
                            onMouseMove={this.draw}
                            ref={this.canvasRef}
                            height={canvasHeight}
                            width={canvasWidth}
                        />
                        <img
                            style={imgStyle}
                            src={dataUrl}
                            ref={this.imageRef}
                        />
                    </div>
                </div>
            );
        }
    }
    ```
    
<h3 id="rendering-application">Rendering your application</h3>

- Select an existing HTML element (typically having <code>id</code> as "root" or "app") and use the <code>Anu.render()</code> method which takes two arguments:
    - The first one is the component you want to add to the DOM tree.
    - The second one is a valid HTML element already in the DOM tree, to which you want to attach your component.

        ```typescript
        const ID = 'root';
        Anu.render(
            <App />,
            document.getElementById(ID) as Element
        );
        ```

<br>

<h2 id="history-api">Routing - <strong>The History API</strong></h2>

<h3 id="linking-and-routing">Linking and routing</h3>

- You can use <code>&lt;Anu.History.Link /&gt;</code> elements those work just like "normal" links but without the reload of the page:
    - The <code>&lt;Anu.History.Link /&gt;</code> element has a <code>to</code> prop. When clicking on it, its <code>to</code> prop will be matched against the <code>path</code> prop of <code>&lt;Anu.History.Route /&gt;</code>.
- Use the <code>&lt;Anu.History.Route /&gt;</code> component that takes a <code>path</code> argument and if the link you clicked matches the <code>path</code>, it will render the attached component:
    - The <code>&lt;Anu.History.Route /&gt;</code> component has a <code>path</code> prop to match against the URL. If it has an <code>exact</code> prop, it doesn't allow partial matching.
    - The <code>&lt;Anu.History.Route /&gt;</code> can also have a <code>component</code> (must be a component) or a <code>render</code> prop (it must be a function that returns a component).

        ```typescript
        import Anu, { AnuElement, Props } from 'anu-verzum';

        interface RouteMatch { path: string | null; url: string; isExact: boolean; }

        const Home = (): AnuElement => <h2>Home</h2>;
        const About = (): AnuElement => <h2>About</h2>;

        interface TopicProps extends Props { topicId: string; }
        const Topic = ({ topicId }: TopicProps): AnuElement => <h3>{topicId}</h3>;

        interface TopicsProps extends Props { match: RouteMatch; }
        const Topics = ({ match }: TopicsProps): AnuElement => {
            const items: Array<{ name: string; slug: string }> = [
                { name: 'Rendering with React', slug: 'rendering' },
                { name: 'Components', slug: 'components' },
                { name: 'Props v. State', slug: 'props-v-state' }
            ];
            return (
                <div>
                    <h2>Topics</h2>
                    <ul>
                        {items.map(({ name, slug }) => (
                            <li key={slug}>
                                <Anu.History.Link to={`${match.url}/${slug}`}>{name}</Anu.History.Link>
                            </li>
                        ))}
                    </ul>
                    {items.map(({ name, slug }) => (
                        <Anu.History.Route key={slug} path={`${match.path ?? ''}/${slug}`} render={() => (
                            <Topic topicId={name} />
                        )} />
                    ))}
                    <Anu.History.Route exact path={match.url} render={() => (
                        <h3>Please select a topic.</h3>
                    )} />
                </div>
            );
        };
        // Usage in application:
        const RouterApp = (): AnuElement => (
            <div>
                <ul>
                    <li><Anu.History.Link to="/">Home</Anu.History.Link></li>
                    <li><Anu.History.Link to="/about">About</Anu.History.Link></li>
                    <li><Anu.History.Link to="/topics">Topics</Anu.History.Link></li>
                </ul>
                <hr />
                <Anu.History.Route exact path="/" component={Home} />
                <Anu.History.Route path="/about" component={About} />
                <Anu.History.Route path="/topics" component={Topics} />
            </div>
        );
        ```

<h3 id="redirecting-with-history-redirect">Redirecting - <strong>The <code>&lt;Anu.History.Redirect /&gt;</code> component</strong></h3>

- If the user needs to be redirected (e.g. if not logged in), use the <code>&lt;Anu.History.Redirect /&gt;</code> component:
    - The <code>&lt;Anu.History.Redirect /&gt;</code> takes a <code>to</code> (URL) and an optional <code>push</code> (boolean) argument.<br>
    This will tell the System to render the component which can be found on the <code>to</code> URL (which is basically an <code>&lt;Anu.History.Route /&gt;</code> which will render the corresponding component).
    If <code>push</code> is present, it will push the URL into the <strong>History API</strong> instead of replacing the current one.

        ```typescript
        declare const loggedIn: boolean;

        const RouteredApp = (): AnuElement => (
            // ...
            <Anu.History.Route
                path="/something"
                render={() => {
                    if (loggedIn) {
                        return <MainPageComponent />;
                    } else {
                        return <Anu.History.Redirect to="/" push />;
                    }
                }}
            />
        );
        ```

<h3 id="redirecting-with-history-goto">Redirecting from within the code - <strong>The <code>Anu.History.goTo()</code> method</strong></h3>

- If you need to call a route from a function, use the <code>Anu.History.goTo()</code> function.
    - It takes a <code>path</code> string argument.
    If not specified, it will use its default path (<code>'/'</code>).
    - Optionally, it can take a <code>replace</code> boolean argument.
    If set to <code>true</code>, it will replace the current URL. By default, it pushes into the History API.
    - Please only use <code>Anu.History.goTo()</code> if you need to redirect user inside the code based on functionality (like in <code>if</code> statement) for accessibility reasons.

        ```typescript
        // Pushes URL into History API by default:
        Anu.History.goTo('/about');
        // Replaces current URL with the 'path' argument in History API:
        Anu.History.goTo('/about', true);
        ```

<h3 id="reading-url-parameters">Reading URL parameters - <strong><code>Anu.History.getUrlParams()</code> and <code>Anu.History.getAllUrlParamNames()</code></strong></h3>

URLs are expected to follow the REST resource-path convention:

```
/{noun-plural}/{id}/{noun-plural}/{id}/...
```

The router parses the current pathname into named parameters by singularizing each noun segment and appending `Id`.
A trailing action segment (odd-length path) is ignored.

| URL | Extracted params |
|---|---|
| `/products` | `{}` |
| `/products/a3f8c2d1` | `{ productId: 'a3f8c2d1' }` |
| `/users/asdf1234/products` | `{ userId: 'asdf1234' }` |
| `/users/asdf1234/products/ghjk5678` | `{ userId: 'asdf1234', productId: 'ghjk5678' }` |
| `/users/asdf1234/products/ghjk5678/delete` | `{ userId: 'asdf1234', productId: 'ghjk5678' }` |

- **`Anu.History.getUrlParams(key)`** — returns the value of the named URL parameter derived from the current pathname, or `null` if the key is not present.
- **`Anu.History.getAllUrlParamNames()`** — returns an array of all parameter key names extractable from the current pathname. Useful for development and debugging.

    ```typescript
    // URL: /users/asdf1234/products/ghjk5678
    Anu.History.getUrlParams('userId');       // → 'asdf1234'
    Anu.History.getUrlParams('productId');    // → 'ghjk5678'
    Anu.History.getUrlParams('orderId');      // → null

    Anu.History.getAllUrlParamNames();        // → ['userId', 'productId']
    ```

<br>

<h2 id="server-api">Calling the server asynchronously - <strong>The Server API</strong></h2>

The <code>Anu.ServerAPI</code> is basically built on top of <code>Promise</code> and currently has 5 methods <code>get()</code>, <code>post()</code>, <code>put()</code>, <code>delete()</code> and <code>file()</code>.

The <code>.catch()</code> callback receives <code>{ status, response }</code> where <code>response</code> is always <code>null</code> on failure. <code>status</code> is the HTTP status code for server-side errors (e.g. <code>404</code>, <code>500</code>) and <code>0</code> for network-level failures such as no internet connection, DNS error, or a CORS rejection (i.e. no HTTP response was received at all).

```typescript
Anu
    .ServerAPI
    .get<MyItem>('/app/my-server-url/1234')
    .then(({ response }) => {
        // response is MyItem | null
    })
    .catch(({ status }) => {
        if (status === 0) {
            // Network-level failure — no response was received.
            // Show a "check your connection" message to the user.
        } else if (status === 401) {
            // Server responded with 401 Unauthorized — redirect to login.
            Anu.History.goTo('/login');
        } else if (status === 404) {
            // Server responded with 404 Not Found.
        } else {
            // Any other HTTP error (403, 500, etc.).
        }
    });
```

<h3 id="configure-base-url">Configuring the base URL</h3>

Call <code>Anu.ServerAPI.configure()</code> once at app startup to set a base URL. All subsequent calls that use a relative URL will have the base URL prepended automatically. Absolute URLs (starting with <code>http://</code> or <code>https://</code>) are passed through unchanged.

```typescript
Anu.ServerAPI.configure({ baseURL: 'http://localhost:3001' });

// These now resolve to 'http://localhost:3001/api/products':
Anu.ServerAPI.get('/api/products');
Anu.ServerAPI.post('/api/login', body);
```

Combined with `webpack.DefinePlugin`, the same call sites work across all environments without changes. In `webpack.config.js`:

```js
const webpack = require('webpack');

module.exports = require('anu-verzum/webpack.config')(__dirname, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3001')
        })
    ]
});
```

Then configure once at app startup:

```typescript
Anu.ServerAPI.configure({ baseURL: process.env.API_URL });
```

The name `API_URL` is arbitrary — it just has to match the key used in `DefinePlugin` (`process.env.API_URL`) and in `configure()`. Setting it inline in npm scripts is the most portable approach; install `cross-env` to make it work on Windows as well:

```bash
npm install --save-dev cross-env
```

```json
{
    "scripts": {
        "start": "cross-env API_URL=http://localhost:3001 webpack serve",
        "build": "cross-env API_URL=https://api.example.com webpack --mode production"
    }
}
```

This is not a `.env` file — `cross-env` sets the variable directly in the process environment before webpack runs, and `DefinePlugin` reads it at build time and bakes the value into the bundle as a string literal.

<h3 id="get-and-delete-methods">The <strong>GET</strong> and <strong>DELETE</strong> HTTP methods</h3>

- The <code>Anu.ServerAPI.get()</code> and <code>Anu.ServerAPI.delete()</code> perform a <strong>GET</strong> or <strong>DELETE</strong> HTTP method respectively to get data from the server or delete a specific data from the server
(usually referenced by an <code>id</code> attribute in both cases but not necessarily when using <strong>GET</strong>).<br>
They are faster than the <strong>POST</strong> or <strong>PUT</strong> HTTP methods but lack the security as well.
- Can take a <code>url</code> (string)
  - <strong>MUST ALWAYS START WITH "<code>/app</code>"!</strong>
  - If it contains <strong>whitespace</strong> characters, those will be replaced with <code>_</code>.
- Can also take an optional <code>params</code> (object) argument
- Returns a <code>Promise</code> object.
You can send params within the URL <strong>AND/OR</strong> as URI query parameters, e.g.:

    ```typescript
    interface MyItem {
        id: string;
        name: string;
    }

    const passedValueForGet = '1234'; // Represents an ID...
    const paramsForGet = { key: 'value', nextKey: 'nextValue' };
    // In this case, the XHR URL will be `/app/my-server-url/1234?key=value&nextKey=nextValue`:
    Anu
        .ServerAPI
        .get<MyItem>(`/app/my-server-url/${passedValueForGet}`, paramsForGet)
        .then(({ response }) => { /* response is MyItem | null */ })
        .catch(({ status }) => { /* status is number */ });

    const passedValueForDelete = '1234'; // Represents an ID...
    // In this case, the XHR URL will be `/app/my-server-url/1234`:
    Anu
        .ServerAPI
        .delete<void>(`/app/my-server-url/${passedValueForDelete}`)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* status is number */ });
    ```

<h3 id="post-and-put-methods">The <strong>POST</strong> and <strong>PUT</strong> HTTP methods</h3>

- The <code>Anu.ServerAPI.post()</code> and <code>Anu.ServerAPI.put()</code> perform an <strong>POST</strong> or <strong>PUT</strong> HTTP method respectively to send large data to the server and optionally get other data back.
- It takes a <code>url</code> (string) and a <code>data</code> (object) argument and returns a <code>Promise</code> object:

    ```typescript
    interface CreateItemRequest {
        name: string;
    }

    interface CreateItemResponse {
        id: string;
        name: string;
    }

    const dataForPost: CreateItemRequest = { name: 'My Item' };
    Anu
        .ServerAPI
        .post<CreateItemResponse>('/app/my-server-url/', dataForPost)
        .then(({ response }) => { /* response is CreateItemResponse | null */ })
        .catch(({ status }) => { /* status is number */ });

    const passedValue = '1234'; // Represents an ID...
    const dataForPut: Partial<CreateItemRequest> = { name: 'Updated Name' };
    Anu
        .ServerAPI
        .put<CreateItemResponse>(`/app/my-server-url/${passedValue}`, dataForPut)
        .then(({ response }) => { /* response is CreateItemResponse | null */ })
        .catch(({ status }) => { /* status is number */ });
    ```

<h3 id="file-method">The <strong>FILE</strong> HTTP method</h3>

- The <code>Anu.ServerAPI.file()</code> performs a POST HTTP method and encodes one or more files to send them to the server.
- It takes an <code>url</code> (string), a <code>file</code> (one <code>File</code> object or an <strong>ARRAY</strong> of <code>File</code> objects) argument and an optional <code>data</code> (object) and returns a <code>Promise</code> object:

    ```typescript
    interface UploadResponse {
        fileUrl: string;
    }

    const data: Record<string, string> = { category: 'documents' };
    const file: File = /* ... */ new File([], 'example.pdf');
    Anu
        .ServerAPI
        .file<UploadResponse>('/app/my-server-url/', file, data)
        .then(({ response }) => { /* response is UploadResponse | null */ })
        .catch(({ status }) => { /* status is number */ });
    ```

<br>

<h2 id="anulytics-api">Tracking users - <strong>The Anulytics API</strong></h2>

<strong><code>&lt;ANUVerzum /&gt;</code> JS Framework</strong> comes with its built-in analytics tool.<br>
Every tracked event (user interaction, navigation, state change, page leave) is sent to your server immediately as an individual HTTP POST request.
- It has two public interfaces: <code>&lt;Anu.Anulytics.Provider /&gt;</code> and <code>Anu.Anulytics.trackEvent()</code>.
- In order to use the built-in analytics tool, you must wrap all your components you want to track within <code>&lt;Anu.Anulytics.Provider /&gt;</code> component
(without this, you can't use <code>Anu.Anulytics.trackEvent()</code> event tracker functionality).

<h3 id="anulytics-provider">Wrapping up your front-end project within the <code>&lt;Anu.Anulytics.Provider /&gt;</code> component</h3>

- This component configures the analytics endpoint and sends each tracked event to the server as an individual HTTP POST request. It can have only one child element.
- Every event — initialization, navigation, user action, state change, or page leave — is sent immediately when it occurs.
- It takes 4 properties:
    - <code>analyticsUrl</code>, which is a string that represents the URL of the server you want to send the data you collected.
    - <code>userData</code> is an object of data about the user.
    Make sure that you ask for permissions from the end-users and build the <code>userData</code> object accordingly in order to stay GDPR-compliant.
    Always ask permission from the end-user, highlighting the types of data you wish to use.
    - <code>onSuccess</code> callback is a custom callback function that will be fired when data transmission ended successfully.
    - <code>onFail</code> callback is a custom callback function that will be fired when data transmission failed.

        ```typescript
        declare const analyticsUrl: string;
        declare const userData: Record<string, unknown>;
        declare const handleSuccess: (response: unknown) => void;
        declare const handleFail: (status: number) => void;

        const App = (): AnuElement => (
            <Anu.Anulytics.Provider analyticsUrl={analyticsUrl} userData={userData} onSuccess={handleSuccess} onFail={handleFail}>
                <Your_Site_Goes_Here />
            </Anu.Anulytics.Provider>
        );
        ```

    - Each POST body sent to the server has the following shape — one event per request:

        ```typescript
        type EventKey = 'initialization' | 'navigation' | 'userAction' | 'stateChange' | 'pageLeave';

        type PostBody = {
            startDate: number;              // module-load timestamp — session identifier
            user: Record<string, unknown>;
        } & {
            [K in EventKey]?: {
                eventType: string;
                timestamp: number;
                properties: UserActionProperties | StateChangeProperties | Record<string, never>;
            };
        } & {
            system?: {                      // only present on pageLeave
                referrer: string | null;
                innerWidth: number;
                isMobileAppInstalled: boolean;
                userAgentData: {
                    userAgent: string | UserAgent[];
                    mobile: boolean;
                    platform: string | null;
                };
            };
        };
        ```

    - The event key identifies the type of event. These are the possible values:
        - <code>'initialization'</code> is always set once the page loaded.
        - <code>'navigation'</code> is set on inner navigation (if user clicks on a <code>&lt;Anu.History.Link /&gt;</code>, the <code>Anu.History.goTo()</code> was called or the user got redirected via <code>&lt;Anu.History.Redirect /&gt;</code>).
        - <code>'userAction'</code> is set when <code>Anu.Anulytics.trackEvent()</code> has been used.<br>
        This is the only public API of <strong>Anulytics API</strong>, typically used for tracking user events (events triggered by user interactions).
        - <code>'stateChange'</code> is automatically called when an <strong>action</strong> gets dispatched.
        - <code>'pageLeave'</code> is always set once the user focuses on another tab or closes the application (i.e.: leaving the current / actual page).

    - The event object nested under the event key has three properties: <code>eventType</code>, <code>timestamp</code> and <code>properties</code>:
        - The <code>eventType</code> is a string that represents the event fired (e.g.: a <strong>user event</strong> (mouse event, keyboard event, etc.), a <strong>URI</strong> where the user navigated or an <strong>action type</strong> the user dispatched).
            - Note that the <code>eventType</code> property of <code>'initialization'</code>, <code>'navigation'</code> and <code>'pageLeave'</code> will always be a <strong>URI</strong>!
        - The <code>timestamp</code> is always set: it is the POSIX timestamp of the fired event.
        - The <code>properties</code> can either be an empty object (typically when the event was fired by navigation) or a <code>Property</code> type.
        The <code>properties</code> are typically set when <code>Anu.Anulytics.trackEvent()</code> has been used or an action was dispatched.<br>
        The <code>properties</code> are empty on <code>'initialization'</code>, <code>'navigation'</code> and <code>'pageLeave'</code>.

    - The <code>UserActionProperties</code> type can have various properties, like <code>id</code>, <code>name</code>, <code>url</code> and <code>value</code>:
        - The <code>id</code> is the value of the ID attribute of the DOM element with the given event handler tracked: <code>event.target.id</code> (optional but <strong>HIGHLY RECOMMENDED</strong> to set).
        - The <code>name</code> is the value of the name attribute of the DOM element with the given event handler tracked: <code>event.target.name</code> (optional but <strong>HIGHLY RECOMMENDED</strong> to set).
        - The <code>nodeName</code> is the name of the DOM node with the given event handler tracked: <code>event.target.nodeName</code>.
        - The <code>keyCode</code> is the ASCII code of the key pressed (if the given element is a keyboard event, like <code>keyup</code>) or null.
        - The <code>value</code> is the value of the DOM element with the given event handler tracked: <code>event.target.value</code>.
        - The <code>pageX</code> is the X-coordinate of the mouse position from the left side of the page: <code>event.pageX</code>.
        - The <code>pageY</code> is the Y-coordinate of the mouse position from the top of the page: <code>event.pageY</code>.
        - The <code>scrollTop</code> is the amount the user scrolled from the top of the page.
        - The <code>scrollLeft</code> is the amount the user scrolled from the left side of the page.
        - The <code>url</code> is the URL of the page that contains the DOM element with the given event handler tracked.

            ```typescript
            type UserActionProperties = {
                id: string;
                name: string;
                nodeName: string;
                keyCode: number | null;
                value?: string;
                pageX: number;
                pageY: number;
                scrollTop: number;
                scrollLeft: number;
                url: string;
                props: Record<string, unknown> | null; // User-defined props passed to Anu.Anulytics.trackEvent()
            };
            ```
    
    - The <code>StateChangeProperties</code> type can have four properties: <code>url</code>, <code>prevState</code>, <code>action</code> and <code>nextState</code>:
        - The <code>url</code> is the URL of the page that contains the DOM element with the given event handler tracked.
        - The <code>prevState</code> is the global state object before the action was performed.
        - The <code>action</code> is the dispatched action.
        - The <code>nextState</code> is the global state object after the action was performed.

            ```typescript
            type StateChangeProperties = {
                url: string;
                prevState: Record<string, unknown>;
                action: Record<string, unknown>;
                nextState: Record<string, unknown>;
            };
            ```
    
    - The <code>User</code> type is an object of the developer choice.
    If not provided, an empty object will be passed.

<h3 id="anulytics-track-event">Tracking events on elements using <code>Anu.Anulytics.trackEvent(event, props)</code></h3>

- <strong>Anulytics API</strong> tracks visited links within the application out of the box.
If you want to track additional elements, call <code>Anu.Anulytics.trackEvent(event, props)</code> method inside the event handler.
- It takes two arguments:
    - The <code>event</code> object is always needed because this object contains required information to track.
    - The <code>props</code> is optional: either an object (not an array) or null. 

<br>

<h2 id="context-api">Creating and accessing the context out of the "normal props flow" - <strong>The Context API</strong></h2>

<h3 id="creating-context">Creating the context</h3>

- To create a context provider and context consumer elements with default context, call the <code>Anu.createContext()</code>.
It takes a <code>context</code> argument which can be reached later as <code>context.defaultContext.value</code> and returns a context provider and consumer:

    ```typescript
    interface ThemeContextValue {
        theme: string;
    }

    // This can be accessed as "context.defaultContext.value.theme":
    const ThemedContext = Anu.createContext<ThemeContextValue>({ theme: 'Theme-1' });
    ```

<h3 id="usage-of-context-provider-and-consumers">Usage of the context provider and its consumer(s)</h3>

- Context props defined on <code>&lt;ThemedContext.Provider /&gt;</code> can be accessed from within the function child of the <code>&lt;ThemedContext.Consumer /&gt;</code> as <code>context.value</code>.
- Context providers can have multiple context consumer descendents.
- Context consumers can have one function-as-a-child (which takes the <code>context</code> as argument) which must return a valid HTML, inline-SVG element, component (either class-based or function) or <code>null</code>.
- You can have as many elements between the context provider and consumer(s), as you want.<br>
No need to pass the <code>context</code> all the way down within the "props flow"; the function child of the context consumer will have access to it by default.<br>
It allows you to create your "intermediate" components without depending from the <code>context</code> (they don't need to be aware of it if they have nothing to do with it...).
- In TypeScript projects use <code>Provider</code> / <code>Consumer</code> — the callback argument type is inferred from the `createContext<T>()` type parameter, so no manual annotation is needed.
- **Avoid** <code>ContextProvider</code> / <code>ContextConsumer</code> in TypeScript projects. These aliases exist for internal use (e.g. by `Intl` and `Feature` modules) but carry looser types: the consumer callback argument is typed as `Props` instead of `ContextValue<T>`, so you lose type inference on `context.value` and `context.defaultContext`.

    ```typescript
    import Anu, { AnuElement } from 'anu-verzum';

    const ComponentWithContext = (): AnuElement => {
        const theme2 = 'Theme-2';
        return (
            <ThemedContext.Provider theme={theme2}>
                <MyComponent1>
                    <MyComponentN>
                        <ThemedContext.Consumer>
                            {({ value: { theme }, defaultContext: { value: { theme: defaultTheme } } }) => (
                                // context type is inferred as ContextValue<ThemeContextValue>
                                // theme → "Theme-2", defaultTheme → "Theme-1"
                                <Anu.Fragment>
                                    <span>{theme}</span>
                                    <span>{defaultTheme}</span>
                                </Anu.Fragment>
                            )}
                        </ThemedContext.Consumer>
                    </MyComponentN>
                </MyComponent1>
            </ThemedContext.Provider>
        );
    };
    ```

<br>

<strong>The next APIs (<code>Anu.Connector.connect()</code> and <code>&lt;Anu.Connector.Provider /&gt;</code>; <code>&lt;Anu.Intl.Provider /&gt;</code>, <code>&lt;Anu.Intl.FormattedMessage /&gt;</code>, <code>Anu.Intl.formatMessage()</code> and <code>Anu.Intl.abbreviateNumber()</code>; <code>&lt;Anu.Feature.Provider /&gt;</code> and <code>&lt;Anu.Feature.Toggle /&gt;</code>) are strongly relying on the Context API</strong><br>

<br>

<h2 id="store-api">Storing and mutating the global state on actions dispatched, memoizing complex conversions on the global state and combining reducers - <strong>The Store API</strong></h2>

<h3 id="dispatching-actions">Dispatching actions</h3>

- Create action creator functions (returns an object) or asynchronous action creator functions (returns a function) to dispatch action(s):
    - To create a synchronous action creator, simply create a function that returns an object.
    You <strong>MUST</strong> specify its <code>type</code> member - the reducer will react when an action with this type was dispatched.
    - If you create asynchronous action creator as well, then remember, the action creator should return a <strong>FUNCTION</strong> instead of an object (in this case, you <strong>MUST</strong> use a middleware - see <a href="#creating-the-store">Creating the store</a> section):
        - The outermost function will take whatever we pass to it
        - That returned function takes 2 arguments: <code>dispatch</code> and <code>getState</code>
        - Here. you can do additional things (like getting out a value from the state using <code>getState()</code> or dispatching an action using <code>dispatch()</code>) before returning the final payload (most likely an AJAX request).

            ```typescript
            import Anu, { Action, ThunkAction, Dispatch } from 'anu-verzum';

            // Simple action creator:
            const myActionCreator = (passedProps: unknown): Action => ({
                type: 'MY_ACTION',  // Must have!
                payload: { passedProps }
            });
            // Async action creator - requires middleware:
            const myAsyncActionCreator = (value: string): ThunkAction => (dispatch, getState) => {
                // call a function that dispatches action(s) or returning a promise...
            };
            ```
                
            <strong>Example</strong> - <i>creating a "simple" action creator</i>:

            ```typescript
            // Action type constants:
            const mySimpleActionTypes = {
                ACTION: 'MY_SIMPLE_ACTION' as const
            };

            // Typed action interface:
            interface MySimpleAction extends Action {
                type: typeof mySimpleActionTypes.ACTION;
                payload: { param: string };
            }

            // Action creator:
            const mySimpleActionCreator = (param: string): MySimpleAction => ({
                type: mySimpleActionTypes.ACTION,
                payload: { param }
            });
            ```

            <strong>Example</strong> - <i>creating an "asynchronous" action creator</i>:

            ```typescript
            // Action type constants:
            const myAsyncActionTypes = {
                PENDING: 'MY_PENDING_ACTION' as const,
                FULFILLED: 'MY_FULFILLED_ACTION' as const,
                REJECTED: 'MY_REJECTED_ACTION' as const
            };

            // Typed action interfaces:
            interface PendingAction extends Action { type: typeof myAsyncActionTypes.PENDING; }
            interface FulfilledAction extends Action { type: typeof myAsyncActionTypes.FULFILLED; payload: { response: unknown }; }
            interface RejectedAction extends Action { type: typeof myAsyncActionTypes.REJECTED; payload: { status: number }; }
            type MyAsyncAction = PendingAction | FulfilledAction | RejectedAction;

            // Async action creator:
            const myAsyncActionCreator = (value: string): ThunkAction => dispatch => {
                dispatch({ type: myAsyncActionTypes.PENDING });
                return Anu
                    .ServerAPI
                    .get(`/app/my/server/url/${value}`)
                    .then(({ response }) => dispatch({ type: myAsyncActionTypes.FULFILLED, payload: { response } }))
                    .catch(({ status }) => dispatch({ type: myAsyncActionTypes.REJECTED, payload: { status } }));
            };
            ```

<h3 id="handling-actions-with-reducers">Handling actions with reducers</h3>

- Note that if it is added to the rootReducer, it will represent that "sub-tree" of the state so,
it should return that part, with the updated desired values:
- Note that the relationship between actions and reducers is M:N!
- <strong>NEVER</strong> mutater the state directly!

    ```typescript
    import Anu, { Reducer } from 'anu-verzum';

    interface MyReducerState {
        statePart: { part1: string };
    }

    // Initial state:
    const initialStateForMyReducer1: MyReducerState = { statePart: { part1: 'defaultValue' } };
    // Reducer:
    const myReducer1: Reducer<MyReducerState> = (state = initialStateForMyReducer1, action) => {
        switch (action.type) {
            case 'ACTION_1': {
                return { statePart: { part1: action.payload.part1 } };
            }
            // ...
            default: {
                return state;
            }
        }
    };
    ```

    <strong>Example</strong> - <i>handling the previous actions</i>:

    ```typescript
    type LoadingStatus = 'PENDING' | 'FULFILLED' | 'REJECTED' | null;

    interface MyFeatureState {
        param: string;
        status: LoadingStatus;
        data: unknown;
        errorCode: number | null;
    }

    const defaultState: MyFeatureState = { param: '', status: null, data: null, errorCode: null };

    const myReducerForSimpleActionCreator: Reducer<MyFeatureState> = (state = defaultState, { type, payload }) => {
        switch (type) {
            case mySimpleActionTypes.ACTION: {
                const { param } = payload as { param: string };
                return { ...state, param };
            }
            case myAsyncActionTypes.PENDING: {
                return { ...state, status: 'PENDING' };
            }
            case myAsyncActionTypes.FULFILLED: {
                const { response } = payload as { response: unknown };
                return { ...state, status: 'FULFILLED', data: response, errorCode: null };
            }
            case myAsyncActionTypes.REJECTED: {
                const { status } = payload as { status: number };
                return { ...state, status: 'REJECTED', data: null, errorCode: status };
            }
            default: {
                return state;
            }
        }
    };
    ```

<h3 id="memoizing-state-conversions">Memoizing (global) state conversions</h3>

- Selectors are memoized functions which come handy if you need to do expensive calculations or conversions on the global state.
- To create selector, use the <code>Anu.store.createSelector()</code> (it comes handy in <code>mapStateToProps()</code> - see <a href="#connector-api">Connecting components to the global state - The Connector API</a> section):
    - Its first argument is either a single "getter" function or an array of up to four "getter" functions, each returning a desired slice of the global state object.
    These functions must always return something.
    - The second argument is a "handler" function which takes as many arguments as "getter" functions you defined; these arguments are the return values of the "getter" functions.
    Their number and order is the same as of the "getters" within the first argument of the <code>Anu.store.createSelector()</code>.
    - In TypeScript, when you pass the getter array inline, the handler's parameter types are inferred automatically — no manual annotations needed.

        ```typescript
        import Anu, { SelectorFn } from 'anu-verzum';

        interface MyGlobalState {
            myStatePart1: string;
            myStatePart2: number[];
        }

        // Getter functions:
        const getStatePart1: SelectorFn<MyGlobalState, string> = state => state.myStatePart1;
        const getStatePart2: SelectorFn<MyGlobalState, number[]> = state => state.myStatePart2;

        // Single getter — transformation receives the getter's return type directly:
        const mySimpleSelector = Anu.store.createSelector(
            getStatePart1,
            (part1) => part1.toUpperCase() // part1 inferred as string
        );

        // Multiple getters — pass the array inline so TypeScript can infer a tuple:
        const mySelector = Anu.store.createSelector(
            [getStatePart1, getStatePart2],
            (part1, part2) => `${part1}: ${part2.join(', ')}`
            // part1 inferred as string, part2 as number[]
        );
        ```

<h3 id="combining-reducers">Combining reducers</h3>

- You can combine multiple reducers using the <code>Anu.store.combineReducers()</code> if you need a more complex state shape:
    - The function receives one (object) argument - the "key" of the item will be the name of the corresponding state-part, the "value" is the reducer you want to add to the combined reducer.
    - <code>Anu.store.combineReducers()</code> can be used multiple times in the application.

        ```typescript
        import Anu, { Reducer } from 'anu-verzum';

        interface GlobalState {
            myStatePart1: MyReducerState;
            myStatePart2: MyFeatureState;
        }

        const combinedReducer: Reducer<GlobalState> = Anu.store.combineReducers<GlobalState>({
            myStatePart1: myReducer1,
            myStatePart2: myReducerForSimpleActionCreator
        });
        ```
    
    - It also makes sense to create an initial state description (where you can reuse the initial states related to the reducers you just combined).
    - The "key" of this object must match with the corresponding "key" you used within the combined reducer, the "value" is the initial state (the one you (possibly) used for the "single" reducer).
    It is not mandatory however, it comes handy when your state object becomes large and complex:

        ```typescript
        const initialState: GlobalState = {
            myStatePart1: initialStateForMyReducer1,
            myStatePart2: defaultState
        };
        ```
    
<h3 id="creating-the-store">Creating the store</h3>

- The store object stores the global state object (that can be reached using the <code>store.getState()</code> method) and it also has the <code>store.dispatch()</code>, <code>store.subscribe()</code> and <code>store.unsubscribe()</code> methods.
You will likely use the <code>store.getState()</code> and <code>store.dispatch()</code> methods only because subscribing and unsubscribing functionalities are "wired" into the <code>&lt;Anu.Connector.Provider /&gt;</code> and the "connected"
(also known as "container") component(s) created by using the <code>Anu.Connector.connect()</code> - see <a href="#connector-api">Connecting components to the global state - The Connector API</a> section.
- Create a store object using <code>Anu.store.createStore()</code>:
    - The first argument is the <code>rootReducer</code> which is always needed (can be either a "single" reducer or a combination of ("single" and/or combined) reducers),
    - The second <code>initialState</code> argument is required. Pass the initial state object for your store here.
    This argument is useful if you want to have initialized values for your application before dispatching your first action.
    - The third argument is optional, you can use it if you want to apply middleware functionalities like dispatching asynchronous actions (e.g. AJAX calls or delayed calls). 
    In this case, the built-in <code>Anu.store.middleware.applyMiddleware()</code> can be passed:
        - It can take any numbers of callbacks (even zero) those will run on every actions dispatched.
        - There are 2 built-in callbacks you can use out-of-the-box:
            - The <code>Anu.store.middleware.loggingMiddleware()</code> is a logger; it comes handy when in development mode,
            - The <code>Anu.store.middleware.thunkMiddleware()</code> enables you to use asynchronous action creators (those returning functions instead of objects) as well.

                ```typescript
                import Anu, { Store } from 'anu-verzum';

                // Assuming that the 'rootReducer' is the 'combinedReducer' created before:
                const rootReducer = combinedReducer;
                // If you don't use middleware (i.e. you don't need to handle asynchronous calls):
                const syncStore: Store<GlobalState> = Anu.store.createStore<GlobalState>(rootReducer, initialState);
                // Otherwise, if you wish handle asynchronous calls, like AJAX requests:
                const asyncStore: Store<GlobalState> = Anu.store.createStore<GlobalState>(
                    rootReducer,
                    initialState,
                    Anu.store.middleware.applyMiddleware(
                        Anu.store.middleware.thunkMiddleware,
                        Anu.store.middleware.loggingMiddleware
                    )
                );
                ```

<br>

<h2 id="connector-api">Connecting components to the global state - <strong>The Connector API</strong></h2>

This API is designed to connect your global store with elements within the presentation layer.

<h3 id="connect-to-store">Connect to the store</h3>

- Wrap the outermost component (this should contain all your "container" components - see <a href="#create-container-component">Create container component</a> section) within <code>&lt;Anu.Connector.Provider /&gt;</code> and pass the store object:

    ```typescript
    import Anu, { Component, AnuElement } from 'anu-verzum';

    class App extends Component {
        render(): AnuElement {
            return (
                <Anu.Connector.Provider store={store}>
                    <Your_Page />
                </Anu.Connector.Provider>
            );
        }
    }
    ```

<h3 id="create-container-component">Create container component</h3>

- To connect your "container" component to the global store, simply define a component (either a function or class-based) you want to connect.
It is a "curried function" (a function returns a function, also known as "high-order function" (HOF)).
The first function takes two arguments: the <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>, the second one takes the wrapped component.
- Be aware that the props of wrapped component are the combination of the props passed to the (outer) component (i.e. when rendering in the return statement) and those returned by <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>!
- Define maximum two functions (they are typically called <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>; if either one is not defined, pass <code>null</code> respectively):
    - The <code>mapStateToProps()</code> can fetch values from the global state and injects them as props into the wrapped component you want to connect:
        - It takes the <code>state</code> as the first argument and an optional <code>ownProps</code> which is basically the object of the props you pass down from the caller component as part of the "props flow".
        - The function must return an object of props which can now be used by the wrapped component as if they were "regular" props.
        - This function is the ideal place to use selectors - see <a href="#memoizing-state-conversions">Memoizing (global) state conversions</a> section.
    - The <code>mapDispatchToProps()</code> can define functions those dispatch actions and injects them as props into the wrapped component you want to connect:
        - It takes the <code>dispatch</code> as the first argument and an optional <code>ownProps</code> which is basically the object of the props you pass down from the caller component as part of the "props flow".
        - The function must return an object of props (functions-as-props those dispatch actions - call action creators) which can now be used by the wrapped component as if they were "regular" props.

            ```typescript
            import Anu, { Props, AnuElement, Component, Dispatch } from 'anu-verzum';

            // Own props passed from the parent component:
            interface OwnProps extends Props {
                id: string;
            }

            // Props injected from the global state:
            interface StateProps {
                propName1: string;
                propNameN: string;
            }

            // Props injected as dispatchers:
            interface DispatchProps {
                dispatcherPropName1: (passedProps: Record<string, unknown>) => void;
            }

            type AllProps = OwnProps & StateProps & DispatchProps;

            // Create function component:
            const WrappedComponent = (props: AllProps): AnuElement => (
                <Component_to_render />
            );
            // Or class component:
            class WrappedComponent extends Component<AllProps> {
                render(): AnuElement {
                    return <Component_to_render />;
                }
            }

            const mapStateToProps = (state: GlobalState, ownProps: OwnProps): StateProps => {
                const { myStatePart1 } = state;
                return {
                    propName1: myStatePart1.statePart.part1,
                    // Using selector to derive some parts of the global state - see 'Store API' section:
                    propNameN: mySelector(state)
                };
            };

            const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
                dispatcherPropName1: (passedProps) => dispatch(mySimpleActionCreator(passedProps.param as string))
            });

            // Connect:
            const ContainerComponent = Anu.Connector.connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
            ```

<br>

<h2 id="intl-api">Supporting multiple languages - <strong>The Intl API</strong></h2>

The basic concept behind the <strong>Intl API</strong> is that you define different JSON objects for each languages you support in your application and
you refer to the text-part you need.
- Use the <code>&lt;Anu.Intl.Provider /&gt;</code> to set the supported language files for your "static texts" (no end-user-entered texts will be translated...) and the set the selected language in your app.
- Then, use the <code>&lt;Anu.Intl.FormattedMessage /&gt;</code> to place the text on the selected language referred by the <code>id</code> property.
You can also use <code>Anu.Intl.formatMessage()</code> when you want to translate a property value only (e.g. the placeholder text in an input element).
- If the text itself should also contain a dynamic text value, you can pass an optional <code>values</code> property which contains key-value pairs.
- In the text inside the language file, you should refer for the key using the <code>{key}</code> format.

<h3 id="creating-language-objects">Creating the supported language objects</h3>

- These are basically simple objects with key-value pairs.
The key is always the ID of the referred text (see <a href="#formatting-component-texts">Formatting component texts</a> and <a href="#formatting-attribute-texts">Formatting attribute texts</a> section), the value is the value to print.
- Create as many language objects as many languages you want to support.
Don't forget that the IDs should match in each objects because they will be the key used by the <strong>Intl API</strong> to find the text for the selected language.
- Wrap these objects within one main object.
This time, the keys will be the strings you mark the supported languages and the corresponding values will be the objects created before.

    ```typescript
    type MessageMap = Record<string, string>;

    const messages_hu: MessageMap = {
        'app.title': 'Üdvözöllek!',
        'app.description': 'Örülök, hogy újra itt vagy, {name}!',
        'app.search.placeholder1': 'Ide írd be a keresett kulcsszót!',
        'app.search.placeholder2': 'Kedves {name}, ide írd be a keresett kulcsszót!'
    };
    const messages_en: MessageMap = {
        'app.title': 'Welcome!',
        'app.description': 'I\'m glad that you are here again, {name}!', // 'name' is a placeholder
        'app.search.placeholder1': 'Type search keyword here!',
        'app.search.placeholder2': 'Dear {name}, type search keyword here!'
    };
    const messages: Record<string, MessageMap> = {
        'hu': messages_hu,
        'en': messages_en
    };
    ```

<h3 id="adding-language-objects-to-provider">Adding the language objects to the Intl provider</h3>

- Within this step, wrap the outermost component (this should contain all your "internationalized" components, texts, etc.) within the <code>&lt;Anu.Intl.Provider /&gt;</code>.
This component takes three props:
    - The <code>messages</code> property should be the object that contains all the translations for all the languages your application supports.
    - The <code>locale</code> property is practically a short string that is the preferred language (it must match with one of the keys of the outermost object passed as <code>messages</code>).
    - The <code>defaultLocale</code> property is optional and will refer to the default language if <code>messages[locale]</code> couldn't be found.

        ```typescript
        // This will use the first 2 letters of the language set in browser settings (e.g.: "en", "it", "hu", ...):
        const locale: string = navigator.language.split(/[-_]/)[0];
        const messages: Record<string, MessageMap> = { /* ... */ };
        const LocaleContainer = (): AnuElement => (
            <Anu.Intl.Provider messages={messages} locale={locale} defaultLocale="hu">
                <Your_page />
            </Anu.Intl.Provider>
        );
        ```
    
<h3 id="formatting-component-texts">Formatting component texts</h3>

- Use <code>&lt;Anu.Intl.FormattedMessage /&gt;</code> for the specific text (referred by <code>id</code> property) - if used as a rendered element:
    - The first, required argument is the <code>id</code> property which is the key of the text in the user-defined language objects.
    - It can take an optional <code>values</code> property which is an object:
        - The key property must match the placeholder you want to replace with your dynamic value within the text inside your language object you refer (i.e. wrapped between <code>{</code> and <code>}</code>).
        - The value is what should be used to replace the placeholder.

            ```typescript
            const ComponentWithFormattedMessages = (): AnuElement => {
                const name = 'Anubis';
                return (
                    <Anu.Fragment>
                        <h1>
                            <Anu.Intl.FormattedMessage id="app.title" defaultMessage="Welcome" />
                        </h1>
                        <p>
                            <Anu.Intl.FormattedMessage id="app.description" values={{ name }} defaultMessage="Welcome, User!" />
                        </p>
                    </Anu.Fragment>
                );
            };
            ```

<h3 id="formatting-attribute-texts">Formatting attribute texts</h3>

- Use <code>Anu.Intl.formatMessage()</code> for the specific text (referred by <code>id</code> property) - if used as an attribute of an element:
    - The first, required argument is the <code>id</code> property which is the key of the text in the user-defined JSON files (e.g.: <code>messages_hu[id]</code> or <code>messages_en[id]</code>).
    - The second argument is the <code>values</code> property which is either an object or <code>null</code>. If defined:
        - The key property must match the placeholder you want to replace with your dynamic value within the text inside your language object you refer (i.e. wrapped between <code>{</code> and <code>}</code>).
        - The value is what should be used to replace the placeholder.
    - It can also take an optional <code>defaultMessage</code> property which is used if the searched text couldn't been found.
    - If the ID can not be found and no <code>defaultMessage</code> is passed, the function will return the <code>id</code> value as a string.

        ```typescript
        const ComponentWithFormatMessageFunctionCall = (): AnuElement[] => [
            <input placeholder={Anu.Intl.formatMessage('app.search.placeholder1', undefined, 'Search...')} />,
            <input placeholder={Anu.Intl.formatMessage('app.search.placeholder2', { name: 'Anubis' }, 'Search...')} />
        ];
        ```
    
<h3 id="abbreviating-numbers">Abbreviating numbers</h3>

- If you want to abbreviate a large number, the <code>Anu.Intl.abbreviateNumber()</code> function comes handy.
- This function is also part of the <strong>INTL API</strong> so, it is able to read the language set within <code>&lt;Anu.IntlProvider /&gt;</code> (and you must use it within <code>&lt;Anu.IntlProvider /&gt;</code>).<br>
This currently supports only the <i>Hungarian</i> and the <i>English</i> abbreviations by default, but you can define your custom abbreviation rules as well.
- The function takes two arguments:
    - The first argument is the numeric <code>value</code>: the number to abbreviate.<br>
    If there is no match for the selected language and you didn't specify a custom <code>options</code> object, the system will fall back to the default (English) options.
    - The second, optional argument is the <code>options</code>, which is an object:
        - The first member is <code>units</code> - an array of strings to be used as abbreviation units.<br>
        When not specified, it will use the default (english) abbreviation units ('K', 'M', 'B', 'T').
        - The second member is <code>decimalPlaces</code> - a number that represents the decimal places.<br>
        If not specified, the system will fall back to use two decimal places.
        - The third member is <code>decimalSign</code> - a string to replace the standard (at least in english speaking countries) dot (<code>.</code>) sign with the one of choice.<br>
        If not specified, the system will fall back to the default dot (<code>.</code>) sign.

            ```typescript
            import Anu, { AbbreviateNumberOptions } from 'anu-verzum';

            declare const value: number;
            declare const option: AbbreviateNumberOptions;

            // Usage with default options:
            Anu.Intl.abbreviateNumber(value);
            // Usage with custom options:
            Anu.Intl.abbreviateNumber(value, option);
            ```

            <strong>Example</strong> - <i>abbreviating a number using default (built-in) options</i>:

            ```typescript
            Anu.Intl.abbreviateNumber(10000000000);   // → "10B"
            Anu.Intl.abbreviateNumber(100000000000);  // → "100B"
            Anu.Intl.abbreviateNumber(1000000000000); // → "1T"
            Anu.Intl.abbreviateNumber(-10000000);     // → "-10M"
            Anu.Intl.abbreviateNumber(-10000);        // → "-10K"
            Anu.Intl.abbreviateNumber(-10234);        // → "-10.23K"
            ```

            <strong>Example</strong> - <i>abbreviating with custom options</i>:

            ```typescript
            import Anu, { AbbreviateNumberOptions } from 'anu-verzum';

            const option: AbbreviateNumberOptions = {
                // The abbreviations to use (for each 3 digits, starting with the first element):
                units: [' E.', ' Mio.', ' Mrd.', ' T.'],
                // How many decimal digits to preserve:
                decimalPlaces: 3,
                // Replace the default decimal sign (.) with a comma (,):
                decimalSign: ','
            };
            Anu.Intl.abbreviateNumber(10000000000, option);   // → "10 Mrd."
            Anu.Intl.abbreviateNumber(100000000000, option);  // → "100 Mrd."
            Anu.Intl.abbreviateNumber(1000000000000, option); // → "1 T."
            Anu.Intl.abbreviateNumber(-10000000, option);     // → "-10 Mio."
            Anu.Intl.abbreviateNumber(-10000, option);        // → "-10 E."
            Anu.Intl.abbreviateNumber(-10234, option);        // → "-10,234 E."
            ```

<br>

<h2 id="feature-api">Switching features on / off - <strong>The Feature API</strong></h2>

- With feature toggle you can decide the circumstances a component should be rendered or not.<br>
This technique is typically used when some components should not be accessible due to lack of access rights or if the related backend logic is not implemented yet.<br>
Other typical use-case is when you have a feature but you don't want to show it in production yet because you want to test it carefully first.

<h3 id="setting-features-list">Setting the features list</h3>

- Set up an object with its keys as the name of the allowed features with a boolean value.
- Wrap the outermost element (this should contain all the features you want to toggle) within an <code>&lt;Anu.Feature.Provider /&gt;</code>.
    - It takes a <code>features</code> property which should be the defined features list.

        ```typescript
        const myFeaturesList: Record<string, boolean> = { myFeature: true };
        const FeaturesWrapper = (): AnuElement => (
            <Anu.Feature.Provider features={myFeaturesList}>
                <Your_page />
            </Anu.Feature.Provider>
        );
        ```

<h3 id="toggling-features">Toggling the features</h3>

- Wrap your component you want to render if the desired feature is set to <code>true</code> within <code>&lt;Anu.Feature.Toggle /&gt;</code>.
    - It takes a <code>name</code> (string) property which should match with the name of the feature you added to the provider component.
    If this property you refer with the value of the <code>name</code> attribute evaluates as true, the wrapped component can be rendered.
    - You can also set an optional <code>defaultComponent</code>.
    This will be rendered if the <code>name</code> evaluates as "falsy" (i.e.: either you set it to <code>false</code> or it wasn't even specified).
    If <code>defaultComponent</code> is not set, <code>null</code> will be rendered instead.

        ```typescript
        const ComponentWithFeatureToggle = (): AnuElement => {
            const fallbackComponent = <div>You are not authorized to see this content...</div>;
            return (
                <Anu.Feature.Toggle name="myFeature" defaultComponent={fallbackComponent}>
                    <My_fancy_feature />
                </Anu.Feature.Toggle>
            );
        };
        ```

<br>
<hr>

<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> UTILITIES:</h1>

<br>

<h2 id="deep-equal">Deep equality check for objects using <code>Anu.Utils.deepEqual()</code></h2>

- The <code>Anu.Utils.deepEqual()</code> is a deep equality check utility that can check nested and complex objects if their structure and properties match (even if their references don't).

    ```typescript
    const obj1: Record<string, any> = {
        prop1: 'asdf',
        prop2: true,
        prop3: {
            prop3_1: 'asdfasdf',
            prop3_2: [{ itemProp1: 'item' }]
        }
    };
    const obj2: Record<string, any> = {
        prop1: 'asdf',
        prop2: true,
        prop3: {
            prop3_1: 'asdfasdf',
            prop3_2: [{ itemProp1: 'item' }]
        }
    };
    const answer: boolean = Anu.Utils.deepEqual(obj1, obj2); // true
    ```

<br>
<hr>

<h1 id="testing"><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> TESTING:</h1>

<br>

<h2 id="testing-setup">Setup — Anu Testing Library (ATL)</h2>

ATL ships as part of the `anu-verzum` package. Install the required devDependencies:

```bash
npm install --save-dev jest jest-environment-jsdom @types/jest babel-jest
```

Create `jest.config.js` in your project root:

```javascript
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx|js)$': ['babel-jest', {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
                '@babel/preset-typescript'
            ],
            plugins: [
                ['@babel/plugin-transform-react-jsx', { pragma: 'Anu.createElement', pragmaFrag: 'Anu.Fragment' }]
            ]
        }]
    },
    testMatch: ['**/src/**/*.test.ts', '**/src/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^anu-verzum$': '<rootDir>/src/index.ts',
        '^anu-verzum/testing$': '<rootDir>/src/testing/index.ts'
    },
    testEnvironmentOptions: { url: 'http://localhost' }
};
```

Create `jest.setup.ts` in your project root:

```typescript
import { installSyncScheduler } from 'anu-verzum/testing';
import { setupAutoCleanup }     from 'anu-verzum/testing';

installSyncScheduler();
setupAutoCleanup();
```

Add test scripts to `package.json`:

```json
{
    "scripts": {
        "test": "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage"
    }
}
```

> **TypeScript note:** TypeScript automatically includes all installed `@types/*` packages unless your `tsconfig.json` already has an explicit `"types": [...]` array. If TypeScript reports that `describe`, `test`, or `expect` are not found, add `"jest"` to that list — and `"node"` if any test file references `process.env`:
>
> ```json
> { "compilerOptions": { "types": ["node", "jest"] } }
> ```

Every test file that uses JSX must `import Anu from 'anu-verzum'` — the Babel pragma expands `<Counter />` to `Anu.createElement(Counter, null)`, so `Anu` must be in scope.

```typescript
import Anu from 'anu-verzum';
import { render, fireEvent } from 'anu-verzum/testing';
```

<br>
<hr>

<h2 id="testing-render">Rendering components with <code>render()</code></h2>

`render()` mounts a component into a real DOM container attached to `document.body` and returns query functions and utilities scoped to that container.

```typescript
import Anu, { Component } from 'anu-verzum';
import { render } from 'anu-verzum/testing';

class Greeting extends Component<{ name: string }, {}> {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

describe('Greeting', () => {
    test('renders the name', () => {
        const { getByText } = render(<Greeting name="World" />);
        expect(getByText('Hello, World!')).toBeDefined();
    });

    test('container is in document.body', () => {
        const { container } = render(<Greeting name="test" />);
        expect(document.body.contains(container)).toBe(true);
    });
});
```

**`RenderResult` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `container` | `Element` | The div wrapping the rendered output |
| `baseElement` | `Element` | `document.body` (or custom `baseElement` option) |
| `rerender` | `(ui: AnuElement) => void` | Re-render with new props or a different element |
| `unmount` | `() => void` | Unmount the tree and trigger `componentWillUnmount` |
| All query functions | — | Scoped to `container` (see Queries section) |

**`RenderOptions`:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | `Element` | new `<div>` | Custom container element |
| `baseElement` | `Element` | `document.body` | Where the container is appended |
| `wrapper` | Component constructor | — | Wrap `ui` in a provider component before rendering |

<br>
<hr>

<h2 id="testing-queries">Querying the DOM</h2>

Each query type comes in three variants:

- **`getBy*`** — returns the element or **throws** with a message that includes the container HTML.
- **`queryBy*`** — returns the element or **`null`** (useful in negative assertions).
- **`findBy*`** — returns a **`Promise`** that resolves when the element appears or rejects after a timeout.
- **`getAllBy*`**, **`queryAllBy*`**, **`findAllBy*`** — same but return arrays.

```typescript
describe('queries', () => {
    test('getByText — exact match', () => {
        const { getByText } = render(<p>Hello world</p>);
        expect(getByText('Hello world')).toBeDefined();
    });

    test('getByText — regex match', () => {
        const { getByText } = render(<p>Hello world</p>);
        expect(getByText(/hello/i)).toBeDefined();
    });

    test('queryByText returns null when absent', () => {
        const { queryByText } = render(<p>Hello</p>);
        expect(queryByText('Not here')).toBeNull();
    });

    test('getByText throws when absent', () => {
        const { getByText } = render(<p>Hello</p>);
        expect(() => getByText('Not here')).toThrow();
    });

    test('findByText resolves asynchronously', async () => {
        const { findByText } = render(<p>Hello</p>);
        const el = await findByText('Hello');
        expect(el).toBeDefined();
    });
});
```

**Available query types:**

| Function | Matches by |
|----------|-----------|
| `getByText` / `queryByText` / `findByText` | Element's visible text content |
| `getByRole` / `queryByRole` / `findByRole` | ARIA role (implicit or explicit `role=""`) |
| `getByLabelText` / `queryByLabelText` / `findByLabelText` | `<label for="">`, `aria-label`, `aria-labelledby` |
| `getByPlaceholderText` / `queryByPlaceholderText` / `findByPlaceholderText` | `placeholder` attribute |
| `getByTestId` / `queryByTestId` / `findByTestId` | `data-testid` attribute |
| `getByTitle` / `queryByTitle` / `findByTitle` | `title` attribute |
| `getByAltText` / `queryByAltText` / `findByAltText` | `alt` attribute |

**`getByRole` with the `name` option** — filter by accessible name (checks `aria-label`, then `aria-labelledby`, then `textContent`):

```typescript
test('getByRole with name', () => {
    const { getByRole } = render(
        <div>
            <button>Cancel</button>
            <button>Submit</button>
        </div>
    );
    const btn = getByRole('button', { name: 'Submit' });
    expect(btn.textContent).toBe('Submit');
});
```

Supported implicit ARIA roles: `button`, `link`, `heading` (h1–h6), `textbox`, `checkbox`, `radio`, `combobox`, `img`, `list`, `listitem`, `form`, `navigation`, `main`, `banner`, `contentinfo`. Elements with an explicit `role=""` attribute are also matched.

<br>
<hr>

<h2 id="testing-fire-event">Dispatching events with <code>fireEvent</code></h2>

`fireEvent` dispatches a synthetic DOM event directly on an element and flushes any resulting state updates synchronously.

```typescript
import Anu, { Component } from 'anu-verzum';
import { render, fireEvent } from 'anu-verzum/testing';

class Counter extends Component<{}, { count: number }> {
    state = { count: 0 };
    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Increment
                </button>
            </div>
        );
    }
}

describe('fireEvent', () => {
    test('click updates the DOM', () => {
        const { getByText, getByRole } = render(<Counter />);
        expect(getByText('Count: 0')).toBeDefined();
        fireEvent.click(getByRole('button'));
        expect(getByText('Count: 1')).toBeDefined();
    });

    test('multiple clicks accumulate', () => {
        const { getByText, getByRole } = render(<Counter />);
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));
        expect(getByText('Count: 3')).toBeDefined();
    });
});
```

**Available `fireEvent` shorthands:**

| Shorthand | Event type |
|-----------|-----------|
| `fireEvent.click(el)` | `MouseEvent` — `click` |
| `fireEvent.dblclick(el)` | `MouseEvent` — `dblclick` |
| `fireEvent.mouseDown(el)` | `MouseEvent` — `mousedown` |
| `fireEvent.mouseUp(el)` | `MouseEvent` — `mouseup` |
| `fireEvent.change(el)` | `Event` — `change` |
| `fireEvent.input(el)` | `Event` — `input` |
| `fireEvent.focus(el)` | `FocusEvent` — `focus` |
| `fireEvent.blur(el)` | `FocusEvent` — `blur` |
| `fireEvent.keyDown(el, init?)` | `KeyboardEvent` — `keydown` |
| `fireEvent.keyUp(el, init?)` | `KeyboardEvent` — `keyup` |
| `fireEvent.keyPress(el, init?)` | `KeyboardEvent` — `keypress` |
| `fireEvent.submit(el)` | `Event` — `submit` |

You can also call `fireEvent(element, 'eventname', eventInit?)` directly for any event name not covered by a shorthand.

<br>
<hr>

<h2 id="testing-user-event">Simulating user interactions with <code>userEvent</code></h2>

`userEvent` simulates real user behaviour by composing multiple lower-level events in the correct order. Use it when the component under test listens to the full event sequence (e.g. `mousedown` + `mouseup` + `click`).

```typescript
import Anu, { Component } from 'anu-verzum';
import { render, userEvent } from 'anu-verzum/testing';

describe('userEvent', () => {
    test('click fires full mouse event sequence', () => {
        const { getByText, getByRole } = render(<Counter />);
        userEvent.click(getByRole('button'));
        expect(getByText('Count: 1')).toBeDefined();
    });

    test('type fills an input character by character', () => {
        const { getByRole } = render(<input type="text" />);
        const input = getByRole('textbox') as HTMLInputElement;
        userEvent.type(input, 'hello');
        expect(input.value).toBe('hello');
    });

    test('selectOption picks a value from a select', () => {
        const { getByRole } = render(
            <select>
                <option value="a">Alpha</option>
                <option value="b">Beta</option>
            </select>
        );
        const select = getByRole('combobox') as HTMLSelectElement;
        userEvent.selectOption(select, 'b');
        expect(select.value).toBe('b');
    });
});
```

**Available `userEvent` methods:**

| Method | Composed events / action |
|--------|--------------------------|
| `userEvent.click(el)` | `mousedown` → `mouseup` → `click` |
| `userEvent.dblclick(el)` | `mousedown` → `mouseup` → `click` × 2 → `dblclick` |
| `userEvent.type(el, text)` | `focus` → per-character `keydown` / append-value / `input` / `keyup` → `change` |
| `userEvent.clear(el)` | Clears `value`, fires `input` + `change` |
| `userEvent.change(el, value)` | Sets `value`, fires `input` + `change` |
| `userEvent.submit(form)` | `submit` |
| `userEvent.selectOption(select, value)` | Sets `value`, fires `change` |
| `userEvent.tab()` | `keydown` with `key: 'Tab'` |

<br>
<hr>

<h2 id="testing-wait-for">Waiting for async DOM changes</h2>

`waitFor` polls a callback on a fixed interval until the assertion inside it stops throwing, or until a timeout elapses. Use it for components that update asynchronously (e.g. after a server response).

```typescript
import Anu from 'anu-verzum';
import { render, waitFor } from 'anu-verzum/testing';

describe('waitFor', () => {
    test('polls until assertion passes', async () => {
        const { getByText } = render(<p>Hello</p>);
        await waitFor(() => {
            expect(getByText('Hello')).toBeDefined();
        });
    });

    test('rejects after timeout when assertion never passes', async () => {
        const { queryByText } = render(<p>Hello</p>);
        await expect(
            waitFor(() => { expect(queryByText('MISSING')).not.toBeNull(); }, { timeout: 100, interval: 20 })
        ).rejects.toThrow();
    });
});
```

**`WaitForOptions`:**

| Option | Default | Description |
|--------|---------|-------------|
| `timeout` | `1000` ms | Maximum time to wait before rejecting |
| `interval` | `50` ms | Polling interval between checks |

**`waitForElementToBeRemoved`** — resolves when the element disappears from the DOM:

```typescript
import Anu from 'anu-verzum';
import { render, waitForElementToBeRemoved } from 'anu-verzum/testing';

test('element is removed after action', async () => {
    const { queryByText } = render(<Notification />);
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
    expect(queryByText('Done')).toBeDefined();
});
```

<br>
<hr>

<h2 id="testing-act">Wrapping state updates with <code>act()</code></h2>

`act()` ensures that all pending state updates and lifecycle methods are flushed before assertions run. Because ATL installs a synchronous scheduler, most tests do not need to call `act()` explicitly — `render()`, `fireEvent`, and `userEvent` all wrap their operations in `act()` internally. Use it directly only when you trigger state changes outside of ATL utilities (e.g. calling a component method programmatically).

```typescript
import Anu from 'anu-verzum';
import { render, fireEvent, act } from 'anu-verzum/testing';

describe('act', () => {
    test('flushes state updates synchronously', () => {
        const { getByText, getByRole } = render(<Counter />);
        act(() => {
            fireEvent.click(getByRole('button'));
        });
        expect(getByText('Count: 1')).toBeDefined();
    });

    test('wraps async callbacks', async () => {
        const { getByText } = render(<Counter />);
        await act(async () => {
            await Promise.resolve();
        });
        expect(getByText('Count: 0')).toBeDefined();
    });
});
```

<br>
<hr>

<h2 id="testing-rerender">Updating and unmounting</h2>

**`rerender`** — update the rendered component with new props:

```typescript
describe('rerender', () => {
    test('updates component with new props', () => {
        const { getByText, rerender } = render(<Greeting name="Alice" />);
        expect(getByText('Hello, Alice!')).toBeDefined();
        rerender(<Greeting name="Bob" />);
        expect(getByText('Hello, Bob!')).toBeDefined();
    });
});
```

**`unmount`** — unmount the tree and trigger `componentWillUnmount` on all class components inside the container:

```typescript
test('unmount triggers componentWillUnmount', () => {
    const onUnmount = jest.fn();

    class Widget extends Anu.Component {
        componentWillUnmount() { onUnmount(); }
        render() { return <div>Widget</div>; }
    }

    const { unmount } = render(<Widget />);
    unmount();
    expect(onUnmount).toHaveBeenCalledTimes(1);
});
```

<br>
<hr>

<h2 id="testing-wrappers">Rendering with providers</h2>

ATL ships convenience wrappers for components that require one of the framework's provider components.

**`renderWithStore`** — render a connected component with a real store:

```typescript
import Anu from 'anu-verzum';
import { renderWithStore } from 'anu-verzum/testing';

const store = Anu.store.createStore(counterReducer, { count: 5 });

test('reads initial state from store', () => {
    const { getByText } = renderWithStore(<ConnectedCounter />, store);
    expect(getByText('Count: 5')).toBeDefined();
});
```

**`renderWithRouter`** — render routing components at a specific URL path:

```typescript
import Anu from 'anu-verzum';
import { renderWithRouter } from 'anu-verzum/testing';

test('renders correct route', () => {
    const { getByText, navigate } = renderWithRouter(<App />, { initialPath: '/about' });
    expect(getByText('About page')).toBeDefined();
    navigate('/home');
    expect(getByText('Home page')).toBeDefined();
});
```

**`renderWithIntl`** — render with a specific locale and message map:

```typescript
import Anu from 'anu-verzum';
import { renderWithIntl } from 'anu-verzum/testing';

const messages = {
    en: { greeting: 'Hello' },
    fr: { greeting: 'Bonjour' }
};

test('renders French greeting', () => {
    const { getByText } = renderWithIntl(<Greeting />, 'fr', messages);
    expect(getByText('Bonjour')).toBeDefined();
});
```

**`renderWithContext`** — render with a custom context provider and value:

```typescript
import Anu from 'anu-verzum';
import { renderWithContext } from 'anu-verzum/testing';
import { ThemeContext } from './ThemeContext';

test('reads theme from context', () => {
    const { getByText } = renderWithContext(<ThemedButton />, ThemeContext.Provider, { theme: 'dark' });
    expect(getByText('Dark button')).toBeDefined();
});
```

<br>
<hr>