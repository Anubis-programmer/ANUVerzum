# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ANUVerzum (`anu-verzum` on npm) is a React-like UI framework implementing JSX rendering, fiber-based reconciliation, client-side routing, a Redux-like store, i18n, feature toggles, and built-in analytics.

## Commands

```bash
# Build (compiles src/ → dist/ via Babel, then emits .d.ts via tsc)
npm run build

# Type-check without emitting output
npm run typecheck

# Lint source files
npm run lint

# Format source files
npm run format

# No test suite is currently configured
```

The build is also triggered automatically on `npm prepare` (i.e. `npm install`).

## Architecture

### Entry point

`src/index.ts` assembles the public `Anu` object from all subsystems and polyfills `requestIdleCallback` for environments that lack it. Every JSX file must `import Anu from 'anu-verzum'` because JSX compiles to `Anu.createElement(...)` calls.

### Babel preset

`babel-preset.js` configures `@babel/plugin-transform-react-jsx` with `pragma: 'Anu.createElement'` and `pragmaFrag: 'Anu.Fragment'`. Consumer projects add `"presets": ["anu-verzum/babel-preset"]` to get JSX support.

### Core rendering pipeline (`src/core/`)

- **`elements.ts`** — `createElement(type, config, ...children)` builds the virtual-DOM element descriptors that JSX expands into.
- **`reconciler.ts`** — Fiber-based reconciler. Work is broken into units via `requestIdleCallback` (cooperative scheduling). Maintains a global `updateQueue`; each call to `render()` or `setState()` enqueues a work item. Component types are distinguished by `HOST_COMPONENT` (DOM tags), `CLASS_COMPONENT`, and `FUNCTION_COMPONENT`. Class components are identified by checking `element.type.prototype.hasOwnProperty('render')` or `element.type.isAnuComponent`. Lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) are queued in `componentLifecyclesQueue` and flushed after all DOM mutations for a given commit.
- **`domUtils.ts`** — Creates and diffs actual DOM nodes; handles both HTML and SVG namespaces.
- **`components/Component.ts`** — Base class for user class components. `setState(partialState)` accepts an object (merged) or a callback `(prevState, props) => newState` and delegates to `scheduleUpdate` in the reconciler.
- **`components/Fragment.ts`** — Sentinel value used as `Anu.Fragment` for the JSX fragment shorthand `<>...</>`.

### Subsystems

| Module | Public API | Notes |
|--------|-----------|-------|
| `components/History.ts` | `Anu.History.{Link, Route, Redirect}`, `Anu.History.goTo()` | Client-side routing via `window.history`. `HistoryRoute` registers itself for `popstate` events. Route matching uses a simple `RegExp` prefix; use `exact` for strict matching. `goTo` is a named export — it is attached to `Anu.History` in `index.ts`. |
| `components/Connector.ts` | `Anu.Connector.{connect, Provider}` | Redux-style HOC. `connect(mapStateToProps, mapDispatchToProps)(Component)` wraps a component and re-renders it on store changes via a `Subscription` chain. |
| `components/Context.ts` | `Anu.createContext(defaultValue)` | Returns `{ ContextProvider, ContextConsumer }`. Consumer's function-as-child receives `{ value, defaultContext }`. |
| `components/Intl.ts` | `Anu.Intl.{Provider, FormattedMessage}`, `Anu.Intl.formatMessage()`, `Anu.Intl.abbreviateNumber()` | i18n via Context API. `Provider` takes `messages`, `locale`, `defaultLocale`. |
| `components/Feature.ts` | `Anu.Feature.{Provider, Toggle}` | Feature flags via Context. `Toggle` renders children when `features[name]` is truthy, `defaultComponent` otherwise. |
| `components/AnulyticsProvider.ts` | `Anu.Anulytics.{Provider, trackEvent()}` | Batches analytics events and POSTs them on `visibilitychange`/`beforeunload`. Automatically hooks into History and Store dispatch to track navigation and state changes. |
| `store/store.ts` | `Anu.store.{createStore, combineReducers, createSelector, middleware}` | Redux-like store. `createSelector` uses LRU-memoization (`_memoize`, max 100 entries). Middleware signature matches Redux thunk convention. `loggingMiddleware` and `thunkMiddleware` are built-in. |
| `server-api/server-api.ts` | `Anu.ServerAPI.{get, post, put, delete, file}` | XHR wrapper returning Promises. All URLs **must start with `/app`**. |
| `misc/utils.ts` | `Anu.Utils.deepEqual(a, b)` | Deep structural equality, handles nested objects and arrays. |

### Important cross-cutting wiring

- **Analytics ↔ Store**: `store.ts` imports `trackStateChange` from `AnulyticsProvider` and calls it on every dispatch — meaning the store always notifies analytics even if no `<Anu.Anulytics.Provider>` is mounted. `trackStateChange` is a no-op when the provider is absent.
- **Analytics ↔ History**: `History.ts` calls `trackRouteChange` on every `historyPush`/`historyReplace`.
- **Connector ↔ Context**: `Connector` uses a module-level `providerStore` singleton (not the standard Context API) to pass the Redux store down to `connect`-ed components without prop drilling.

### SVG support

SVG-specific tags (`<anchor>`, `<svgStyle>`, `<svgTitle>`) are aliased in `domUtils.ts` to their real SVG counterparts to avoid collisions with HTML elements. The `<svg>` root element automatically gets the SVG namespace; the `xmlns` attribute does not need to be specified.
