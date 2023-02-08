<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> FRAMEWORK USAGE:</h1>

<br>

<h3>@author: <strong>Anubis</strong></h3>
<h3>@license: <strong>MIT</strong></h3>

<br>

<h2>Framework Usage:</h2>

<ul>
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
            <a href="#refs">Refs</a>
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
    </ul>
    <li>
        <a href="#server-api">Calling the server asynchronously - The Server API</a>
    </li>
    <ul>
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

<br>

<h2>Utilities:</h2>

<ul>
    <li>
        <a href="#deep-equal">Deep equality check for objects using Anu.Utils.deepEqual()</a>
    </li>
</ul>

<br>

<h2>Asyncronous Helpers:</h2>

<ul>
    <li>
        <a href="#asynchronous-mapping">Asynchronous mapping through multiple elements using Anu.Async.map()</a>
    </li>
</ul>

<br>
<hr>

<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> USAGE</h1>

<br>

<h2 id="creating-components-and-rendering">Creating components and rendering elements</h2>

Supports both <i>HTML</i> and <i>inline-SVG</i> element creation, "stateful" (or class-based) components and function (currently "stateless") components!<br>
- If you wish to use the SVG <code>&lt;a&gt;</code>, <code>&lt;style&gt;</code> or <code>&lt;title&gt;</code> tags, please use instead <code>&lt;anchor&gt;</code>, <code>&lt;svgStyle&gt;</code> or <code>&lt;svgTitle&gt;</code> respectively)!
- <code>&lt;script&gt;</code> SVG tag is not supported! Please create a separate component for the elements and define their behavior as you would do in case of a regular component!
- When creating <code>&lt;svg&gt;</code> tag, you don't have to define the <code>xmlns</code> attribute. 
- Adding style definition inside <code>&lt;svgStyle&gt;</code> should be done as a string template as <code>children</code>, e.g.:

    ```javascript
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

- Function components are functions which can receive <code>props</code> and must always return either an <i>HTML element</i>, an <i>inline-SVG element</i>, a <i>Component</i> or <code>NULL</code>.
- Both class-based and function component names must start with a capital letter, inline-SVG-s and HTML element names are lower-case!

    ```javascript
    const FunctionComponent = props => {
        // ...
        return (
            <HTMLElement_inlineSVGElement_or_Component />
        );
    };
    ```

    <strong>Example</strong> - <i>returning HTML elements</i>:

    ```javascript
    const MyTitleBar = props => {
        return (
            <div>
                <h1>{props.title}</h1>
            </div>
        );
    };
    ```

    <strong>Example</strong> - <i>returning inline-SVG elements</i>:

    ```javascript
    const MyCircle = () => {
        return (
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
    };
    ```

    <strong>Example</strong> - <i>returning composed elements</i>:

    ```javascript
    const TitleWithCircle = () => {
        return (
            <div>
                <MyTitleBar title="Hello ANUVerzum!" />
                <MyCircle />
            </div>
        );
    };
    ```

<h3 id="class-based-components">Class-based components</h3>

- Always must extend <code>Anu.Component</code>, always must implement <code>render()</code> method!
- If the component receives <code>props</code> and you want to do additional settings inside the constructor (e.g. binding handlers or setting up initial state),
<code>super(props)</code> should always be the first call inside the <code>constructor(props)</code>!
- You can use <code>setState()</code> to re-render the component.
It takes one argument which can be:
    - Object which will be merged with the old state
    - Callback which take the actual <code>state</code> and <code>props</code> as arguments (useful if <code>state</code> and <code>props</code> were updated asynchronously)
- <strong>NEVER</strong> use <code>setState()</code> in <code>constructor()</code> or <code>componentWillUnmount()</code> (can be called in <code>componentDidMount()</code> and <code>componentDidUpdate()</code>, but only in condition - as you would do in React)!

    ```javascript
    class ClassComponent extends Anu.Component {
        constructor(props) {
            super(props);
            // ALWAYS bind methods if passed down to component / HTML element because of "this" keyword:
            this.customMethodName = this.customMethodName.bind(this);
            // Set initial state:
            this.state = { /* ... */ };
        }
        // Lifecycle-methods:
        componentDidMount() {
            /**
             *  - Will be called after mounting - if component is inserted in the tree within this loop
             *  - Call "setState()"
             *  - Set up subscriptions -- Destroy them in "componentWillUnmount()"!
             *  - Instantiate network request (load data)
             */
        }
        componentDidUpdate(prevProps, prevState) {
            /**
             *  - Will be called after mounting - if component is updated within this loop
             *  - Call "setState()" -- Only in condition!
             */
        }
        componentWillUnmount() {
            /**
             *  - Will be called before component is removed from the tree
             *  - Perform necessary cleanup -- destroy subscriptions set in "componentDidMount()"!
             */
        }
        // Custom method:
        customMethodName() {
            /**
             *  - "setState()" can be used.
             *  - Possible params for "setState()":
             *    - partialState -- object | callback -- The new state object or a callback with params "prevState" and "prevProps"
             */
        }
        render() {
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

    ```javascript
    const PropsRenderer1 = props => {
        return <div>{props.children}</div>;
    };
    // Short syntax:
    const PropsRenderer2 = ({ text }) => <p>{text}</p>;
    ```

<h3 id="wrapper-components-and-sub-components">Wrapper components and related sub-components</h3>

- The approach is the following:
    - First, create a wrapper component which will render its <code>props.children</code>, for example.
    - Then, create wrapped / sub-components.
    - Add the sub-component to the wrapper as a property.

        ```javascript
        // Wrapper element
        const ElemWrapper = props => {
            return <div>{props.children}</div>;
        };
        // Sub-component
        const Elem = props => {
            return <p>{props.children}</p>;
        };
        // Adding sub-component to the wrapper component
        ElemWrapper.Elem = Elem;
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

    ```javascript
    const ArrayRenderer = props => {
        return [
            <p>{props.firstParagraph}</p>,
            <p>{props.secondParagraph}</p>,
        ];
    };
    // Usage:
    const ArrayRendererWrapper = props => {
        return (
            <div>
                <ArrayRenderer
                    firstParagraph={props.firstParagraph}
                    secondParagraph={props.secondParagraph}
                />
            </div>
        );
    };
    ```

<h3 id="avoiding-unnecessary-wrapper-elements">Avoiding unnecessary wrapper elements</h3>

- It is useful when you have a list of properties you want to loop through and render them (i.e. not in a nested structure but rather one after the other) but you don't want an extra <code>&lt;div /&gt;</code> element to be rendered.
- When wrapping a list of elements within <code>&lt;Anu.Fragment /&gt;</code>, the System won't wrap it within an extra (and unnecessary) wrapper element, like a <code>&lt;div /&gt;</code>.

    ```javascript
    const ElemList = props => {
        return (
            <Anu.Fragment>
                {props.somethingToLoop.map(prop => <li>{prop}</li>)}
            </Anu.Fragment>
        );
    };
    // Usage:
    const OrderedElemList = () => {
        const somethingToLoop = ['Coffee', 'Tea', 'Pálinka'];
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

    ```javascript
    class RefTestClass extends Anu.Component {
        constructor(props) {
            super(props);
            this.input = Anu.createRef();
        }
        componentDidMount() {
            this.input.current.focus();
        }
        render() {
            return (
                <label>
                    <input ref={this.input} />
                </label>
            );
        }
    }
    ```

    <strong>Example</strong> - <i>file uploader with preview</i>:

    ```javascript
    class FileUploader extends Anu.Component {
        constructor(props) {
            super(props);
            this.fileInput = Anu.createRef();
            this.state = {
                files: []
            };
            this.uploadFiles = this.uploadFiles.bind(this);
            this.handleFileUploaderClick = this.handleFileUploaderClick.bind(this);
        }
        handleFileUploaderClick() {
            this.fileInput.current.click();
        }
        uploadFiles({ target }) {
            const nextState = {
                files: []
            };
            for (let i = 0; i < target.files.length; i++) {
                nextState.files.push({
                    // Creates a name for preview.
                    // Use it as 'src' attribute value in image
                    name: URL.createObjectURL(target.files[i]),
                    file: target.files[i]
                });
            }
            this.setState(nextState);
        }
        render() {
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
                            <li>
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

    ```javascript
    class ClickOutsideComponent exttends Anu.Component {
        constructor(props) {
            super(props);
            this.state = {
                show: true
            };
            this.myRef = Anu.createRef();
            this.handleClickOutside = this.handleClickOutside.bind(this);
        }
        componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
        componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
        handleClickOutside({ target }) {
            if(
                this.myRef.current &&
                !this.myRef.current.contains(target)
            ) {
                this.setState({
                    show: false
                });
            }
        }
        render() {
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

    ```javascript
    const TODO_STATUS = {
        PENDING: 'pending',
        COMPLETED: 'completed'
    };
    class DraggableTodoList extends Anu.Component {
        constructor(props) {
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
        handleDragStart({ dataTransfer }, taskName) {
            dataTransfer.setData('id', taskName);
        }
        handleDragOver(event) {
            event.preventDefault();
        }
        handleDrop({ dataTransfer }, status) {
            const { todoList } = this.state;
            const id = dataTransfer.getData('id');
            const list = todoList.map(task => {
                if (task.name === id) {
                    task.status = status;
                }
                return task;
            });
            this.setState({
                todoList: list
            });
        }
        render() {
            const { todoList } = this.state;
            const todoStatus = {
                [TODO_STATUS.PENDING]: [],
                [TODO_STATUS.COMPLETED]: []
            };
            todoList.forEach(task => {
                todoStatus[task.status].push(
                    <div
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

    ```javascript
    class ScrollComponent extends Anu.Component {
        constructor(props) {
            super(props);
            this.state = {
                photos: [],
                loading: false,
                page: 0,
                prevY: 0
            };
            this.loadingRef = Anu.createRef();
            this.handleObserver = this.handleObserver.bind(this);
            this.getPhotos = this.getPhotos.bind(this);
        }
        getPhotos(page) {
            this.setState({ loading: true });
            Anu
                .ServerAPI
                .get('/app/my/server/url', { page, limit: 10 })
                .then(res => {
                    this.setState({ photos: [...this.state.photos, ...res.data] });
                    this.setState({ loading: false });
                });
        }
        componentDidMount() {
            this.getPhotos(this.state.page);
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0
            };
            this.observer = new IntersectionObserver(
                this.handleObserver,
                options
            );
            this.observer.observe(this.loadingRef);
        }
        handleObserver(entities, observer) {
            const y = entities[0].boundingClientRect.y;
            if (this.state.prevY > y) {
                const lastPhoto = this.state.photos[this.state.photos.length - 1];
                const curPage = lastPhoto.albumId;
                this.getPhotos(curPage);
                this.setState({ page: curPage });
            }
            this.setState({ prevY: y });
        }
        render() {
            const loadingCSS = {
                height: "100px",
                margin: "30px"
            };
            const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
            return (
                <div className="container">
                    <div style={{ minHeight: "800px" }}>
                        {this.state.photos.map(user => (
                            <img src={user.url} height="100px" width="200px" />
                        ))}
                    </div>
                    <div
                        ref={this.loadingRef}
                        style={loadingCSS}
                    >
                    <span style={loadingTextCSS}>Loading...</span>
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

        ```javascript
        const ID = 'root';
        Anu.render(
            <App />,
            document.getElementById(ID)
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

        ```javascript
        const Home = () => <h2>Home</h2>;
        const About = () => <h2>About</h2>;
        const Topic = ({ topicId }) => <h3>{topicId}</h3>;
        const Topics = ({ match }) => {
            const items = [
                { name: 'Rendering with React', slug: 'rendering' },
                { name: 'Components', slug: 'components' },
                { name: 'Props v. State', slug: 'props-v-state' },
            ];
            return (
                <div>
                    <h2>Topics</h2>
                    <ul>
                        {items.map(({ name, slug }) => (
                            <li>
                                <Anu.History.Link to={`${match.url}/${slug}`}>{name}</Anu.History.Link>
                            </li>
                        ))}
                    </ul>
                    {items.map(({ name, slug }) => (
                        <Anu.History.Route path={`${match.path}/${slug}`} render={() => (
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
        const RouterApp = () => {
            return (
                <div>
                    <ul>
                        <li>
                            <Anu.History.Link to="/">Home</Anu.History.Link>
                        </li>
                        <li>
                            <Anu.History.Link to="/about">About</Anu.History.Link>
                        </li>
                        <li>
                            <Anu.History.Link to="/topics">Topics</Anu.History.Link>
                        </li>
                    </ul>
                    <hr />
                    <Anu.History.Route exact path="/" component={Home} />
                    <Anu.History.Route path="/about" component={About} />
                    <Anu.History.Route path="/topics" component={Topics} />
                </div>
            );
        };
        ```

<h3 id="redirecting-with-history-redirect">Redirecting - <strong>The <code>&lt;Anu.History.Redirect /&gt;</code> component</strong></h3>

- If the user needs to be redirected (e.g. if not logged in), use the <code>&lt;Anu.History.Redirect /&gt;</code> component:
    - The <code>&lt;Anu.History.Redirect /&gt;</code> takes a <code>to</code> (URL) and an optional <code>push</code> (boolean) argument.<br>
    This will tell the System to render the component which can be found on the <code>to</code> URL (which is basically an <code>&lt;Anu.History.Route /&gt;</code> which will render the corresponding component).
    If <code>push</code> is present, it will push the URL into the <strong>History API</strong> instead of replacing the current one.

        ```javascript
        const RouteredApp = () => {
            return (
                // ...
                <Anu.History.Route
                    path="/something"
                    render={() => {
                        if(loggedIn) {
                            return <MainPageComponent />;
                        } else {
                            return <Anu.History.Redirect to="/" push />;
                        }
                    }}
                />
            );
        };
        ```

<h3 id="redirecting-with-history-goto">Redirecting from within the code - <strong>The <code>Anu.History.goTo()</code> method</strong></h3>

- If you need to call a route from a function, use the <code>Anu.History.goTo()</code> function.
    - It takes a <code>path</code> string argument.
    If not specified, it will use its default path (<code>'/'</code>).
    - Optionally, it can take a <code>replace</code> boolean argument.
    If set to <code>true</code>, it will replace the current URL. By default, it pushes into the History API.
    - Please only use <code>Anu.History.goTo()</code> if you need to redirect user inside the code based on functionality (like in <code>if</code> statement) for accessibility reasons.

        ```javascript
        // Pushes URL into History API by default
        Anu.History.goTo('/about');
        // Replaces current URL with the 'path' argument in History API
        Anu.History.goTo('/about', true);
        ```

<br>

<h2 id="server-api">Calling the server asynchronously - <strong>The Server API</strong></h2>

The <code>Anu.ServerAPI</code> is basically built on top of <code>Promise</code> and currently has 5 methods <code>get()</code>, <code>post()</code>, <code>put()</code>, <code>delete()</code> and <code>file()</code>.

<h3 id="get-and-delete-methods">The <strong>GET</strong> and <strong>DELETE</strong> HTTP methods</h3>

- The <code>Anu.ServerAPI.get()</code> and <code>Anu.ServerAPI.delete()</code> perform a <strong>GET</strong> or <strong>DELETE</strong> HTTP method respectively to get data from the server or delete a specific data from the server
(usually referenced by an <code>id</code> attribute in both cases but not necessarily when using <strong>GET</strong>).<br>
They are faster than the <strong>POST</strong> or <strong>PUT</strong> HTTP methods but lack the security as well.
- Can take a <code>url</code> (string - <strong>MUST ALWAYS START WITH "<code>/app</code>"!</strong>) and an optional <code>params</code> (object) argument and return a <code>Promise</code> object.
You can send params within the URL <strong>AND/OR</strong> as URI query parameters, e.g.:
        
    ```javascript
    const passedValueForGet = '1234'; // Represents an ID
    const paramsForGet = {
        key: 'value',
        nextKex: 'nextValue'
    };
    Anu
        .ServerAPI
        .get(`/app/my-server-url/${passedValueForGet}`, paramsForGet)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    // In this case, the XHR URL will be: `/app/my/server/url/${passedValueForGet}?key=value&nextKex=nextValue`
    const passedValueForDelete = '1234'; // Represents an ID
    Anu
        .ServerAPI
        .delete(`/app/my-server-url/${passedValueForDelete}`)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    // In this case, the XHR URL will be: `/app/my/server/url/${passedValueForDelete}`
    ```
    
<h3 id="post-and-put-methods">The <strong>POST</strong> and <strong>PUT</strong> HTTP methods</h3>

- The <code>Anu.ServerAPI.post()</code> and <code>Anu.ServerAPI.put()</code> perform an <strong>POST</strong> or <strong>PUT</strong> HTTP method respectively to send large data to the server and optionally get other data back.
- It takes a <code>url</code> (string) and a <code>data</code> (object) argument and returns a <code>Promise</code> object:

    ```javascript
    const dataForPost = { /* ... */ };
    Anu
        .ServerAPI
        .post('/app/my-server-url/', dataForPost)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    const passedValue = '1234'; // Represents an ID
    const dataForPut = { /* ... */ };
    Anu
        .ServerAPI
        .put(`/app/my-server-url/${passedValue}`, dataForPut)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    ```

<h3 id="file-method">The <strong>FILE</strong> HTTP method</h3>

- The <code>Anu.ServerAPI.file()</code> performs a POST HTTP method and encodes one or more files to send them to the server.
- It takes an <code>url</code> (string), a <code>file</code> (one <code>File</code> object or an <strong>ARRAY</strong> of <code>File</code> objects) argument and an optional <code>data</code> (object) and returns a <code>Promise</code> object:

    ```javascript
    const data = { /* ... */ };
    Anu
        .ServerAPI
        .file('/app/my-server-url/', File, data)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    ```

<br>

<h2 id="anulytics-api">Tracking users - <strong>The Anulytics API</strong></h2>

<strong><code>&lt;ANUVerzum /&gt;</code> JS Framework</strong> comes with its built-in analytics tool.<br>
Unlike the most analytics tools, <strong>Anulytics API</strong> is designed to send the collected informations only once: when the user leaves the page (either changing tab, navigating to a different domain or closing the page / browser).<br>
This way, no unnecessary XHR calls are made, which could otherwise negatively impact performance and user experience.
- It has two public interfaces: <code>&lt;Anu.Anulytics.Provider /&gt;</code> and <code>Anu.Anulytics.trackEvent()</code>.
- In order to use the built-in analytics tool, you must wrap all your components you want to track within <code>&lt;Anu.Anulytics.Provider /&gt;</code> component
(without this, you can't use <code>Anu.Anulytics.trackEvent()</code> event tracker functionality).

<h3 id="anulytics-provider">Wrapping up your front-end project within the <code>&lt;Anu.Anulytics.Provider /&gt;</code> component</h3>

- This component is responsible for the aggregation of the collected data and sends it to the server. It can have only one child element.
- Once the user leaves the page or navigates to / focuses on another tab, the component sends the collected data to the user-defined server via HTTP POST method.
- It takes 4 properties:
    - <code>analyticsUrl</code>, which is a string that represents the URL of the server you want to send the data you collected.
    - <code>userData</code> is an object of data about the user.
    Make sure that you ask for permissions from the end-users and build the <code>userData</code> object accordingly in order to stay GDPR-compliant.
    Always ask permission from the end-user, highlighting the types of data you wish to use.
    - <code>onSuccess</code> callback is a custom callback function that will be fired when data transmission ended successfully.
    - <code>onFail</code> callback is a custom callback function that will be fired when data transmission failed.

        ```javascript
        const App = () => (
            <Anu.Anulytics.Provider analyticsUrl={analyticsUrl} userData={userData} onSuccess={handleSuccess} onFail={handleFail}>
                <Your_Site_Goes_Here />
            </Anu.Anulytics.Provider>
        );
        ```

    - The <code>data</code> object sent to the server looks like the following:

        ```javascript
        type Data = {
            events: array<Event>,
            startDate: Date,
            endDate: Date,
            system: {
                referrer: string | null,
                innerWidth: number,
                isMobileAppInstalled: boolean,
                userAgentData: {
                    userAgent: string | array<UserAgent>,
                    mobile: boolean,
                    platform: string | null
                }
            },
            user: User
        };
        ```
    
    - The <code>Event</code> type is an object which <strong>key</strong> attribute is the <strong>type</strong> of the event (a string that represents the event, action type or a link if it was fired by navigation).<br>
    These are the possible event keys <code>'initialization'</code>, <code>'navigation'</code>, <code>'userAction'</code>, <code>'stateChange'</code> or <code>'pageLeave'</code>:
        - <code>'initialization'</code> is always set once the page loaded.
        - <code>'navigation'</code> is set on inner navigation (if user clicks on a <code>&lt;Anu.History.Link /&gt;</code>, the <code>Anu.History.goTo()</code> was called or the user got redirected via <code>&lt;Anu.History.Redirect /&gt;</code>).
        - <code>'userAction'</code> is set when <code>Anu.Anulytics.trackEvent()</code> has been used.<br>
        This is the only public API of <strong>Anulytics API</strong>, typically used for tracking user events (events triggered by user interactions).
        - <code>'stateChange'</code> is automatically called when an <strong>action</strong> gets dispatched.
        - <code>'pageLeave'</code> is always set once the user focuses on another tab or closes the application (i.e.: leaving the current / actual page).

    - The value of the Event object contains three properties: <code>eventType</code>, <code>timestamp</code> and <code>properties</code>:
        - The <code>eventType</code> is a string that represents the event fired (e.g.: a <strong>user event</strong> (mouse event, keyboard event, etc.), a <strong>URI</strong> where the user navigated or an <strong>action type</strong> the user dispatched).
            - Note that the <code>eventType</code> property of <code>'initialization'</code>, <code>'navigation'</code> and <code>'pageLeave'</code> will always be a <strong>URI</strong>!
        - The <code>timestamp</code> is always set: it is the POSIX timestamp of the fired event.
        - The <code>properties</code> can either be an empty object (typically when the event was fired by navigation) or a <code>Property</code> type.
        The <code>properties</code> are typically set when <code>Anu.Anulytics.trackEvent()</code> has been used or an action was dispatched.<br>
        The <code>properties</code> are empty on <code>'initialization'</code>, <code>'navigation'</code> and <code>'pageLeave'</code>.

            ```javascript
            interface Event {
                [key]: { // "key" is always 'initialization', 'navigation', 'userAction', 'stateChange' or 'pageLeave'
                    eventType: UserEvent | ActionType | URI,
                    timestamp: Date,
                    properties: UserActionProperties | StateChangeProperties | {}
                }
            }
            ```

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

            ```javascript
            type UserActionProperties = {
                id: string,
                name: string,
                nodeName: string,
                keyCode: number | null,
                pageX: number,
                pageY: number,
                scrollTop: number,
                scrollLeft: number,
                url: string,
                props: Object | null, // User-defined props, 2nd argument passed to Anu.Anulytics.trackEvent()
                value?: string
            };
            ```
    
    - The <code>StateChangeProperties</code> type can have four properties: <code>url</code>, <code>prevState</code>, <code>action</code> and <code>nextState</code>:
        - The <code>url</code> is the URL of the page that contains the DOM element with the given event handler tracked.
        - The <code>prevState</code> is the global state object before the action was performed.
        - The <code>action</code> is the dispatched action.
        - The <code>nextState</code> is the global state object after the action was performed.

            ```javascript
            type StateChangeProperties {
                url: string,
                prevState: Object,
                action: Object,
                nextState: Object
            }
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

    ```javascript
    const ThemedContext = Anu.createContext({ theme: 'Theme-1' });    // This can be accessed as "context.defaultContext.value.theme"
    ```

<h3 id="usage-of-context-provider-and-consumers">Usage of the context provider and its consumer(s)</h3>

- Context props defined on <code>&lt;ThemedContext.ContextProvider /&gt;</code> can be accessed from within the function child of the <code>&lt;ThemedContext.ContextConsumer /&gt;</code> as <code>context.value</code>.
- Context providers can have multiple context consumer descendents.
- Context consumers can have one function-as-a-child (which takes the <code>context</code> as argument) which must return a valid HTML, inline-SVG element, component (either class-based or function) or <code>null</code>.
- You can have as many elements between the context provider and consumer(s), as you want.<br>
No need to pass the <code>context</code> all the way down within the "props flow"; the function child of the context consumer will have access to it by default.<br>
It allows you to create your "intermediate" components without depending from the <code>context</code> (they don't need to be aware of it if they have nothing to do with it...).
		
    ```javascript
    const ComponentWithContext = () => {
        const theme2 = 'Theme-2';
        return (
            <ThemedContext.ContextProvider theme={theme2}>
                <MyComponent1>
                    { /* Here as many "intermediate" components as you need */ }
                    <MyComponentN>
                        <ThemedContext.ContextConsumer>
                            {context => {       // Function that receives 'context' as argument and returns a valid element or component (or null)
                                const {
                                    value: {
                                        theme
                                    },
                                    defaultContext: {
                                        value: {
                                            theme: defaultTheme
                                        }
                                    }
                                } = context;
                                return (
                                    <Anu.Fragment>
                                        <span>{theme}</span>
                                        <span>{defaultTheme}</span>
                                    </Anu.Fragment>
                                );
                            }}
                        </ThemedContext.ContextConsumer>
                    </MyComponentN>
                </MyComponent1>
            </ThemedContext.ContextProvider>
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

            ```javascript
            // Simple action creator:
            const myActionCreator = passedProps => {
                return {
                    type,               // Must have!
                    payload: {
                        passedProps
                };
            };
            // Async action creator - requires middleware:
            const myAsyncActionCreator = value => (dispatch, getState) => {
                // call a function that dispatches action(s) or returning a promise
            };
            ```
                
            <strong>Example</strong> - <i>creating a "simple" action creator</i>:

            ```javascript
            // Action type:
            const mySimpleActionTypes = {
                ACTION: 'MY_SIMPLE_ACTION'
            };
            // Action creator:
            const mySimpleActionCreator = param => ({
                type: mySimpleActionTypes.ACTION,
                payload: {
                    param
                }
            });
            ```

            <strong>Example</strong> - <i>creating an "asynchronous" action creator</i>:

            ```javascript
            // Action type:
            const myAsyncActionTypes = {
                PENDING: 'MY_PENDING_ACTION',
                FULFILLED: 'MY_FULFILLED_ACTION',
                REJECTED: 'MY_REJECTED_ACTION',
            };
            // Async action creator:
            const myAsyncActionCreator = value => dispatch => {
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

    ```javascript
    // Initial state:
    const initialStateForMyReducer1 = { statePart: { part1 = defaultValue } };
    // Reducer:
    const myReducer1 = (state = initialStateForMyReducer1, action) => {
        switch(action.type) {
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

    ```javascript	
    const defaultState = { /* ... */ };
    const myReducerForSimpleActionCreator = (state = defaultState, { type, payload }) => {
        switch(type) {
            case mySimpleActionTypes.ACTION: {
                const { param } = payload;
                return {
                    ...state,
                    param
                };
            }
            case myAsyncActionTypes.PENDING: {
                return {
                    ...state,
                    status: 'PENDING'
                };
            }
            case myAsyncActionTypes.FULFILLED: {
                const { response } = payload;
                return {
                    ...state,
                    status: 'FULFILLED',
                    data: response,
                    errorCode: null
                };
            }
            case myAsyncActionTypes.REJECTED: {
                const { status } = payload;
                return {
                    ...state,
                    status: 'REJECTED',
                    data: null,
                    errorCode: status
                };
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
    - Its first argument is an array of "getter" functions which will return the desired slice of the global state object.
    These functions must always return something.
    - The second argument is a "handler" function which take as many arguments as many "getter" functions you defined; these arguments are the return values of the "getter" functions.
    Their number and order is the same as of the "getters" within the first (array) argument of the <code>Anu.store.createSelector()</code>.

        ```javascript
        // Getter functions:
        const functionThatGetsSomePartOfState1 = state => {
            return state[part1];
        };
        // ...
        const functionThatGetsSomePartOfStateN = state => {
            return state[partN];
        };
        // Store the getters within an array (this will be the first argument of the selector):
        const getters = [
            functionThatGetsSomePartOfState1,
            // ...
            functionThatGetsSomePartOfStateN
        ];
        // Define the second (function) argument of the selector:
        const handler = (
            partOfTheState1,
            // ...
            partOfTheStateN
        ) => {
            // Do something using the
            return somethingDerivedFromStatePartsParams;
        };
        // Selector:
        const mySelector = Anu.store.createSelector(getters, handler);
        ```

<h3 id="combining-reducers">Combining reducers</h3>

- You can combine multiple reducers using the <code>Anu.store.combineReducers()</code> if you need a more complex state shape:
    - The function receives one (object) argument - the "key" of the item will be the name of the corresponding state-part, the "value" is the reducer you want to add to the combined reducer.
	- <code>Anu.store.combineReducers()</code> can be used multiple times in the application.

        ```javascript
        const combinedReducer = Anu.store.combineReducers({
            myStatePart1: myReducer1,
            // ...
            myStatePartN: myReducerN
        });
        ```
    
    - It also makes sense to create an initial state description (where you can reuse the initial states related to the reducers you just combined).
    - The "key" of this object must match with the corresponding "key" you used within the combined reducer, the "value" is the initial state (the one you (possibly) used for the "single" reducer).
    It is not mandatory however, it comes handy when your state object becomes large and complex:

        ```javascript
        const initialState = {
            myStatePart1: myStatePart1
            // ...
            myStatePartN: myStatePartN
        };
        ```
	
<h3 id="creating-the-store">Creating the store</h3>

- The store object stores the global state object (that can be reached using the <code>store.getState()</code> methiod) and it also has the <code>store.dispatch()</code>, <code>store.subscribe()</code> and <code>store.unsubscribe()</code> methods.
You will likely use the <code>store.getState()</code> and <code>store.dispatch()</code> methods only because subscribing and unsubscribing functionalities are "wired" into the <code>&lt;Anu.Connector.Provider /&gt;</code> and the "connedted"
(also known as "container") component(s) created by using the <code>Anu.Connector.connect()</code> - see <a href="#connector-api">Connecting components to the global state - The Connector API</a> section.
- Create a store object using <code>Anu.store.createStore()</code>:
    - The first argument is the <code>rootReducer</code> which is always needed (can be either a "single" reducer or a combination of ("single" and/or combined) reducers),
    - The second <code>initialState</code> argument is optional however, if you don't use it, the initial state will be <code>undefined</code>.
    This argument is useful if you want to have initialized values for your application before dispatching your first action.
    - The third argument is optional, you can use it if you want to apply middleware functionalities like dispatching asynchronous actions (e.g. AJAX calls or delayed calls). 
    In this case, the built-in <code>Anu.store.middleware.applyMiddleware()</code> can be passed:
        - It can take any numbers of callbacks (even zero) those will run on every actions dispatched.
        - There are 2 built-in callbacks you can use out-of-the-box:
            - The <code>Anu.store.middleware.loggingMiddleware()</code> is a logger; it comes handy when in development mode,
            - The <code>Anu.store.middleware.thunkMiddleware()</code> enables you to use asynchronous action creators (those returning functions instead of objects) as well.

                ```javascript
                // Assuming that the 'rootReducer' is the 'combinedReducer' created before:
                const rootReducer = combinedReducer; 
                // If you don't use middleware (i.e. you don't need to handle asynchronous calls):
                const syncStore = Anu.store.createStore(rootReducer, initialState);
                // Otherwise, if you wish handle asynchronous calls, like AJAX requests:
                const asyncStore = Anu.store.createStore(
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

    ```javascript
    class App extends Anu.Component {
        render() {
            return (
                <Anu.Connector.Provider store={store}>
                    <Your_Page />
                </Anu.Connector.Provider>
            );
        }
    };
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

            ```javascript
            // Create function component:
            const WrappedComponent = props => {
                return (
                    <Component_to_render />
                );
            };
            // Or class component:
            class WrappedComponent extends Anu.Component {
                render() {
                    return (
                        <Component_to_render />
                    );
                }
            };
            const mapStateToProps = (state, ownProps) => {
                const { statePart1 } = state;          // Extracting part from global state

                return {
                    propName1: statePart1,
                    // ...
                    propNameN: mySelector(state),      // Using selector to derive some parts of the global state - see 'Store API' section
                    {...ownProps}
                };
            };
            const mapDispatchToProps = (dispatch, ownProps) => { 
                return {
                    dispatcherPropName1: ({ ...passedProps }) => dispatch(myActionCreator1(passedProps)),
                    // ...
                    dispatcherPropNameN: ({ ...passedProps }) => dispatch(myActionCreatorN(passedProps))
                };
            };
            // Connect:
            const ContainerComponent = Anu.Connector.connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
            ```

<br>

<h2 id="intl-api">Supporting multiple languages - <strong>The Intl API</strong></h2>

The basic concept behind the <strong>Intl API</strong> is that you define different JSON objects for each languages you support in your application and
you refer to the text-part you need.
- Use the <code>&lt;Anu.Intl.Provider /&gt;</code> to set the supported language files for your "static texts" (no end-user-entered texts will be translated...) and the set the selected language in your app.
- Then, use the <code>&lt;Anu.Intl.formattedMessage /&gt;</code> to place the text on the selected language referred by the <code>id</code> property.
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

    ```javascript
    const messages_hu = {
        'app.title': 'Üdvözöllek!',
        'app.description': 'Örülök, hogy újra itt vagy, {name}!',
        'app.search.placeholder1': 'Ide írd be a keresett kulcsszót!'
        'app.search.placeholder2': 'Kedves {name}, ide írd be a keresett kulcsszót!'
    };
    const messages_en = {
        'app.title': 'Welcome!',
        'app.description': 'I\'m glad that you are here again, {name}!', // 'name' is a placeholder
        'app.search.placeholder1': 'Type search keyword here!'
        'app.search.placeholder2': 'Dear {name}, type search keyword here!'
    };
    const messages = {
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

        ```javascript
        // This will use the first 2 letters of the language set in browser settings (e.g.: "en", "it", "hu", ...):
        const locale = navigator.language.split(/[-_]/)[0];
        const messages = { /* ... */ };
        const LocaleContainer = () => {
            return (
                <Anu.Intl.Provider messages={messages} locale={locale} defaultLocale="hu">
                    <Your_page />
                </Anu.Intl.Provider>
            );
        };
        ```
    
<h3 id="formatting-component-texts">Formatting component texts</h3>

- Use <code>&lt;Anu.Intl.FormattedMessage /&gt;</code> for the specific text (referred by <code>id</code> property) - if used as a rendered element:
    - The first, required argument is the <code>id</code> property which is the key of the text in the user-defined language objects.
    - It can take an optional <code>values</code> property which is an object:
        - The key property must match the placeholder you want to replace with your dynamic value within the text inside your language object you refer (i.e. wrapped between <code>{</code> and <code>}</code>).
        - The value is what should be used to replace the placeholder.

            ```javascript
            const ComponentWithFormattedMessages = () => {
                const name = "Anubis"
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

        ```javascript
        const ComponentWithFormatMessageFunctionCall = () => {
            return [
                <input placeholder={Anu.Intl.formatMessage('app.search.placeholder1', null, 'Search...')} />,
                <input placeholder={Anu.Intl.formatMessage('app.search.placeholder2', { name: 'Anubis' }, 'Search...')} />
            ];
        };
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

            ```javascript
            // Usage with default options:
            Anu.Intl.abbreviateNumber(value);
            // Usage with custom options:
            Anu.Intl.abbreviateNumber(value, option);
            ```

            <strong>Example</strong> - <i>abbreviating a number using default (built-in) options</i>:

            ```javascript
            Anu.Intl.abbreviateNumber(10000000000):              // 10B
            Anu.Intl.abbreviateNumber(100000000000):             // 100B
            Anu.Intl.abbreviateNumber(1000000000000):            // 1T
            Anu.Intl.abbreviateNumber(-10000000):                // -10M
            Anu.Intl.abbreviateNumber(-10000):                   // -10K
            Anu.Intl.abbreviateNumber(-10234):                   // -10.23K
            ```

            <strong>Example</strong> - <i>abbreviating with custom options</i>:

            ```javascript
            const option = {
                units: [' E.', ' Mio.', ' Mrd.', ' T.'],         // The abbreviations to use (for each 3 digits, starting with the first element)
                decimalPlaces: 3,                                // How many decimal digits to preserve
                decimalSign: ','                                 // Replace the default decimal sign (.) with a comma (,)
            };
            Anu.Intl.abbreviateNumber(10000000000, option):      // 10 Mrd.
            Anu.Intl.abbreviateNumber(100000000000, option):     // 100 Mrd.
            Anu.Intl.abbreviateNumber(1000000000000, option):    // 1 T.
            Anu.Intl.abbreviateNumber(-10000000, option):        // -10 Mio.
            Anu.Intl.abbreviateNumber(-10000, option):           // -10 E.
            Anu.Intl.abbreviateNumber(-10234, option):           // -10,234 E.
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

        ```javascript
        const myFeaturesList = { myFeature: true };
        const FeaturesWrapper = () => {
            return (
                <Anu.Feature.Provider features={myFeaturesList}>
                    <Your_page />
                </<Anu.Feature.Provider>
            );
        };
        ```

<h3 id="toggling-features">Toggling the features</h3>

- Wrap your component you want to render if the desired feature is set to <code>true</code> within <code>&lt;Anu.Feature.Toggle /&gt;</code>.
    - It takes a <code>name</code> (string) property which should match with the name of the feature you added to the provider component.
    If this property you refer with the value of the <code>name</code> attribute evaluates as true, the wrapped component can be rendered.
    - You can also set an optional <code>defaultComponent</code>.
    This will be rendered if the <code>name</code> evaluates as "falsy" (i.e.: either you set it to <code>false</code> or it wasn't even specified).
    If <code>defaultComponent</code> is not set, <code>null</code> will be rendered instead.

        ```javascript
        const ComponentWithFeatureToggle = () => {
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

<h2 id="deep-equal">Deep equality check for objects using <code>Anu.utils.deepEqual()</code></h2>

- The <code>Anu.utils.deepEqual()</code> is a deep equality check utility that can check nested and complex objects if their structure and properties match (even if their references don't).

    ```javascript
    const obj1 = {
        prop1: 'asdf',
        prop2: true,
        prop3: {
            prop3_1: 'asdfasdf',
            prop3_2: [{
                itemProp1: 'item'
            }]
        }
    };
    const obj2 = {
        prop1: 'asdf',
        prop2: true,
        prop3: {
            prop3_1: 'asdfasdf',
            prop3_2: [{
                itemProp1: 'item'
            }]
        }
    };
    const answer = Anu.utils.deepEqual(obj1, obj2); // true
    ```

<br>
<hr>

<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> ASYNCRONOUS HELPERS:</h1>

<br>

<h2 id="asynchronous-mapping">Asynchronous mapping through multiple elements using <code>Anu.Async.map()</code></h2>

- Asyncronous utilities are useful functionalities to handle result(s) of asyncronous queries, like XHR calls.<br>
There is an asyncronous helper function bundled within <strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> <code>Anu.Async.map()</code>
- The <code>Anu.Async.map()</code> function is designed to loop through an array of <code>elemList</code> and execute an <code>iterator</code> on each element asynchronously.<br>
After <code>iterator</code> ran on each element in <code>elemList</code>, the <code>resolveCallback</code> function is called which takes <code>results</code> as an argument:
    - The first argument is <code>elemlist</code>: an array of elements on which we want to iterate.
    - The second argument (the first callback) is the <code>iterator</code> that should be called for all elements in <code>elemList</code> (argument: element of <code>elemList</code>).
    - The third argument (second callback) is the <code>resolveCallback</code> that takes the list of modified elements returned by <code>iterator</code> calls (argument: array of modified elements).

        ```javascript
        const elemList = [ /* elem1, elem2, elem3, ... */ ];
        const iterator = element => {
            // do something with each "element" one-by-one and then, return (modified) "element"
            return element;
        };
        const resolveCallback = results => {
            // do something with the results (array of "element" -s)
        }
        Anu.Async.map(elemList, iterator, resolveCallback);
        ```

<br>
<hr>
