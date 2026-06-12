<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS — Technical Documentation</strong></h1>

<br>

<h3>@author: <strong>Anubis-programmer</strong></h3>
<h3>@license: <strong>MIT</strong></h3>

<br>

<h2>Table of Contents</h2>

<ul>
    <li><a href="#summary">Summary</a></li>
    <li><a href="#high-level-architecture">High-Level Architecture</a></li>
    <ul>
        <li><a href="#module-ecosystem">Module ecosystem</a></li>
        <li><a href="#the-anu-namespace">The <code>Anu</code> namespace</a></li>
        <li><a href="#build-pipeline">Build pipeline</a></li>
        <li><a href="#scheduler">The scheduler — why MessageChannel, not <code>requestIdleCallback</code></a></li>
    </ul>
    <li><a href="#virtual-dom-and-jsx">Virtual DOM &amp; JSX — <code>src/core/elements.ts</code></a></li>
    <ul>
        <li><a href="#type-system">Type system</a></li>
        <li><a href="#createelement">The <code>createElement()</code> function</a></li>
    </ul>
    <li><a href="#fiber-reconciler">Fiber Reconciler — <code>src/core/reconciler.ts</code></a></li>
    <ul>
        <li><a href="#fiber-data-structure">The Fiber data structure</a></li>
        <li><a href="#update-queue">The update queue</a></li>
        <li><a href="#work-loop">The work loop</a></li>
        <li><a href="#begin-work">Begin work phase</a></li>
        <li><a href="#reconcile-children">Reconciling children</a></li>
        <li><a href="#complete-work">Complete work phase</a></li>
        <li><a href="#commit-phase">Commit phase &amp; lifecycle queue</a></li>
        <li><a href="#public-reconciler-api">Public API: <code>render()</code>, <code>createRef()</code>, <code>scheduleUpdate()</code></a></li>
    </ul>
    <li><a href="#dom-utilities">DOM Utilities — <code>src/core/domUtils.ts</code></a></li>
    <ul>
        <li><a href="#svg-support">SVG support</a></li>
        <li><a href="#createDomElement">Creating DOM elements</a></li>
        <li><a href="#updateDomProperties">Diffing and updating DOM properties</a></li>
    </ul>
    <li><a href="#component-base-class">Component Base Class — <code>src/core/components/Component.ts</code></a></li>
    <li><a href="#fragment">Fragment — <code>src/core/components/Fragment.ts</code></a></li>
    <li><a href="#context-api">Context API — <code>src/core/components/Context.ts</code></a></li>
    <ul>
        <li><a href="#createcontext">The <code>createContext()</code> factory</a></li>
        <li><a href="#context-provider-internals">Provider internals</a></li>
        <li><a href="#context-consumer-internals">Consumer internals</a></li>
        <li><a href="#subscriber-registry">The subscriber registry</a></li>
    </ul>
    <li><a href="#history-routing">Routing — <code>src/core/components/History.ts</code></a></li>
    <ul>
        <li><a href="#global-instances-registry">Global instance registry</a></li>
        <li><a href="#path-matching">Path matching</a></li>
        <li><a href="#route-param-registry">The current-match registry — <code>getRouteParams</code></a></li>
        <li><a href="#route-link-redirect">Route, Link, Redirect components</a></li>
    </ul>
    <li><a href="#store">State Management — <code>src/store/store.ts</code></a></li>
    <ul>
        <li><a href="#createstore">The <code>createStore()</code> function</a></li>
        <li><a href="#middleware-pipeline">The middleware pipeline</a></li>
        <li><a href="#built-in-middlewares">Built-in middlewares</a></li>
        <li><a href="#combinereducers">The <code>combineReducers()</code> function</a></li>
        <li><a href="#createselector">The <code>createSelector()</code> function and LRU memoization</a></li>
        <li><a href="#analytics-integration">Analytics integration</a></li>
    </ul>
    <li><a href="#connector">Connector — <code>src/core/components/Connector.ts</code></a></li>
    <ul>
        <li><a href="#connector-provider">The <code>Provider</code> component</a></li>
        <li><a href="#subscription-tree">The <code>Subscription</code> class</a></li>
        <li><a href="#connect-hoc">The <code>connect()</code> HOC</a></li>
    </ul>
    <li><a href="#intl">Internationalization — <code>src/core/components/Intl.ts</code></a></li>
    <ul>
        <li><a href="#intl-provider">The <code>IntlProvider</code> component</a></li>
        <li><a href="#formatted-message">The <code>FormattedMessage</code> component</a></li>
        <li><a href="#format-message">The <code>formatMessage()</code> utility</a></li>
        <li><a href="#abbreviate-number">The <code>abbreviateNumber()</code> utility</a></li>
        <li><a href="#format-number">The <code>formatNumber()</code> and <code>parseNumber()</code> utilities</a></li>
    </ul>
    <li><a href="#feature-flags">Feature Flags — <code>src/core/components/Feature.ts</code></a></li>
    <li><a href="#anulytics">Analytics — <code>src/core/components/AnulyticsProvider.ts</code></a></li>
    <ul>
        <li><a href="#anulytics-state-singleton">The <code>AnulyticsState</code> singleton</a></li>
        <li><a href="#anulytics-provider-component">The <code>AnulyticsProvider</code> component</a></li>
        <li><a href="#bot-detection">Bot detection and PWA detection</a></li>
        <li><a href="#exported-tracking-functions">Exported tracking functions</a></li>
    </ul>
    <li><a href="#server-api">Server API — <code>src/server-api/server-api.ts</code></a></li>
    <ul>
        <li><a href="#xhr-internals">XHR internals</a></li>
        <li><a href="#url-resolution">URL resolution and base URL</a></li>
        <li><a href="#http-methods">HTTP method implementations</a></li>
    </ul>
    <li><a href="#utilities">Utilities — <code>src/misc/utils.ts</code></a></li>
    <li><a href="#build-configuration">Build Configuration</a></li>
    <ul>
        <li><a href="#babel-preset">Babel preset</a></li>
        <li><a href="#webpack-config-factory">Webpack config factory</a></li>
        <li><a href="#tsconfig">TypeScript configuration</a></li>
    </ul>
    <li><a href="#anu-testing-library">Anu Testing Library — <code>src/testing/</code></a></li>
    <ul>
        <li><a href="#atl-overview">Overview and design goals</a></li>
        <li><a href="#atl-sync-scheduler">The synchronous scheduler problem</a></li>
        <li><a href="#atl-testing-exports">The <code>__testing</code> module exports</a></li>
        <li><a href="#atl-render">The <code>render()</code> function</a></li>
        <li><a href="#atl-queries">Query system</a></li>
        <li><a href="#atl-events">Event utilities</a></li>
        <li><a href="#atl-async">Async utilities</a></li>
        <li><a href="#atl-cleanup">Cleanup</a></li>
        <li><a href="#atl-wrappers">Provider wrappers</a></li>
        <li><a href="#atl-jest-setup">Jest configuration</a></li>
    </ul>
</ul>

<br>
<hr>

<h2 id="summary">Summary</h2>

**ANUVerzum** is a React-inspired, self-contained UI library for the browser. It implements a JSX-based component model, a fiber-based virtual DOM reconciler with incremental rendering, client-side routing, a Redux-compatible state management layer, a context propagation system, internationalization, feature flags, built-in HTTP client, and an analytics engine — all in a single npm package with no runtime peer dependencies.

The library is designed to be consumed via a Babel preset (`anu-verzum/babel-preset`) that transforms JSX into `Anu.createElement()` calls and strips TypeScript syntax, and a webpack config factory (`anu-verzum/webpack.config`) that sets up a complete development and production build pipeline. TypeScript type declarations are shipped alongside the compiled output.

The entire public API is exposed as a single default export (`Anu`) and a set of named type exports from the `anu-verzum` package entry point (`src/index.ts`).

<br>
<hr>

<h2 id="high-level-architecture">High-Level Architecture</h2>

<h3 id="module-ecosystem">Module ecosystem</h3>

The source tree is organized into four areas:

```
src/
├── index.ts                         ← Public API assembly point
├── core/
│   ├── elements.ts                  ← Virtual DOM types and createElement()
│   ├── reconciler.ts                ← Fiber engine, render(), scheduleUpdate()
│   ├── domUtils.ts                  ← Real DOM creation and property diffing
│   ├── lazy.ts                      ← lazy() async component loader (code-splitting)
│   ├── memo.ts                      ← memo() function-component render bail-out
│   └── components/
│       ├── Component.ts             ← Abstract base class for class components
│       ├── PureComponent.ts         ← Component subclass with shallow-compare shouldComponentUpdate
│       ├── Fragment.ts              ← Wrapper-free child rendering
│       ├── Context.ts               ← createContext() factory
│       ├── History.ts               ← Client-side routing
│       ├── Connector.ts             ← Redux-style store bindings (connect HOC)
│       ├── Intl.ts                  ← Internationalization
│       ├── Feature.ts               ← Feature flag toggles
│       └── AnulyticsProvider.ts     ← Analytics event collection
├── store/
│   └── store.ts                     ← createStore, middleware, selectors
├── server-api/
│   └── server-api.ts                ← XHR-based HTTP client
├── misc/
│   └── utils.ts                     ← deepEqual, shallowEqual, isNotNullish utilities
└── testing/
    ├── index.ts                     ← Public barrel export (anu-verzum/testing)
    ├── types.ts                     ← All TypeScript types for ATL
    ├── globals.d.ts                 ← process ambient declaration
    ├── act.ts                       ← Sync scheduler install + act() + flushEffects()
    ├── render.ts                    ← render() → RenderResult
    ├── cleanup.ts                   ← cleanup(), registerContainer(), setupAutoCleanup()
    ├── waitFor.ts                   ← waitFor(), waitForElementToBeRemoved()
    ├── wrappers.ts                  ← renderWithStore/Router/Intl/Context helpers
    ├── queries/
    │   ├── index.ts                 ← buildQueries(container) → BoundQueries
    │   ├── queryBuilder.ts          ← get/query/find triple-variant factory
    │   ├── byText.ts
    │   ├── byRole.ts                ← ARIA implicit-role map + accessible-name filter
    │   ├── byLabelText.ts
    │   ├── byPlaceholderText.ts
    │   ├── byTestId.ts
    │   ├── byTitle.ts
    │   └── byAltText.ts
    └── events/
        ├── fireEvent.ts             ← Low-level event dispatch + named shorthands
        └── userEvent.ts             ← High-level user interaction simulation
```

The dependency relationships between modules flow in one direction — from higher-level modules down to lower-level ones:

- `index.ts` imports from every other module and assembles the `Anu` object.
- `store.ts` imports `trackStateChange` from `AnulyticsProvider.ts` (the only cross-domain import).
- `History.ts` imports `trackRouteChange` from `AnulyticsProvider.ts`.
- `Intl.ts` and `Feature.ts` use `createContext()` internally.
- `Connector.ts` reads the store from the component context set by its own `Provider`.
- `reconciler.ts` is the engine that drives `Component.ts` — class components call `scheduleUpdate()` from `reconciler.ts` via `setState()`.

<h3 id="the-anu-namespace">The <code>Anu</code> namespace</h3>

`src/index.ts` assembles every API into a single object literal and exports it as the default export:

```typescript
const Anu = {
    Anulytics: { Provider: AnulyticsProvider, trackEvent },
    createContext,
    createElement,
    createPortal,
    createRef,
    Component,
    Fragment,
    render,
    Feature,
    History: { ...History, goTo },
    Intl,
    Connector,
    ServerAPI,
    store,
    Utils
};

export default Anu;
```

Individual named exports are also provided for tree-shaking friendliness and direct TypeScript type access:

```typescript
// Value exports
export { Component, Fragment, createElement, createRef, createPortal, createContext, render, goTo };
export { AnulyticsProvider, trackEvent };
export { store, ServerAPI, Utils, Connector, Feature, History, Intl };

// Type-only exports
export type { AnuElement, AnuChild, AnuNode, AnuCSSProperties, Props, Ref, FunctionComponent, ElementType };
export type { ContextValue, ConsumerProps };
export type { Action, ThunkAction, Dispatch, Reducer, MiddlewareAPI, Middleware,
              Store, SelectorFn, CreateSelectorFn };
export type { ApiSuccessResponse, ApiErrorResponse };
export type { AbbreviateNumberOptions, FormatNumberOptions, ParseNumberOptions };
```

The `JSX` global namespace is also declared here so TypeScript recognizes JSX syntax in consumer projects without any additional configuration:

```typescript
declare global {
    namespace JSX {
        interface IntrinsicAttributes { key?: string | number | null; ref?: Ref<any> | null; }
        interface Element extends AnuElement<any, any> {}
        interface ElementClass { render(): AnuNode; }
        interface ElementAttributesProperty { props: Record<string, unknown>; }
        interface ElementChildrenAttribute { children: Record<string, unknown>; }
        interface IntrinsicElements { [elemName: string]: Props; }
    }
}
```

`JSX.ElementClass.render` **must stay in sync with `Component`'s abstract `render()`** — both return `AnuNode`. TypeScript validates every class component used in JSX against `ElementClass`, so if `Component.render` returns a shape wider than `ElementClass.render` declares (e.g. `Fragment.render(): AnuChild[]`), `<Anu.Fragment />` silently fails the check and stops resolving to a valid `JSX.Element`. This repo's own `tsconfig.json` does not set `jsx`, so `npm run typecheck` never exercises the `JSX` namespace — JSX-contract regressions only surface in consumer/editor contexts.

<h3 id="build-pipeline">Build pipeline</h3>

The library uses a deliberate two-pass build strategy that separates compilation from type-checking:

**Pass 1 — Babel** (`npm run build` → `babel src --out-dir dist --extensions ".ts"`)
Babel performs the actual compilation: it transpiles TypeScript syntax (via `@babel/plugin-transform-typescript`), transforms JSX into `Anu.createElement()` calls (via `@babel/plugin-transform-react-jsx`), and applies `@babel/preset-env` for cross-browser compatibility. The output is CommonJS JavaScript in `dist/`.

**Pass 2 — TypeScript** (`tsc --project tsconfig.build.json --emitDeclarationOnly`)
`tsc` is invoked only to emit `.d.ts` declaration files. It never produces JavaScript. This keeps compilation fast because Babel handles the heavy lifting, and `tsc` only needs to type-check and emit declarations.

The build uses `tsconfig.build.json` (not `tsconfig.json`) so that test files under `src/testing/__tests__/` are excluded from the declaration emit — they must not appear in the published `dist/`. The main `tsconfig.json` keeps `__tests__` included so the IDE type-checks test files with full `@types/jest` support.

The `package.json` build scripts:

```json
{
    "clean":     "node -e \"require('fs').rmSync('dist', {recursive:true, force:true})\"",
    "build":     "npm run clean && babel src --out-dir dist --extensions \".ts\" --ignore \"src/testing/__tests__\" && tsc --project tsconfig.build.json --emitDeclarationOnly",
    "typecheck": "tsc --noEmit",
    "lint":      "eslint src",
    "format":    "prettier --write src"
}
```

<h3 id="scheduler">The scheduler — why MessageChannel, not <code>requestIdleCallback</code></h3>

The reconciler defers all work to a macro-task rather than running it synchronously, so rendering can be time-sliced (see the [Work loop](#work-loop)). The macro-task is scheduled through a **`MessageChannel`** — the same mechanism React's scheduler uses — not `requestIdleCallback`.

Earlier versions scheduled via `requestIdleCallback(performWork)`. That starves under continuous or rapid user input: `requestIdleCallback` only fires when the browser is idle, so updates driven by heavy input (menu arrow-key navigation, sliders, drag, fast typing) would not commit until the input paused — the UI appeared to lag and then freeze, catching up only when the user stopped. Passing `{ timeout }` does not fix it: a timed-out idle callback reports `timeRemaining() === 0`, so the time-sliced work loop would do **zero** units of work and merely reschedule, never progressing under sustained load.

A `MessageChannel` message is delivered as soon as the current task (including the input handler that triggered the update) finishes, regardless of idle state, so input-driven updates commit promptly. The scheduler lives in `src/core/reconciler.ts`:

```typescript
const FRAME_BUDGET = 5;

let frameDeadline = 0;

const FRAME_DEADLINE: IdleDeadline = {
    didTimeout: false,
    timeRemaining: () => Math.max(0, frameDeadline - now())
};

const createMacroTaskScheduler = (): (() => void) => {
    let scheduled = false;

    const flush = (): void => {
        scheduled = false;
        frameDeadline = now() + FRAME_BUDGET;
        performWork(FRAME_DEADLINE);
    };

    let post: () => void;

    if (typeof MessageChannel !== 'undefined') {
        const channel = new MessageChannel();
        channel.port1.onmessage = flush;
        post = () => channel.port2.postMessage(null);
    } else {
        post = () => { setTimeout(flush, 0); };
    }

    return () => {
        if (scheduled) {
            return;
        }

        scheduled = true;
        post();
    };
};
```

Two details carry weight:

- **The `IdleDeadline` the work loop consumes is synthesized** from a fixed `FRAME_BUDGET` of 5 ms (`now()` is `performance.now()`, falling back to `Date.now()`). Each flush stamps `frameDeadline = now() + FRAME_BUDGET`, and `timeRemaining()` counts down from there, so the existing `deadline.timeRemaining() > ENOUGH_TIME` time-slicing is preserved unchanged. When a slice runs out, `performWork` schedules the next macro-task, yielding to the browser between slices.
- **Scheduling is coalesced** via the `scheduled` flag: many `setState` calls in one tick post a single message that drains the whole batched queue, rather than one message per update.

`MessageChannel` is available in every real browser (more universally than `requestIdleCallback` ever was) and in jsdom, so no polyfill is required; the `setTimeout(0)` branch is only a fallback for exotic environments without it. Because the reconciler no longer depends on `requestIdleCallback`, the old `requestIdleCallback`/`cancelIdleCallback` polyfill was removed from `src/index.ts`.

<br>
<hr>

<h2 id="virtual-dom-and-jsx">Virtual DOM &amp; JSX — <code>src/core/elements.ts</code></h2>

This module defines the entire virtual DOM type surface and the `createElement()` function that the Babel JSX transform targets.

<h3 id="type-system">Type system</h3>

```typescript
// Sentinel string for text nodes in the virtual DOM tree
export const TEXT_ELEMENT = 'TEXT_ELEMENT' as const;

// A single renderable value
export type AnuChild = AnuElement | string | number | boolean | null | undefined;

// Recursive tree — allows arrays and nested arrays (e.g. from .map())
export type AnuNode = AnuChild | AnuNode[];

// Style props accept both strings and unitless numbers (e.g. zIndex: 10),
// plus arbitrary CSS custom properties keyed by `--*`
export type AnuCSSProperties = Partial<Record<keyof CSSStyleDeclaration, string | number>> & {
    [customProperty: `--${string}`]: string | number;
};

// Base props shape: open index signature, optional children and style
export type Props = {
    children?: AnuNode;
    style?: AnuCSSProperties;
    [key: string]: any;
};

// Reference object created by Anu.createRef()
export type Ref<T> = { current: T | null };

// Function component signature
export type FunctionComponent<P extends Props = Props> =
    (props: P) => AnuElement<any, any> | AnuElement<any, any>[] | string | number | boolean | null | undefined;

// Class component constructor signature
export type ComponentConstructor<P extends Props = Props> =
    new (props: P, context?: Record<string, any>) => any;

// Union of all valid element types
export type ElementType = string | FunctionComponent | ComponentConstructor;

// The virtual DOM element descriptor — the return type of createElement()
export type AnuElement<P = Props, T extends ElementType = ElementType> = {
    type: T;
    props: P;
    key: string | null;
    ref: Ref<any> | null;
};
```

<h3 id="createelement">The <code>createElement()</code> function</h3>

`createElement` is the compile target for all JSX. Babel transforms `<MyComp foo="bar">text</MyComp>` into `Anu.createElement(MyComp, { foo: 'bar' }, 'text')`.

```typescript
export const createElement = (
    type: ElementType,
    config: Props | null,
    ...args: any[]
): AnuElement
```

The function performs the following steps:

1. **Extract special props.** `key` and `ref` are pulled out of `config` and stored separately. They are removed from the `props` object so they never reach the component as regular props.

2. **Store children raw — React parity.** `createElement` does **not** normalize children. It mirrors React's shape exactly: a single child argument is stored verbatim (`props.children = args[0]`), multiple children are stored as the raw array (`props.children = args`), and with no children `props.children` is left `undefined`. So `<C>New</C>` yields `props.children === 'New'` (the raw string), not a wrapped `TEXT_ELEMENT` array — symmetric with plain props like `label="More"` → `props.label === 'More'`. Any code that *introspects* children (compound/composition APIs that read child labels) therefore sees the author's original values.

3. **Return the element descriptor.**

```typescript
return { type, props, key, ref };
```

This object is lightweight and immutable by convention — the reconciler reads it but never mutates it.

<h4>Where child normalization actually happens</h4>

Normalization is deferred to consumption time, in two helpers exported from `elements.ts`:

- **`normalizeChildren(children)`** — used by the reconciler's `reconcileChildrenArray`. It recursively flattens nested arrays, drops `null`/`undefined`/booleans (`false` *and* `true`), wraps plain `string`/`number` values in a `TEXT_ELEMENT` node (`{ type: TEXT_ELEMENT, props: { nodeValue: String(value) }, key: null, ref: null }`), wraps bare function children via `createElement(fn, fn.props || {})`, and passes existing `AnuElement` objects through unchanged. This is why conditional rendering still works (`{cond && <El/>}` renders nothing for `false` *or* `undefined`), `0` renders as `"0"`, and `''` produces an empty text node.
- **`toChildArray(children)`** — the same flatten-and-filter pass *without* the `TEXT_ELEMENT`/function wrapping. Components that introspect their children (`Context` Provider/Consumer, `Connector`/`Anulytics` `Provider`, `Fragment`, `Feature`'s `resolveDefault`) call this to coerce the raw `props.children` (which may be a single value, an array, or `undefined`) into a filtered array while still exposing the raw values — e.g. the `Context` Consumer reads its render-prop function directly as `children[0]`. None of these wrapper components enforce a child *count* any more: `Context`/`Connector`/`Anulytics` `Provider` and `Fragment` all render whatever children they receive (zero, one, or many — React parity); the `Context` Consumer is the only one with a child constraint, and it validates that the single render-prop is a *function*, not the count.

<h4>Element introspection toolkit — <code>cloneElement</code>, <code>isValidElement</code>, <code>Children</code></h4>

Three dependency-free helpers in `elements.ts` give consumers React-parity element introspection. They are exported from the barrel and hung on the `Anu` default object; none of them require a reconciler change.

- **`cloneElement(element, config?, ...children)`** — derives a *new* `AnuElement` from an existing one. It builds `props` via `Object.assign({}, element.props, config || {})` (config wins), so the original element is never mutated. New trailing arguments replace `props.children`; with none passed, the original children are kept. `key`/`ref` are read with the same `isNotNullish(config) && isNotNullish(config.key)` guard `createElement` uses — taken from `config` when present, otherwise carried over from the source element — then deleted from `props`. Because the result is an ordinary descriptor, it flows through `normalizeChildren` → `reconcileChildrenArray` unchanged and an injected `ref` attaches via the existing PLACEMENT/UPDATE effect path. This is the primitive behind props/aria injection into composed children.
- **`isValidElement(value)`** — a type guard (`value is AnuElement`) that is `true` only for a non-null object carrying both a `type` and a `props` key. Used to skip text/number children safely before cloning.
- **`Children`** — thin wrappers over `toChildArray` so consumers get the same flatten-and-filter normalization the renderer uses: `toArray`, `count`, `map`, `forEach`, and `only` (which throws unless there is exactly one child and `isValidElement` accepts it).

<br>
<hr>

<h2 id="fiber-reconciler">Fiber Reconciler — <code>src/core/reconciler.ts</code></h2>

The reconciler is the heart of ANUVerzum. It implements a fiber-based architecture inspired by React's reconciler, spreading rendering work across multiple [MessageChannel](#scheduler) macro-tasks so the browser stays responsive between slices.

<h3 id="fiber-data-structure">The Fiber data structure</h3>

A **fiber** is a plain JavaScript object that describes one node in the component tree. The reconciler maintains two trees simultaneously: the current tree (what is on screen) and the work-in-progress (WIP) tree (what is being built).

```typescript
type Fiber = {
    // Identity
    type?: ElementType;         // string tag, function, or class constructor
    tag: FiberTag;              // HOST_COMPONENT | CLASS_COMPONENT | FUNCTION_COMPONENT | HOST_ROOT
    key?: string | null;

    // Linkage — fibers form a linked tree, not a nested object tree
    parent?: Fiber;
    child?: Fiber;              // first child
    sibling?: Fiber;            // next sibling
    alternate?: Fiber;          // corresponding fiber from the previous render

    // DOM / instance
    stateNode?: any;            // HTMLElement for HOST, class instance for CLASS, {props,render} for FUNCTION
    ref?: Ref<any> | null;

    // Props and state
    props: Props;
    partialState?: Record<string, any>;
    partialStateCallback?: (prevState: any, prevProps: any) => any;
    prevState?: Record<string, any>;    // saved before update, passed to componentDidUpdate

    // Effect collection
    effects?: Fiber[];          // all effects collected from this subtree
    effectTag?: EffectTag | null; // PLACEMENT | DELETION | UPDATE
};
```

The **five fiber tags** define how the reconciler processes each node:
- `HOST_COMPONENT` — a real DOM element (a string `type` like `'div'`).
- `CLASS_COMPONENT` — a class that extends `Component`.
- `FUNCTION_COMPONENT` — a plain function component.
- `HOST_ROOT` — the root container fiber wrapping the entire tree.
- `PORTAL` — a portal created by `createPortal(children, container)`. Its `stateNode` is the target container DOM node.

The **three effect tags** describe what DOM mutation is needed:
- `PLACEMENT (1)` — insert a new DOM node; queue `componentDidMount`.
- `UPDATE (3)` — update props on an existing DOM node; queue `componentDidUpdate`.
- `DELETION (2)` — call `componentWillUnmount`, remove the DOM node.

<h3 id="update-queue">The update queue</h3>

All render requests — both initial renders and re-renders from `setState` — go through a single module-level queue:

```typescript
const updateQueue: Array<{
    from: FiberTag;
    dom?: Element;        // for HOST_ROOT updates (Anu.render())
    newProps?: Props;     // for HOST_ROOT updates
    instance?: any;       // for CLASS_COMPONENT updates (setState)
    partialState?: Record<string, any>;
    partialStateCallback?: (prevState: any, prevProps: any) => any;
}> = [];
```

`Anu.render()` pushes a `HOST_ROOT` entry. `setState()` pushes a `CLASS_COMPONENT` entry. Work is not started immediately — `scheduleWork()` posts a [MessageChannel](#scheduler) macro-task, and the reconciler processes the queue when that task runs.

<h3 id="work-loop">The work loop</h3>

```
scheduleWork()  →  MessageChannel macro-task
    └── performWork(deadline)
            └── workLoop(deadline)
                    ├── resetNextUnitOfWork()   ← pulls from updateQueue
                    ├── while (nextUnitOfWork && deadline.timeRemaining() > 1ms)
                    │       nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
                    └── if (pendingCommit) commitAllWork(pendingCommit)
```

**`resetNextUnitOfWork()`** pops the oldest entry from `updateQueue` and synthesizes a `HOST_ROOT` fiber as the starting point for the traversal. For `CLASS_COMPONENT` updates, it walks up the fiber tree via `getRoot()` to find the root and stores the `partialState` on the fiber before beginning.

**`performUnitOfWork(wipFiber)`** does a depth-first traversal of the fiber tree:
1. Call `beginWork(wipFiber)` to process the current fiber and reconcile its children.
2. If there is a `child`, return it (go deeper).
3. Otherwise, call `completeWork(wipFiber)` and return `sibling` or walk up to the parent, completing each ancestor until a sibling is found.

**`ENOUGH_TIME = 1`** is the minimum remaining time in milliseconds. If less than 1 ms remains in the current slice of the synthesized 5 ms [frame budget](#scheduler), the loop pauses and re-schedules via `scheduleWork()` — posting the next macro-task and allowing the browser to remain responsive.

<h3 id="begin-work">Begin work phase</h3>

`beginWork()` dispatches to one of three handlers based on `wipFiber.tag`:

**`updatePortalComponent(wipFiber)`**
Sets `wipFiber.stateNode = wipFiber.props.container` (the target DOM node), then calls `reconcileChildrenArray` with `wipFiber.props.children`. Because the portal fiber's `stateNode` is the container, `commitWork`'s DOM-parent walk stops there and renders all children into that container rather than into the normal parent. `getFirstHostNode` returns `null` for portal fibers so they are invisible to sibling insertion-order logic in the parent container.

**`updateHostComponent(wipFiber)`**
Creates the real DOM node on first visit (`wipFiber.stateNode = createDomElement(wipFiber)`), then calls `reconcileChildrenArray` with `wipFiber.props.children`.

**`updateFunctionComponent(wipFiber)`**
Creates a lightweight wrapper instance `{ props, render: type }` on first visit. On subsequent visits, performs an **early bailout** if props reference has not changed and no `partialState` is pending — the child fibers are cloned from the previous tree without re-running the function. A second bailout serves `memo`-wrapped components: when `wipFiber.type.__isMemo` is set and the memo comparator `wipFiber.type.__areEqual(instance.props, wipFiber.props)` returns `true`, the function is likewise skipped via `cloneChildFibers`. (A bailed-out function fiber may keep its `UPDATE` effect tag, but `commitWork` has no `UPDATE` branch for function fibers, so it is a no-op.) Otherwise, calls `instance.render(wipFiber.props)` and reconciles the result.

**`updateClassComponent(wipFiber)`**
- **First visit:** instantiates the class via `new type(props, context)`, binds lifecycle methods (`setState`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`), and sets `instance.__fiber = fiber`.
- **Subsequent visits:** performs an **early bailout** if `wipFiber.props === instance.props` and no `partialState` or `partialStateCallback` is pending (clones children without re-rendering). Because `instance.props` is assigned directly from `wipFiber.props` (same reference, matching the function component pattern), the reference check fires correctly when a parent bails out via `cloneChildFibers` and the child's fiber props are unchanged. The bailout still records `wipFiber.prevState = { ...instance.state }` before cloning: a bailed-out fiber retains its `UPDATE` effect tag (set when its parent reconciled it), so when a **descendant** `setState` re-renders the tree from the root, this ancestor's `componentDidUpdate(prevProps, prevState)` is still enqueued — and must receive a defined `prevState`/`prevProps` (`prevProps` comes from `effect.alternate.props`). Since nothing on this fiber changed, `prevState` equals the current state, matching React.
- **Normal update:** computes a state *patch* — the object partial state directly, or the return value of `partialStateCallback(prevState, wipFiber.props)` for functional updates — then merges it onto the previous state with `Object.assign({}, instance.state, patch)`. Both forms merge (a functional updater may return only the changed keys, matching React), saves the old state to `wipFiber.prevState` (for `componentDidUpdate`), then calls `instance.render()`.
- **`shouldComponentUpdate` bailout:** after computing `nextProps`/`nextState` but **before** `render()`, if this is not the initial mount and the instance defines `shouldComponentUpdate(nextProps, nextState)` that returns `false`, the update is vetoed. The new props and state are still committed to the instance (matching React — a skipped render does not skip the state transition), `wipFiber.partialState`/`partialStateCallback` are cleared, and the existing subtree is preserved via `cloneChildFibers`. Crucially, `wipFiber.effectTag` is set to `null` so the fiber is **not** bubbled into the root's `effects` array by `completeWork` — this suppresses the `componentDidUpdate` that the inherited `UPDATE` tag would otherwise enqueue, matching React's rule that `componentDidUpdate` does not fire on a vetoed update. The check is skipped on the initial mount (there is no previous render to keep), so a freshly-mounted component always renders. `Anu.PureComponent` opts into this path by implementing `shouldComponentUpdate` as a shallow compare of props and state.

<h3 id="reconcile-children">Reconciling children</h3>

`reconcileChildrenArray(wipFiber, newChildElements)` is the diffing algorithm. It matches old fibers to new elements using **keys** (when present) or **index** (fallback), and marks each fiber with the appropriate effect tag.

1. Build a `Map<key | index, Fiber>` from all existing child fibers.
2. For each new element:
    - Look up the old fiber by `element.key ?? i`.
    - If found and types match → mark `UPDATE`, carry over `stateNode` and `alternate`.
    - If type mismatch → mark the old fiber `DELETION`, create a new fiber marked `PLACEMENT`.
    - If no old fiber at all → create a new fiber marked `PLACEMENT`.
3. Any old fibers left in the map (i.e. not matched by any new element) are marked `DELETION`.

The resulting fibers are linked into a sibling-chain as the new children of `wipFiber`.

**`cloneChildFibers(parentFiber)`** is the fast path when a component bails out early. It copies child fibers verbatim from `parentFiber.alternate` without reconciliation — no effect tags are added, so no DOM mutations are generated.

**`getTag(element)`** determines the fiber tag for a newly created element using two defense-in-depth checks:
- A string `type` → `HOST_COMPONENT`.
- A function type that has **neither** `isAnuComponent = true` **nor** a `prototype.render` method → `FUNCTION_COMPONENT`. Both checks serve different failure modes: `isAnuComponent` catches third-party classes that happen to have a `render` method, while `prototype.render` catches subclasses of `Anu.Component` that accidentally forgot to implement `render()` (the abstract method is only enforced at compile time).
- Anything else → `CLASS_COMPONENT`.

<h3 id="complete-work">Complete work phase</h3>

`completeWork(fiber)` is called after a fiber and its entire subtree have been processed:

- For `CLASS_COMPONENT` fibers, it synchronizes `instance.__fiber = fiber` so `setState` can always find the up-to-date fiber.
- It propagates effects upward: `fiber.parent.effects = parentEffects.concat(childEffects, thisEffect)`. By the time `completeWork` reaches the root, the root's `effects` array contains every fiber that requires a DOM mutation, in depth-first order.
- When the root fiber completes (no parent), it assigns `pendingCommit = fiber`, signaling that the work loop should commit.

<h3 id="commit-phase">Commit phase &amp; lifecycle queue</h3>

`commitAllWork(fiber)` processes `fiber.effects` in order by calling `commitWork(effect)` on each, and flushes the lifecycle queue after the last effect:

**`commitWork(effect)`** handles each effect tag:

- **`PLACEMENT`:**
    - For `HOST_COMPONENT`: finds the correct DOM parent by walking up until a host ancestor is found. Uses `getNextHostNode()` to determine the correct sibling insertion point, so newly placed elements land in the right position even when their logical siblings are class or function components. Sets `ref.current` if present. 
    - For `CLASS_COMPONENT`: enqueues `componentDidMount` in `componentLifecyclesQueue`.

- **`UPDATE`:**
    - For `HOST_COMPONENT`: calls `updateDomProperties()` to diff old vs new props. Sets `ref.current` if present.
    - For `CLASS_COMPONENT`: enqueues `componentDidUpdate(prevProps, prevState)` in `componentLifecyclesQueue`.

- **`DELETION`:**
    - Calls `commitDeletion(effect, domParent)`, which runs in two phases:
        - **Phase 1 — lifecycle teardown:** `collectClassComponents` does an iterative DFS of the entire deleted subtree (including the root fiber), collects all `CLASS_COMPONENT` fibers, then reverses the list to get bottom-up order (children before parents). Each fiber then has `componentWillUnmount` called (individually wrapped in try/catch so one bad lifecycle does not abort the rest) and `stateNode.__fiber` nulled. This ensures every `ContextConsumer` and any other class component in the deleted subtree deregisters itself — preventing stale subscriber entries and the reconciliation loops they would otherwise cause.
        - **Phase 2 — DOM removal:** `removeFiberDom` recursively walks the subtree. Class and function component fibers have no DOM node of their own, so it recurses through their children with the same `domParent`. A `HOST_COMPONENT` fiber is descended into **before** it is removed — its host descendants are detached along with it, but a `PORTAL` nested anywhere beneath it would otherwise be unreachable (its content lives in a different container), so the walk must visit host children to reach them. A `PORTAL` fiber's children are removed with the portal's own `stateNode` as the `domParent`, ensuring portal content is removed from the correct container rather than from the outer parent. (Earlier versions descended only through class/function fibers and so leaked portals nested under a host element on unmount.)

**`componentLifecyclesQueue`** is a module-level array of `{ fn, params }` entries. All lifecycle callbacks (`componentDidMount`, `componentDidUpdate`) are accumulated during the commit loop and flushed together at the very end — after all DOM mutations are complete. This ensures that lifecycle methods always observe the fully-updated DOM, matching React's semantics.

<h3 id="public-reconciler-api">Public API</h3>

```typescript
// Kick off an initial render or re-render of a full element tree
export const render = (elements: AnuElement | AnuElement[], containerDom: Element): void;

// Create a mutable ref object (always initialized to null)
export const createRef = <T = any>(): Ref<T>;

// Called internally by Component.setState() — schedules a class component update
export const scheduleUpdate = (
    instance: any,
    partialState: Record<string, any>,
    partialStateCallback?: (prevState: any, prevProps: any) => any
): void;

// Render a subtree into an arbitrary DOM node while keeping it in the React fiber tree
export const createPortal = (children: AnuNode, container: Element): AnuElement;
```

<br>
<hr>

<h2 id="dom-utilities">DOM Utilities — <code>src/core/domUtils.ts</code></h2>

This module is the boundary between the virtual DOM and the real DOM. The reconciler calls these functions but never directly touches `document`.

<h3 id="svg-support">SVG support</h3>

`SVG_ELEMENT_LIST` is a compile-time constant array listing every supported SVG element name (67 entries, including filters, gradients, shapes, and animation elements). The reconciler checks this array to decide whether to use `document.createElementNS` vs `document.createElement`.

Three element names are mapped to avoid JSX conflicts with their HTML equivalents:

| JSX tag | Real SVG tag | Reason |
|---------|-------------|--------|
| `anchor` | `a` | Avoids conflict with HTML `<a>` |
| `svgStyle` | `style` | Avoids conflict with HTML `<style>` |
| `svgTitle` | `title` | Avoids conflict with HTML `<title>` |

`getHTMLValidSvgTag(fiberType)` performs this translation before passing the tag to `createElementNS`.

<h3 id="createDomElement">Creating DOM elements</h3>

```typescript
export const createDomElement = (
    fiber: AnuElement & { type: string }
): HTMLElement | SVGElement | Text
```

Dispatches to the correct `document.*` factory:
- `TEXT_ELEMENT` → `document.createTextNode('')`
- SVG elements → `document.createElementNS('http://www.w3.org/2000/svg', tag)`
- HTML elements → `document.createElement(tag)`

After creation, `updateDomProperties(dom, {}, fiber.props, isSvgElement)` is called immediately to apply the initial props — the same code path as updates, with an empty `prevProps`.

<h3 id="updateDomProperties">Diffing and updating DOM properties</h3>

```typescript
export const updateDomProperties = (
    dom: HTMLElement | SVGElement | Text,
    prevProps: Props,
    nextProps: Props,
    isSvgElement = false
): void
```

This function applies the minimal diff between `prevProps` and `nextProps` to the real DOM node in five passes:

1. **Remove stale event listeners.** Any `on*` prop that has changed or disappeared has its listener removed via `removeEventListener`.

2. **Remove stale attributes.** Attributes present in `prevProps` but absent from `nextProps` are removed. `className` maps to the `class` attribute; `htmlFor` maps to `for`.

3. **Set new / changed attributes.** A new/changed prop whose value is `undefined` or `null` is treated as a **removal** — the attribute is taken off the node (`removeAttribute`, with `className`→`class`/`htmlFor`→`for` remaps) rather than coerced to the string `"undefined"`. This mirrors the initial-render behaviour, where an `undefined` prop is filtered out by the `prev[key] !== next[key]` diff and never written, so `attr={cond ? value : undefined}` cleanly drops the attribute when the condition flips. Otherwise, for SVG elements, all attributes are set via `setAttribute()`. For HTML elements:
   - any prop whose name contains a hyphen (e.g. `aria-*`, `data-*`), equals `role`, or is in `ATTRIBUTE_ONLY_PROPS` (`loading`, `decoding`, `fetchpriority`) is set via `setAttribute()` — hyphenated names are never valid IDL properties, so property assignment would silently create a JS object property rather than an HTML attribute, and the `ATTRIBUTE_ONLY_PROPS` reflected attributes are not implemented as IDL properties under jsdom, so `el.loading = 'lazy'` would silently create a dead JS property instead of an attribute;
   - **camelCase HTML attribute names** (e.g. `inputMode`, `autoComplete`, `tabIndex`, `spellCheck`) are likewise routed through `setAttribute()` using the lowercased name — or a hyphenated form from a small exception map (`HTML_ATTRIBUTE_NAME_MAP`: `httpEquiv` → `http-equiv`, `acceptCharset` → `accept-charset`). This is necessary because their IDL property either differs from the prop name (the DOM property behind `autoComplete` is `autocomplete`, so `el.autoComplete = ...` silently creates a dead JS property) or is not reflected by jsdom (`inputMode`). The branch is guarded to element nodes (`dom.nodeType === 1`) so `Text` nodes — whose only prop is the camelCase `nodeValue` — still use property assignment;
   - `className` and `htmlFor` keep their working IDL aliases (`el.className`, `el.htmlFor`), and all remaining (already-lowercase) props are set directly (e.g. `el.value = ...`) for performance.

4. **Diff inline styles.** Changed `style` keys are applied via `style.setProperty(cssName, value)`, where `cssName` is the **kebab-cased** form of the JS key (`objectFit` → `object-fit`, `backgroundColor` → `background-color`, `WebkitTransform` → `-webkit-transform`) — `CSSStyleDeclaration.setProperty` only accepts CSS-valid property names, so a camelCase key like `objectFit` would otherwise be silently discarded. Custom-property keys (`--accent`) are passed through verbatim. Keys present in `prevStyle` but absent from `nextStyle` are cleared by setting them to `''`.

5. **Add new event listeners.** New or changed `on*` props are registered via `addEventListener`. Event names are derived by lower-casing the prop name and stripping the `on` prefix (e.g. `onClick` → `click`).

<br>
<hr>

<h2 id="component-base-class">Component Base Class — <code>src/core/components/Component.ts</code></h2>

`Component` is the abstract base class that all class components must extend. It is deliberately minimal — it stores props, state, and context, provides `setState`, and declares the abstract `render()` method along with empty lifecycle method stubs.

```typescript
export abstract class Component<
    P extends Record<string, any> = Props,
    S extends Record<string, any> = Record<string, any>
> {
    props: P;
    state: S;
    context: Record<string, any>;

    /** @internal Set by the reconciler after instantiation. */
    __fiber?: any;

    static isAnuComponent = true;

    constructor(props: P, context?: Record<string, any>) {
        this.props = props || ({} as P);
        this.context = { ...(this as any).context, ...context };
        this.state = (this as any).state || ({} as S);
    }

    setState(partialState: Partial<S> | ((prevState: S, prevProps: P) => Partial<S>) = {}): void {
        let partialStateObject: Partial<S> = {};
        let partialStateCallback: ((prevState: S, prevProps: P) => Partial<S>) | undefined;

        if (typeof partialState === 'object') {
            partialStateObject = { ...partialStateObject, ...partialState };
        } else if (typeof partialState === 'function') {
            partialStateCallback = partialState;
        }

        scheduleUpdate(this, partialStateObject, partialStateCallback);
    }

    abstract render(): AnuNode;

    componentDidMount(): void {}
    componentDidUpdate(_prevProps: P, _prevState: S): void {}
    componentWillUnmount(): void {}
}
```

**Key design points:**

- `static isAnuComponent = true` is a class-level discriminator marker. `getTag()` in the reconciler checks for this property to distinguish genuine `Anu.Component` subclasses from arbitrary third-party classes that happen to have a `render()` method. Because it is declared as a static property on the base class, all subclasses inherit it automatically without any extra boilerplate.

- `__fiber` is the link back to the fiber tree. The reconciler sets `instance.__fiber = fiber` after creating an instance. `setState` passes `this` to `scheduleUpdate`, which reads `this.__fiber` to locate the correct update target. When a component unmounts, `__fiber` is set to `null` so any stale `setState` calls (e.g. from uncleared timers) are silently dropped.

- `context` is initialized by merging the instance's own `context` (if pre-set by a subclass) with the `context` argument from the constructor. The Connector `connect` HOC uses this mechanism to inject the store reference into connected components.

<br>
<hr>

<h2 id="pure-component">PureComponent — <code>src/core/components/PureComponent.ts</code></h2>

`PureComponent` is a `Component` subclass whose only addition is a `shouldComponentUpdate(nextProps, nextState)` implemented as `!shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)`. It opts a class into the reconciler's `shouldComponentUpdate` bailout in `updateClassComponent`, so subclasses get the shallow-compare skip for free without writing the comparison by hand. Because it still inherits `static isAnuComponent = true`, `getTag()` classifies it as a `CLASS_COMPONENT` like any other component.

<br>
<hr>

<h2 id="fragment">Fragment — <code>src/core/components/Fragment.ts</code></h2>

`Fragment` is a class component that simply returns its children array without wrapping them in any DOM element. It allows sibling elements to be grouped in JSX without introducing a superfluous `<div>`. It accepts **any number of children, including zero** (an empty fragment renders nothing) — matching `React.Fragment`.

```typescript
export class Fragment extends Component {
    render(): AnuChild[] {
        return toChildArray(this.props.children);
    }
}
```

`toChildArray` coerces the raw `props.children` (a single value, an array, or `undefined`) into a filtered array regardless of how many children were authored. The reconciler handles array returns from `render()` natively — `reconcileChildrenArray` accepts arrays and flattens them into sibling fibers. The `<>...</>` fragment shorthand is wired via `babel-preset.js` (`pragmaFrag: 'Anu.Fragment'`), which transforms it to `Anu.createElement(Anu.Fragment, null, ...)`.

<br>
<hr>

<h2 id="lazy">Async loading — <code>src/core/lazy.ts</code></h2>

`lazy(factory, options?)` defers a heavy component behind a dynamic `import()` so it ships in its own bundle chunk. It needs **no reconciler change** — it returns a `Component` subclass that fires the import on mount and `setState`s the resolved component in:

```typescript
export const lazy = <P extends Props = Props>(
    factory: () => Promise<{ default: ElementType } | ElementType>,
    options: LazyOptions = {}
): ComponentConstructor<P> =>
    class Lazy extends Component<P, { Loaded: ElementType | null }> {
        state = { Loaded: null as ElementType | null };

        componentDidMount(): void {
            Promise.resolve()
                .then(factory)
                .then((mod) => {
                    const Loaded = (mod as { default: ElementType }).default ?? (mod as ElementType);
                    this.setState({ Loaded });
                })
                .catch((error) => {
                    options.onError?.(error);
                });
        }

        render(): AnuElement | null {
            const { Loaded } = this.state;

            if (Loaded === null) {
                return options.fallback ?? null;
            }

            return createElement(Loaded, this.props);
        }
    };
```

The factory result is normalised with `(mod).default ?? mod`, so both an ES-module namespace (`{ default }`) and a bare component resolve correctly. Until it resolves, `render()` returns `options.fallback ?? null`; afterwards it forwards the live props to the loaded component on every update via `createElement(Loaded, this.props)`. The fallback→loaded swap is an ordinary `setState`, so it commits on the macro-task scheduler like any other update. This is the **minimal** code-splitting form: there is no shared `<Suspense>` boundary (each `lazy` renders its own fallback) and no SSR/hydration support.

The return type is `ComponentConstructor<P>`, **not** `ElementType`. `ElementType` is a union that includes `string`, which has no construct or call signature, so a value typed that way is rejected by `JSX.ElementType` resolution (`TS2604` on `<Lazy />`). Since `lazy` always returns a class component, the narrower `ComponentConstructor<P>` is both accurate and JSX-renderable, and the optional `P` type parameter types the props the loaded component receives (`Anu.lazy<{ data: Data }>(...)`).

<br>
<hr>

<h2 id="memo">Function-component bail-out — <code>src/core/memo.ts</code></h2>

`memo(Comp, areEqual?)` is the function-component equivalent of `PureComponent`. It returns a thin wrapper function that simply calls `Comp(props)`, tagged with two marker properties the reconciler reads:

```typescript
export const memo = <P extends Props>(
    Comp: FunctionComponent<P>,
    areEqual: (prev: P, next: P) => boolean = (prev, next) => shallowEqual(prev, next)
): FunctionComponent<P> => {
    const Memoized = ((props: P) => Comp(props)) as MemoComponent<P>;
    Memoized.__isMemo = true;
    Memoized.__areEqual = areEqual;

    return Memoized;
};
```

The wrapper is a plain arrow function with no `prototype`, so `getTag()` classifies it as a `FUNCTION_COMPONENT`. The default comparator is `shallowEqual`; a custom one receives `(prevProps, nextProps)`. `updateFunctionComponent` consults `__isMemo`/`__areEqual` as a second bail-out branch (see the [reconciler walk](#reconcile-children)) — when the comparator reports the props are equal, the function body is skipped and the subtree is cloned. `key`/`ref` never reach the comparator because `createElement` strips them from `props`.

<br>
<hr>

<h2 id="context-api">Context API — <code>src/core/components/Context.ts</code></h2>

The Context API provides a way to share a value across a component subtree without threading it through every intermediate component as props.

<h3 id="createcontext">The <code>createContext()</code> factory</h3>

```typescript
export const createContext = <T extends Record<string, any> = Record<string, any>>(
    context: T
): Context<T>
```

`createContext` is a factory function. Each call creates an isolated Provider/Consumer pair scoped to its own class identities. The only state shared across the whole context is the **default value** — the closure-level `defaultContext`, which is what a Consumer reads when no Provider sits above it. Every Provider's *current* value lives on the Provider instance, not in the closure, so the context is **tree-scoped**: multiple Providers of the same context can coexist on a page, each scoping its value to its own subtree.

```typescript
const defaultContext: { value: T } = { value: context }; // the value passed to createContext()
```

The function returns four exports for two use cases:

| Export | TypeScript | Carries |
|--------|-----------|---------|
| `Provider` | Typed (`Props & Partial<T>`) | The context value props |
| `Consumer` | Typed (`ConsumerProps<T>`) | Render-prop typed as `(ctx: ContextValue<T>) => AnuElement \| null` |
| `ContextProvider` | Untyped (`Props`) | For internal use by Intl and Feature modules |
| `ContextConsumer` | Untyped (`Props`) | For internal use by Intl and Feature modules |

<h3 id="context-provider-internals">Provider internals</h3>

`ContextProvider` is a class component. On construction, it extracts all non-`children` props and stores them as `this.value` — **per instance**, so two Providers of the same context never clobber each other. Each instance also owns its own `subscribers` set (the Consumers resolved to it). On `componentDidUpdate`, it uses `deepEqual` to check whether props have actually changed before updating — this prevents unnecessary re-renders when the parent re-renders but the context value is structurally identical — and then notifies **only its own** subscribers, not every Consumer of the context app-wide.

Its `render()` simply returns `toChildArray(this.props.children)` — **any number of children, matching React** (zero renders nothing; sibling children render directly with no `Fragment` wrapper required). The reconciler flattens the returned array into sibling fibers.

```typescript
render(): AnuChild[] {
    return toChildArray(this.props.children);
}
```

```typescript
componentDidUpdate(): void {
    const pureProps = getPureProps(this.props);

    if (!deepEqual(this.value as Record<string, any>, pureProps as Record<string, any>)) {
        this.value = { ...pureProps };
        this.subscribers.forEach((consumer) => (consumer as any).setState());
    }
}
```

<h3 id="context-consumer-internals">Consumer internals</h3>

`ContextConsumer` is a class component driven by a render prop. On every render it resolves the **nearest ancestor Provider** of this context by walking up the fiber tree, reads that Provider's `value` (or the closure `defaultContext` value if there is no Provider above it), and calls the render prop with `{ value, defaultContext }`. It does **not** enforce a child count — it validates that the render prop *is a function* and throws otherwise (mirroring React, which requires a function child but doesn't care about the Provider's child count). Because `props.children` is stored raw, the render-prop function *is* the child: `toChildArray` yields `[fn]` and the Consumer reads `children[0]` as the function directly (previously `createElement` wrapped it into an element, so the function was recovered from `children[0].type`).

```typescript
render(): AnuElement | AnuElement[] | null {
    const renderChild = toChildArray(this.props.children)[0];

    if (typeof renderChild !== 'function') {
        throw new Error('Context component child element must be a function!');
    }

    const provider = resolveProvider(this);
    this.subscribeTo(provider);

    const value = provider ? provider.value : defaultContext.value;
    const childProps: ContextValue<T> = { value, defaultContext };

    return (renderChild as (ctx: ContextValue<T>) => AnuElement | null)(childProps);
}
```

<h3 id="subscriber-registry">Nearest-ancestor resolution &amp; the subscriber registry</h3>

`resolveProvider` walks the Consumer's `__fiber.parent` chain until it finds a fiber whose `stateNode instanceof ContextProvider` — and because each `createContext()` call mints a *distinct* `ContextProvider` class, the `instanceof` check matches only Providers of **this** context, ignoring host, function, portal, and other-context fibers along the way. The walk passes transparently through `createPortal`, since a portal fiber's parent pointer follows the component tree (not the DOM container), so a Consumer rendered inside a portal still sees the Provider that logically encloses it.

To make the walk read the live work-in-progress tree (not a stale committed one) during re-renders, `updateClassComponent` in the reconciler assigns `wipFiber.stateNode.__fiber = wipFiber` immediately before calling `render()`. This is idempotent with the assignment `completeWork` already performs for class fibers.

Updates propagate by registration rather than through the render tree: on each render the Consumer calls `subscribeTo(provider)`, adding itself to that Provider instance's `subscribers` set (and removing itself from any previous Provider if it re-resolved to a different one). It removes itself on unmount. When a Provider's value changes it calls `setState()` directly on each of its own subscribers — bypassing the render tree entirely, so an intervening `connect`-ed ancestor that bails out of re-rendering can never swallow the update.

<br>
<hr>

<h2 id="history-routing">Routing — <code>src/core/components/History.ts</code></h2>

ANUVerzum implements client-side routing using the browser's History API (`pushState` / `replaceState`) and the `popstate` event.

<h3 id="global-instances-registry">Global instance registry</h3>

All `HistoryRoute` instances register themselves in a module-level array on mount and unregister on unmount:

```typescript
const instances: Component[] = [];
const register   = (comp: Component): void => { instances.push(comp); };
const unregister = (comp: Component): void => { /* splice by indexOf */ };
```

When navigation occurs — whether via `HistoryLink`, `HistoryRedirect`, or `Anu.History.goTo()` — both `historyPush` and `historyReplace` call `setState()` on every registered `HistoryRoute`/`HistorySwitch` instance. This causes all routes in the tree to re-evaluate their `matchPath()` and re-render accordingly, without requiring a context or event bus.

<h3 id="path-matching">Path matching</h3>

```typescript
const compilePath = (path: string, exact: boolean): { regex: RegExp; keys: string[] };

const matchPath = (
    pathname: string,
    options: { exact?: boolean; path?: string }
): RouteMatch | null
```

`compilePath` turns a route pattern into a regex plus an ordered list of capture `keys`, splitting on `/` and translating each segment:

- A static segment is regex-escaped and matched literally.
- `:name` becomes a single-segment capture `/([^/]+)` and pushes `name` onto `keys`; `:name?` becomes the optional `(?:/([^/]+))?`.
- A trailing `*` becomes `(?:/(.*))?` and pushes the literal key `*` — the splat, which captures the remainder including `/`.
- A root pattern (`/`, no segments) compiles to `^/?$` (exact) or `^/` (matches anything).
- The suffix is `/?$` when `exact`, otherwise the **segment-boundary lookahead** `(?=/|$)`. This is the key change from the old literal-prefix matcher: a non-exact `/users` still matches `/users/42` but no longer matches `/usersxyz`.

`matchPath` runs the compiled regex against `pathname`, then zips `keys` against the regex capture groups (skipping groups that did not participate, e.g. an absent optional or empty splat) to build `params`. If `path` is absent the route always matches (`{ path: null, url: pathname, isExact: true, params: {} }`). The returned `RouteMatch` — `{ path, url, isExact, params }` — is passed to the `component` (`createElement(component, { match })`) or `render({ match })` prop. `isExact` is `pathname === url`.

<h3 id="route-param-registry">The current-match registry — <code>getRouteParams</code></h3>

`match.params` is only visible inside a route's `component`/`render`. To read **pattern** captures imperatively (by the `:name` you declared, and the splat under `'*'`), ANUVerzum keeps a module-level `routeMatches: Map<Component, RouteMatch>`. Each `HistoryRoute`, in `render`, calls `setRouteMatch(this, match)` when it matches and `clearRouteMatch(this)` when it does not (and on `componentWillUnmount`). Because navigation `setState`s every registered route, the map always reflects the **live** set of currently-matched routes.

```typescript
const getMergedRouteParams = (): Record<string, string> => {
    const merged: Record<string, string> = {};
    routeMatches.forEach((match) => Object.assign(merged, match.params));
    return merged;
};

const getRouteParams = (key: string): string | null => getMergedRouteParams()[key] ?? null;
const getAllRouteParamNames = (): string[] => Object.keys(getMergedRouteParams());
```

Params are **merged across all currently-matched routes** in insertion (mount) order, so a nested child's captures overlay its parent's (`{ userId }` from `/users/:userId` plus `{ userId, postId }` from a child `/users/:userId/posts/:postId` → `{ userId, postId }`). Inside a `Switch` only the selected child renders, so only its params are present — giving a clean single-route read. `getRouteParams('id')` reads the param you *named* `id` in the pattern, and the trailing `*` splat is reachable under the `'*'` key.

<h3 id="route-link-redirect">Route, Link, Redirect components</h3>

**`HistoryRoute`**
Registers with the global instance list on mount and listens for `popstate` (back/forward browser navigation). On render, it uses an injected `computedMatch` if present (set by an enclosing `Switch`), otherwise calls `matchPath` against `window.location.pathname`. If it matches, renders either `createElement(component, { match })` or `render({ match })`. Returns `null` if no match.

**`HistorySwitch`**
The exclusivity container — the analogue of React Router v5's `<Switch>`. It registers and listens for navigation exactly like a Route, but on render it walks its children (via `Children.toArray`, guarding each with `isValidElement`), runs `matchPath` against each child's `path`/`exact`, and renders **only the first match** — `cloneElement(child, { computedMatch: match })` — returning `null` if none match. First-match means ordering is significant: place more specific routes earlier, and a pathless or `*` Route last as the catch-all/404. This is what makes a true 404 expressible — a bare `Route` renders unconditionally on its own, but inside a `Switch` it only renders when every earlier sibling missed. Built entirely on the element-introspection toolkit (`Children`/`isValidElement`/`cloneElement`); no reconciler change.

**`HistoryLink`**
Renders as an `<a>` tag with `href={to}`, mirroring React Router's `<Link>`. Adds an `ariaLabel` of `historyLink[-ariaLabel]` for accessibility, and strips the Link-only `replace` prop so it never reaches the DOM. Its click handling matches React Router:

- It **composes** a consumer-supplied `onClick` rather than replacing it — the user's `onClick` runs first, and navigation only proceeds if the handler did not call `event.preventDefault()` (`!event.defaultPrevented`).
- It only intercepts **plain left-clicks**, gated by `shouldProcessLinkClick(event, target)` (`event.button === 0`, no `meta`/`ctrl`/`shift`/`alt` modifier, and `target` unset or `_self`). For modifier-clicks, middle/right-clicks, or `target="_blank"`, it leaves the browser's native behavior intact (open-in-new-tab, etc.).
- When it does process the click, it calls `event.preventDefault()` and navigates via `goTo(to, replace)` → `historyPush`/`historyReplace`.

For a non-anchor / custom link element, consumers build their own and call the exported `Anu.History.goTo()` from their handler (ANUVerzum exposes the imperative function rather than a React-Router-style hook).

**`HistoryRedirect`**
Renders nothing (`return null`), but fires `historyPush` or `historyReplace` in `componentDidMount`. This makes it a declarative redirect — rendering it causes navigation.

<br>
<hr>

<h2 id="store">State Management — <code>src/store/store.ts</code></h2>

The Store module provides a Redux-compatible state container. It is intentionally modelled after Redux's API surface so that patterns and mental models transfer directly.

<h3 id="createstore">The <code>createStore()</code> function</h3>

```typescript
const createStore = <S = any, A extends Action = Action>(
    reducer: Reducer<S, A>,
    initialState: S,
    middleware?: Middleware<S, A>
): Store<S, A>
```

The store maintains three pieces of private state:
- `_currentReducer` — the root reducer function.
- `_currentState` — the current state value.
- `_subscribers` — an array of listener functions called after every dispatch.

**The core dispatch** validates the action (must be a plain object with a `type` string), runs it through the reducer, and calls every subscriber. It also calls `trackStateChange` from `AnulyticsProvider` to automatically record every state mutation as an analytics event.

**Middleware wiring:** If a `middleware` argument is provided, the store replaces `store.dispatch` with `middleware({ dispatch, getState })(_coreDispatch)`. The `dispatch` reference passed into the middleware always delegates to the final `store.dispatch`, which means middleware can call each other through the chain.

The store's public interface:

```typescript
type Store<S, A> = {
    getState:    () => S;
    dispatch:    Dispatch<A>;
    subscribe:   (listener: () => void) => void;
    unsubscribe: (listener: () => void) => void;
};
```

<h3 id="middleware-pipeline">The middleware pipeline</h3>

```typescript
const applyMiddleware =
    <S, A>(...middlewares: Array<Middleware<S, A>>) =>
    (store: MiddlewareAPI<S, A>): ((next: Dispatch<A>) => Dispatch<A>)
```

`applyMiddleware` composes multiple middlewares using `Array.prototype.reduce`. Each middleware has the signature `api => next => action`, where `next` is the next middleware (or `_coreDispatch` at the end of the chain). The composed function is passed to `createStore` as the `middleware` argument.

<h3 id="built-in-middlewares">Built-in middlewares</h3>

**`thunkMiddleware`:** Checks if the dispatched value is a function (a thunk). If so, calls it with `(dispatch, getState)` and returns the result. Otherwise, passes the action down to `next`. Required for async action creators.

**`loggingMiddleware`:** Logs `prevState`, `action`, and `nextState` to the console on every dispatch. Intended for development debugging.

<h3 id="combinereducers">The <code>combineReducers()</code> function</h3>

```typescript
const combineReducers = <S extends Record<string, any>>(reducers: {
    [K in keyof S]: Reducer<S[K]>
}): Reducer<S>
```

Returns a single root reducer that maintains a state object whose keys match the `reducers` map. On each dispatch, it iterates over every key and calls the corresponding sub-reducer with its slice of state. This is the standard Redux pattern for organizing a large state tree.

<h3 id="createselector">The <code>createSelector()</code> function and LRU memoization</h3>

```typescript
const createSelector: CreateSelectorFn = (
    dependenciesInput: SelectorFn<any> | Array<SelectorFn<any>>,
    transformation: (...args: any[]) => any
): SelectorFn
```

`createSelector` builds a memoized selector: given one or more "getter" functions and a "transformation" function, it returns a new function that:
1. Calls each getter with the input (typically the global state).
2. Passes the getter results to the transformation function.
3. Returns the cached result if the input arguments to the transformation are the same as last time.

Both the transformation and the outer selector are independently memoized using `_memoize`.

**`_memoize(func, maxSize = 100)`** implements an LRU cache using a `Map` for O(1) lookup and a parallel `accessOrder: string[]` array for eviction ordering. On each cache hit, the key is moved to the end of `accessOrder`. When the cache exceeds `maxSize`, the oldest entry (front of `accessOrder`) is evicted.

**`_generateKey(args)`** serializes an argument list into a string cache key. It handles `null`, `undefined`, functions (stringified to first 100 chars), symbols, objects (via `JSON.stringify` with a circular fallback), and primitives.

The `CreateSelectorFn` interface provides overloads for 1 to 4 getter dependencies with full type inference:

```typescript
export interface CreateSelectorFn {
    <TInput, TI, TOutput>(dep: SelectorFn<TInput, TI>, fn: (r: TI) => TOutput): SelectorFn<TInput, TOutput>;
    <TInput, T1, TOutput>(deps: [SelectorFn<TInput, T1>], fn: (r1: T1) => TOutput): SelectorFn<TInput, TOutput>;
    <TInput, T1, T2, TOutput>(deps: [SelectorFn<TInput, T1>, SelectorFn<TInput, T2>], fn: (r1: T1, r2: T2) => TOutput): SelectorFn<TInput, TOutput>;
    // ... up to 4 dependencies
}
```

<h3 id="analytics-integration">Analytics integration</h3>

The store is wired to Anulytics at the `_coreDispatch` level. After every successful dispatch, `trackStateChange(prevState, action, nextState)` is called automatically. This means every action dispatched through the store is recorded as a `stateChange` analytics event with no additional code in the consumer application — as long as `AnulyticsProvider` is mounted.

<br>
<hr>

<h2 id="connector">Connector — <code>src/core/components/Connector.ts</code></h2>

The Connector module is the equivalent of `react-redux`. It provides a `Provider` that injects a store into the component tree, and a `connect` HOC that subscribes a component to that store.

<h3 id="connector-provider">The <code>Provider</code> component</h3>

```typescript
class Provider extends Component<ConnectorProviderProps>
```

On construction, `Provider` stores the `store` prop on `this.context['store']` and sets `this.context['parentSub'] = null`. It then calls `providerStore.setContext({ ...this.context })`, updating a module-level `providedStore` singleton.

The `providedStore` singleton is a closure that holds the merged context object and exposes `getContext()` / `setContext()`. This is how the store reference survives the component lifecycle — `connectHOC`'s `Connect` class reads from `providerStore.getContext()` in its constructor, not from a live context subscription.

<h3 id="subscription-tree">The <code>Subscription</code> class</h3>

```typescript
class Subscription {
    store: StoreShape;
    parentSub: Subscription | null;
    onStateChange: () => void;
    subscribed: boolean;
    listeners: Array<() => void>;
}
```

`Subscription` manages a tree of store subscriptions. Instead of all connected components subscribing directly to the store, they subscribe through a parent-child hierarchy that mirrors the component tree:

- The root `Connect` component subscribes directly to `store.subscribe`.
- Child `Connect` components call `parentSub.addNestedSub(onStateChange)` instead.
- When state changes, the root fires, which triggers `notifyNestedSubs()` down the tree.

This avoids a common bug where a parent component's subscription fires before a child's subscription has been set up after a batch update.

<h3 id="connect-hoc">The <code>connect()</code> HOC</h3>

```typescript
const connectHOC = <TState, TOwnProps, TStateProps, TDispatchProps>(
    mapStateToProps?: MapStateToProps | null,
    mapDispatchToProps?: MapDispatchToProps | null
) => (WrappedComponent: ComponentConstructor): ComponentConstructor
```

`connectHOC` returns a curried function that accepts a wrapped component and returns a new `Connect` class component. On mount, `Connect` calls `this.subscription.trySubscribe()`. On state change, `onStateChange()` calls `this.setState({})` which triggers a re-render.

On each render, `Connect` calls `mapStateToProps` and `mapDispatchToProps` (each optional, defaults to empty objects), merges the results with `this.props`, and passes the merged object to the wrapped component. To avoid breaking the reconciler's props bail-out (which compares props by reference), `Connect` caches the last merged props object and only replaces it when a shallow equality check detects a real change:

```typescript
render(): AnuElement {
    const stateProps    = mapStateToProps    ? mapStateToProps(store.getState(), this.props)  : {};
    const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {};
    const nextPassedProps = { ...this.props, ...stateProps, ...dispatchProps };

    if (!this._cachedPassedProps || !shallowEqual(this._cachedPassedProps, nextPassedProps)) {
        this._cachedPassedProps = nextPassedProps;
    }

    return createElement(WrappedComponent, this._cachedPassedProps);
}
```

Without this cache, every `Connect.render()` call constructs a new object literal, so `wipFiber.props !== instance.props` is always true and the reconciler never takes the bail-out path for the wrapped component — causing unnecessary re-renders on every Redux dispatch even when the derived props are identical.

On `componentDidUpdate`, it calls `this.subscription.notifyNestedSubs()` to propagate the update to child subscriptions.

<br>
<hr>

<h2 id="intl">Internationalization — <code>src/core/components/Intl.ts</code></h2>

The Intl module provides runtime message lookup, interpolation, and locale-aware number abbreviation. It is built on top of the Context API internally.

<h3 id="intl-provider">The <code>IntlProvider</code> component</h3>

```typescript
const IntlProvider = ({
    locale,
    messages,
    defaultLocale,
    children
}: IntlProviderProps): AnuElement | null
```

`IntlProvider` is a function component. It validates the `locale` and `messages` props, selects the correct message dictionary (`messages[locale]` or `messages[defaultLocale]` as fallback), and updates the module-level `__messagesContext` singleton. It then renders the internal `_Intl.ContextProvider` with the selected messages, making them available to all `FormattedMessage` descendants.

It also accepts an optional **flat `options`** prop — number-formatting defaults that apply app-wide so a single locale choice drives translated text *and* number formatting consistently. On render it computes an aggregated option set and stores it on the singleton: it starts from the engine defaults that `new Intl.NumberFormat(locale)` resolves for that locale (`resolvedOptions()`, minus `locale`), then overlays the user-provided `options` on top (user values win; any key the user omits is polyfilled from the engine default). The flat object can carry both `Intl.NumberFormatOptions` keys and `abbreviateNumber`'s own keys (`units`, `decimalPlaces`, `decimalSign`); each function later picks out the keys it understands.

The `__messagesContext` singleton — `{ locale, messages, options }` — is used by `formatMessage()`, `abbreviateNumber()`, `formatNumber()`, and `parseNumber()` for imperative (non-JSX) message, locale, and option resolution. Each of the three number functions resolves its effective options as `{ ...aggregatedProviderOptions, ...perCallOptions }`, so a per-call `options` argument overrides the Provider defaults, which in turn override the engine defaults. With no Provider mounted the aggregated set is empty, so each function behaves exactly as a bare `Intl.NumberFormat` call with only its per-call options.

<h3 id="formatted-message">The <code>FormattedMessage</code> component</h3>

```typescript
const FormattedMessage = ({
    id,
    values,
    defaultMessage
}: FormattedMessageProps): AnuElement
```

`FormattedMessage` renders a `TEXT_ELEMENT` node with the resolved message string. It uses the `_Intl.ContextConsumer` internally to read the current messages from context.

Resolution priority:
1. `messages[id]` — from the current locale context.
2. `defaultMessage` prop — explicit fallback.
3. `id` itself — last resort fallback.

If `values` is provided, `interpolateValues(text, values)` replaces `{key}` placeholders with their corresponding values using a global regex replacement.

<h3 id="format-message">The <code>formatMessage()</code> utility</h3>

```typescript
const formatMessage = (
    id: string,
    values?: Record<string, string | number>,
    defaultMessage?: string
): string
```

The imperative equivalent of `FormattedMessage`. Reads directly from `__messagesContext` rather than the Context API, so it can be used outside of the render tree (e.g. in event handlers or utility functions).

<h3 id="abbreviate-number">The <code>abbreviateNumber()</code> utility</h3>

```typescript
const abbreviateNumber = (
    value: number | string | null | undefined,
    options: FormatNumberOptions & AbbreviateNumberOptions = {}
): string | number | null | undefined
```

Abbreviates large numbers with locale-aware units, and is built **on top of** `formatNumber`/`parseNumber` so it composes with them.

**Input** — accepts a `number`, a `string`, or `null`/`undefined`:
- a `number` is abbreviated directly;
- a `string` (e.g. the output of `formatNumber`) is first run through `parseNumber` using the active locale, then abbreviated — so `abbreviateNumber(formatNumber(x))` works;
- `null`, `NaN`, or an unparseable string is returned unchanged (preserving the historical non-number passthrough), which also makes `abbreviateNumber(parseNumber(x))` safe when the parse misses.

The result (`string | number`) drops straight into `<FormattedMessage values>` / `formatMessage(id, values)`.

**Unit table** — still keyed on the language subtag (`getLanguageSubtag(perCallLocale ?? providerLocale)`, so `'hu-HU'` / `'HU'` → `'hu'`):

| Locale | Units |
|--------|-------|
| `hu` (Hungarian) | `['E', 'm', 'M', 'b']` |
| default | `['K', 'M', 'B', 'T']` |

**Output** — the algorithm iterates from the largest unit downward; when a threshold is met it divides and rounds to `decimalPlaces` (default 2), handling rollover to the next unit (e.g. `999,999` rounding to `1,000K` becomes `1M`). The numeric mantissa is then formatted **through `formatNumber`** (passing `maximumFractionDigits: decimalPlaces`), so the decimal sign and numbering system come from the locale and the aggregated Provider options — there is no longer a separate hardcoded `DECIMAL_SIGN` table. `units`, `decimalPlaces`, and `decimalSign` remain overridable via `options` (an explicit `decimalSign` replaces the locale separator post-format).

<h3 id="format-number">The <code>formatNumber()</code> and <code>parseNumber()</code> utilities</h3>

Where `abbreviateNumber` produces short forms, `formatNumber`/`parseNumber` are a general locale-aware round-trip pair built directly on the standard `Intl.NumberFormat`. Both resolve their locale via `resolveLocale(locale)` — the explicit `locale` option, else `__messagesContext.locale` (the active `IntlProvider` locale), else the runtime default. Unlike `abbreviateNumber`, they pass the **full** BCP 47 tag to `Intl.NumberFormat` rather than reducing it to the language subtag, because the region is meaningful here (`en-US` vs `en-GB` vs `en-IN`). Casing is irrelevant — `Intl.NumberFormat` canonicalizes `'hu'`, `'HU'`, and `'hu-HU'` alike.

```typescript
export interface FormatNumberOptions extends Intl.NumberFormatOptions {
    locale?: string;
}

export interface ParseNumberOptions {
    locale?: string;
}

const formatNumber = (value: number, options: FormatNumberOptions = {}): string;
const parseNumber  = (text: string, options: ParseNumberOptions = {}): number | null;
```

**Self-reference hazard.** The module's own `Intl` object (the default export) shadows the global ECMAScript `Intl` value binding. Both functions therefore reach the real formatter via `globalThis.Intl.NumberFormat` — a bare `Intl.NumberFormat` at runtime would resolve to the local API object, which has no `NumberFormat`. The `Intl.NumberFormatOptions` *type* reference is unaffected, because a `const` declaration introduces only a value binding, not a type-space entry.

**`formatNumber`** strips the `locale` key and forwards the effective options — `{ ...aggregatedProviderOptions, ...perCallOptions }` — to `new Intl.NumberFormat(locale, options).format(value)`. Non-numeric input (`NaN`, non-`number`) returns `String(value)` rather than throwing; a thrown `NumberFormat` error is caught, logged, and also degraded to `String(value)`.

**`parseNumber`** is the inverse. Because separator characters are locale-specific, it discovers them at runtime from a known sample via `new Intl.NumberFormat(locale, …).formatToParts(-12345.6)` — extracting the `group`, `decimal`, and `minusSign` parts. The discovery formatter consumes only the `numberingSystem` from the resolved options (per-call, else aggregated) and **forces `useGrouping: true`** for the sample, so a Provider `useGrouping: false` can never hide the group separator from the parser. It then normalizes the input: strips the group sign and all whitespace (JavaScript's `\s` covers the NBSP/NNBSP that several locales group with, e.g. `hu-HU`), converts the locale decimal sign to a dot, keeps only `[0-9.]`, and reapplies the sign detected earlier. Empty / sign-only / non-numeric results return `null`.

> **Build note:** `formatToParts` is typed under the `ES2018.Intl` library, which is included in `tsconfig.json`'s `lib` array. This affects type-checking only — Babel's emitted output is unchanged.

<br>
<hr>

<h2 id="feature-flags">Feature Flags — <code>src/core/components/Feature.ts</code></h2>

The Feature module provides a lightweight conditional rendering mechanism driven by a runtime feature map.

```typescript
type FeaturesMap = Record<string, boolean>;

const FeaturesContext = createContext<{ features?: FeaturesMap }>(defaultFeatures);

const Feature = {
    Provider: FeaturesContext.ContextProvider,
    Toggle: FeatureToggle
};
```

`Feature.Provider` is the raw `ContextProvider` from a `createContext()` call — it accepts a `features` prop (the `FeaturesMap`) and makes it available to all `Feature.Toggle` descendants.

`FeatureToggle` is a class component that reads the `features` map from context and renders `children` if `features[name] === true`, or `defaultComponent` (defaults to `null`) otherwise. `defaultComponent` accepts a single `AnuElement`, an `AnuElement[]`, or `null`.

When `defaultComponent` is a `Fragment` element, `resolveDefault()` unwraps it and returns its children via `toChildArray(Fragment.props.children)` directly. This prevents the reconciler from receiving a Fragment CLASS_COMPONENT as the output of the ContextConsumer render-prop, which would corrupt the surrounding fiber tree (duplicate sibling renders and broken context propagation). `toChildArray` is used because `props.children` is now stored raw — a Fragment with a single child holds that child directly rather than a one-element array.

`FeatureToggle` is a class component (not a function component) so that the render-prop passed to `ContextConsumer` always reads `this.props` — the current props at call time. A function component would close over the `name`, `children`, and `defaultComponent` parameters at the time `FeatureToggle` itself was called, and those captured values would become stale if the parent re-rendered with new props before the `ContextConsumer` render-prop fired again.

```typescript
const resolveDefault = (
    defaultComponent: AnuElement | AnuElement[] | null
): AnuElement | AnuChild[] | null => {
    if (
        defaultComponent &&
        !Array.isArray(defaultComponent) &&
        (defaultComponent as AnuElement).type === Fragment
    ) {
        return toChildArray((defaultComponent as AnuElement).props.children);
    }
    return defaultComponent;
};

class FeatureToggle extends Component<FeatureToggleProps> {
    render(): AnuElement {
        return createElement(
            FeaturesContext.ContextConsumer,
            {},
            ({ value: { features } }: { value: { features?: FeaturesMap } }) =>
                features && features[this.props.name] === true
                    ? this.props.children
                    : resolveDefault(this.props.defaultComponent ?? null)
        );
    }
}
```

Because `Feature.Provider` is `ContextProvider` (not the typed `Provider`), props are untyped — the `features` object is passed as a prop directly on `<Feature.Provider features={...} />`.

<br>
<hr>

<h2 id="anulytics">Analytics — <code>src/core/components/AnulyticsProvider.ts</code></h2>

The Anulytics module tracks user interaction, navigation, and state change events and sends each event to a server endpoint immediately as a separate POST request.

<h3 id="anulytics-state-singleton">The <code>AnulyticsState</code> singleton</h3>

`AnulyticsState` is a module-level IIFE that holds the session's shared state and owns the `send` helper:

```typescript
const AnulyticsState = (() => {
    const startDate = new Date().getTime();
    let _analyticsUrl = '';
    let _onSuccess: (response: any) => void = () => {};
    let _onFail: (status: number) => void = () => {};
    let _user: Record<string, any> = {};

    const send = (event: Record<string, any>, extra?: Record<string, any>): void => {
        ServerAPI.post(_analyticsUrl, { startDate, user: _user, ...event, ...(extra || {}) })
            .then(({ response }) => _onSuccess(response))
            .catch(({ status }) => _onFail(status));
    };

    return { setConfig, setUser, getStartDate, sendEvent, trackEvent, trackStateChange, ... };
})();
```

`startDate` is captured when the module loads and is included in every POST as a session identifier. The singleton exposes:

- `setConfig(url, onSuccess, onFail)` — stores the endpoint URL and response callbacks, called from `componentDidMount`.
- `setUser(userData)` — stores user metadata included in every POST.
- `getStartDate()` — returns the module-load timestamp, used for the `initialization` event.
- `sendEvent(key, val, extra?)` — fires a POST for a raw event object; `extra` is merged at the top level (used to attach `system` to `pageLeave`).
- `trackEvent(event, props)` — builds and sends a `userAction` event from a DOM event object.
- `trackStateChange(prevState, action, nextState)` — builds and sends a `stateChange` event (called automatically by the store).

The `_anulyticsInstanceExist` flag gates all public tracking functions — they silently no-op if no `AnulyticsProvider` is mounted. The flag is set to `true` in `componentDidMount` after `setConfig`, guaranteeing `_analyticsUrl` is always populated before any event can be sent.

Each POST body has the shape:

```typescript
{
    startDate: number;           // module-load timestamp — session identifier
    user: Record<string, any>;
    [eventKey]: {                // e.g. "userAction", "stateChange", "navigation"
        eventType: string;
        timestamp: number;
        properties: object;
    };
    system?: { ... };            // only present on pageLeave
}
```

<h3 id="anulytics-provider-component">The <code>AnulyticsProvider</code> component</h3>

```typescript
class AnulyticsProvider extends Component<AnulyticsProviderProps>
```

On mount (`componentDidMount`), it calls `setConfig`, sets user data, sets `_anulyticsInstanceExist` to `true`, sends the `initialization` event (using `getStartDate()` as the timestamp so it reflects the true module-load time), and registers a `visibilitychange` listener. On unmount, it removes the listener and resets `_anulyticsInstanceExist` to `false`.

When `document.visibilityState === 'hidden'` (tab switch, minimize, browser close), the component sends a `pageLeave` event with system metadata as `extra`:

```typescript
AnulyticsState.sendEvent(
    EventTypes.PAGE_LEAVE,
    { eventType: url, timestamp: new Date().getTime(), properties: {} },
    {
        system: {
            referrer: document.referrer || null,
            innerWidth: window.innerWidth,
            isMobileAppInstalled: _isInstalled(),
            userAgentData: ua
        }
    }
);
```

User agent data: prefers `navigator.userAgentData` (modern structured API) with fallback to the legacy `navigator.userAgent` string.

When `visibilityState` returns to `'visible'`, the component calls `this.setState()` to trigger a re-render.

<h3 id="bot-detection">Bot detection and PWA detection</h3>

**Bot detection** checks for telltale global properties set by headless browser frameworks:

```typescript
const _isBot: boolean = !!(
    (window as any).phantom ||
    (window as any)._phantom ||
    (window as any).__nightmare ||
    window.navigator.webdriver ||
    (window as any).Cypress
);
```

If `_isBot` is true, `handleVisibilityChange` returns immediately without sending analytics. This prevents automated tests and crawlers from polluting the analytics dataset.

**PWA installation detection** checks whether the app is running in standalone mode — either via the non-standard `navigator.standalone` (iOS Safari) or the standardized `display-mode: standalone` media query:

```typescript
const _isInstalled = (): boolean =>
    !!(window.navigator as any).standalone ||
    window.matchMedia('(display-mode: standalone)').matches;
```

<h3 id="exported-tracking-functions">Exported tracking functions</h3>

These three functions are exported for use by other modules in the library:

```typescript
// Called by the application's event handlers
export const trackEvent = (event: UserActionEvent, props?: unknown): void;

// Called automatically by the store on every dispatch
export const trackStateChange = (prevState, action, nextState): void;

// Called by historyPush / historyReplace in History.ts
export const trackRouteChange = (path?: string): void;
```

All three are gated by `AnulyticsState.getAnulyticsInstanceExist()` — no event is sent if `AnulyticsProvider` is not mounted.

<br>
<hr>

<h2 id="server-api">Server API — <code>src/server-api/server-api.ts</code></h2>

The Server API is a thin, Promise-based wrapper over `XMLHttpRequest`. It deliberately avoids `fetch` to maintain compatibility with older environments and to provide consistent timeout and error handling.

<h3 id="xhr-internals">XHR internals</h3>

All five methods share a common XHR setup function:

```typescript
const _setXHR = <T>(
    successHandler: SuccessHandler<T>,
    errorHandler: ErrorHandler
): XMLHttpRequest
```

Three event handlers are registered on every XHR:
- `onerror` → `errorHandler({ status: 0, response: null })` — network-level failure.
- `ontimeout` → same as `onerror` — request timed out.
- `onload` → checks `XHR.status` against the known success (200–226), client error (400–418, 421–431, 451), and server error (500–511) lists. On success, attempts `JSON.parse(response)` with a fallback to `null` on invalid JSON. On error, calls `errorHandler` with the HTTP status code.

A `status` of `0` in the error callback always means no HTTP response was received (network failure, CORS rejection, timeout), as opposed to a real HTTP error code.

<h3 id="url-resolution">URL resolution and base URL</h3>

```typescript
let _baseURL = '';
const _resolveURL = (url: string): string =>
    /^https?:\/\//.test(url) ? url : `${_baseURL}${url}`;
```

The module holds a single `_baseURL` string (module-level, not per-request). `configure({ baseURL })` sets it, stripping any trailing slash. `_resolveURL` prepends `_baseURL` to relative URLs; absolute URLs (starting with `http://` or `https://`) pass through unchanged.

`_trimUrlFromSpaces(url)` replaces whitespace characters with `_` before the URL is used — a defensive measure for URLs constructed via template literals.

<h3 id="http-methods">HTTP method implementations</h3>

Each method is implemented as a curried function that returns a Promise:

```typescript
get<T>(url: string, params?: Record<string, any>): Promise<ApiSuccessResponse<T>>
```
Query parameters are URI-encoded and appended as `?key=value&key=value`. Passes through `_resolveURL`.

```typescript
post<T>(url: string, data: unknown): Promise<ApiSuccessResponse<T>>
put<T>(url: string, data: unknown):  Promise<ApiSuccessResponse<T>>
```
Body is `JSON.stringify(data)`. `Content-type: application/json; charset=utf-8` header is set. Returns immediately without sending if `data` is falsy.

```typescript
delete<T>(url: string, params?: Record<string, any>): Promise<ApiSuccessResponse<T>>
```
Identical to `get` in implementation, uses HTTP `DELETE`.

```typescript
file<T>(url: string, files: File | File[], data?: Record<string, any>): Promise<ApiSuccessResponse<T>>
```
Builds a `FormData` object. Each file is appended using its array index as the key. Additional `data` (if any) is appended as a JSON string under the key `'data'`. No `Content-type` header is set manually — the browser sets the correct `multipart/form-data` boundary automatically.

<br>
<hr>

<h2 id="utilities">Utilities — <code>src/misc/utils.ts</code></h2>

```typescript
export const deepEqual = (
    object1: Record<string, any>,
    object2: Record<string, any>
): boolean
```

A recursive structural equality check for plain objects. It short-circuits on key count mismatch, then recursively compares each value. Non-object values are compared with strict equality (`===`). This is used by the Context API's `ContextProvider` to avoid unnecessary re-renders when the provider re-renders with a structurally identical context value.

```typescript
export const shallowEqual = (
    objectA: Record<string, any>,
    objectB: Record<string, any>
): boolean
```

A one-level equality check: `Object.is` on the two references first, then a same-length comparison of own enumerable keys with `Object.is` per value (React semantics). It backs `PureComponent.shouldComponentUpdate` and the default `memo` comparator.

```typescript
export const isNotNullish = <T>(value: T): value is NonNullable<T> =>
    value !== null && value !== undefined;
```

A guard that returns `true` when a value is neither `null` nor `undefined`. It is the project's strict-equality replacement for the loose `x != null` idiom — `createElement`/`cloneElement` use it for their `key`/`ref` resolution, and the reconciler uses it where it previously compared `effectTag`/`nextUnitOfWork` against `null`.

```typescript
const Utils = { deepEqual, shallowEqual };
export default Utils;
```

`Utils` is also exposed on the `Anu` namespace as `Anu.Utils.deepEqual()` / `Anu.Utils.shallowEqual()` for use in consumer applications. (`isNotNullish` is an internal guard and is exported only as a named export, not on `Anu.Utils`.)

<br>
<hr>

<h2 id="build-configuration">Build Configuration</h2>

<h3 id="babel-preset">Babel preset — <code>babel-preset.js</code></h3>

This file is shipped as part of the npm package (`"files": ["dist", "babel-preset.js", "webpack.config.js"]`) so that consumer projects can reference it as `anu-verzum/babel-preset`.

```javascript
module.exports = function () {
    return {
        plugins: [
            [require('@babel/plugin-transform-react-jsx'), {
                pragma: 'Anu.createElement',
                pragmaFrag: 'Anu.Fragment'
            }],
            [require('@babel/plugin-transform-typescript'), {
                isTSX: true,
                jsxPragma: 'Anu'
            }]
        ]
    };
};
```

Two plugins are applied in order:

1. **`@babel/plugin-transform-react-jsx`** transforms all JSX syntax into `Anu.createElement(...)` calls. The `pragma` option replaces the default `React.createElement`, and `pragmaFrag` maps `<>...</>` to `Anu.Fragment`.

2. **`@babel/plugin-transform-typescript`** strips TypeScript syntax. The `jsxPragma: 'Anu'` option tells the TypeScript transformer that `Anu` is the JSX factory — this prevents it from eliding the `import Anu from 'anu-verzum'` statement even in files that contain no explicit references to `Anu` (e.g. files with only host elements like `<div>`). `isTSX: true` enables TypeScript parsing in `.tsx` files.

<h3 id="webpack-config-factory">Webpack config factory — <code>webpack.config.js</code></h3>

Also shipped in the npm package. Consumer projects use it as:

```javascript
module.exports = require('anu-verzum/webpack.config')(__dirname, options);
```

The factory accepts `projectRoot` and an optional `options` object:

| Option | Default | Description |
|--------|---------|-------------|
| `entry` | `src/index.tsx` | Webpack entry file |
| `template` | `index.html` | HTML template for `HtmlWebpackPlugin` |
| `port` | `3000` | Dev server port |
| `plugins` | `[]` | Additional plugins appended after `HtmlWebpackPlugin` |
| `rules` | `[]` | Additional module rules appended after the built-in `babel-loader` rule |

The config always runs in `'development'` mode, uses `babel-loader` for all `.js`, `.jsx`, `.ts`, `.tsx` files, sets `publicPath: '/'` (required for client-side routing), and enables `historyApiFallback: true` on the dev server (serves `index.html` for all 404s, so deep links work during development).

<h3 id="tsconfig">TypeScript configuration — <code>tsconfig.json</code> / <code>tsconfig.build.json</code></h3>

The library ships two TypeScript configs with distinct responsibilities:

**`tsconfig.json`** — used by the IDE and `npm run typecheck`. Includes all of `src/**/*` (including `src/testing/__tests__/`) so that test files get full `@types/jest` type coverage in the editor. It is **not** used directly by the build command.

**`tsconfig.build.json`** — extends `tsconfig.json` and adds `src/testing/__tests__` to `exclude`. Used by `tsc --project tsconfig.build.json --emitDeclarationOnly` in the build so that test file declarations are never emitted into `dist/`.

Consumer projects must supply their own `tsconfig.json` with a minimum `"target": "ES2018"`. In consumer projects TypeScript is configured with `"noEmit": true` (Babel handles all compilation), making `target` control only which built-in type definitions are available — not emitted code. ES2018 is required to expose `Promise.prototype.finally` on values returned by `ServerAPI` methods.

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "lib": ["ES6", "DOM"],
        "types": ["jest"],
        "strict": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "outDir": "dist",
        "rootDir": "src",
        "skipLibCheck": true,
        "esModuleInterop": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}

// tsconfig.build.json
{
    "extends": "./tsconfig.json",
    "exclude": ["node_modules", "dist", "src/testing/__tests__"]
}
```

Key settings:
- `emitDeclarationOnly: true` — TypeScript never emits JavaScript; Babel owns compilation.
- `declaration: true` — `.d.ts` files are emitted alongside the Babel output.
- `strict: true` — all strict checks enabled across the library source.
- `skipLibCheck: true` — avoids type errors inside `node_modules` declaration files.
- `esModuleInterop: true` — enables `import Foo from 'foo'` interop for CommonJS modules.
- `types: ["jest"]` — restricts automatic `@types/*` inclusion to Jest globals only, making them available across all source files including tests.

<br>
<hr>

<h2 id="anu-testing-library">Anu Testing Library — <code>src/testing/</code></h2>

<h3 id="atl-overview">Overview and design goals</h3>

The Anu Testing Library (ATL) ships as a sub-path export of the main package: `anu-verzum/testing`. It mirrors the philosophy of React Testing Library — tests interact with the DOM the way a user would (query by accessible role, text content, label, placeholder, etc.) rather than inspecting component state or implementation details.

ATL uses plain Jest assertions; it adds no custom matchers. Every query comes in three variants:

| Variant | Behaviour on miss |
|---------|-------------------|
| `get*` | Throws with a helpful message including the container HTML |
| `query*` | Returns `null` |
| `find*` | Returns a `Promise` that polls until the element appears or a timeout elapses |

<h3 id="atl-sync-scheduler">The synchronous scheduler problem</h3>

ANUVerzum's reconciler defers all work to a [MessageChannel](#scheduler) macro-task. In a real browser this yields between slices. In Jest/jsdom that macro-task would still resolve asynchronously, so assertions that follow a `render`/`setState` in the same tick would require explicit flushing in every test.

**Solution**: `src/testing/act.ts` swaps the reconciler's scheduler for a synchronous one before any tests run, through the `__testing` seam:

```typescript
export const installSyncScheduler = (): void => {
    if (_installed) {
        return;
    }

    _installed = true;
    __testing.installSyncScheduler();
};
```

`__testing.installSyncScheduler()` points the reconciler's `scheduleWork` at `() => performWork(SYNC_DEADLINE)` (a deadline reporting `timeRemaining() => 999`), so every `Anu.render()` and `setState()` reconciles synchronously in-call instead of posting a macro-task. `uninstallSyncScheduler()` restores the production MessageChannel scheduler. The swap is installed once in `jest.setup.ts` via `setupFilesAfterEnv`, so it applies to every test file automatically — and because it drives the reconciler's own seam rather than overriding `window.requestIdleCallback`, no real macro-tasks leak between tests.

**Safety net — `__testing.flushSync()`**: After every `act()` call, `flushEffects()` calls `__testing.flushSync()` from the reconciler to drain any remaining work:

```typescript
flushSync(): void {
    while (updateQueue.length > 0 || isNotNullish(nextUnitOfWork)) {
        workLoop(SYNC_DEADLINE);
    }

    nextUnitOfWork = null;
    pendingCommit = null;
}
```

<h3 id="atl-testing-exports">The <code>__testing</code> module exports</h3>

Several modules maintain module-level state that must be reset between tests. Rather than exposing their internals, each module exports a `__testing` object guarded by `process.env.NODE_ENV !== 'test'`:

| Module | `__testing` methods | State reset |
|--------|---------------------|-------------|
| `src/core/reconciler.ts` | `flushSync()`, `installSyncScheduler()`, `uninstallSyncScheduler()`, `resetGlobals()` | `updateQueue`, `componentLifecyclesQueue`, `nextUnitOfWork`, `pendingCommit`, `scheduleWork` |
| `src/core/components/History.ts` | `reset()` | `instances: Component[]` registry |
| `src/core/components/Intl.ts` | `reset()` | `__messagesContext` module variable |
| `src/core/components/AnulyticsProvider.ts` | `reset()` | `AnulyticsState.setAnulyticsInstanceExist(false)` |

The guards ensure that in a production build none of these functions are callable — `process.env.NODE_ENV` is set to `'production'` by webpack's `DefinePlugin`, which allows dead-code elimination to strip the bodies at bundle time.

`src/testing/globals.d.ts` provides an ambient TypeScript declaration for `process` so production source files that reference `process.env.NODE_ENV` compile under the library's strict `tsconfig.json` (which includes `"lib": ["ES6", "DOM"]` but not `"node"`). `afterEach` is covered by `@types/jest` via the `"types": ["jest"]` setting in `tsconfig.json`.

```typescript
declare const process: { env: Record<string, string | undefined> };
```

<h3 id="atl-render">The <code>render()</code> function</h3>

`src/testing/render.ts` is the primary entry point for ATL. It:

1. Creates or accepts a DOM container element.
2. Appends it to `document.body` (or a custom `baseElement`).
3. Registers the container with the cleanup registry.
4. Calls `act()` wrapping `Anu.render()` to ensure all synchronous work is flushed.
5. Builds bound query functions over the container via `buildQueries(container)`.
6. Returns a `RenderResult` object.

```typescript
export const render = (ui: AnuElement, options: RenderOptions = {}): RenderResult => {
    const mountBase = options.baseElement ?? document.body;
    const container = options.container ?? document.createElement('div');

    if (!options.container) {
        mountBase.appendChild(container);
    }
    
    registerContainer(container);
    act(() => { Anu.render(applyWrapper(ui, options), container); });
    const queries = buildQueries(container);

    return {
        container,
        baseElement: mountBase,
        rerender: (newUI) => act(() => { Anu.render(applyWrapper(newUI, options), container); }),
        unmount: () => act(() => { unmountComponentAtNode(container); }),
        ...queries,
    };
};
```

`applyWrapper` wraps the element in an optional `wrapper` component supplied via `options.wrapper`, which allows tests to supply provider trees without repeating boilerplate.

`unmountComponentAtNode` is a new export added to `src/core/reconciler.ts`. It pushes an update with `children: []` into `updateQueue` and triggers `performWork`, which causes the reconciler to diff against an empty child list and run `componentWillUnmount` on every mounted class component inside the container.

<h3 id="atl-queries">Query system</h3>

**`src/testing/queries/queryBuilder.ts`** — factory that produces the three query variants from a single-element finder and an all-elements finder:

```typescript
export const buildQueryVariants = (
    name: string,
    container: Element,
    singleFn: QueryFn,
    allFn: QueryAllFn
): BoundQuery => {
    const query = () => singleFn(container);
    const get = () => {
        const el = singleFn(container);

        if (!el) {
            throw new Error(
                `AnuTestingLibrary: unable to find element ${name}\n\nContainer HTML:\n$ {container.innerHTML}`
            );
        }

        return el;
    };
    const queryAll = () => allFn(container);
    const getAll   = () => {
        const els = allFn(container);

        if (!els.length) {
            throw new Error(`AnuTestingLibrary: unable to find any elements ${name}...`);
        }

        return els;
    };
    const find     = () => waitFor(() => get());
    const findAll  = () => waitFor(() => getAll());

    return { get, query, find, getAll, queryAll, findAll };
};
```

Available query types and their matching strategy:

| Query | Matching attribute / strategy |
|-------|-------------------------------|
| `ByText` | Leaf-node `textContent` — exact string or `RegExp` |
| `ByRole` | Implicit ARIA role map + explicit `role=""` attribute; optional `name` option for accessible-name filtering |
| `ByLabelText` | `<label for="">`, `aria-label`, `aria-labelledby` |
| `ByPlaceholderText` | `placeholder` attribute |
| `ByTestId` | `data-testid` attribute |
| `ByTitle` | `title` attribute |
| `ByAltText` | `alt` attribute |

**`byLabelText.ts` `for=` resolution** — the `<label for="">` branch resolves the associated control with `container.ownerDocument.getElementById(forAttr)`, then re-scopes the hit to the query container via `container.contains(input)`. It deliberately does **not** use `container.querySelector('#' + CSS.escape(forAttr))`: jsdom (the environment ATL targets) does not implement the browser-only `CSS` global, so `CSS.escape` throws `ReferenceError: CSS is not defined`. `getElementById` needs no escaping and handles ids that are not valid bare CSS selectors.

**`byRole.ts` implicit role map** — maps ARIA roles to CSS selectors for non-input elements, alongside a dedicated `<input>` type→role table. Native inputs resolve their implicit role from the `type` attribute, not from a tag selector:

```typescript
const IMPLICIT_ROLES: Record<string, string[]> = {
    button: ['button'],
    link: ['a'],
    heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    combobox: ['select'],
    textbox: ['textarea'],
    img: ['img'],
    list: ['ul', 'ol'],
    listitem: ['li'],
    form: ['form'],
    navigation: ['nav'],
    main: ['main'],
    banner: ['header'],
    contentinfo: ['footer'],
};

// ARIA implicit role of a native <input>, keyed by its `type`
const INPUT_TYPE_ROLES: Record<string, string> = {
    text: 'textbox', search: 'textbox', email: 'textbox', tel: 'textbox', url: 'textbox',
    number: 'spinbutton',
    range: 'slider',
    checkbox: 'checkbox',
    radio: 'radio',
    button: 'button', submit: 'button', reset: 'button', image: 'button',
};
```

`hasRole()` short-circuits for `<input>` elements: it reads the (lowercased) `type`, defaulting to `text`, and matches when `INPUT_TYPE_ROLES[type] === role`. A `type` absent from the table (e.g. `hidden`, `password`) has no implicit role. Every other element falls through to the `IMPLICIT_ROLES` selector lookup via `el.matches(sel)`.

Explicit `role=""` attributes always take precedence over implicit roles. Accessible-name matching checks `aria-label`, then `aria-labelledby` (resolving the referenced element's `textContent`), then the element's own `textContent`.

<h3 id="atl-events">Event utilities</h3>

**`src/testing/events/fireEvent.ts`** — dispatches synthetic DOM events. It selects the correct event constructor (`MouseEvent` — also for the `drag`/`drop` family, `KeyboardEvent`, `FocusEvent`, `PointerEvent`, `WheelEvent`, or generic `Event`) based on the event name, dispatches it on the element, then calls `flushEffects()` to ensure any resulting state updates (e.g. from `onClick` handlers that call `setState`) are committed to the DOM before the test assertion runs.

Before dispatching, if the `init` object carries a `target` property, those values are applied to the element first (`Object.assign(element, init.target)`) — matching Testing Library — so `fireEvent.input(node, { target: { value: 'x' } })` sets `node.value` before the event fires and handlers read the new value. The remaining `init` keys are forwarded to the event constructor.

The DOM `Event` constructors only read the standard `EventInit` keys for the chosen event type and **silently drop** anything else, so non-standard payloads — `clipboardData` for paste/copy/cut, `dataTransfer` for drag-and-drop, or any custom property — would never reach the handler. After construction, `buildEvent` therefore walks the `init` keys and `Object.defineProperty`-assigns each one that is *not already present* on the event (`!(key in event)`). The `in` guard means a key the constructor already applied (e.g. `deltaY` on a `WheelEvent`, `key` on a `KeyboardEvent`) is left untouched — only the dropped, non-standard keys are carried over — so this never fights the read-only accessors a blanket `Object.assign(event, init)` would throw on.

Named shorthands: `click`, `dblclick`, `change`, `input`, `focus`, `blur`, `keyDown`, `keyUp`, `keyPress`, `submit`, `mouseDown`, `mouseUp`, `wheel`, `paste`, `copy`, `cut`, `drag`, `dragStart`, `dragEnd`, `dragEnter`, `dragLeave`, `dragOver`, `drop`, `error`, `load`, `abort`. The clipboard and drag shorthands rely on the payload-carrying above for their `clipboardData`/`dataTransfer` to survive.

**`src/testing/events/userEvent.ts`** — simulates higher-level user interactions by composing multiple `fireEvent` calls:

| Method | Composed events |
|--------|-----------------|
| `click(el)` | `mousedown` → `mouseup` → `click` |
| `dblclick(el)` | `mousedown` → `mouseup` → `click` × 2 → `dblclick` |
| `type(el, text)` | `focus` → per-character `keydown` / value-append / `input` / `keyup` → `change` |
| `clear(el)` | Clears `value`, fires `input` + `change` |
| `change(el, value)` | Sets `value`, fires `input` + `change` |
| `submit(form)` | `submit` |
| `selectOption(select, value)` | Sets `value`, fires `change` |
| `tab()` | `keydown` with `key: 'Tab'` |

<h3 id="atl-async">Async utilities</h3>

**`src/testing/waitFor.ts`** — polls a callback on a fixed interval until it stops throwing or a timeout elapses. Between each poll it calls `flushEffects()` to give the reconciler a chance to commit pending state updates:

```typescript
export const waitFor = <T>(callback: () => T, options: WaitForOptions = {}): Promise<T> => {
    const { timeout = 1000, interval = 50 } = options;

    return new Promise<T>((resolve, reject) => {
        const startTime = Date.now();
        let lastError: Error;
        const check = (): void => {
            flushEffects();

            try {
                resolve(callback());
                
                return;
            } catch (err) {
                lastError = err as Error;
            }

            if (Date.now() - startTime >= timeout) {
                reject(new Error(
                    `AnuTestingLibrary waitFor: timed out after ${timeout}ms.\n${lastError?.message ?? ''}`
                ));

                return;
            }

            setTimeout(check, interval);
        };
        check();
    });
};
```

`find*` query variants delegate to `waitFor` internally. `waitForElementToBeRemoved` inverts the logic: it throws while the element is still present and resolves when the callback returns `null` or an empty array.

<h3 id="atl-cleanup">Cleanup</h3>

`src/testing/cleanup.ts` maintains a `Set<Element>` of all containers created by `render()`. After each test, `cleanup()` **unmounts** each tracked root, then removes the container from the DOM and resets all module-level state:

```typescript
export const cleanup = (): void => {
    mountedContainers.forEach((container) => {
        act(() => { unmountComponentAtNode(container); });   // componentWillUnmount + portal commitDeletion
        container.parentNode?.removeChild(container);
    });
    mountedContainers.clear();
    __testing.resetGlobals();        // reconciler: updateQueue, nextUnitOfWork, pendingCommit
    HistoryTesting.reset();          // History: instances registry
    IntlTesting.reset();             // Intl: __messagesContext
    AnulyticsTesting.reset();        // Anulytics: singleton flag
};
```

The `unmountComponentAtNode` step is essential: detaching the container alone leaves the fiber tree mounted, so `componentWillUnmount` never fires (leaking any `document`/`window` listeners a component registered) and portal children — which live in a *different* DOM subtree than the container (e.g. a `#modal-root`) — are never removed. Unmounting first runs `commitDeletion`, which tears both down. This matches React Testing Library, whose `cleanup()` unmounts every mounted root.

`setupAutoCleanup()` is called in `jest.setup.ts` and registers `cleanup` with Jest's `afterEach` hook.

<h3 id="atl-wrappers">Provider wrappers</h3>

`src/testing/wrappers.ts` provides convenience render functions for components that require one of the framework's provider components:

| Function | Wraps in |
|----------|----------|
| `renderWithStore(ui, store, opts?)` | `<Anu.Connector.Provider store={store}>` |
| `renderWithRouter(ui, opts?)` | Pushes `opts.initialPath` (default `'/'`) to `window.history`, returns `navigate(path)` helper |
| `renderWithIntl(ui, locale, messages, opts?)` | `<Anu.Intl.Provider locale={locale} messages={messages}>` |
| `renderWithContext(ui, ContextProvider, value, opts?)` | `<ContextProvider {...value}>` |

**Portal queries — `within(element)`**

`render()` binds all queries to its `container` div. Content rendered through `createPortal` lives in a different DOM node and is not found by those queries. `within(element)` builds the full `BoundQueries` suite bound to any element:

```typescript
export const within = (element: Element): BoundQueries => buildQueries(element);
```

Usage:

```typescript
import { within } from 'anu-verzum/testing';

const portalRoot = document.getElementById('modal-root')!;
expect(within(portalRoot).getByText('Modal title')).toBeDefined();
```

<h3 id="atl-jest-setup">Jest configuration</h3>

`jest.config.js` configures Jest to use `jest-environment-jsdom` (a real DOM in Node), transforms TypeScript and JSX via Babel, and maps the `anu-verzum` and `anu-verzum/testing` package names to their source entry points so tests run against the live source tree rather than a compiled build:

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

The Babel `pragma: 'Anu.createElement'` option tells `@babel/plugin-transform-react-jsx` to expand JSX to `Anu.createElement(...)` calls globally — no per-file `/** @jsx */` comment is needed. Every test file that contains JSX must `import Anu from 'anu-verzum'` so the expanded calls resolve at runtime.

`jest.setup.ts` calls `installSyncScheduler()` and `setupAutoCleanup()` before any test file runs:

```typescript
import { installSyncScheduler } from './src/testing/act';
import { setupAutoCleanup } from './src/testing/cleanup';

process.env.NODE_ENV = 'test';
installSyncScheduler();
setupAutoCleanup();
```