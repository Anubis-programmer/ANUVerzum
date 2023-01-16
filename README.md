<h1><strong><code>&lt;ANUVerzum /&gt;</code> JS</strong> FRAMEWORK USAGE:</h1>

### ***@author: **Anubis*****
### ***@license: **MIT*****

<br>

Supports *both HTML and inline-SVG element creation*, "stateful" (or class-based) components and function (currently "stateless") components!<br>
- If you wish to use the SVG **`<a>`**, **`<style>`** or **`<title>`** tags, please use instead **`<anchor>`**, **`<svgStyle>`** or **`<svgTitle>`** respectively)!
- **`<script>`** SVG tag is not supported! Please create a separate component for the elements and define their behavior as you would do in case of a regular component!
- When creating `<svg>` tag, you don't have to define the `xmlns` attribute. 
- Adding style definition inside `<svgStyle>` should be done as a string template as `children`, e.g.:

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

<br>

<h2>Table of contents:</h2>

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
</ul>

<br>
<hr>
<br>

<h2 id="creating-components-and-rendering">Creating components and rendering elements</h2>

<h3 id="function-components">Function components</h3>

- Function components are functions which can receive `props` and must always return either an *HTML element*, an *inline-SVG element*, a *component* or *NULL*.
- Both class-based and function component names must start with a capital letter, inline-SVG-s and HTML element names are lower-case!

    ```javascript
    const FunctionComponent = props => {
        // ...
        return (
            <HTMLElement_inlineSVGElement_or_Component />
        );
    };
    ```

    ***Example - _returning HTML elements_***:

    ```javascript
    const MyTitleBar = props => {
        return (
            <div>
                <h1>{props.title}</h1>
            </div>
        );
    };
    ```

    ***Example - _returning inline-SVG elements_***:

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

    ***Example - _returning composed elements_***:

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

- Always must extend `Anu.Component`, always must implement `render()` method!
- If the component receives `props` and you want to do additional settings inside the constructor (e.g. binding handlers or setting up initial state),
`super(props)` should always be the first call inside the `constructor(props)`!
- You can use `setState()` to re-render the component.
It takes one argument which can be:
    - Object which will be merged with the old state
    - Callback which take the actual `state` and `props` as arguments (useful if `state` and `props` were updated asynchronously)
- _NEVER_ use `setState()` in `constructor()` or `componentWillUnmount()` (can be called in `componentDidMount()` and `componentDidUpdate()`, but only in condition - as you would do in React)!

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
    - First, create a wrapper component which will render its `props.children`, for example.
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

- It is useful when you have a list of properties you want to loop through and render them (i.e. not in a nested structure but rather one after the other) but you don't want an extra `div` element to be rendered.
- When wrapping a list of elements within `<Anu.Fragment />`, the System won't wrap it within an extra (and unnecessary) wrapper element (like a `div`).

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
- Refs can ONLY BE CREATED IN CLASS COMPONENTS but can be passed as prop - use different name then!
- Set "ref" attribute/property ONLY ON HOST COMPONENT!

    ***Example - _focusing an input element_***:

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

    ***Example - _file uploader with preview_***:

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

    ***Example - _handling `onClick` event outside of the referenced element_***:

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

    ***Example - _drag-and-drop todo list_***:

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

    ***Example - _infinite scroll_***:

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
                .get('my/server/url', { page, limit: 10 })
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

- Select an existing HTML element (typically having `ID` as "root" or "app") and use the `Anu.render()` method which takes two arguments:
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

- You can use `<Anu.History.Link />` elements those work just like "normal" links but without the reload of the page:
    - The `<Anu.History.Link />` element has a `to` prop. When clicking on it, its `to` prop will be matched against the `path` prop of `<Anu.History.Route />`.
- Use the `<Anu.History.Route />` component that takes a `path` argument and if the link you clicked matches the `path`, it will render the attached component:
    - The `<Anu.History.Route />` component has a `path` prop to match against the URL. If it has an `exact` prop, it doesn't allow partial matching.
    - The `<Anu.History.Route />` can also have a `component` (must be a component) or a `render` prop (it must be a function that returns a component).

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

- If the user needs to be redirected (e.g. if not logged in), use the `<Anu.History.Redirect />` component:
    - The `<Anu.History.Redirect />` takes a `to` (URL) and an optional `push` (boolean) argument.
    This will tell the System to render the component which can be found on the `to` URL (which is basically an `<Anu.History.Route />` which will render the corresponding component).
    If `push` is present, it will push the URL into the History API instead of replacing the current one.

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

- If you need to call a route from a function, use the `Anu.History.goTo()` function.
    - It takes a `path` string argument.
    If not specified, it will use its default path (`'/'`).
    - Optionally, it can take a `replace` boolean argument.
    If set to `true`, it will replace the current URL. By default, it pushes into the History API.
    - Please only use `Anu.History.goTo()` if you need to redirect user inside the code based on functionality (like in `if` statement) for accessibility reasons.

        ```javascript
        // Pushes URL into History API by default
        Anu.History.goTo('/about');
        // Replaces current URL with the 'path' argument in History API
        Anu.History.goTo('/about', true);
        ```

<br>

<h2 id="server-api">Calling the server asynchronously - <strong>The Server API</strong></h2>

The `Anu.ServerAPI` is basically built on top of `Anu.utils.Async.Promise` and currently has 5 methods `get()`, `post()`, `put()`, `delete()` and `file()`.

<h3 id="get-and-delete-methods">The <code>GET</code> and <code>DELETE</code> HTTP methods</h3>

- The `Anu.ServerAPI.get()` and `Anu.ServerAPI.delete()` perform a ***GET*** or ***DELETE*** HTTP method respectively to get data from the server or delete a specific data from the server
(usually referenced by an _ID_ attribute in both cases but not necessarily when using ***GET***).
They are faster than the ***POST*** or ***PUT*** HTTP methods but lack the security as well.
- Can take a `url` (string - must always start with "`/app`"!) and an optional `params` (object) argument and return an `Anu.utils.Async.Promise` object.
You can send params within the URL ***AND/OR*** as URI query parameters, e.g.:
        
    ```javascript
    const passedValueForGet = '1234'; // Represents an ID
    const paramsForGet = {
        key: 'value',
        nextKex: 'nextValue'
    };
    Anu
        .ServerAPI
        .get(`/my-server-url/${passedValueForGet}`, paramsForGet)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    // In this case, the XHR URL will be: `my/server/url/${passedValueForGet}?key=value&nextKex=nextValue`
    const passedValueForDelete = '1234'; // Represents an ID
    Anu
        .ServerAPI
        .delete(`/my-server-url/${passedValueForDelete}`)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    // In this case, the XHR URL will be: `my/server/url/${passedValueForDelete}`
    ```
    
<h3 id="post-and-put-methods">The <code>POST</code> and <code>PUT</code> HTTP methods</h3>

- The `Anu.ServerAPI.post()` and `Anu.ServerAPI.put()` perform an ***POST*** or ***PUT*** HTTP method respectively to send large data to the server and optionally get other data back.
- It takes a `url` (string) and a `data` (object) argument and returns an `Anu.utils.Async.Promise` object:

    ```javascript
    const dataForPost = { /* ... */ };
    Anu
        .ServerAPI
        .post('/my-server-url/', dataForPost)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    const passedValue = '1234'; // Represents an ID
    const dataForPut = { /* ... */ };
    Anu
        .ServerAPI
        .put(`/my-server-url/${passedValue}`, dataForPut)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    ```

<h3 id="file-method">The <code>FILE</code> HTTP method</h3>

- The `Anu.ServerAPI.file()` performs a POST HTTP method and encodes one or more files to send them to the server.
- It takes an `url` (string), a `file` (one `File` object or an ***array*** of `File` objects) argument and an optional `data` (object) and returns an `Anu.utils.Async.Promise` object:

    ```javascript
    const data = { /* ... */ };
    Anu
        .ServerAPI
        .file('/my-server-url/', File, data)
        .then(({ response }) => { /* ... */ })
        .catch(({ status }) => { /* ... */ });
    ```

<br>

<h2 id="anulytics-api">Tracking users - <strong>The Anulytics API</strong></h2>

- ***`<ANUVerzum />` JS Framework*** comes with its built-in analytics tool.
- Unlike the most analytics tools, ***Anulytics API*** is designed to send the collected informations only once: when the user leaves the page (either changing tab, navigating to a different domain or closing the page / browser).
This way, no unnecessary XHR calls are made, which could otherwise negatively impact performance and user experience.
- It has two public interfaces: `<Anu.Anulytics.Provider />` and `Anu.Anulytics.trackEvent()`.
- In order to use the built-in analytics tool, you must wrap all your components you want to track within `<Anu.Anulytics.Provider />` component
(without this, you can't use `Anu.Anulytics.trackEvent()` event tracker functionality).

<h3 id="anulytics-provider">Wrapping up your front-end project within the <code>&lt;Anu.Anulytics.Provider /&gt;</code> component</h3>

- This component is responsible for the aggregation of the collected data and sends it to the server. It can have only one child element.
- Once the user leaves the page or navigates to / focuses on another tab, the component sends the collected data to the user-defined server via HTTP POST method.
- It takes 4 properties:
    - `analyticsUrl`, which is a string that represents the URL of the server you want to send the data you collected.
    - `userData` is an object of data about the user.
    Make sure that you ask for permissions from the end-users and build the `userData` object accordingly in order to stay GDPR-compliant.
    Always ask permission from the end-user, highlighting the types of data you wish to use.
    - `onSuccess` callback is a custom callback function that will be fired when data transmission ended successfully.
    - `onFail` callback is a custom callback function that will be fired when data transmission failed.

        ```javascript
        const App = () => (
            <Anu.Anulytics.Provider analyticsUrl={analyticsUrl} userData={userData} onSuccess={handleSuccess} onFail={handleFail}>
                <Your_Site_Goes_Here />
            </Anu.Anulytics.Provider>
        );
        ```

    - The `data` object sent to the server looks like the following:

        ```javascript
        {
            events: array<Event>,
            startDate: Date,
            endDate: Date,
            system: {
                referrer: string | null,
                innerWidth: number,
                isMobileAppInstalled: boolean,
                userAgentData: {
                    userAgent: string | array<UserAgent>
                    mobile: boolean,
                    platform: string | null
                }
            },
            user: User
        }
        ```
    
    - The `Event` type is an object which ***key attribute*** is the ***name of the event*** (a string that represents the event, action type or a link if it was fired by navigation).
    The value of the Event object contains three properties: `eventType`, `timestamp` and `properties`:
        - The `eventType` is a string that is always set.
        It can have the following values: `'initialization'`, `'navigation'`, `'userAction'`, `'stateChange'` or `'pageLeave'`:
            - `'initialization'` is always set once the page loaded.
            - `'pageLeave'` is always set once the user focuses on another tab or closes the application (i.e.: leaving the current / actual page).
            - `'navigation'` is set on inner navigation (if user clicks on a `<Anu.History.Link />`, the `Anu.History.goTo()` was called or the user got redirected via `<Anu.History.Redirect />`).
            - `'userAction'` is set when `Anu.Anulytics.trackEvent()` has been used.
                - This is the only public API of ***Anulytics API***
            - `'stateChange'` is automatically called when an **action** gets dispatched.
        - The `timestamp` is always set: it is the POSIX timestamp of the fired event.
        - The `properties` can either be an empty object (typically when the event was fired by navigation) or a `Property` type.
        The `properties` are typically set when `Anu.Anulytics.trackEvent()` has been used.

            ```javascript
            type Event {
                [name]: {
                    eventType: 'initialization' | 'navigation' | 'userAction' | 'stateChange' | 'pageLeave',
                    timestamp: Date,
                    properties: UserActionProperties | StateChangeProperties | {}
                }
            }
            ```

    - The `UserActionProperties` type can have various properties, like `id`, `name`, `url` and `value`:
        - The `id` is the value of the ID attribute of the DOM element with the given event handler tracked: `event.target.id` (optional but ***highly recommended*** to set).
        - The `name` is the value of the name attribute of the DOM element with the given event handler tracked: `event.target.name` (optional but ***highly recommended*** to set).
        - The `nodeName` is the name of the DOM node with the given event handler tracked: `event.target.nodeName`.
        - The `keyCode` is the ASCII code of the key pressed (if the given element is a keyboard event, like `keyup`) or null.
        - The `value` is the value of the DOM element with the given event handler tracked: `event.target.value`.
        - The `pageX` is the X-coordinate of the mouse position from the left side of the ***page***: `event.pageX`.
        - The `pageY` is the Y-coordinate of the mouse position from the top of the ***page***: `event.pageY`.
        - The `scrollTop` is the amount the user scrolled from the top of the ***page***.
        - The `scrollLeft` is the amount the user scrolled from the left side of the ***page***.
        - The `url` is the URL of the page that contains the DOM element with the given event handler tracked.

            ```javascript
            type UserActionProperties {
                id: string,
                name: string,
                nodeName: string,
                keyCode: number | null,
                value: string,
                pageX: number,
				pageY: number,
                scrollTop: number,
                scrollLeft: number,
                url: string,
                passedProps: object | null
            }
            ```
    
    - The `StateChangeProperties` type can have four properties: `url`, `prevState`, `action` and `nextState`:
        - The `url` is the URL of the page that contains the DOM element with the given event handler tracked.
        - The `prevState` is the global state object before the action was performed.
        - The `action` is the dispatched action.
        - The `nextState` is the global state object after the action was performed.

            ```javascript
            type UserActionProperties {
                url: string,
                prevState: Object,
                action: Object,
                nextState: Object
            }
            ```
    
    - The `User` type is an object of the developer choice.
    If not provided, an empty object will be passed.

<h3 id="anulytics-track-event">Tracking events on elements using <code>Anu.Anulytics.trackEvent(event, props)</code></h3>

- ***Anulytics API*** tracks visited links within the application out of the box.
If you want to track additional elements, call `Anu.Anulytics.trackEvent(event, props)` method inside the event handler.
- It takes two arguments:
    - The `event` object is always needed because this object contains required information to track.
    - The `props` is optional: either an object (not an array) or null. 

<br>

## Creating and accessing the context out of the "normal props flow" - ***The Context API***:

### ***Creating the context:***

- To create a context provider and context consumer elements with default context, call the `Anu.createContext()`.
It takes a `context` argument which can be reached later as `context.defaultContext.value` and returns a context provider and consumer:

    ```javascript
    const ThemedContext = Anu.createContext({ theme: 'Theme-1' });    // This can be accessed as "context.defaultContext.value.theme"
    ```

### ***Usage of the context provider and its consumer(s):***

- Context props defined on `<ThemedContext.ContextProvider />` can be accessed from within the function child of the `<ThemedContext.ContextConsumer />` as `context.value`.
- Context providers can have multiple context consumer descendents.
- Context consumers can have one function-as-a-child (which takes the `context` as argument) which must return a valid HTML, inline-SVG element, component (either class-based or function) or `null`.
- You can have as many elements between the context provider and consumer(s), as you want.
No need to pass the `context` all the way down within the "props flow"; the function child of the context consumer will have access to it by default.
It allows you to create your "intermediate" components without depending from the `context` (they don't need to be aware of it if they have nothing to do with it...).
		
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
<hr>
<br>

## The next APIs (`Anu.Connector.connect()` and `<Anu.Connector.Provider />`; `<Anu.Intl.Provider />`, `<Anu.Intl.FormattedMessage />`, `Anu.Intl.formatMessage()` and `Anu.Intl.abbreviateNumber()`; `<Anu.Feature.Provider />` and `<Anu.Feature.Toggle />`) are strongly relying on the Context API ##

<br>
<hr>
<br>

##  Storing and mutating the global state on actions dispatched, memoizing complex conversions on the global state and combining reducers - ***The Store API***:

### ***Dispatching actions:***

- Create action creator functions (returns an object) or asynchronous action creator functions (returns a function) to dispatch action(s):
    - To create a synchronous action creator, simply create a function that returns an object.
    You *MUST* specify its `type` member - the reducer will react when an action with this type was dispatched.
    - If you create asynchronous action creator as well, then remember, the action creator should return a *function* instead of an object (in this case, you *MUST* use a middleware - see "**Creating the store**" section):
        - The outermost function will take whatever we pass to it
        - That returned function takes 2 arguments: `dispatch` and `getState`
        - Here. you can do additional things (like getting out a value from the state using `getState()` or dispatching an action using `dispatch()`) before returning the final payload (most likely an AJAX request).

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
                
            ***Example - _creating a "simple" action creator_***:

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

            ***Example - _creating an "asynchronous" action creator_***:

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
                    .get(`/my/server/url/${value}`)
                    .then(({ response }) => dispatch({ type: myAsyncActionTypes.FULFILLED, payload: { response } }))
                    .catch(({ status }) => dispatch({ type: myAsyncActionTypes.REJECTED, payload: { status } }));
            };
            ```

### ***Handling actions with reducers:***

- Note that if it is added to the rootReducer, it will represent that "sub-tree" of the state so,
it should return that part, with the updated desired values:
- Note that the relationship between actions and reducers is M:N!

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

    ***Example - _handling the previous actions_***:

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

### ***Memoizing global state conversions:***

- Selectors are memoized functions which come handy if you need to do expensive calculations or conversions on the global state.
- To create selector, use the `Anu.store.createSelector()` (it comes handy in `mapStateToProps()` - see "**Connecting components to the global state - ***The Connector API*****" section):
    - Its first argument is an array of "getter" functions which will return the desired slice of the global state object.
    These functions must always return something.
    - The second argument is a "handler" function which take as many arguments as many "getter" functions you defined; these arguments are the return values of the "getter" functions.
    Their number and order is the same as of the "getters" within the first (array) argument of the `Anu.store.createSelector()`.

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

### ***Combining reducers:***

- You can combine multiple reducers using the `Anu.store.combineReducers()` if you need a more complex state shape:
    - The function receives one (object) argument - the "key" of the item will be the name of the corresponding state-part, the "value" is the reducer you want to add to the combined reducer.
	- `Anu.store.combineReducers()` can be used multiple times in the application.

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
	
### ***Creating the store:***

- The store object stores the global state object (that can be reached using the `store.getState()` methiod) and it also has the `store.dispatch()`, `store.subscribe()` and `store.unsubscribe()` methods.
You will likely use the `store.getState()` and `store.dispatch()` methods only because subscribing and unsubscribing functionalities are "wired" into the `<Anu.Connector.Provider />` and the "connedted"
(also known as "container") component(s) created by using the `Anu.Connector.connect()` - see "**Connecting components to the global state - ***The Connector API*****" section.
- Create a store object using `Anu.store.createStore()`:
    - The first argument is the `rootReducer` which is always needed (can be either a "single" reducer or a combination of ("single" and/or combined) reducers),
    - The second `initialState` argument is optional however, if you don't use it, the initial state will be `undefined`.
    This argument is useful if you want to have initialized values for your application before dispatching your first action.
    - The third argument is optional, you can use it if you want to apply middleware functionalities like dispatching asynchronous actions (e.g. AJAX calls or delayed calls). 
    In this case, the built-in `Anu.store.middleware.applyMiddleware()` can be passed:
        - It can take any numbers of callbacks (even zero) those will run on every actions dispatched.
        - There are 2 built-in callbacks you can use out-of-the-box:
            - The `Anu.store.middleware.loggingMiddleware()` is a logger; it comes handy when in development mode,
            - The `Anu.store.middleware.thunkMiddleware()` enables you to use asynchronous action creators (those returning functions instead of objects) as well.

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

## Connecting components to the global state - ***The Connector API***:

- This API is designed to connect your global store with elements within the presentation layer.

### ***Connect to the store:***

- Wrap the outermost component (this should contain all your "container" components - see "**Create container component**" section) within `<Anu.Connector.Provider />` and pass the store object:

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

### ***Create container component:***

- To connect your "container" component to the global store, simply define a component (either a function or class-based) you want to connect.
It is a "curried function" (a function returns a function, also known as "high-order function" (HOF)).
The first function takes two arguments: the `mapStateToProps()` and `mapDispatchToProps()`, the second one takes the wrapped component.
- Be aware that the props of wrapped component are the combination of the props passed to the (outer) component (i.e. when rendering in the return statement) and those returned by `mapStateToProps()` and `mapDispatchToProps()`!
- Define maximum two functions (they are typically called `mapStateToProps()` and `mapDispatchToProps()`; if either one is not defined, pass `null` respectively):
    - The `mapStateToProps()` can fetch values from the global state and injects them as props into the wrapped component you want to connect:
        - It takes the `state` as the first argument and an optional `ownProps` which is basically the object of the props you pass down from the caller component as part of the "props flow".
        - The function must return an object of props which can now be used by the wrapped component as if they were "regular" props.
        - This function is the ideal place to use selectors - see "**Memoizing global state conversions**" section.
    - The `mapDispatchToProps()` can define functions those dispatch actions and injects them as props into the wrapped component you want to connect:
        - It takes the `dispatch` as the first argument and an optional `ownProps` which is basically the object of the props you pass down from the caller component as part of the "props flow".
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

## Supporting multiple languages - ***The Intl API***:

- The basic concept behind the "Intl API" is that you define different JSON objects for each languages you support in your application and
you refer to the text-part you need.
- Use the `<Anu.Intl.Provider />` to set the supported language files for your "static texts" (no end-user-entered texts will be translated...) and the set the selected language in your app.
- Then, use the `<Anu.Intl.formattedMessage />` to place the text on the selected language referred by the `id` property.
You can also use `Anu.Intl.formatMessage()` when you want to translate a property value only (e.g. the placeholder text in an input element).
- If the text itself should also contain a dynamic text value, you can pass an optional `values` property which contains key-value pairs.
- In the text inside the language file, you should refer for the key using the `{key}` format.

### ***Creating the supported language objects:***

- These are basically simple objects with key-value pairs.
The key is always the ID of the referred text (see "**Formatting component texts**" and "**Formatting attribute texts**" section), the value is the value to print.
- Create as many language objects as many languages you want to support.
Don't forget that the IDs should match in each objects because they will be the key used by the *Intl API* to find the text for the selected language.
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

### ***Injecting the language objects into the application:***

- Within this step, wrap the outermost component (this should contain all your "internationalized" components, texts, etc.) within the `<Anu.Intl.Provider />`.
This component takes three props:
    - The `messages` property should be the object that contains all the translations for all the languages your application supports.
    - The `locale` property is practically a short string that is the preferred language (it must match with one of the keys of the outermost object passed as `messages`).
    - The `defaultLocale` property is optional and will refer to the default language if `messages[locale]` couldn't be found.

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
    
### ***Formatting component texts:***

- Use `<Anu.Intl.FormattedMessage />` for the specific text (referred by `id` property) - if used as a rendered element:
    - The first, required argument is the `id` property which is the key of the text in the user-defined language objects.
    - It can take an optional `values` property which is an object:
        - The key property must match the placeholder you want to replace with your dynamic value within the text inside your language object you refer (i.e. wrapped between `{` and `}`).
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

### ***Formatting attribute texts:***

- Use `Anu.Intl.formatMessage()` for the specific text (referred by `id` property) - if used as an attribute of an element:
    - The first, required argument is the `id` property which is the key of the text in the user-defined JSON files (e.g.: `messages_hu[id]` or `messages_en[id]`).
    - The second argument is the `values` property which is either an object or `null`. If defined:
        - The key property must match the placeholder you want to replace with your dynamic value within the text inside your language object you refer (i.e. wrapped between `{` and `}`).
        - The value is what should be used to replace the placeholder.
    - It can also take an optional `defaultMessage` property which is used if the searched text couldn't been found.
    - If the ID can not be found and no `defaultMessage` is passed, the function will return the `id` value as a string.

        ```javascript
        const ComponentWithFormatMessageFunctionCall = () => {
            return [
                <input placeholder={Anu.Intl.formatMessage('app.search.placeholder1', null, 'Search...')} />,
                <input placeholder={Anu.Intl.formatMessage('app.search.placeholder2', { name: 'Anubis' }, 'Search...')} />
            ];
        };
        ```
    
### ***Abbreviating numbers:***

- If you want to abbreviate a large number, the `Anu.Intl.abbreviateNumber()` function comes handy.
- This function is also part of the ***INTL API*** so, it is able to read the language set within `<Anu.IntlProvider />` (and you must use it within `<Anu.IntlProvider />`).
This currently supports only the *Hungarian* and the *English* abbreviations by default, but you can define your custom abbreviation rules as well.
- The function takes two arguments:
    - The first argument is the numeric `value`: the number to abbreviate.
    If there is no match for the selected language and you didn't specify a custom `options` object, the system will fall back to the default (English) options.
    - The second, optional argument is the `options`, which is an object:
        - The first member is `units` - an array of strings to be used as abbreviation units.
        When not specified, it will use the default (english) abbreviation units ('K', 'M', 'B', 'T').
        - The second member is `decimalPlaces` - a number that represents the decimal places.
        If not specified, the system will fall back to use two decimal places.
        - The third member is `decimalSign` - a string to replace the standard (at least in english speaking countries) dot (.) sign with the one of choice.
        If not specified, the system will fall back to the default dot (.) sign.

            ```javascript
            // Usage with default options:
            Anu.Intl.abbreviateNumber(value);
            // Usage with custom options:
            Anu.Intl.abbreviateNumber(value, option);
            ```

            ***Example - _abbreviating a number using default (built-in) options_***:

            ```javascript
            Anu.Intl.abbreviateNumber(10000000000):              // 10B
            Anu.Intl.abbreviateNumber(100000000000):             // 100B
            Anu.Intl.abbreviateNumber(1000000000000):            // 1T
            Anu.Intl.abbreviateNumber(-10000000):                // -10M
            Anu.Intl.abbreviateNumber(-10000):                   // -10K
            Anu.Intl.abbreviateNumber(-10234):                   // -10.23K
            ```

            ***Example - _abbreviating with custom options_***:

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

## Switching features on / off - ***The Feature API***:

- With feature toggle you can decide the circumstances a component should be rendered or not.
This technique is typically used when some components should not be accessible due to lack of access rights or if the related backend logic is not implemented yet.
Other typical use-case is when you have a feature but you don't want to show it in production yet because you want to test it carefully first.

### ***Setting features list:***

- Set up an object with its keys as the name of the allowed features with a boolean value.
- Wrap the outermost element (this should contain all the features you want to toggle) within an `<Anu.Feature.Provider />`.
    - It takes a `features` property which should be the defined features list.

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

### ***Toggling features:***

- Wrap your component you want to render if the desired feature is set to `true` within `<Anu.Feature.Toggle />`.
    - It takes a `name` (string) property which should match with the name of the feature you added to the provider component.
    If this property you refer with the value of the `name` attribute evaluates as true, the wrapped component can be rendered.
    - You can also set an optional `defaultComponent`.
    This will be rendered if the `name` evaluates as "falsy" (i.e.: either you set it to `false` or it wasn't even specified).
    If `defaultComponent` is not set, `null` will be rendered instead.

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

# `<ANUVerzum />` UTILITIES:

## Deep equality check for objects using `Anu.utils.deepEqual()`:

- The `Anu.utils.deepEqual()` is a deep equality check utility that can check nested and complex objects if their structure and properties match (even if their references do not match).

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

## Asyncronous utilities:

### ***Asynchronous mapping:***

- The `Anu.utils.Async.map()` function is designed to loop through an array of `elemList` and execute an `iterator` on each element asynchronously.
After `iterator` ran on each element in `elemList`, the `resolveCallback` function is called which takes `results` as an argument:
    - The first argument is `elemlist`: an array of elements on which we want to iterate.
    - The second argument (the first callback) is the `iterator` that should be called for all elements in `elemList` (argument: element of `elemList`).
    - The third argument (second callback) is the `resolveCallback` that takes the list of modified elements returned by `iterator` calls (argument: array of modified elements).

        ```javascript
        const elemList = [ /* elem1, elem2, elem3, ... */ ];
        const iterator = element => {
            // do something with each "element" one-by-one and then, return (modified) "element"
            return element;
        };
        const resolveCallback = results => {
            // do something with the results (array of "element" -s)
        }
        Anu.utils.Async.map(elemList, iterator, resolveCallback);
        ```

### ***Promise:***

- The "producing code" is code that can take some time.
- The "consuming code" is code that must wait for the result.
- A promise is an object that asynchronously connects producing and consuming code.

#### ***Instantiation:***

- The constructor takes a callback function which describes the logic that might take some time

    ```javascript
    const myProducingCallback = (resolve, reject) => {
        setTimeout(() => {
            try {
                resolve('Resolved!');
            } catch(error) {
                reject(error);
            }
        }, 300)
    };
    const myPromise = new Anu.utils.Async.Promise(myProducingCallback);
    ```

#### ***Usage of _`Anu.utils.Async.Promise.prototype.then()`_ instance method:***

- The `Anu.utils.Async.Promise.prototype.then()` method runs right after the producing code inside the Promise was finished.
- It takes two callbacks:
    - The first one (`successCallback`) is called when the producing code was completed successfully, taking the argument we passed to it in the producing code
    - The second one (`failCallback`) is called when the producing code fails, taking the argument we passed to it in the producing code fail branch.
    - Both callbacks are optional.
    - It can also return another Promise.

        ```javascript
        const successCallback = success => {
            // do something if producing code was successful
        };
        const failCallback = error => {
            // Do something if producing code failed
        };
        myPromise.then(successCallback, failCallback)
        ```

        ***Example - _file loader_***:

        ```javascript
        // Displayer logic:
        const display = some => {
            console.log(some);
        };
        // Producing code:
        const fetchAPI = (resolve, reject) => {
            setTimeout(() => {
                const req = new XMLHttpRequest();
                req.open('GET', "car.html");
                req.onload = () => {
                    if (req.status === 200) {
                        resolve(req.response);
                    } else {
                        reject("File not Found");
                    }
                };
                req.send();
            }, 3000);
        }
        // Consuming code - Success handler:
        const successHandler = value => {
            display(value);
        };
        // Fail handler:
        const failHandler = error => {
            display(error);
        };
        // Instantiation (triggering producing code):
        const myPromise = new Anu.utils.Async.Promise(fetchAPI);
        // Showing a loading indicator:
        display("Loading...");
        // Running consuming code when ready or handling fail scenario:
        myPromise.then(successHandler, failHandler);
        ```

#### ***The _`Anu.utils.Async.Promise.prototype.catch()`_ instance method:***

- The `Anu.utils.Async.Promise.prototype.catch()` method runs right after the producing code inside the `Anu.utils.Async.Promise` was finished if it failed.
- It behaves the same way as if `Anu.utils.Async.Promise.prototype.then(undefined, onRejected)` was called
(in fact, calling `Anu.utils.Async.Promise.prototype.catch(onRejected)` internally calls `Anu.utils.Async.Promise.prototype.then(undefined, onRejected)`).
- This means that you have to provide an `onRejected` function even if you want to fall back to an undefined result value - for example `Anu.utils.Async.Promise.prototype.catch(() => {})`.

    ```javascript
    const promise = new Anu.utils.Async.Promise((resolve, reject) => {
        throw 'Uh-oh!';
    });
    promise.catch((error) => {
        console.error(error);
    });
    ```

#### ***The _`Anu.utils.Async.Promise.all()`_ static method:***

- The `Anu.utils.Async.Promise.all()` static method takes multiple `Anu.utils.Async.Promise`-s as an array and returns a single `Anu.utils.Async.Promise` instance that resolves to an array of the results of the input `Anu.utils.Async.Promise`-s
- This returned `Anu.utils.Async.Promise` will resolve when all of the input's promises have resolved, or if the input iterable contains no promises.
- If one of the `Anu.utils.Async.Promise`-s fail, it rejects immediately.
- This method can be useful for aggregating the results of multiple `Anu.utils.Async.Promise`-s.
It is typically used when there are multiple related asynchronous tasks that the overall code relies on to work successfully — all of whom we want to fulfill before the code execution continues.

    ```javascript
    const promise1 = Anu.utils.Async.Promise.resolve(3);
    const promise2 = 42;
    const promise3 = new Anu.utils.Async.Promise((resolve, reject) => {
        setTimeout(resolve, 100, 'foo');
    });
    Anu.utils.Async.Promise.all([promise1, promise2, promise3]).then((values) => {
        console.log(values);
    });
    // Logs: [3, 42, "foo"]
    ```

    ***Example - _fail-fast behavior_***:

    ```javascript
    // Example to "fail-fast" - if either one fails, it will be rejected immediately:
    const p1 = new Anu.utils.Async.Promise((resolve, reject) => {
        setTimeout(() => resolve('one'), 1000);
    });
    const p2 = new Anu.utils.Async.Promise((resolve, reject) => {
        setTimeout(() => resolve('two'), 2000);
    });
    const p3 = new Anu.utils.Async.Promise((resolve, reject) => {
        setTimeout(() => resolve('three'), 3000);
    });
    const p4 = new Anu.utils.Async.Promise((resolve, reject) => {
        setTimeout(() => resolve('four'), 4000);
    });
    const p5 = new Anu.utils.Async.Promise((resolve, reject) => {
        reject(new Error('I am rejected.'));
    });
    // Using .catch:
    Anu.utils.Async.Promise.all([p1, p2, p3, p4, p5])
        .then(values => {
            console.log(values);
        })
        .catch(error => {
            console.error(error.message)
        });
    // logs (as error): "I am rejected."
    ```

#### ***The _`Anu.utils.Async.Promise.race()`_ static method:***

- The `Anu.utils.Async.Promise.race()` settles as long as one of the input promises settles (either resolved or rejected).
In other words, The `Anu.utils.Async.Promise.race()` method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
- The static function returns an `Anu.utils.Async.Promise` that is settled the same way (and takes the same value) as the first promise that settles amongst the promises of the iterable passed as an argument.
    - If the iterable passed is empty, the promise returned will be forever pending.
    - If the iterable contains one or more non-promise value and/or an already settled promise, then `Anu.utils.Async.Promise.race()` will resolve to the first of these values found in the iterable.
    
        ```javascript
        const promise1 = new Anu.utils.Async.Promise((resolve, reject) => {
            setTimeout(resolve, 500, 'one');
        });
        const promise2 = new Anu.utils.Async.Promise((resolve, reject) => {
            setTimeout(resolve, 100, 'two');
        });
        Anu.utils.Async.Promise.race([promise1, promise2])
            .then(value => {
                console.log(value);
                // Both resolve, but promise2 is faster
            }, err => console.log(err)
        );
        // logs: "two"
        ```

        ***Example - _forever pending promise_***:

        ```javascript
        const foreverPendingPromise = Anu.utils.Async.Promise.race([]);
        console.log(foreverPendingPromise);
        setTimeout(() => {
            console.log('the stack is now empty');
            console.log(foreverPendingPromise);
        });
        // logs, in order:
        // Promise { <state>: "pending" }
        // the stack is now empty
        // Promise { <state>: "pending" }
        ```

        ***Example - _if the iterable contains one or more non-promise value and/or an already settled promise, then `Anu.utils.Async.Promise.race()` will resolve to the first of these values found in the array_***:

        ```javascript
        const foreverPendingPromise = Anu.utils.Async.Promise.race([]);
        const alreadyFulfilledProm = Anu.utils.Async.Promise.resolve(100);
        const arr = [foreverPendingPromise, alreadyFulfilledProm, "non-Promise value"];
        const arr2 = [foreverPendingPromise, "non-Promise value", Anu.utils.Async.Promise.resolve(100)];
        const p = Anu.utils.Async.Promise.race(arr);
        const p2 = Anu.utils.Async.Promise.race(arr2);
        console.log(p);
        console.log(p2);
        setTimeout(() => {
            console.log('the stack is now empty');
            console.log(p);
            console.log(p2);
        });
        // logs, in order:
        // Promise { <state>: "pending" }
        // Promise { <state>: "pending" }
        // the stack is now empty
        // Promise { <state>: "fulfilled", <value>: 100 }
        // Promise { <state>: "fulfilled", <value>: "non-Promise value" }
        ```

#### ***The _`Anu.utils.Async.Promise.resolve()`_ static method:***

- The `Anu.utils.Async.Promise.resolve()` method returns an `Anu.utils.Async.Promise` object that is resolved with a given value.
- If the value is a promise, that promise is returned.
- If the value is a "thenable" (has a `then` method), the returned promise will "follow" that thenable, adopting its eventual state.
Otherwise, the returned promise will be fulfilled with the value.
    
    ```javascript
    Anu.utils.Async.Promise.resolve('Success').then((value) => {
		console.log(value);
	});
    // logs: "Success"
    ```

    ***Example - _resolving an `Anu.utils.Async.Promise`_***:

    ```javascript
    const original = Anu.utils.Async.Promise.resolve(33);
    const cast = Anu.utils.Async.Promise.resolve(original);
    cast.then((value) => {
        console.log('value: ' + value);
    });
    console.log('original === cast ? ' + (original === cast));
    // logs, in order:
    // original === cast ? true
    // value: 33
    ```

    ***Example - _resolving thenables and throwing errors_***:

    ```javascript
    // Resolving a thenable object
    const p1 = Anu.utils.Async.Promise.resolve({
        then: (onFulfill) => { onFulfill('fulfilled!'); }
    });
    console.log(p1 instanceof Anu.utils.Async.Promise)
    p1.then((v) => {
        console.log(v);
    });
    const thenable2 = {
        then: (resolve) => {
            throw new TypeError('Throwing2');
            resolve('Resolving2');
        }
    };
    const p2 = Anu.utils.Async.Promise.resolve(thenable2);
    p2.then((v) => {
        // not called
    }, (e) => {
        console.error(e);
    });
    const thenable3 = {
        then: (resolve) => {
            resolve('Resolving3');
            throw new TypeError('Throwing3');
        }
    };
    const p3 = Anu.utils.Async.Promise.resolve(thenable3);
    p3.then((v) => {
        console.log(v);
    });
    // logs, in order:
    // true
    // "fulfilled!"
    // TypeError: Throwing2
    // "Resolving3"
    ```

#### ***The _`Anu.utils.Async.Promise.reject()`_ static method:***:

- The `Anu.utils.Async.Promise.reject()` method returns an `Anu.utils.Async.Promise` object that is rejected with a given reason
- For debugging purposes and selective error catching, it is useful to make reason an instanceof Error.

    ```javascript
    const resolved = (result) => {
        console.log('Resolved');
    }
    const rejected = (result) => {
        console.error(result);
    }
    Anu.utils.Async.Promise.reject(new Error('fail')).then(resolved, rejected);
    // logs: Error: fail
    ```

<br>

# A couple of words about Accessibility (**"a11y"**):

## Semantic HTML:

- Avoid elements like `<div>` or `<span>` and replace with HTML elements those **clearly define the document** (like `<article>`, `<button>`, ...).
- Use **landmarks** (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`) to **define different parts of a web page**.
Use only one of each landmarks per page.
**`<aside>`** for example is **related to the main content**, `<section>` on the other hand is not.
If you use **more than only one** landmark per page, use **`aria-label`** attribute.

## Role, name and value:

- Use **`role`**, **`name`** and sometimes - when applicable - **`value`** properties for assistive technologies (like screen readers):
    - Use **`role`** when there is a technical limitation to use proper element.
    In this case, you can add this attribute to describe the role you want to apply to the given element ("custom control").
    - Use **accessible names** where it is possible.
    An **inner text** content **of `<a>`** for example is **accessible**.
    For an **`<img>`**, you should **always use** an **`alt`** attribute to make it accessible.
    If you use a **`<label>`**, then use the **`for`** - here, it is done via **`htmlFor`** - attribute (and **refer it** in the **`id`** attribute of the corresponding **`<input>`** element).
    To give accessible name for elements like `<select>`, use **`aria-label`**.
    - Some components might have **value** or **state**.
    If using a **custom element** (like an accordion - which is not a native HTML element), use **`role="button"`** and **`aria-expanded={isExpanded ? 'true' : 'false'}`**.


## Buttons:

- **`<button>`** should **perform an action** on the page, **`<a>`** is for **navigation purpose**.
Accessibility doesn't care about its look so, it is OK to style `<a>` to look like a `<button>`.

## Color:

- Use good **contrast** for **text** and **graphical** components:
- **Contrast** between **text or graphics** is measured against the **background color**.
This is called **contrast ratio**. A **white** text on a **white** background has a contrast ratio of **1** (impossible to perceive).
**Black** text on a **white** background has a contrast ratio of **21**.
- En general, use a contrast ratio minimum of **4.5** but **7** is preferred.
- When using **text on image** and the **text** is **white**, **compare it** to the **brightest area** of the **image**.
If the contrast ratio is not sufficient, use a **color overlay** on that part of the picture with text.
- **Do not** use **color** as the **only visual indicator** of a meaning.

## Images:

- Use **`alt`** attribute for **meaningful `<img>`** that screen readers can read.
    - If you can remove an `<img>` from the page without impact, then the **`<img>`** is **decorative**.
    In this case, use an **empty `alt` attribute** or **set** it as **`background-image`**.
    - When using **font icons** (**`<i>`**), set **`role="img"`** and **`aria-hidden="true"`**.
    - If you add a **decorative SVG** image with the **`<img>`** element, you must add an **empty `alt`** attribute as described.
    SVG images are often inserted **inline**, using the **`<svg>`** element.
    In this case, **`aria-hidden="true"`** will make your image decorative.
    - The method are the same for both **background images**, **font icons** and **`<svg>`**:
        - Add **`role="img"`**
        - Add a **descriptive** **`aria-label`** or **`aria-labelledby`** attribute.
    - The value of the **`alt`** attribute should **describe** the **image**, or even **better** the **intention** of the **image**.
    - For **font icons**, the **`aria-label`** should describe its **function**.

## Links:

- A **link** is **always** for navigation purpose.
- Use **proper attributes** for elements like **`href`** for **`<a>`**.
If possible, **open the link in the current window**.
- **Hyperlinks** are **underlined** by default for a reason.
If you want to change it, better use **`text-underline-offset`** and **`text-decoration-color`**.
- **Different `<a>` states** help users interact with the links.
A **visited** state can help a person with **short-term memory loss** to understand which content has been read.
A **hover** state can help a person with **reduced muscle control** to know when to click.
A **focused** link helps **keyboard users** to know which link they are about to activate.
    - The **major states** of **`<ä>`** (also known as **CSS pseudo-classes**) are:
        - **unvisited**,
        - **active**,
        - **visited**,
        - **hover** and
        - **focus**
    - **Don't remove** the **`text-decoration: underline;`** at least for **active** and **visited** links.
    - All the states must have enough **contrast**.
    In addition, a **focused** link must have sufficient **contrast** to the **unfocused** state.
    Use the **`outline-offset`** CSS property to keep larger distance between outline ant the text and **`outline-color`** to set it to have bigger contrast from the rest of the content around (background, other texts, ...).
    - A clear **hover** state is helpful for everyone, especially people with **motor impairments** (different color, bolder text).
    - Use **accessible link text** which is a text that makes sense without any context.
    A link text should explain clearly what information the reader will get by clicking on that link.
    Google Search also prefers descriptive links.

## Headings:

- A **heading** is **text** that **describes the content** that follows it.
- Headings are **important** for **accessible navigation**.
Sighted users scan a web page to understand the structure of the page.
The same way, **screen reader** users use **headings** to **navigate and scan** the page.
- The headings must be **clear**, both **visually** and use **clear wording**.
The heading structure of a page forms the **outline of the page**, like the "skeleton".

<br>

# Credits:

- React:
    - [Paul O Shannessy - Building React From Scratch](https://www.youtube.com/watch?v=_MAD4Oly9yg)
    - [Building our own React-like implementation](https://swennemans.gitbooks.io/building-your-own-react-js/content/02-building_basic_vdom/01-getting-started.html)
    - [Ofir Dagan - Build Your Own React](https://hackernoon.com/build-your-own-react-48edb8ed350d)
    - [Didact: a DIY guide to build your own React](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5)
    - [Rodrigo Pombo - Build your own React](https://pomb.us/build-your-own-react/)
- Redux, React-Redux:
    - [Build Yourself a Redux](https://zapier.com/engineering/how-to-build-redux/)
    - [Learn Redux by coding a Mini-Redux](https://blog.jakoblind.no/learn-redux-by-coding-a-mini-redux/)
    - [Implement React Redux from Scratch](https://medium.com/netscape/implementation-of-react-redux-part-1-411b971a9b5b)
