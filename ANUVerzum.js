'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// <ANUVerzum.JS /> Framework
// @author: Anubis
// @licence: MIT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(() => {
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM POLYFILL
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	window.requestIdleCallback =
		window.requestIdleCallback ||
		function(callBack) {
			const start = Date.now();

			return setTimeout(() => {
				callBack({
					didTimeout: false,
					timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
				});
			}, 1);
		};

	window.cancelIdleCallback =
		window.cancelIdleCallback ||
		function(id) {
			clearTimeout(id);
		};

	if (typeof Object.assign !== 'function') {
		Object.defineProperty(Object, 'assign', {
			value: function assign(target, varArgs) {
				if (target == null) { // Checks both null and undefined
					throw new TypeError('Cannot convert undefined or null to object');
				}

				const to = Object(target);

				for (let index = 1; index < arguments.length; index++) {
					let nextSource = arguments[index];

					if (nextSource !== null) {
						for (let nextKey in nextSource) {
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}

				return to;
			},
			writable: true,
			configurable: true
		});
	};

	window.Promise =
		window.Promise ||
		(() => {
			const PromiseStates = {
				PENDING: 'Pending',
				FULFILLED: 'Fulfilled',
				REJECTED: 'Rejected'
			};

			const getThen = (value) => {
				const t = typeof value;

				if (value && (t === 'object' || t === 'function')) {
					const { then } = value;

					if (typeof then === 'function') {
						return then;
					}
				}

				return null;
			};

			const doResolve = (callback, onFulfilled, onRejected) => {
				let done = false;

				try {
					callback((value) => {
						if (done) {
							return;
						}

						done = true;
						onFulfilled(value);
					}, (reason) => {
						if (done) {
							return;
						}

						done = true;
						onRejected(reason);
					});
				} catch (error) {
					if (done) {
						return;
					}

					done = true;
					onRejected(error);
				}
			};

			class AnuPromise {
				constructor(callback) {
					this.state = PromiseStates.PENDING;
					this.value = null;
					this.handlers = [];
					this._fulfill = this._fulfill.bind(this);
					this._reject = this._reject.bind(this);
					this._resolve = this._resolve.bind(this);
					this._handle = this._handle.bind(this);
					this._done = this._done.bind(this);
					this.then = this.then.bind(this);
					this.catch = this.catch.bind(this);

					doResolve(callback, this._resolve, this._reject);
				}

				_fulfill(result) {
					this.state = PromiseStates.FULFILLED;
					this.value = result;
					this.handlers.forEach(this._handle);
					this.handlers = null;
				}
				_reject(error) {
					this.state = PromiseStates.REJECTED;
					this.value = error;
					this.handlers.forEach(this._handle);
					this.handlers = null;
				}
				_resolve(result) {
					try {
						const then = getThen(result);

						if (then) {
							doResolve(then.bind(result), this._resolve, this._reject);

							return;
						}

						this._fulfill(result);
					} catch (error) {
						this._reject(error);
					}
				}
				_handle(handler) {
					if (this.state === PromiseStates.PENDING) {
						this.handlers.push(handler);
					} else {
						if (
							this.state === PromiseStates.FULFILLED &&
							typeof handler.onFulfilled === 'function'
						) {
							handler.onFulfilled(this.value);
						}

						if (
							this.state === PromiseStates.REJECTED &&
							typeof handler.onRejected === 'function'
						) {
							handler.onRejected(this.value);
						}
					}
				}
				_done(onFulfilled, onRejected) {
					setTimeout(() => {
						this._handle({
							onFulfilled,
							onRejected
						});
					}, 0);
				}

				then(onFulfilled, onRejected) {
					return new AnuPromise((resolve, reject) => {
						return this._done((result) => {
							if (typeof onFulfilled === 'function') {
								try {
									return resolve(onFulfilled(result));
								} catch (ex) {
									return reject(ex);
								}
							} else {
								return resolve(result);
							}
						}, (error) => {
							if (typeof onRejected === 'function') {
								try {
									return resolve(onRejected(error));
								} catch (ex) {
									return reject(ex);
								}
							} else {
								return reject(error);
							}
						});
					});
				}
				catch(onRejected) {
					return this.then(undefined, onRejected)
				}

				static all(promises) {
					return new AnuPromise((resolve, reject) => {
						// Input validation
						if (!Array.isArray(promises)) {
							reject(new TypeError('Promise.all expects an array'));
							return;
						}

						// Handle empty array case
						if (promises.length === 0) {
							resolve([]);
							return;
						}

						let counter = 0;
						const result = [];
						const length = promises.length;

						for (let i = 0; i < length; i++) {
							AnuPromise.resolve(promises[i]).then(res => {
								result[i] = res;
								counter += 1;

								if (counter === length) {
									resolve(result);
								}
							}, err => {
								reject(err);
							});
						}
					});
				}
				static race(promises) {
					return new AnuPromise((resolve, reject) => {
						for (let p of promises) {
							AnuPromise.resolve(p).then(res => resolve(res), err => reject(err));
						}
					});
				}
				static resolve(value) {
					if (value instanceof AnuPromise) {
						return value;
					} else {
						return new AnuPromise((resolve, reject) => {
							resolve(value);
						});
					}
				}
				static reject(reason) {
					return new AnuPromise((resolve, reject) => {
						reject(reason);
					});
				}
			}

			return AnuPromise;
		})();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM UTILS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Utils = (() => {
		const deepEqual = (() => {
			const isObject = object =>
				object !== null && typeof object === 'object';

			const deepEqual = (object1, object2) => {
				const keys1 = Object.keys(object1);
				const keys2 = Object.keys(object2);

				if (keys1.length !== keys2.length) {
					return false;
				}

				for (const key of keys1) {
					const val1 = object1[key];
					const val2 = object2[key];
					const areObjects = isObject(val1) && isObject(val2);

					if (
						areObjects && !deepEqual(val1, val2) ||
						!areObjects && val1 !== val2
					) {
						return false;
					}
				}

				return true;
			};

			return deepEqual;
		})();



		return {
			deepEqual
		};
	})();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM ASYNC
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Async = (() => {
		const asyncMap = (coll, iteratee, callback) => {
			const collection = Array.isArray(coll) ? coll : [coll];
			const collNo = collection.length - 1;
			const results = [];

			for (let i = 0; i < collection.length; i++) {
				(index => {
					try {
						const result = iteratee(collection[index]); // Fixed: use index
						results[index] = result; // Fixed: maintain order
						
						if (index === collNo) {
							callback(results);
						}
					} catch (error) {
						console.error('Error in asyncMap:', error);
						callback([]); // or handle error appropriately
					}
				})(i);
			}
		};

		return {
			map: asyncMap
		};
	})();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM ELEMENTS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const { TEXT_ELEMENT, createElement } = (() => {
		const TEXT_ELEMENT = 'TEXT_ELEMENT';

		// Direct text element creation - no circular dependency
		const createTextElement = value => ({
			type: TEXT_ELEMENT,
			props: { nodeValue: value }
		});

		const createElement = (type, config, ...args) => {
			const props = Object.assign({}, config);
			const hasChildren = args.length > 0;
			const rawChildren = hasChildren ? [].concat(...args) : [];
			
			props.children = rawChildren
				.filter(c => c !== null && c !== false)
				.map(c => (
					typeof c === 'function'
						? createElement(c, { ...(c.props || {}) })
						: (
							c instanceof Object
								? c
								: createTextElement(c)  // Now safe - no circular call
						)
				));

			return { type, props };
		};

		return {
			TEXT_ELEMENT,
			createElement
		};
	})();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM DOM-UTILS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const { createDomElement, updateDomProperties, SVG_ELEMENT_LIST } = ((TEXT_ELEMENT) => {
		const SVG_ELEMENT_LIST = [
			'anchor',
			'animate',
			'animateMotion',
			'animateTransform',
			'circle',
			'clipPath',
			'desc',
			'discard',
			'ellipse',
			'feBlend',
			'feColorMatrix',
			'feComponentTransfer',
			'feComposite',
			'feConvolveMatrix',
			'feDiffuseLighting',
			'feDisplacementMap',
			'feDistantLight',
			'feDropShadow',
			'feFlood',
			'feFuncA',
			'feFuncB',
			'feFuncG',
			'feFuncR',
			'feGaussianBlur',
			'feImage',
			'feMerge',
			'feMergeNode',
			'feMorphology',
			'feOffset',
			'fePointLight',
			'feSpecularLighting',
			'feSpotLight',
			'feTile',
			'feTurbulence',
			'filter',
			'foreignObject',
			'g',
			'hatch',
			'hatchpath',
			'image',
			'line',
			'linearGradient',
			'marker',
			'mask',
			'mesh',
			'meshgradient',
			'meshpatch',
			'meshrow',
			'metadata',
			'mpath',
			'path',
			'pattern',
			'polygon',
			'polyline',
			'radialGradient',
			'rect',
			'set',
			'stop',
			'svgStyle',
			'svg',
			'switch',
			'symbol',
			'text',
			'textPath',
			'svgTitle',
			'tspan',
			'unknown',
			'use',
			'view'
		];

		const createDomElement = fiber => {
			const isTextElement = fiber.type === TEXT_ELEMENT;
			const isSvgElement = SVG_ELEMENT_LIST.indexOf(fiber.type) > -1;
			const getHTMLValidSvgTag = fiberType => {
				switch (fiberType) {
					case 'anchor': {
						return 'a';
					}
					case 'svgStyle': {
						return 'style';
					}
					case 'svgTitle': {
						return 'title';
					}
					default: {
						return fiberType;
					}
				}
			};

			let dom;

			if (isTextElement) {
				dom = document.createTextNode('');
			} else if (isSvgElement) {
				dom = document.createElementNS('http://www.w3.org/2000/svg', getHTMLValidSvgTag(fiber.type));
			} else {
				dom = document.createElement(fiber.type);
			}

			updateDomProperties(dom, {}, fiber.props, isSvgElement);

			return dom;
		};

		const updateDomProperties = (dom, prevProps, nextProps, isSvgElement = false) => {
			const isEvent = name => {
				if (!String.prototype.startsWith) {
					return name[0] === 'o' && name[1] === 'n';
				}

				return name.startsWith('on');
			};
			const isAttribute = name =>
				!isEvent(name) && name !== 'children' && name !== 'style' && name !== 'ref' && name !== 'key';
			const isNew = (prev, next) => key => prev[key] !== next[key];
			const isGone = (prev, next) => key => !(key in next);

			Object.keys(prevProps)
				.filter(isEvent)
				.filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
				.forEach(name => {
					const eventType = name.toLowerCase().substring(2);
					dom.removeEventListener(eventType, prevProps[name]);
				});

			Object.keys(prevProps)
				.filter(isAttribute)
				.filter(isGone(prevProps, nextProps))
				.forEach(name => {
					if (name === 'className') {
						dom['class'] = null;
					} else if (name === 'htmlFor') {
						dom['for'] = null;
					} else {
						dom[name] = null;
					}
				});

			Object.keys(nextProps)
				.filter(isAttribute)
				.filter(isNew(prevProps, nextProps))
				.forEach(name => {
					if (isSvgElement) {
						if (name === 'className') {
							dom.setAttribute('class', nextProps[name]);
						} else {
							dom.setAttribute(name, nextProps[name]);
						}
					} else {
						if (name.includes('aria-') || name === 'role') {
							dom.setAttribute(name, nextProps[name])
						} else {
							dom[name] = nextProps[name];
						}
					}
				});

			prevProps.style = prevProps.style || {};
			nextProps.style = nextProps.style || {};

			Object.keys(nextProps.style)
				.filter(isNew(prevProps.style, nextProps.style))
				.forEach(key => {
					dom.style[key] = nextProps.style[key];
				});

			Object.keys(prevProps.style)
				.filter(isGone(prevProps.style, nextProps.style))
				.forEach(key => {
					dom.style[key] = '';
				});

			Object.keys(nextProps)
				.filter(isEvent)
				.filter(isNew(prevProps, nextProps))
				.forEach(name => {
					const eventType = name.toLowerCase().substring(2);
					dom.addEventListener(eventType, nextProps[name]);
				});
		};

		return {
			createDomElement,
			updateDomProperties,
			SVG_ELEMENT_LIST
		};
	})(TEXT_ELEMENT);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM RECONCILER
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const { createRef, render, scheduleUpdate } = ((createDomElement, updateDomProperties, SVG_ELEMENT_LIST) => {
		const HOST_COMPONENT = 'host';
		const CLASS_COMPONENT = 'class';
		const FUNCTION_COMPONENT = 'function';
		const HOST_ROOT = 'root';

		const PLACEMENT = 1;
		const DELETION = 2;
		const UPDATE = 3;

		const ENOUGH_TIME = 1;

		const updateQueue = [];
		let nextUnitOfWork = null;
		let pendingCommit = null;

		const createRef = () => ({
			current: null
		});

		const render = (elements, containerDom) => {
			updateQueue.push({
				from: HOST_ROOT,
				dom: containerDom,
				newProps: { children: elements }
			});

			requestIdleCallback(performWork);
		};

		const scheduleUpdate = (instance, partialState, partialStateCallback) => {
			const updateFiber = {
				from: CLASS_COMPONENT,
				instance,
				partialState
			};

			if (partialStateCallback) {
				updateFiber.partialStateCallback = partialStateCallback;
			}

			updateQueue.push(updateFiber);

			requestIdleCallback(performWork);
		};

		const performWork = deadline => {
			workLoop(deadline);

			if (nextUnitOfWork || updateQueue.length > 0) {
				requestIdleCallback(performWork);
			}
		};

		const workLoop = deadline => {
			if (!nextUnitOfWork) {
				resetNextUnitOfWork();
			}

			while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
				nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
			}

			if (pendingCommit) {
				commitAllWork(pendingCommit);
			}
		};

		const resetNextUnitOfWork = () => {
			const update = updateQueue.shift();

			if (!update) {
				return;
			}

			if (update.partialState) {
				update.instance.__fiber.partialState = update.partialState;
			}

			if (update.partialStateCallback) {
				update.instance.__fiber.partialStateCallback = update.partialStateCallback;
			}

			const root =
				update.from === HOST_ROOT
					? update.dom._rootContainerFiber
					: getRoot(update.instance.__fiber);

			nextUnitOfWork = {
				tag: HOST_ROOT,
				stateNode: update.dom || root.stateNode,
				props: update.newProps || root.props,
				alternate: root
			};
		};

		const getRoot = fiber => {
			let node = fiber;

			while (node.parent) {
				node = node.parent;
			}

			return node;
		};

		const performUnitOfWork = wipFiber => {
			beginWork(wipFiber);

			if (wipFiber.child) {
				return wipFiber.child;
			}

			let unitOfWork = wipFiber;

			while (unitOfWork) {
				completeWork(unitOfWork);

				if (unitOfWork.sibling) {
					return unitOfWork.sibling;
				}

				unitOfWork = unitOfWork.parent;
			}
		};

		const beginWork = wipFiber => {
			if (wipFiber.tag === CLASS_COMPONENT) {
				updateClassComponent(wipFiber);
			} else if (wipFiber.tag === FUNCTION_COMPONENT) {
				updateFunctionComponent(wipFiber);
			} else {
				updateHostComponent(wipFiber);
			}
		};

		const updateHostComponent = wipFiber => {
			if (!wipFiber.stateNode) {
				wipFiber.stateNode = createDomElement(wipFiber);
			}

			const newChildElements = wipFiber.props.children;
			reconcileChildrenArray(wipFiber, newChildElements);
		};

		const createFunctionComponent = fiber => {
			const instance = fiber.type(fiber.props);
			instance.__fiber = fiber;

			return instance;
		};

		const updateFunctionComponent = wipFiber => {
			let instance = wipFiber.stateNode || null;

			if (instance === null) {
				instance = wipFiber.stateNode = createFunctionComponent(wipFiber);
			} else if (wipFiber.props === instance.props && !wipFiber.partialState) {
				cloneChildFibers(wipFiber);

				return;
			}

			instance.props = wipFiber.props;
			wipFiber.stateNode.render = wipFiber.type;
			const newChildElements = wipFiber.stateNode.render(wipFiber.props);
			reconcileChildrenArray(wipFiber, newChildElements);
		};

		const createInstance = fiber => {
			const context = Object.assign({}, fiber.stateNode ? { ...fiber.stateNode.context } : {});
			const instance = new fiber.type(fiber.props, context);
			instance.__fiber = fiber;

			return instance;
		};

		const updateClassComponent = wipFiber => {
			let instance = wipFiber.stateNode || null;

			if (instance === null) {
				const stateNode = createInstance(wipFiber);
				stateNode.context = { ...stateNode.context };
				instance = wipFiber.stateNode = stateNode;

				wipFiber.stateNode.setState = wipFiber.stateNode.setState.bind(wipFiber.stateNode);

				if (wipFiber.type.prototype.componentDidMount) {
					wipFiber.stateNode.componentDidMount = wipFiber.stateNode.componentDidMount.bind(wipFiber.stateNode);
				}

				if (wipFiber.type.prototype.componentDidUpdate) {
					wipFiber.stateNode.componentDidUpdate = wipFiber.stateNode.componentDidUpdate.bind(wipFiber.stateNode);
				}

				if (wipFiber.type.prototype.componentWillUnmount) {
					wipFiber.stateNode.componentWillUnmount = wipFiber.stateNode.componentWillUnmount.bind(wipFiber.stateNode);
				}
			} else if (wipFiber.props === instance.props && !wipFiber.partialState && !wipFiber.partialStateCallback) {
				cloneChildFibers(wipFiber);

				return;
			}

			const nextProps = { ...wipFiber.props };
			let nextState = {};

			if (!wipFiber.partialStateCallback) {
				nextState = Object.assign({}, instance.state, wipFiber.partialState);
			} else {
				nextState = wipFiber.partialStateCallback(instance.state, nextProps);
			}

			instance.props = nextProps;
			instance.state = nextState;
			wipFiber.partialState = null;
			delete wipFiber.partialStateCallback;
			let newChildElements = null;

			newChildElements = wipFiber.stateNode.render();
			reconcileChildrenArray(wipFiber, newChildElements);
		};

		const arrify = val => !val ? [] : Array.isArray(val) ? val : [val];

		const reconcileChildrenArray = (wipFiber, newChildElements) => {
			const elements = arrify(newChildElements);
			let index = 0;
			let oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
			let newFiber = null;

			while (index < elements.length || oldFiber) {
				const prevFiber = newFiber;
				const element = index < elements.length && elements[index];
				const sameType = oldFiber && element && element.type === oldFiber.type;

				if (sameType) {
					newFiber = {
						type: oldFiber.type,
						tag: oldFiber.tag,
						stateNode: oldFiber.stateNode,
						props: element.props,
						parent: wipFiber,
						alternate: oldFiber,
						partialState: oldFiber.partialState,
						effectTag: UPDATE
					};

					if (oldFiber.partialStateCallback) {
						newFiber.partialStateCallback = oldFiber.partialStateCallback;
					}
				}

				if (element && !sameType) {
					let tag;

					if (typeof element.type === 'string') {
						tag = HOST_COMPONENT;
					} else if (
						typeof element.type === 'function' &&
						!element.type.isAnuComponent &&
						!element.type.prototype.hasOwnProperty('render')
					) {
						tag = FUNCTION_COMPONENT;
					} else {
						tag = CLASS_COMPONENT;
					}

					newFiber = {
						type: element.type,
						tag,
						props: element.props,
						parent: wipFiber,
						effectTag: PLACEMENT
					};
				}

				if (oldFiber && !sameType) {
					oldFiber.effectTag = DELETION;
					wipFiber.effects = wipFiber.effects || [];
					wipFiber.effects.push(oldFiber);
				}

				if (oldFiber) {
					oldFiber = oldFiber.sibling;
				}

				if (index === 0) {
					wipFiber.child = newFiber;
				} else if (prevFiber && element) {
					prevFiber.sibling = newFiber;
				}

				index++;
			}
		};

		const cloneChildFibers = parentFiber => {
			const oldFiber = parentFiber.alternate;

			if (!oldFiber.child) {
				return;
			}

			let oldChild = oldFiber.child;
			let prevChild = null;

			while (oldChild) {
				const newChild = {
					type: oldChild.type,
					tag: oldChild.tag,
					stateNode: oldChild.stateNode,
					props: oldChild.props,
					partialState: oldChild.partialState,
					alternate: oldChild,
					parent: parentFiber
				};

				if (oldChild.partialStateCallback) {
					newChild.partialStateCallback = oldChild.partialStateCallback;
				}

				if (prevChild) {
					prevChild.sibling = newChild;
				} else {
					parentFiber.child = newChild;
				}

				prevChild = newChild;
				oldChild = oldChild.sibling;
			}
		};

		const completeWork = fiber => {
			if (fiber.tag === CLASS_COMPONENT) {
				fiber.stateNode.__fiber = fiber;
			}

			if (fiber.parent) {
				const childEffects = fiber.effects || [];
				const thisEffect = fiber.effectTag !== null ? [fiber] : [];
				const parentEffects = fiber.parent.effects || [];
				fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
			} else {
				pendingCommit = fiber;
			}
		};

		const componentLifecyclesQueue = [];

		const flushComponentLifecyclesQueue = () => {
			while (componentLifecyclesQueue.length > 0) {
				const {
					fn,
					params: {
						prevProps,
						prevState
					}
				} = componentLifecyclesQueue.shift();

				fn(prevProps, prevState);
			}
		};

		const commitAllWork = fiber => {
			fiber.effects.forEach((effect, index, effects) => {
				commitWork(effect);

				if (index === effects.length - 1) {
					flushComponentLifecyclesQueue();
				}
			});

			fiber.stateNode._rootContainerFiber = fiber;
			nextUnitOfWork = null;
			pendingCommit = null;
		};

		const commitWork = effect => {
			if (effect.tag === HOST_ROOT) {
				return;
			}

			let domParentFiber = effect.parent;
			const isRefInProps = (props) => Object.keys(props).indexOf('ref') > -1;

			while (domParentFiber.tag === CLASS_COMPONENT || domParentFiber.tag === FUNCTION_COMPONENT) {
				domParentFiber = domParentFiber.parent;
			}

			const domParent = domParentFiber.stateNode;

			if (effect.effectTag === PLACEMENT) {
				if (effect.tag === HOST_COMPONENT) {
					domParent.appendChild(effect.stateNode);

					if (isRefInProps(effect.props)) {
						effect.props.ref.current = effect.stateNode;
					}
				} else if (effect.tag === CLASS_COMPONENT) {
					if (effect.stateNode.componentDidMount) {
						componentLifecyclesQueue.push({
							fn: effect.stateNode.componentDidMount,
							params: {}
						});
					}
				}
			} else if (effect.effectTag === UPDATE) {
				if (
					effect &&
					effect.stateNode &&
					effect.alternate &&
					effect.alternate.props &&
					effect.props
				) {
					if (effect.tag === HOST_COMPONENT) {
						updateDomProperties(effect.stateNode, effect.alternate.props, effect.props, SVG_ELEMENT_LIST.indexOf(effect.type) > -1);

						if (isRefInProps(effect.props)) {
							effect.props.ref.current = effect.stateNode;
						}
					} else if (effect.tag === CLASS_COMPONENT) {
						if (effect.stateNode.componentDidUpdate) {
							componentLifecyclesQueue.push({
								fn: effect.stateNode.componentDidUpdate,
								params: {
									prevProps: effect.stateNode.props,
									prevState: effect.stateNode.state
								}
							});
						}
					}
				}
			} else if (effect.effectTag === DELETION) {
				if (effect.tag === CLASS_COMPONENT) {
					if (effect.stateNode.componentWillUnmount) {
						effect.stateNode.componentWillUnmount();
					}
				}

				commitDeletion(effect, domParent);
			}
		};

		const commitDeletion = (fiber, domParent) => {
			let node = fiber;

			while (node) {
				if (node.tag === CLASS_COMPONENT || node.tag === FUNCTION_COMPONENT) {
					node = node.child;

					continue;
				}

				if (domParent.contains(node.stateNode)) {
					domParent.removeChild(node.stateNode);
				}

				while (node !== fiber && !node.sibling) {
					node = node.parent;
				}

				if (node === fiber) {
					return;
				}

				node = node.sibling;
			}
		};

		return {
			createRef,
			render,
			scheduleUpdate
		}
	})(createDomElement, updateDomProperties, SVG_ELEMENT_LIST);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM COMPONENT
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Component = ((scheduleUpdate) => {
		class Component {
			constructor(props, context) {
				this.props = props || {};
				this.context = { ...this.context, ...context } || {};
				this.state = this.state || {};
			}

			setState(partialState = {}) {
				let partialStateObject = this.state;
				let partialStateCallback;

				if (typeof partialState === 'object') {
					partialStateObject = { ...partialStateObject, ...partialState }
				} else if (typeof partialState === 'function') {
					partialStateCallback = partialState;
				}

				scheduleUpdate(this, partialStateObject, partialStateCallback);
			}

			componentDidMount() {}

			componentDidUpdate(prevProps, prevState) {}

			componentWillUnmount() {}
		}

		return Component;
	})(scheduleUpdate);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM FRAGMENT API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Fragment = ((Component) => {
		class Fragment extends Component {
			render() {
				const { children } = this.props;

				try {
					if (!children.length) {
						throw new Error('Fragment must have at least one child element!');
					}

					return children;
				} catch (err) {
					console.error(err);
				}
			}
		}

		return Fragment;
	})(Component);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM SERVER API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const ServerAPI = (() => {
		const SUCCESS_STATUS_CODES = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
		const CLIENT_ERROR_STATUS_CODES = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451];
		const SERVER_ERROR_STATUS_CODES = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

		const _setXHR = (successHandler, errorHandler) => {
			const XHR = new XMLHttpRequest();

			XHR.onload = () => {
				const { status, response } = XHR;

				if (SUCCESS_STATUS_CODES.indexOf(status) > -1) {
					successHandler({
						status,
						response: response ? (() => {
							try {
								return JSON.parse(response);
							} catch (e) {
								console.error('Invalid JSON response:', e.message);
								return null;  // or return { error: 'Invalid JSON' }
							}
						})() : null

					});
				} else if (CLIENT_ERROR_STATUS_CODES.indexOf(status) > -1 || SERVER_ERROR_STATUS_CODES.indexOf(status) > -1) {
					errorHandler({
						status,
						response: null
					});
				}
			};


			return XHR;
		};

		const _serverGetAPI = (url, params = {}) => (successHandler, errorHandler) => {
			const XHR = _setXHR(successHandler, errorHandler);

			let urlWithParams = `${url}`;
			const urlParamKeys = Object.keys(params)

			if (urlParamKeys.length > 0) {
				urlParamKeys.forEach((key, index) => {
					if (index === 0) {
						urlWithParams += `?${key}=${params[key]}`;
					} else {
						urlWithParams += `&${key}=${params[key]}`;
					}
				})
			}

			XHR.open('GET', urlWithParams, true);
			XHR.send();
		};

		const _serverPostAPI = (url, data) => (successHandler, errorHandler) => {
			if (!data) {
				return;
			}

			const urlParams = `data=${JSON.stringify(data)}`;
			const XHR = _setXHR(successHandler, errorHandler);
			XHR.open('POST', url, true);
			XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			XHR.send(urlParams);
		};

		const _serverPutAPI = (url, data) => (successHandler, errorHandler) => {
			if (!data) {
				return;
			}

			const XHR = _setXHR(successHandler, errorHandler);
			XHR.open('PUT', url, true);
			XHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			XHR.send(JSON.stringify(data));
		};

		const _serverDeleteAPI = (url, params = {}) => (successHandler, errorHandler) => {
			const XHR = _setXHR(successHandler, errorHandler);

			let urlWithParams = `${url}`;
			const urlParamKeys = Object.keys(params)

			if (urlParamKeys.length > 0) {
				urlParamKeys.forEach((key, index) => {
					if (index === 0) {
						urlWithParams += `?${key}=${params[key]}`;
					} else {
						urlWithParams += `&${key}=${params[key]}`;
					}
				})
			}

			XHR.open('DELETE', urlWithParams, true);
			XHR.send();
		};

		const _serverFileAPI = (url, files, data = {}) => (successHandler, errorHandler) => {
			if (!files) {
				return;
			}

			const XHR = _setXHR(successHandler, errorHandler);
			XHR.open('POST', url, true);

			const formData = new FormData();
			const formDataFiles = Array.isArray(files) ? files : [files];

			formDataFiles.forEach((file, index) => {
				formData.append(index, file);
			});

			formData.append('data', JSON.stringify(data));

			XHR.send(formData);
		};

		const ServerAPI = {
			get: (url, params) => new Promise(_serverGetAPI(url, params)),
			post: (url, data) => new Promise(_serverPostAPI(url, data)),
			put: (url, data) => new Promise(_serverPutAPI(url, data)),
			delete: (url, params) => new Promise(_serverDeleteAPI(url, params)),
			file: (url, file, data) => new Promise(_serverFileAPI(url, file, data)),
		};

		return ServerAPI;
	})();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM ANALYTICS API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const { AnalyticsProvider, trackRouteChange, trackEvent, trackStateChange } = ((Component, ServerAPI) => {
		const EventTypes = {
			INITIALIZATION: 'initialization',
			USER_ACTION: 'userAction',
			STATE_CHANGE: 'stateChange',
			NAVIGATION: 'navigation',
			PAGE_LEAVE: 'pageLeave'
		};

		const AnulyticsState = (() => {
			const initStart = new Date().getTime();
			let _anulyticsInstanceExist = false;

			const setAnulyticsInstanceExist = instanceExist => {
				_anulyticsInstanceExist = instanceExist;
			}

			const getAnulyticsInstanceExist = () =>
				_anulyticsInstanceExist;

			let _anulytics = {
				startDate: initStart,
				events: [{
					[EventTypes.INITIALIZATION]: {
						eventType: window.location.pathname,
						timestamp: initStart,
						properties: {}
					}
				}],
				user: {}
			};

			return {
				getAnulyticsInstanceExist,
				setAnulyticsInstanceExist,
				addEvent: (key, val) => {
					_anulytics.events.push({ [key]: val });
				},
				trackEvent: ({
					type,
					keyCode = null,
					pageX = 0,
					pageY = 0,
					target: {
						id,
						name,
						nodeName,
						value
					} = {
						id: '',
						name: '',
						nodeName: '',
						value: ''
					}
				}, rawProps) => {
					const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
					const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
					const props = typeof rawProps === 'object' && !Array.isArray(rawProps)
						? rawProps
						: null;

					const event = {
						[EventTypes.USER_ACTION]: {
							eventType: type,
							timestamp: new Date().getTime(),
							properties: {
								id,
								keyCode,
								name,
								nodeName,
								value,
								pageX,
								pageY,
								scrollTop,
								scrollLeft,
								url: window.location.pathname,
								props
							}
						}
					};

					_anulytics.events.push(event);
				},
				trackStateChange: (prevState, action, nextState) => {
					const event = {
						[EventTypes.STATE_CHANGE]: {
							eventType: action.type,
							timestamp: new Date().getTime(),
							properties: {
								url: window.location.pathname,
								prevState,
								action,
								nextState
							}
						}
					};

					_anulytics.events.push(event);
				},
				setUser: user => {
					_anulytics.user = user || {};
				},
				getAnulyticsData: () => _anulytics,
			};
		})();

		const _isBot =
			window.phantom ||
			window._phantom ||
			window.__nightmare ||
			window.navigator.webdriver ||
			window.Cypress;

		const _isInstalled = () => {
			if (window.navigator.standalone) {
				return true;
			}

			if (window.matchMedia('(display-mode: standalone)').matches) {
				return true;
			}

			return false;
		};

		const trackEvent = (event, props) => {
			if (AnulyticsState.getAnulyticsInstanceExist()) {
				AnulyticsState.trackEvent(event, props);
			}
		};

		const trackStateChange = (prevState, action, nextState) => {
			if (AnulyticsState.getAnulyticsInstanceExist()) {
				AnulyticsState.trackStateChange(prevState, action, nextState);
			}
		};

		const trackRouteChange = path => {
			if (AnulyticsState.getAnulyticsInstanceExist()) {
				const url = path || window.location.pathname;
				const event = {
					eventType: url,
					timestamp: new Date().getTime(),
					properties: {}
				};

				AnulyticsState.addEvent(EventTypes.NAVIGATION, event);
			}
		};

		class AnalyticsProvider extends Component {
			constructor(props) {
				super(props);
				AnulyticsState.setAnulyticsInstanceExist(true);
				this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
			}

			componentDidMount() {
				const { userData } = this.props;
				AnulyticsState.setUser(userData);

				document.addEventListener('visibilitychange', this.handleVisibilityChange, {
					passive: true,
				});
			}

			componentWillUnmount() {
				document.removeEventListener('visibilitychange', this.handleVisibilityChange);
				AnulyticsState.setAnulyticsInstanceExist(false);
			}

			handleVisibilityChange() {
				const { analyticsUrl, onSuccess, onFail } = this.props;

				if (_isBot) {
					return;
				}

				if (document.visibilityState === 'hidden') {
					const url = window.location.pathname;
					const event = {
						eventType: url,
						timestamp: new Date().getTime(),
						properties: {}
					};
					let ua;

					AnulyticsState.addEvent(EventTypes.PAGE_LEAVE, event);

					if (window.navigator.userAgentData) {
						const { brands, mobile, platform } = window.navigator.userAgentData;

						ua = { userAgent: brands, mobile, platform };
					} else {
						ua = {
							userAgent: window.navigator.userAgent,
							mobile: false,
							platform: ''
						};
					}

					const data = {
						...AnulyticsState.getAnulyticsData(),
						endDate: new Date().getTime(),
						system: {
							referrer: document.referrer || null,
							innerWidth: window.innerWidth,
							isMobileAppInstalled: _isInstalled(),
							userAgentData: ua,
						}
					};

					ServerAPI.post(analyticsUrl, data)
						.then(({ response }) => onSuccess(response))
						.catch(({ status }) => onFail(status));
				} else {
					this.setState();
				}
			}

			render() {
				const { children } = this.props;

				try {
					if (children.length !== 1) {
						throw new Error('Provider must have one child element!');
					}

					return children;
				} catch (err) {
					console.error(err);
				}
			}
		}

		return {
			AnalyticsProvider,
			trackRouteChange,
			trackEvent,
			trackStateChange
		};
	})(Component, ServerAPI);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM HISTORY API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const History = ((createElement, Component, trackRouteChange) => {
		const instances = [];

		const register = comp => {
			instances.push(comp);
		};

		const unregister = comp => {
			const index = instances.indexOf(comp);
			if (index >= 0) {
				instances.splice(index, 1);
			}
		};

		const historyPush = path => {
			trackRouteChange(path);
			history.pushState({}, null, path);
			instances.forEach(instance => {
				instance.setState();
			});
		};

		const historyReplace = path => {
			trackRouteChange(path);
			history.replaceState({}, null, path);
			instances.forEach(instance => {
				instance.setState();
			});
		};

		const matchPath = (pathname, options) => {
			const { exact = false, path } = options;

			if (!path) {
				return {
					path: null,
					url: pathname,
					isExact: true,
				};
			}

			const match = new RegExp(`^${path}`).exec(pathname);

			if (!match) {
				return null;
			}

			const url = match[0];
			const isExact = pathname === url;

			if (exact && !isExact) {
				return null;
			}

			return {
				path,
				url,
				isExact,
			};
		};

		class HistoryRoute extends Component {
			constructor(props) {
				super(props);
				this.handlePop = this.handlePop.bind(this);
			}

			componentDidMount() {
				window.addEventListener("popstate", this.handlePop);
				register(this);
			}

			componentWillUnmount() {
				unregister(this);
				window.removeEventListener("popstate", this.handlePop);
			}

			handlePop() {
				this.setState();
			}

			render() {
				const {
					path,
					exact,
					component,
					render,
				} = this.props;

				const match = matchPath(
					window.location.pathname,
					{ path, exact }
				);

				if (match !== null) {
					if (component) {
						return createElement(component, { match });
					}

					if (render) {
						return render({ match });
					}
				}

				return null;
			}
		}

		class HistoryLink extends Component {
			constructor(props) {
				super(props);
				this.handleClick = this.handleClick.bind(this);
			}

			handleClick(event) {
				event.preventDefault();
				const { replace, to } = this.props;

				replace ? historyReplace(to) : historyPush(to);
			}

			render() {
				const { to, children, ...restProps } = this.props;
				const { ariaLabel } = restProps;

				return createElement('a', {
					href: to,
					ariaLabel: `historyLink${ariaLabel ? `-${ariaLabel}` : ''}`,
					onClick: this.handleClick,
					...restProps
				}, children);
			}
		}

		class HistoryRedirect extends Component {
			componentDidMount() {
				const { to, push } = this.props;

				push ? historyPush(to) : historyReplace(to);
			}

			render() {
				return null;
			}
		}

		const goTo = (path = '/', replace) => {
			replace ? historyReplace(path) : historyPush(path);
		};

		return {
			goTo,
			Link: HistoryLink,
			Redirect: HistoryRedirect,
			Route: HistoryRoute,
		}
	})(createElement, Component, trackRouteChange);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM CONTEXT API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const createContext = ((deepEqual, Component) => {
		return context => {
			const providerContext = {
				defaultContext: { value: context },
				value: {}
			};

			const getPureProps = props => {
				const pureProps = {};

				Object.keys(props).forEach(key => {
					if (key !== 'children') {
						pureProps[key] = props[key];
					}
				});

				return pureProps;
			}

			class ContextProvider extends Component {
				constructor(props) {
					super(props);
					providerContext.value = { ...getPureProps(props) };
				}

				componentDidUpdate() {
					const pureProps = getPureProps(this.props);

					if (!deepEqual(providerContext.value, pureProps)) {
						providerContext.value = { ...pureProps };

						this.setState();
					}
				}

				render() {
					const { children } = this.props;

					try {
						if (children.length !== 1) {
							throw new Error('Context Component must have exactly one child element!');
						}

						return children;
					} catch (err) {
						console.error(err);
					}
				}
			}

			class ContextConsumer extends Component {
				constructor(props) {
					super(props);
				}

				componentDidUpdate() {
					if (providerContext.__notifySub) {
						this.setState();
					}
				}

				render() {
					const { children } = this.props;
					const { value, defaultContext } = providerContext;

					try {
						if (children.length !== 1) {
							throw new Error('Context Component must have exactly one child element!');
						}

						const { type } = children[0];
						const childProps = { value, defaultContext };

						if (typeof type === 'function') {
							return type(childProps);
						} else {
							throw new Error('Context component child element must be a function!')
						}
					} catch (err) {
						console.error(err);
					}
				}
			}

			return {
				ContextProvider,
				ContextConsumer
			};
		};
	})(Utils.deepEqual, Component);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM INTL API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Intl = ((createElement, TEXT_ELEMENT, createContext) => {
		const Intl = createContext({});
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
						Intl.ContextProvider,
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
				Intl.ContextConsumer,
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

		return {
			abbreviateNumber,
			FormattedMessage,
			formatMessage,
			Provider: IntlProvider,
		};
	})(createElement, TEXT_ELEMENT, createContext);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM FEATURE API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Feature = ((createElement, createContext) => {
		const defaultFeatures = {};

		const FeaturesContext = createContext(defaultFeatures);

		const FeatureToggle = ({ name, children, defaultComponent = null }) => createElement(
			FeaturesContext.ContextConsumer,
			{},
			({ value: { features } }) => (
				features[name] === true ?
					children :
					defaultComponent
			)
		);

		return {
			Provider: FeaturesContext.ContextProvider,
			Toggle: FeatureToggle,
		};
	})(createElement, createContext);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM STORE API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const store = ((trackStateChange) => {
		const createStore = (reducer, initialState, middleware) => {
			const currentReducer = reducer;
			let currentState = initialState;
			const subscribers = [];

			const validateAction = action => {
				if (!action || typeof action !== 'object' || Array.isArray(action)) {
					throw new Error('Action must be an object!');
				}
				if (typeof action.type === 'undefined') {
					throw new Error('Action must have a type!');
				}
			};

			const coreDispatch = action => {
				validateAction(action);
				currentState = currentReducer(currentState, action);
				subscribers.forEach(subscriber => {
					subscriber();
				});
			};

			const getState = () => currentState;

			const store = {
				getState,
				dispatch: coreDispatch,
				subscribe: newListener => {
					subscribers.push(newListener)
				},
				unsubscribe: listenerToRemove => {
					const index = subscribers.indexOf(listenerToRemove);

					if (index >= 0) {
						subscribers.splice(index, 1);
					}
				}
			};

			if (middleware) {
				const dispatch = action => store.dispatch(action);
				store.dispatch = middleware({
					dispatch,
					getState
				})(coreDispatch);
			}

			return store;
		};

		const applyMiddleware = (...middlewares) => store => {
			if (middlewares.length === 0) {
				return dispatch => dispatch;
			}

			if (middlewares.length === 1) {
				return middlewares[0](store);
			}

			const boundMiddlewares = middlewares.map(middleware => middleware(store));

			return boundMiddlewares.reduce((a, b) => next => a(b(next)));
		};

		const thunkMiddleware = ({ dispatch, getState }) => next => action => {
			if (typeof action === 'function') {
				return action(dispatch, getState);
			}

			return next(action);
		};

		const loggingMiddleware = ({ getState }) => next => action => {
			const prevState = { ...getState() };
			const result = next(action);
			const nextState = { ...getState() };
			trackStateChange(prevState, action, nextState);

			console.log('\n-----');
			console.log('Previous state:', prevState);
			console.log('Dispatching action:', action);
			console.log('Next state:', nextState);

			return result;
		};

		const combineReducers = reducers => {
			const reducerKeys = Object.keys(reducers);

			return (state = {}, action) => {
				const nextState = {};
				const keysLength = reducerKeys.length;

				for (let i = 0; i < keysLength; i++) {
					const key = reducerKeys[i];
					const reducer = reducers[key];
					const previousStateForKey = state[key];
					const nextStateForKey = reducer(previousStateForKey, action);
					nextState[key] = nextStateForKey;
				}

				return nextState;
			}
		};

		const areArgumentsEqual = (prev, next) => {
			if (
				prev === null ||
				next === null ||
				prev.length !== next.length
			) {
				return false;
			}

			for (let i = 0; i < prev.length; i++) {
				if (prev[i] !== next[i]) {
					return false;
				}
			}

			return true;
		};

		const memoize = (func, maxSize = 100) => {
			const cache = new Map();
			const accessOrder = [];

			// Robust key generation
			const generateKey = (args) => {
				const parts = [];
				
				for (let i = 0; i < args.length; i++) {
					const arg = args[i];
					const type = typeof arg;
					
					if (arg === null) {
						parts.push('null');
					} else if (arg === undefined) {
						parts.push('undefined');
					} else if (type === 'function') {
						parts.push(`function:${arg.name || 'anonymous'}:${arg.toString().slice(0, 100)}`);
					} else if (type === 'symbol') {
						parts.push(`symbol:${arg.toString()}`);
					} else if (type === 'object') {
						try {
							// Use a more robust serialization
							parts.push(`object:${JSON.stringify(arg)}`);
						} catch (e) {
							// Handle circular references
							parts.push(`object:circular:${Object.prototype.toString.call(arg)}`);
						}
					} else {
						parts.push(`${type}:${arg}`);
					}
				}
				
				return parts.join('|');
			};

			return (...args) => {
				const key = generateKey(args);
				
				if (cache.has(key)) {
					// Move to end (most recently used)
					const index = accessOrder.indexOf(key);
					accessOrder.splice(index, 1);
					accessOrder.push(key);
					return cache.get(key);
				}

				const result = func.apply(null, args);
				
				cache.set(key, result);
				accessOrder.push(key);

				if (cache.size > maxSize) {
					const oldestKey = accessOrder.shift();
					cache.delete(oldestKey);
				}

				return result;
			};
		};

		const createSelector = (dependenciesInput, transformation) => {
			const dependencies = Array.isArray(dependenciesInput) ? dependenciesInput : [dependenciesInput];
			const memoizedTransformation = memoize(transformation);

			return memoize(input => {
				const params = [];

				dependencies.forEach(func => {
					params.push(func(input));
				});

				return memoizedTransformation.apply(null, params);
			});
		};

		return {
			combineReducers,
			createSelector,
			createStore,
			middleware: {
				applyMiddleware,
				loggingMiddleware,
				thunkMiddleware,
			}
		};
	})(trackStateChange);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM CONNECTOR API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const Connector = ((createElement, Component) => {
		const providedStore = (context = {}) => {
			let providerContext = { ...context };

			return {
				getContext: () => providerContext,
				setContext: context => {
					providerContext = { ...providerContext, ...context };
				}
			};
		};

		const providerStore = providedStore();

		class Provider extends Component {
			constructor(props, context) {
				super(props, context);
				this.store = props.store;
				this.context.store = props.store;
				this.context.parentSub = null;
				providerStore.setContext({ ...this.context });
			}

			render() {
				const { children } = this.props;

				try {
					if (children.length !== 1) {
						throw new Error('Provider must have one child element!');
					}

					return children;
				} catch (err) {
					console.error(err);
				}
			}
		}

		class Subscription {
			constructor(store, parentSub, onStateChange) {
				this.store = store;
				this.parentSub = parentSub;
				this.onStateChange = onStateChange;
				this.subscribed = false;
				this.listeners = [];
			}

			notifyNestedSubs() {
				this.listeners.forEach(listener => listener());
			}

			trySubscribe() {
				if (!this.subscribed) {
					if (this.parentSub !== null) {
						this.parentSub.addNestedSub(this.onStateChange);
					} else {
						this.store.subscribe(this.onStateChange);
					}

					this.subscribed = true;
				}
			}

			addNestedSub(listener) {
				this.trySubscribe();
				this.listeners.push(listener);
			}

			tryUnsubscribe() {
				if (this.subscribed) {
					if (this.parentSub !== null) {
						this.parentSub.removeNestedSub(this.onStateChange);
					} else {
						this.store.unsubscribe(this.onStateChange);
					}

					this.subscribed = false;
				}
			}

			removeNestedSub(listener) {
				this.tryUnsubscribe();
				this.listeners.splice(this.listeners.indexOf(listener), 1);
			}
		}

		const connectHOC = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
			class Connect extends Component {
				constructor(props, context) {
					super(props, context);
					this.context = { ...this.context, ...providerStore.getContext() };
					this.store = this.context.store;
					const parentSub = this.context.parentSub;
					this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));
					this.context.parentSub = this.subscription;
				}

				componentDidMount() {
					this.subscription.trySubscribe();
				}

				componentWillUnmount() {
					this.subscription.tryUnsubscribe();
				}

				componentDidUpdate() {
					this.subscription.notifyNestedSubs();
				}

				onStateChange() {
					this.setState({});
				}

				render() {
					const stateProps = mapStateToProps
						? mapStateToProps(this.store.getState(), this.props)
						: {};
					const dispatchProps = mapDispatchToProps
						? mapDispatchToProps(this.store.dispatch, this.props)
						: {};
					const passedProps = {
						...this.props,
						...stateProps,
						...dispatchProps
					};

					return createElement(
						WrappedComponent,
						passedProps
					);
				}
			}

			return Connect;
		};

		return {
			connect: connectHOC,
			Provider,
		};
	})(createElement, Component);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANUVERZUM ANU
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	window.Anu = {
		Anulytics: {
			Provider: AnalyticsProvider,
			trackEvent
		},
		createContext,
		createElement,
		createRef,
		Component,
		Fragment,
		render,
		Feature,
		History,
		Intl,
		Connector,
		ServerAPI,
		store,
		// Utilities
		Async,
		Utils
	};
})();
