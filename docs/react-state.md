---
id: react-state
title: State Managment
---

<i align="center" class='fab fa-react fa-spin fa-7x'></i>

## Render `state` in the User Interface

Anytime we return state, `this.state` needs to be wrapped in curly braces. This should render 'Jamie' in h1 tags:

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Jamie',
		};
	}
	render() {
		return (
			<div>
				<h1>{this.state.name}</h1>
			</div>
		);
	}
}
```

Another way to render `state` in a component: set a variable to contain `this.state.name` and then return the jsx with the variable. This will return same as above:

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Jamie',
		};
	}
	render() {
		const name = this.state.name;
		return (
			<div>
				<h1>{name}</h1>
			</div>
		);
	}
}
```

---

## Set State with `this.setState`

Call `setState` method inside a component class: `this.setState({ key: value })`

```javascript
this.setState({
	name: 'Jamie',
});
```

Never modify state directly, always use `this.setState()` when changes occur.

The following will allow a button click to change 'Initial State' to 'Second State':

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Initial State',
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			name: 'Second State',
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.handleClick}>Click Me</button>
				<h1>{this.state.name}</h1>
			</div>
		);
	}
}
```

---

## Bind `this` to a Class Method

This will allow a Class Method to access `this` from outside the normal scope. One way is to explicitly bind `this` in the cunstructor.

The following will bind `this` to the `adItem()` method, allowing us to increment the count `onClick`:

```Javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0
    };
    this.addItem = this.addItem.bind(this)
  }
  addItem() {
    this.setState({
      itemCount: this.state.itemCount + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.addItem} >Click Me</button>
        <h1>Current Item Count: {this.state.itemCount}</h1>
      </div>
    );
  }
};
```

---

## Use `state` to Toggle an Element

The following renders the text "Now you see me!" if the `visibility` props state is `true`. The `button` element will toggle the state on click.

We can toggle the state of an element using a simple `if else` statement. This is done in the `toggleVisibility()` method below:

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: false,
		};
		this.toggleVisibility = this.toggleVisibility.bind(this);
	}
	toggleVisibility() {
		if (this.state.visibility == true) {
			this.setState({
				visibility: false,
			});
		} else {
			this.setState({
				visibility: true,
			});
		}
	}

	render() {
		if (this.state.visibility) {
			return (
				<div>
					<button onClick={this.toggleVisibility}>Click Me</button>
					<h1>Now you see me!</h1>
				</div>
			);
		} else {
			return (
				<div>
					<button onClick={this.toggleVisibility}>Click Me</button>
				</div>
			);
		}
	}
}
```

---

## A Simple Counter

An exemple that renders three buttons, each changing the state of `count`:

```javascript
class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
		};
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.reset = this.reset.bind(this);
	}

	increment() {
		this.setState({
			count: this.state.count + 1,
		});
	}

	decrement() {
		this.setState({
			count: this.state.count - 1,
		});
	}

	reset() {
		this.setState({
			count: 0,
		});
	}

	render() {
		return (
			<div>
				<button className='inc' onClick={this.increment}>
					Increment!
				</button>
				<button className='dec' onClick={this.decrement}>
					Decrement!
				</button>
				<button className='reset' onClick={this.reset}>
					Reset
				</button>
				<h1>Current Count: {this.state.count}</h1>
			</div>
		);
	}
}
```

---

## Create a Controlled Input

When a user adds text to an `input` we can treat it as part of the `state`. Using the `value` and `onChange` properties of the `input` html element, we can send it to `this.state.input` and display it in real time.

```javascript
class ControlledInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			input: event.target.value,
		});
	}
	render() {
		return (
			<div>
				<input value={this.state.input} onChange={this.handleChange} />
				<h4>Controlled Input:</h4>
				<p>{this.state.input}</p>
			</div>
		);
	}
}
```

---

## Create a Controlled Form

We can also create a form with `<button type='submit'>` to update and render the `state` when clicked. This form will clear the input `state` and display it's previous state below.

```javascript
class MyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			submit: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({
			input: event.target.value,
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			input: '',
			submit: this.state.input,
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input value={this.state.input} onChange={this.handleChange} />
					<button type='submit'>Submit!</button>
				</form>
				<h1>{this.state.submit}</h1>
			</div>
		);
	}
}
```

---

## Pass `state` as `props` to Child Components

`state` flows in one direction down the tree of components, from the parents `state` to child components as `props`. The child should only receive the `state` data that is required. Complicated stateful apps can be broken down into only a few, or sometimes just a single stateful component. All the other components simply use `props` received from a parents `state`.

In the following example, our parent component, `My App`, sets the `state` to `name: 'Jamie'` and passes it to the child component, `Navbar`, as a prop.

```javascript
class MyApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Jamie',
		};
	}
	render() {
		return (
			<div>
				<Navbar name={this.state.name} />
			</div>
		);
	}
}
```

```Javascript
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <h1>Hello, my name is: {this.props.name}</h1>
    </div>
    );
  }
};
```

---

## **Pass a Callback as `props`**

Just like `state`, you can pass functions and methods to child child components. This allows child components to interact with their parents.

This example has three components. The `MyApp` component is the parent component and will pass it's `state` as `props` to the `GetInput` and `RenderInput`.

```javascript
class MyApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			inputValue: event.target.value,
		});
	}
	render() {
		return (
			<div>
				{/* change code below this line */}
				<GetInput
					input={this.state.inputValue}
					handleChange={this.handleChange}
				/>
				<RenderInput input={this.state.inputValue} />
				{/* change code above this line */}
			</div>
		);
	}
}
```

```javascript
class GetInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Get Input:</h3>
				<input value={this.props.input} onChange={this.props.handleChange} />
			</div>
		);
	}
}
```

```javascript
class RenderInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Input Render:</h3>
				<p>{this.props.input}</p>
			</div>
		);
	}
}
```

---

## Lifecycle Methods

`componentWillMount()` method is called before `render()`.

`componentDidMount()` method is often used to place API calls. It's called after a component is mounted to the DOM. Any calls to `setState()` within this method will trigger a re-render of the component. When you call an API in this method, and set your state with the data that the API returns, it will automatically trigger an update once you receive the data.

`componentWillReceiveProps()` is called whenever a component is receiving new props. It usually receives the new props as `nextProps` You can perform functions on these props before the component updates.

`shouldComponentUpdate()` take `nextProps` and `nextState` as parameters and and allows us to declare specifically if the component should update or not. It's very useful for optimizing performance.

`componentWillUpdate()`

`componentDidUpdate()` is called immediately after the component re-renders.

`componentWillUnmount()`

---

## Event Listeners

`componentDidMount` is the best place to attach event listeners. If you want to attach an event listener directly to the DOM, you have to do it directly. In this example we use `document.addEventListener(method, callback)` in the `componentDidMount()` Method, and `document.removeEventListener()` in the `componentWillUnmount()` method.

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
		};
		this.handleEnter = this.handleEnter.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}
	handleEnter() {
		this.setState({
			message: this.state.message + 'You pressed the enter key! ',
		});
	}
	handleKeyPress(event) {
		if (event.keyCode === 13) {
			this.handleEnter();
		}
	}
	render() {
		return (
			<div>
				<h1>{this.state.message}</h1>
			</div>
		);
	}
}
```

---

## Manage Updates with Lifecycle Methods

`componentWillReceiveProps()` is called whenever a component is receiving new props. It usually receives the new props as `nextProps` You can perform functions on these props before the component updates.

`componentDidUpdate()` is called immediately after the component re-renders.

Rendering and mounting are not the same thing. When a page loads, all components are mounted. After that, they are rendered.

The following example will log `componentWillReceiveProps()` first, followed by `componentWillUpdate()`, and finally `componentDidUpdate()`

```javascript
class Dialog extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillUpdate() {
		console.log('Component is about to update...');
	}
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}
	componentDidUpdate() {
		console.log('Component has updated.');
	}
	render() {
		return <h1>{this.props.message}</h1>;
	}
}

class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'First Message',
		};
		this.changeMessage = this.changeMessage.bind(this);
	}
	changeMessage() {
		this.setState({
			message: 'Second Message',
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.changeMessage}>Update</button>
				<Dialog message={this.state.message} />
			</div>
		);
	}
}
```

---

## Optimize Re-Renders with `shouldComponentUpdate()`

`shouldComponentUpdate()` take `nextProps` and `nextState` as parameters and and allows us to declare specifically if the component should update or not. It's very useful for optimizing performance. The most common use is to compare whether `nextProps` are different from `this.props`, if they're the same, we can stop the component from re-rendering.

This example uses an incrementing counter. The `shouldComponentUpdate()` method prevents the component from re-rendering if the current value is odd.

```javascript
class OnlyEvens extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log('Should I update?');
		console.log(nextProps.value);
		if (nextProps.value % 2 == 0) {
			return true;
		} else {
			return false;
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('Receiving new props...');
	}
	componentDidUpdate() {
		console.log('Component re-rendered.');
	}
	render() {
		return <h1>{this.props.value}</h1>;
	}
}

class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
		this.addValue = this.addValue.bind(this);
	}
	addValue() {
		this.setState({
			value: this.state.value + 1,
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.addValue}>Add</button>
				<OnlyEvens value={this.state.value} />
			</div>
		);
	}
}
```

## Using `&&` for more Concise Conditional

The if/else statements worked in the last challenge, but there's a more concise way to achieve the same result. Imagine that you are tracking several conditions in a component and you want different elements to render depending on each of these conditions. If you write a lot of `else if` statements to return slightly different UIs, you may repeat code which leaves room for error. Instead, you can use the `&&` logical operator to perform conditional logic in a more concise way. This is possible because you want to check if a condition is true, and if it is, return some markup.

Example:

`{condition && <p>markup</p>}`

If the condition is `true`, markup will be returned. Otherwise it will return nothing.

Previous example, using `&&` instead of the `if else` statement:

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: true,
		};
		this.toggleDisplay = this.toggleDisplay.bind(this);
	}
	toggleDisplay() {
		this.setState({
			display: !this.state.display,
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.toggleDisplay}>Toggle Display</button>
				{this.state.display && <h1>Displayed!</h1>}
			</div>
		);
	}
}
```

---

## Ternary Expression for Conditional Rendering

Unlike `if/else` statements, ternary espressions can be used _inside_ a `return` statement.

```jsx
const inputStyle = {
	width: 235,
	margin: 5,
};

class CheckUserAge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			userAge: '',
		};
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			input: e.target.value,
			userAge: '',
		});
	}
	submit() {
		this.setState({
			userAge: this.state.input,
		});
	}
	render() {
		const buttonOne = <button onClick={this.submit}>Submit</button>;
		const buttonTwo = <button>You May Enter</button>;
		const buttonThree = <button>You Shall Not Pass</button>;
		return (
			<div>
				<h3>Enter Your Age to Continue</h3>
				<input
					style={inputStyle}
					type='number'
					value={this.state.input}
					onChange={this.handleChange}
				/>
				<br />
				{this.state.userAge > 17
					? buttonTwo
					: this.state.userAge == ''
					? buttonOne
					: buttonThree}
			</div>
		);
	}
}
```

---

## Render Conditionally from Props

It's very common to use props to conditionally render code by using the value of a prop to decide what is rendered. The following is a simple game that renders either "You win!" or "You lose!", each with a 50% chance.

```jsx
class Results extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <h1>{this.props.fiftyFifty}</h1>;
	}
}

class GameOfChance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 1,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			counter: this.state.counter + 1,
		});
	}
	render() {
		let expression = Math.random() > 0.5;
		return (
			<div>
				<button onClick={this.handleClick}>Play Again</button>
				{expression == 1 ? (
					<Results fiftyFifty='You win!' />
				) : (
					<Results fiftyFifty='You lose!' />
				)}
				<p>{'Turn: ' + this.state.counter}</p>
			</div>
		);
	}
}
```

---

## Use `Array.map()` to Dynamically Render Elements

We can use the `map()` method to render an unknown number of elements.

```jsx
const items = this.state.toDoList.map((i) => <li>{i}</li>);
```

```javascript
const textAreaStyles = {
	width: 235,
	margin: 5,
};

class MyToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: '',
			toDoList: [],
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit() {
		const itemsArray = this.state.userInput.split(',');
		this.setState({
			toDoList: itemsArray,
		});
	}
	handleChange(e) {
		this.setState({
			userInput: e.target.value,
		});
	}
	render() {
		const items = this.state.toDoList.map((i) => <li>{i}</li>);
		return (
			<div>
				<textarea
					onChange={this.handleChange}
					value={this.state.userInput}
					style={textAreaStyles}
					placeholder='Separate Items With Commas'
				/>
				<br />
				<button onClick={this.handleSubmit}>Create List</button>
				<h1>My "To Do" List:</h1>
				<ul>{items}</ul>
			</div>
		);
	}
}
```

---

## Use `filter()` to Dynamically Render Elements

The `filter()` method can be used to dynamically filter arrays before mapping over them.

```javascript
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [
				{
					username: 'Jeff',
					online: true,
				},
				{
					username: 'Alan',
					online: false,
				},
				{
					username: 'Mary',
					online: true,
				},
				{
					username: 'Jim',
					online: false,
				},
				{
					username: 'Sara',
					online: true,
				},
				{
					username: 'Laura',
					online: true,
				},
			],
		};
	}
	render() {
		const usersOnline = this.state.users.filter((user) => user.online);
		const renderOnline = usersOnline.map((i) => (
			<li key={i.user + 1}>{i.username}</li>
		));
		return (
			<div>
				<h1>Current Online Users:</h1>
				<ul>{renderOnline}</ul>
			</div>
		);
	}
}
```

---

## Render React on the Server with `renderToString`

Since React is a JavaScript view library and you can run JavaScript on the server with Node, this is possible. In fact, React provides a `renderToString()` method you can use for this purpose.
`ReactDOMServer` takes one argument, a React element.

```javascript
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div />;
	}
}
ReactDOMServer.renderToString(<App />);
```
