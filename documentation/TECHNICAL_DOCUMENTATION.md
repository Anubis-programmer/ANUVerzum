<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS — Technical Documentation</strong></h1>

<br>

<h3>@author: <strong>Anubis-programmer</strong></h3>
<h3>@license: <strong>MIT</strong></h3>
<h3>@version: <strong>1.23.1</strong></h3>

<br>

<h2>Table of Contents</h2>

<ul>
    <li><a href="#summary">Summary</a></li>
    <li><a href="#high-level-architecture">High-Level Architecture</a></li>
    <ul>
        <li><a href="#module-ecosystem">Module ecosystem</a></li>
        <li><a href="#the-anu-namespace">The <code>Anu</code> namespace</a></li>
        <li><a href="#build-pipeline">Build pipeline</a></li>
        <li><a href="#requestidlecallback-polyfill">The <code>requestIdleCallback</code> polyfill</a></li>
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
        <li><a href="#url-param-parsing">URL parameter parsing and singularization</a></li>
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
│   └── components/
│       ├── Component.ts             ← Abstract base class for class components
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
│   └── utils.ts                     ← deepEqual utility
└── testing/
    ├── index.ts                     ← Public barrel export (anu-verzum/testing)
    ├── types.ts                     ← All TypeScript types for ATL
    ├── globals.d.ts                 ← afterEach / process ambient declarations
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
export type { AbbreviateNumberOptions };
```

The `JSX` global namespace is also declared here so TypeScript recognizes JSX syntax in consumer projects without any additional configuration:

```typescript
declare global {
    namespace JSX {
        interface IntrinsicAttributes { key?: string | number | null; ref?: Ref<any> | null; }
        interface Element extends AnuElement<any, any> {}
        interface ElementClass { render(): AnuElement | AnuElement[] | string | number | boolean | null | undefined; }
        interface ElementAttributesProperty { props: Record<string, unknown>; }
        interface ElementChildrenAttribute { children: Record<string, unknown>; }
        interface IntrinsicElements { [elemName: string]: Props; }
    }
}
```

<h3 id="build-pipeline">Build pipeline</h3>

The library uses a deliberate two-pass build strategy that separates compilation from type-checking:

**Pass 1 — Babel** (`npm run build` → `babel src --out-dir dist --extensions ".ts"`)
Babel performs the actual compilation: it transpiles TypeScript syntax (via `@babel/plugin-transform-typescript`), transforms JSX into `Anu.createElement()` calls (via `@babel/plugin-transform-react-jsx`), and applies `@babel/preset-env` for cross-browser compatibility. The output is CommonJS JavaScript in `dist/`.

**Pass 2 — TypeScript** (`tsc --emitDeclarationOnly`)
`tsc` is invoked only to emit `.d.ts` declaration files. It never produces JavaScript. This keeps compilation fast because Babel handles the heavy lifting, and `tsc` only needs to type-check and emit declarations.

The `tsconfig.json` reflects this:

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "lib": ["ES6", "DOM"],
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
```

The `package.json` build scripts:

```json
{
    "clean":     "node -e \"require('fs').rmSync('dist', {recursive:true, force:true})\"",
    "build":     "npm run clean && babel src --out-dir dist --extensions \".ts\" && tsc --emitDeclarationOnly",
    "typecheck": "tsc --noEmit",
    "lint":      "eslint src",
    "format":    "prettier --write src"
}
```

<h3 id="requestidlecallback-polyfill">The <code>requestIdleCallback</code> polyfill</h3>

The reconciler relies on `requestIdleCallback` to schedule incremental rendering. Because some browsers (most notably Safari, prior to version 16) do not support it, `src/index.ts` installs a polyfill at module load time:

```typescript
if (!window.requestIdleCallback) {
    window.requestIdleCallback = (callback: IdleRequestCallback): number => {
        const start = Date.now();
        
        return setTimeout(() => {
            callback({
                didTimeout: false,
                timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
            });
        }, 1) as unknown as number;
    };
}

if (!window.cancelIdleCallback) {
    window.cancelIdleCallback = (id: number): void => clearTimeout(id);
}
```

The polyfill mimics the real API by granting a fixed budget of up to **50 ms** and firing via `setTimeout(..., 1)`. This approximation is less efficient than the real API but functionally correct.

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

// Style props accept both strings and unitless numbers (e.g. zIndex: 10)
export type AnuCSSProperties = Partial<Record<keyof CSSStyleDeclaration, string | number>>;

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

2. **Normalize children.** If `args` is non-empty, they are flattened into a single array (handling both direct children and nested array spreads). Each child is then processed:
    - `null` and `false` children are filtered out entirely — this is how conditional rendering works.
    - Plain values (`string`, `number`, `boolean`) are wrapped in a `TEXT_ELEMENT` virtual node: `{ type: TEXT_ELEMENT, props: { nodeValue: String(value) }, key: null, ref: null }`.
    - Functions (bare component references passed as children) are wrapped with `createElement(fn, fn.props || {})`.
    - Objects are passed through as-is (already `AnuElement` instances).

3. **Return the element descriptor.**

```typescript
return { type, props, key, ref };
```

This object is lightweight and immutable by convention — the reconciler reads it but never mutates it.

<br>
<hr>

<h2 id="fiber-reconciler">Fiber Reconciler — <code>src/core/reconciler.ts</code></h2>

The reconciler is the heart of ANUVerzum. It implements a fiber-based architecture inspired by React's reconciler, using `requestIdleCallback` to spread rendering work across multiple browser idle periods.

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

`Anu.render()` pushes a `HOST_ROOT` entry. `setState()` pushes a `CLASS_COMPONENT` entry. Work is not started immediately — a `requestIdleCallback(performWork)` call is made, and the reconciler processes the queue during the next idle period.

<h3 id="work-loop">The work loop</h3>

```
requestIdleCallback(performWork)
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

**`ENOUGH_TIME = 1`** is the minimum remaining time in milliseconds. If less than 1 ms remains in the current idle slice, the loop pauses and re-schedules via `requestIdleCallback` — allowing the browser to remain responsive.

<h3 id="begin-work">Begin work phase</h3>

`beginWork()` dispatches to one of three handlers based on `wipFiber.tag`:

**`updatePortalComponent(wipFiber)`**
Sets `wipFiber.stateNode = wipFiber.props.container` (the target DOM node), then calls `reconcileChildrenArray` with `wipFiber.props.children`. Because the portal fiber's `stateNode` is the container, `commitWork`'s DOM-parent walk stops there and renders all children into that container rather than into the normal parent. `getFirstHostNode` returns `null` for portal fibers so they are invisible to sibling insertion-order logic in the parent container.

**`updateHostComponent(wipFiber)`**
Creates the real DOM node on first visit (`wipFiber.stateNode = createDomElement(wipFiber)`), then calls `reconcileChildrenArray` with `wipFiber.props.children`.

**`updateFunctionComponent(wipFiber)`**
Creates a lightweight wrapper instance `{ props, render: type }` on first visit. On subsequent visits, performs an **early bailout** if props reference has not changed and no `partialState` is pending — the child fibers are cloned from the previous tree without re-running the function. Otherwise, calls `instance.render(wipFiber.props)` and reconciles the result.

**`updateClassComponent(wipFiber)`**
- **First visit:** instantiates the class via `new type(props, context)`, binds lifecycle methods (`setState`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`), and sets `instance.__fiber = fiber`.
- **Subsequent visits:** performs an **early bailout** if `wipFiber.props === instance.props` and no `partialState` or `partialStateCallback` is pending (clones children without re-rendering). Because `instance.props` is assigned directly from `wipFiber.props` (same reference, matching the function component pattern), the reference check fires correctly when a parent bails out via `cloneChildFibers` and the child's fiber props are unchanged.
- **Normal update:** merges the new state (either via `Object.assign` for object partial state, or by calling `partialStateCallback(prevState, wipFiber.props)` for functional updates), saves the old state to `wipFiber.prevState` (for `componentDidUpdate`), then calls `instance.render()`.

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
        - **Phase 2 — DOM removal:** walks the subtree, skipping class and function component fibers, and removes every host DOM node from the parent. When a `PORTAL` fiber is encountered during the walk, `commitDeletion` is called recursively with the portal's `stateNode` as the `domParent`, ensuring portal children are removed from the correct container rather than from the outer parent.

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

3. **Set new / changed attributes.** For SVG elements, all attributes are set via `setAttribute()`. For HTML elements, most properties are set directly (e.g. `el.className = ...`) for performance, except `aria-*` and `role` which always use `setAttribute()` to avoid browser quirks.

4. **Diff inline styles.** Changed `style` keys are applied via `style.setProperty(key, value)`. Keys present in `prevStyle` but absent from `nextStyle` are cleared by setting them to `''`.

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

    setState(partialState: Partial<S> | ((prevState: S, prevProps: P) => S) = {}): void {
        let partialStateObject: Partial<S> = {};
        let partialStateCallback: ((prevState: S, prevProps: P) => S) | undefined;

        if (typeof partialState === 'object') {
            partialStateObject = { ...partialStateObject, ...partialState };
        } else if (typeof partialState === 'function') {
            partialStateCallback = partialState;
        }

        scheduleUpdate(this, partialStateObject, partialStateCallback);
    }

    abstract render(): AnuElement | AnuElement[] | string | number | boolean | null | undefined;

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

<h2 id="fragment">Fragment — <code>src/core/components/Fragment.ts</code></h2>

`Fragment` is a class component that simply returns its children array without wrapping them in any DOM element. It allows sibling elements to be grouped in JSX without introducing a superfluous `<div>`.

```typescript
export class Fragment extends Component {
    render(): AnuElement[] {
        const children = this.props.children as AnuElement[] | undefined;

        try {
            if (!children || !children.length) {
                throw new Error('Fragment must have at least one child element!');
            }

            return children;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}
```

The reconciler handles array returns from `render()` natively — `reconcileChildrenArray` accepts arrays and flattens them into sibling fibers. The `<>...</>` fragment shorthand is wired via `babel-preset.js` (`pragmaFrag: 'Anu.Fragment'`), which transforms it to `Anu.createElement(Anu.Fragment, null, ...)`.

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

`createContext` is a factory function. Each call creates an isolated Provider/Consumer pair that communicate through a **shared closure** — the `providerContext` object. This means that `createContext` calls are not global; each returned `{ Provider, Consumer }` pair is entirely independent.

```typescript
const providerContext: {
    defaultContext: { value: T };
    value: Partial<T>;
    subscribers: Set<Component>;
} = {
    defaultContext: { value: context },  // the value passed to createContext()
    value: {},                           // the current value set by the Provider
    subscribers: new Set()               // all mounted Consumers of this context
};
```

The function returns four exports for two use cases:

| Export | TypeScript | Carries |
|--------|-----------|---------|
| `Provider` | Typed (`Props & Partial<T>`) | The context value props |
| `Consumer` | Typed (`ConsumerProps<T>`) | Render-prop typed as `(ctx: ContextValue<T>) => AnuElement \| null` |
| `ContextProvider` | Untyped (`Props`) | For internal use by Intl and Feature modules |
| `ContextConsumer` | Untyped (`Props`) | For internal use by Intl and Feature modules |

<h3 id="context-provider-internals">Provider internals</h3>

`ContextProvider` is a class component. On construction, it extracts all non-`children` props and stores them as `providerContext.value`. On `componentDidUpdate`, it uses `deepEqual` to check whether props have actually changed before updating — this prevents unnecessary re-renders when the parent re-renders but the context value is structurally identical.

```typescript
componentDidUpdate(): void {
    const pureProps = getPureProps(this.props);

    if (!deepEqual(providerContext.value as Record<string, any>, pureProps as Record<string, any>)) {
        providerContext.value = { ...pureProps };
        providerContext.subscribers.forEach((consumer) => (consumer as any).setState());
    }
}
```

<h3 id="context-consumer-internals">Consumer internals</h3>

`ContextConsumer` is a class component that expects exactly one child — a function (the render prop). On render, it calls that function with `{ value: providerContext.value, defaultContext: providerContext.defaultContext }`.

```typescript
render(): AnuElement | AnuElement[] | null {
    const { type } = children[0];
    const childProps: ContextValue<T> = { value, defaultContext };

    if (typeof type === 'function') {
        return (type as (ctx: ContextValue<T>) => AnuElement | null)(childProps);
    }
}
```

`ContextConsumer` registers itself in `providerContext.subscribers` on mount and removes itself on unmount:

```typescript
componentDidMount(): void {
    providerContext.subscribers.add(this);
}

componentWillUnmount(): void {
    providerContext.subscribers.delete(this);
}
```

<h3 id="subscriber-registry">The subscriber registry</h3>

The Provider and Consumer are sibling subtrees, not parent-child. Rather than relying on the render tree to propagate updates, the Provider holds a `Set<Component>` of every mounted Consumer and calls `setState()` on each one directly when the context value changes.

This replaces a previous flag-polling approach (`__notifySub`) that broke inside `connect`-ed components: the flag was only checked in `componentDidUpdate`, which only ran when the Consumer's parent re-rendered. If the parent was a `connect`-ed component that bailed out of re-rendering (because Redux state hadn't changed), the Consumer never saw the updated context. The direct `setState()` call bypasses that dependency entirely — the Consumer always re-renders immediately when the Provider value changes, regardless of what the surrounding tree is doing.

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

When navigation occurs — whether via `HistoryLink`, `HistoryRedirect`, or `Anu.History.goTo()` — both `historyPush` and `historyReplace` call `setState()` on every registered `HistoryRoute` instance. This causes all routes in the tree to re-evaluate their `matchPath()` and re-render accordingly, without requiring a context or event bus.

<h3 id="path-matching">Path matching</h3>

```typescript
const matchPath = (
    pathname: string,
    options: { exact?: boolean; path?: string }
): RouteMatch | null
```

- If `path` is not provided, the route always matches (returns `{ path: null, url: pathname, isExact: true }`).
- Otherwise, the path is escaped and used to construct a `RegExp` anchored at the start (`^`). This matches the path as a prefix of the current pathname.
- If `exact` is true and the matched segment is not equal to the full pathname, the match is rejected.

The returned `RouteMatch` contains `{ path, url, isExact }` and is passed to the `component` or `render` prop of the `Route`.

<h3 id="url-param-parsing">URL parameter parsing and singularization</h3>

ANUVerzum uses a REST-convention-based URL parameter parser:

```typescript
const parseUrlParams = (pathname: string): Record<string, string>
```

The pathname is split on `/` and the resulting segments are iterated in pairs. Each even-indexed segment is treated as a resource noun (e.g. `users`), and the next segment (odd index) is its ID value. The noun is singularized and `Id` is appended to form the key:

```
/users/asdf1234/products/ghjk5678
 └─ users → singularize → user → "userId": "asdf1234"
              products → singularize → product → "productId": "ghjk5678"
```

`singularize()` handles the most common English plural endings: `ies→y`, `sses→ss`, `xes→x`, `zes→z`, `ches→ch`, `shes→sh`, and a generic `s→` fallback.

<h3 id="route-link-redirect">Route, Link, Redirect components</h3>

**`HistoryRoute`**
Registers with the global instance list on mount and listens for `popstate` (back/forward browser navigation). On render, calls `matchPath` against `window.location.pathname`. If it matches, renders either `createElement(component, { match })` or `render({ match })`. Returns `null` if no match.

**`HistoryLink`**
Renders as an `<a>` tag with `href={to}`. Intercepts clicks via `onClick`, calls `event.preventDefault()`, and delegates to `historyPush` or `historyReplace`. Adds an `ariaLabel` of `historyLink[-ariaLabel]` for accessibility.

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

The `__messagesContext` singleton is also used by `formatMessage()` and `abbreviateNumber()` for imperative (non-JSX) message resolution.

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
    value: number,
    options: AbbreviateNumberOptions = {}
): string | number
```

Abbreviates large numbers with locale-aware units and decimal separators:

| Locale | Units | Decimal sign |
|--------|-------|-------------|
| `hu` (Hungarian) | `['E', 'm', 'M', 'b']` | `,` |
| default | `['K', 'M', 'B', 'T']` | `.` |

The algorithm iterates from the largest unit downward. When a threshold is met (e.g. `value >= 1_000` for `K`), it divides and rounds to `decimalPlaces` (default: 2). It handles the edge case where rounding causes rollover to the next unit (e.g. `999,999` rounding to `1,000K` should become `1M`). All defaults can be overridden via `options`.

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

When `defaultComponent` is a `Fragment` element, `resolveDefault()` unwraps it and returns `Fragment.props.children` (the array of children) directly. This prevents the reconciler from receiving a Fragment CLASS_COMPONENT as the output of the ContextConsumer render-prop, which would corrupt the surrounding fiber tree (duplicate sibling renders and broken context propagation).

`FeatureToggle` is a class component (not a function component) so that the render-prop passed to `ContextConsumer` always reads `this.props` — the current props at call time. A function component would close over the `name`, `children`, and `defaultComponent` parameters at the time `FeatureToggle` itself was called, and those captured values would become stale if the parent re-rendered with new props before the `ContextConsumer` render-prop fired again.

```typescript
const resolveDefault = (
    defaultComponent: AnuElement | AnuElement[] | null
): AnuElement | AnuElement[] | null => {
    if (
        defaultComponent &&
        !Array.isArray(defaultComponent) &&
        (defaultComponent as AnuElement).type === Fragment
    ) {
        return ((defaultComponent as AnuElement).props.children as AnuElement[]) ?? null;
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
const Utils = { deepEqual };
export default Utils;
```

`Utils` is also exposed on the `Anu` namespace as `Anu.Utils.deepEqual()` for use in consumer applications.

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

The config always runs in `'development'` mode, uses `babel-loader` for all `.js`, `.jsx`, `.ts`, `.tsx` files, sets `publicPath: '/'` (required for client-side routing), and enables `historyApiFallback: true` on the dev server (serves `index.html` for all 404s, so deep links work during development).

<h3 id="tsconfig">TypeScript configuration — <code>tsconfig.json</code></h3>

The library's own `tsconfig.json` is used during development and for the declaration emit step. Consumer projects must supply their own `tsconfig.json` with a minimum `"target": "ES2018"`. In consumer projects TypeScript is configured with `"noEmit": true` (Babel handles all compilation), making `target` control only which built-in type definitions are available — not emitted code. ES2018 is required to expose `Promise.prototype.finally` on values returned by `ServerAPI` methods.

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "lib": ["ES6", "DOM"],
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
```

Key settings:
- `emitDeclarationOnly: true` — TypeScript never emits JavaScript; Babel owns compilation.
- `declaration: true` — `.d.ts` files are emitted alongside the Babel output.
- `strict: true` — all strict checks enabled across the library source.
- `skipLibCheck: true` — avoids type errors inside `node_modules` declaration files.
- `esModuleInterop: true` — enables `import Foo from 'foo'` interop for CommonJS modules.

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

ANUVerzum's reconciler defers all work via `requestIdleCallback`. In a real browser this yields between frames. In Jest/jsdom there is no frame scheduler, so `requestIdleCallback` is undefined by default and asynchronous work would require explicit timer flushing in every test.

**Solution**: `src/testing/act.ts` installs a synchronous polyfill before any tests run:

```typescript
const FAKE_DEADLINE: IdleDeadline = { didTimeout: false, timeRemaining: () => 999 };

export const installSyncScheduler = (): void => {
    if (_installed) {
        return;
    }

    _installed = true;
    (window as any).requestIdleCallback = (cb: IdleRequestCallback): number => {
        cb(FAKE_DEADLINE);

        return 0;
    };
    (window as any).cancelIdleCallback = (): void => {};
};
```

Because `performWork` and `scheduleUpdate` always call `requestIdleCallback(performWork)`, replacing the scheduler makes every `Anu.render()` and `setState()` call execute synchronously in-call. The polyfill is installed once in `jest.setup.ts` via `setupFilesAfterEnv`, so it applies to every test file automatically.

`(window as any)` is used instead of `(global as any)` because the library's `tsconfig.json` includes `"DOM"` in `lib` (which provides `window`), but not `"node"` (which would provide `global`).

**Safety net — `__testing.flushSync()`**: After every `act()` call, `flushEffects()` calls `__testing.flushSync()` from the reconciler to drain any remaining work:

```typescript
export const flushSync = (): void => {
    const syncDeadline: IdleDeadline = { didTimeout: false, timeRemaining: () => 999 };

    while (updateQueue.length > 0 || nextUnitOfWork != null) {
        workLoop(syncDeadline);
    }

    nextUnitOfWork = null;
    pendingCommit = null;
};
```

<h3 id="atl-testing-exports">The <code>__testing</code> module exports</h3>

Several modules maintain module-level state that must be reset between tests. Rather than exposing their internals, each module exports a `__testing` object guarded by `process.env.NODE_ENV !== 'test'`:

| Module | `__testing` methods | State reset |
|--------|---------------------|-------------|
| `src/core/reconciler.ts` | `flushSync()`, `resetGlobals()` | `updateQueue`, `componentLifecyclesQueue`, `nextUnitOfWork`, `pendingCommit` |
| `src/core/components/History.ts` | `reset()` | `instances: Component[]` registry |
| `src/core/components/Intl.ts` | `reset()` | `__messagesContext` module variable |
| `src/core/components/AnulyticsProvider.ts` | `reset()` | `AnulyticsState.setAnulyticsInstanceExist(false)` |

The guards ensure that in a production build none of these functions are callable — `process.env.NODE_ENV` is set to `'production'` by webpack's `DefinePlugin`, which allows dead-code elimination to strip the bodies at bundle time.

`src/testing/globals.d.ts` provides ambient TypeScript declarations for `afterEach` and `process` so the testing library compiles under the library's strict `tsconfig.json` (which includes `"lib": ["ES6", "DOM"]` but not `"node"`):

```typescript
declare function afterEach(fn: () => any): void;
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

**`byRole.ts` implicit role map** — maps ARIA roles to CSS selectors. The `textbox` role additionally filters `<input>` by type (`text`, `search`, `email`, `tel`, `url`) using `Array.prototype.indexOf` (not `.includes()`, which is not available in the library's ES6 target):

```typescript
const IMPLICIT_ROLES: Record<string, string[]> = {
    button: ['button'],
    link: ['a'],
    heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    textbox: ['input'],
    checkbox: ['input[type="checkbox"]'],
    radio: ['input[type="radio"]'],
    combobox: ['select'],
    img: ['img'],
    list: ['ul', 'ol'],
    listitem: ['li'],
    form: ['form'],
    navigation: ['nav'],
    main: ['main'],
    banner: ['header'],
    contentinfo: ['footer'],
};
```

Explicit `role=""` attributes always take precedence over implicit roles. Accessible-name matching checks `aria-label`, then `aria-labelledby` (resolving the referenced element's `textContent`), then the element's own `textContent`.

<h3 id="atl-events">Event utilities</h3>

**`src/testing/events/fireEvent.ts`** — dispatches synthetic DOM events. It selects the correct event constructor (`MouseEvent`, `KeyboardEvent`, `FocusEvent`, or generic `Event`) based on the event name, dispatches it on the element, then calls `flushEffects()` to ensure any resulting state updates (e.g. from `onClick` handlers that call `setState`) are committed to the DOM before the test assertion runs.

Named shorthands: `click`, `dblclick`, `change`, `input`, `focus`, `blur`, `keyDown`, `keyUp`, `keyPress`, `submit`, `mouseDown`, `mouseUp`.

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

`src/testing/cleanup.ts` maintains a `Set<Element>` of all containers created by `render()`. After each test, `cleanup()` removes them from the DOM and resets all module-level state:

```typescript
export const cleanup = (): void => {
    mountedContainers.forEach((container) => { container.parentNode?.removeChild(container); });
    mountedContainers.clear();
    __testing.resetGlobals();        // reconciler: updateQueue, nextUnitOfWork, pendingCommit
    HistoryTesting.reset();          // History: instances registry
    IntlTesting.reset();             // Intl: __messagesContext
    AnulyticsTesting.reset();        // Anulytics: singleton flag
};
```

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