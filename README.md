<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong></h1>

<br>

<h3>@author: <strong>Anubis-programmer</strong></h3>
<h3>@license: <strong>MIT</strong></h3>

<br>

A lightweight React-inspired UI library for building component-based web applications in JavaScript and TypeScript.

- Fiber-based virtual DOM with time-sliced rendering (MessageChannel scheduler)
- Class components with full lifecycle support and function components
- JSX via a custom Babel preset — no separate TypeScript preset needed
- Redux-compatible state management with thunk middleware and memoized selectors
- Client-side routing over the History API, with opt-in hash mode and basename support for static/subpath hosts
- Context API, i18n (Intl), feature flags, and built-in event analytics (Anulytics)
- Ships with TypeScript declaration files — no `@types` package needed
- Built-in testing companion — **Anu Testing Library (ATL)** shipped as `anu-verzum/testing`

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

`anu-verzum/babel-preset` transforms JSX to `Anu.createElement()` calls and strips TypeScript syntax automatically. **Do not** add `@babel/preset-typescript` separately — running both would cause errors.

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

Use `rules` to append additional webpack module rules after the built-in `babel-loader` rule. This is how you wire up CSS, LESS, images, or any other asset type:

```js
module.exports = require('anu-verzum/webpack.config')(__dirname, {
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
});
```

<h3 id="importing-in-your-files">Importing in your files</h3>

Every file that contains JSX must import `Anu`, because the JSX transform expands to `Anu.createElement(...)` calls at compile time:

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

Compilation and type checking are intentionally separate — `npm start` and `npm run build` succeed regardless of type errors. Run `npx tsc --noEmit` during development to catch type issues without blocking the build.

#### Exported types

The following types are exported from `anu-verzum` for use in consumer projects:

| Type | Description |
|------|-------------|
| `AnuElement` | The virtual-DOM element descriptor (return type of `createElement`) |
| `AnuChild` | Union of all valid JSX child types: `AnuElement \| string \| number \| boolean \| null \| undefined` |
| `AnuNode` | Recursive child tree type — `AnuChild \| AnuNode[]`; accepts single children, arrays, and nested arrays (e.g. from `.map()`). Can also be imported directly to type a `children` field in a plain `type`: `type MyProps = { children?: AnuNode; }` |
| `AnuCSSProperties` | Style object type used by `Props.style` — `Partial<Record<keyof CSSStyleDeclaration, string \| number>>` plus a `` [`--${string}`] `` index for CSS custom properties. camelCase keys are converted to kebab-case CSS names; `--custom-property` keys are kept verbatim |
| `Props` | Base props type providing `children?: AnuNode`, `style?: AnuCSSProperties`, and an open index signature. Extend it when a component uses `children` or needs the flexible index signature; for simple prop shapes, a plain `type` alias works equally well |
| `Ref<T>` | Reference object created by `Anu.createRef<T>()` |
| `Component<P, S>` | Abstract base class for class components |
| `PureComponent<P, S>` | `Component` subclass with a built-in shallow-compare `shouldComponentUpdate` |
| `FunctionComponent<P>` | Function component signature |
| `ElementType` | String tag, function component, or class component constructor |
| `LazyOptions` | Options for `Anu.lazy` — `{ fallback?: AnuElement \| null; onError?: (error: unknown) => void }` |
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
| `FormatNumberOptions` | Options for `Anu.Intl.formatNumber` — `Intl.NumberFormatOptions` plus an optional `locale` |
| `ParseNumberOptions` | Options for `Anu.Intl.parseNumber` — `{ locale?: string }` |

#### Library development scripts

```bash
npm run clean           # Delete dist/ entirely
npm run build           # Clean, compile TypeScript sources to dist/, and emit .d.ts files
npm run typecheck       # Type-check without emitting any output
npm run lint            # Run ESLint on all source files
npm run format          # Format all source files with Prettier
npm test                # Run the Anu Testing Library test suite with Jest
npm run test:watch      # Run Jest in interactive watch mode
npm run test:coverage   # Run Jest and generate a coverage report
```

<br>
<hr>

<h2 id="testing">Testing</h2>

ANUVerzum ships a built-in testing library — **Anu Testing Library (ATL)** — importable as `anu-verzum/testing`. It mirrors the philosophy of Testing Library: query the DOM the way a user would (by role, text, label), fire events, and assert on real output — no component internals, no custom matchers.

```typescript
import Anu from 'anu-verzum';
import { render, fireEvent } from 'anu-verzum/testing';

const { getByText, getByRole } = render(<Counter />);
fireEvent.click(getByRole('button'));
expect(getByText('Count: 1')).toBeDefined();
```

If TypeScript reports that `describe`, `test`, or `expect` are not found, your `tsconfig.json` likely has an explicit `"types"` list. Add `"jest"` to it — and `"node"` if tests reference `process.env`:

```json
{ "compilerOptions": { "types": ["node", "jest"] } }
```

See **[USERS_MANUAL.md — Testing](./documentation/USERS_MANUAL.md#testing)** for the full API reference and usage guide.

<br>
<hr>

<h2>Documentation</h2>

Full usage documentation, API reference, and code examples:

**[USERS_MANUAL.md](./documentation/USERS_MANUAL.md)**

Architecture overview, module deep-dives, and implementation details for contributors:

**[TECHNICAL_DOCUMENTATION.md](./documentation/TECHNICAL_DOCUMENTATION.md)**

<br>
<hr>
