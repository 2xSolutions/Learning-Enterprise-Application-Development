# React Basics Guide

## Table of Contents
1. [What is React?](#what-is-react)
2. [Common Confusions Explained](#common-confusions-explained)
3. [Setting Up React](#setting-up-react)
4. [JSX - JavaScript XML](#jsx---javascript-xml)
5. [Components](#components)
6. [Props](#props)
7. [State](#state)
8. [React Hooks](#react-hooks)
9. [Event Handling](#event-handling)
10. [Conditional Rendering](#conditional-rendering)
11. [Lists and Keys](#lists-and-keys)
12. [Component Lifecycle](#component-lifecycle)

---

## What is React?

React is a **JavaScript library** for building user interfaces, developed and maintained by Facebook (Meta). It's component-based, declarative, and efficient.

### Key Features:
Transpiler converter of one lenguage to other.
- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Design simple views, React efficiently updates and renders components
- **Virtual DOM**: React creates a virtual representation of the DOM for better performance
- **One-Way Data Flow**: Data flows from parent to child components
- **JSX**: JavaScript syntax extension that allows HTML-like code in JavaScript

---

## Common Confusions Explained

### 🤔 Library vs Framework

**React is a LIBRARY, not a framework.**

| Library (React) | Framework (Angular, Vue) |
|----------------|-------------------------|
| You call the library | The framework calls your code |
| Focused on one thing (UI) | Provides complete solution (routing, forms, HTTP, etc.) |
| You choose other tools | Opinionated structure and tools |
| Lightweight & flexible | Full-featured but heavier |

**Analogy**: 
- **Library** = A toolkit with specific tools (hammer, screwdriver). You decide what to build and what other tools you need.
- **Framework** = A complete workshop with everything pre-arranged. You work within its structure.

**Example**:
- React handles UI only. You need to add React Router for routing, Axios for HTTP, Redux for state management, etc.
- Angular provides all of these out of the box.

---

### 🤔 Declarative vs Imperative (Procedural)

**React is DECLARATIVE, not imperative.**

#### Imperative (Procedural) - "HOW to do it"
You tell the computer **step-by-step** what to do.

```javascript
// Vanilla JavaScript (Imperative)
const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', function() {
  const div = document.getElementById('output');
  div.textContent = 'Button clicked!';
  div.style.color = 'blue';
});
document.body.appendChild(button);
```

You're saying:
1. Create a button element
2. Set its text
3. Add an event listener
4. Find the div
5. Change its content
6. Change its color
7. Append the button to body

#### Declarative - "WHAT you want"
You describe **what** the UI should look like, and React figures out how to make it happen.

```jsx
// React (Declarative)
function App() {
  const [clicked, setClicked] = useState(false);
  
  return (
    <div>
      <button onClick={() => setClicked(true)}>Click me</button>
      {clicked && <div style={{ color: 'blue' }}>Button clicked!</div>}
    </div>
  );
}
```

You're saying: "When clicked is true, show this div with blue text." React handles the DOM manipulation.

**Benefits of Declarative**:
- Easier to read and understand
- Less error-prone
- React optimizes the updates for you
- Predictable - same state = same UI

---

### 🤔 Virtual DOM vs Real DOM

**Real DOM** = The actual HTML structure in the browser. Updating it is slow.

**Virtual DOM** = React's lightweight JavaScript copy of the Real DOM.

#### How it works:
1. You change state in React
2. React creates a new Virtual DOM
3. React compares (diffs) new Virtual DOM with old Virtual DOM
4. React calculates the minimum changes needed
5. React updates ONLY those parts in the Real DOM

```
State Change → Virtual DOM (fast) → Diff → Minimal Real DOM Updates
```

**Why is this faster?**
- Manipulating JavaScript objects (Virtual DOM) is very fast
- Updating Real DOM is slow
- React batches multiple changes and updates Real DOM once
- Only necessary elements are updated, not the entire page

**Example**:
```jsx
// If you change one todo item in a list of 100 items
const [todos, setTodos] = useState([...100 items]);

// React will only update that ONE <li> in the Real DOM
// Not re-render all 100 items
```

---

### 🤔 State vs Props

Confusing state and props is very common for beginners.

| State | Props |
|-------|-------|
| **Owned** by the component | **Passed** from parent |
| **Mutable** (can be changed) | **Immutable** (read-only) |
| **Private** to component | **Public** - received from outside |
| Changes trigger re-render | Changes trigger re-render |
| Managed by `useState` | Just function parameters |

```jsx
// Parent Component
function Parent() {
  const [count, setCount] = useState(0); // STATE - Parent owns it
  
  return <Child count={count} />; // PROPS - Passing to child
}

// Child Component
function Child(props) {
  // props.count is READ-ONLY
  // Child CANNOT do: props.count = 5 ❌
  
  return <div>Count: {props.count}</div>;
}
```

**Think of it like**:
- **State** = Your personal notebook (you can write/erase)
- **Props** = A letter someone sent you (you can read, but not modify)

---

### 🤔 One-Way Data Flow vs Two-Way Data Binding

**React uses ONE-WAY data flow** (also called unidirectional data flow).

#### One-Way Data Flow (React)
Data flows in ONE direction: Parent → Child

```jsx
function Parent() {
  const [name, setName] = useState('');
  
  return <Child name={name} onNameChange={setName} />;
}

function Child({ name, onNameChange }) {
  return <input value={name} onChange={(e) => onNameChange(e.target.value)} />;
}
```

- Parent owns the state
- Child receives data via props
- Child notifies parent of changes via callback
- Parent updates state
- UI re-renders

**Benefits**: Predictable, easier to debug, clear data flow

#### Two-Way Data Binding (Angular)
Data automatically syncs between model and view.

```html
<!-- Angular -->
<input [(ngModel)]="name">
```

Changes in input automatically update `name`, and vice versa.

---

### 🤔 Component vs Element

**Component** = A function or class that returns JSX

```jsx
// This is a COMPONENT (reusable blueprint)
function Welcome() {
  return <h1>Hello</h1>;
}
```

**Element** = What a component returns (instance of a component)

```jsx
// This is an ELEMENT (instance)
const element = <Welcome />;
```

**Analogy**:
- **Component** = Cookie cutter (reusable template)
- **Element** = Cookie (the actual thing created)

---

### 🤔 Functional vs Class Components

| Functional (Modern) | Class (Legacy) |
|---------------------|----------------|
| Just JavaScript functions | ES6 Classes |
| Use Hooks for state | Use `this.state` |
| Simpler, less code | More verbose |
| No `this` keyword confusion | Need to bind `this` |
| **Recommended** ✅ | Older approach |

```jsx
// Functional Component (MODERN)
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Class Component (LEGACY)
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

**Use functional components with hooks** for all new code.

---

### 🤔 SPA vs Traditional Multi-Page App

React is commonly used to build **SPAs (Single Page Applications)**.

#### Traditional Multi-Page App
- Each page = separate HTML file
- Server sends new HTML on each navigation
- Full page reload
- Example: Traditional PHP websites

```
/home → server sends home.html
/about → server sends about.html (full page reload)
/contact → server sends contact.html (full page reload)
```

#### SPA (Single Page Application)
- One HTML file for entire app
- JavaScript handles navigation
- No full page reloads
- Content changes dynamically
- Example: Gmail, Facebook, Twitter

```
/ → server sends index.html with React app
/home → JavaScript updates content (no reload)
/about → JavaScript updates content (no reload)
/contact → JavaScript updates content (no reload)
```

**Benefits of SPA**:
- Faster navigation (no full page reload)
- Better user experience
- Feels like a native app

**Drawbacks**:
- Initial load can be slower
- SEO challenges (solved with Next.js)
- More JavaScript to download

---

### 🤔 Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)

#### Client-Side Rendering (CSR) - Default React
Browser downloads JavaScript, then JavaScript builds the page.

```
1. Browser requests page
2. Server sends minimal HTML + React JavaScript
3. Browser downloads JavaScript
4. JavaScript runs and builds the page
5. User sees content
```

**Pros**: Interactive, dynamic
**Cons**: Slower initial load, SEO challenges

#### Server-Side Rendering (SSR) - Next.js
Server builds HTML and sends it ready to display.

```
1. Browser requests page
2. Server runs React and generates HTML
3. Server sends complete HTML
4. User sees content immediately
5. JavaScript loads and makes it interactive
```

**Pros**: Faster initial load, better SEO
**Cons**: More complex setup

---

### 🤔 npm vs npx

**npm** = Node Package Manager (installs and manages packages)
```bash
npm install react        # Install package
npm start               # Run script from package.json
```

**npx** = Node Package eXecute (runs packages without installing)
```bash
npx create-react-app my-app  # Run create-react-app without installing it globally
```

**Key difference**:
- `npm install -g create-react-app` → Installs globally, takes disk space
- `npx create-react-app my-app` → Runs latest version without installing

---

### 🤔 Dependencies vs DevDependencies

In `package.json`:

```json
{
  "dependencies": {
    "react": "^18.2.0"        // Needed in production
  },
  "devDependencies": {
    "eslint": "^8.0.0"        // Only needed during development
  }
}
```

**dependencies**: Required for your app to run (React, libraries)
**devDependencies**: Tools for development only (testing, linting, build tools)

---

### 🤔 Props Drilling Problem

**Props Drilling** = Passing props through many levels of components

```jsx
// ❌ Props Drilling Problem
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // Just passing through
}

function Child({ user }) {
  return <GrandChild user={user} />; // Just passing through
}

function GrandChild({ user }) {
  return <div>{user.name}</div>; // Finally used here!
}
```

**Solution**: Context API or State Management (Redux, Zustand)

```jsx
// ✅ Better with Context
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

function GrandChild() {
  const user = useContext(UserContext); // Direct access!
  return <div>{user.name}</div>;
}
```

---

## Setting Up React

### Method 1: Create React App (Recommended for beginners)
```bash
npx create-react-app my-app
cd my-app
npm start
```

### Method 2: Vite (Faster and modern)
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Basic Project Structure
```
my-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## JSX - JavaScript XML

JSX is a syntax extension for JavaScript that looks similar to HTML.

### Basic JSX Example
```jsx
const element = <h1>Hello, World!</h1>;
```

### JSX Rules:
1. **Single Parent Element**: Must return one parent element
```jsx
// ❌ Wrong
return (
  <h1>Hello</h1>
  <p>World</p>
);

// ✅ Correct
return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

// ✅ Or use Fragment
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);
```

2. **JavaScript Expressions in JSX**: Use curly braces `{}`
```jsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;

const result = <p>2 + 2 = {2 + 2}</p>; // Output: 2 + 2 = 4
```

3. **className instead of class**
```jsx
<div className="container">Content</div>
```

4. **camelCase for attributes**
```jsx
<button onClick={handleClick}>Click Me</button>
<label htmlFor="input-id">Label</label>
```

5. **Self-closing tags**
```jsx
<img src="image.jpg" alt="description" />
<input type="text" />
```

---

## Components

Components are independent, reusable pieces of UI. There are two types:

### 1. Functional Components (Modern & Recommended)
```jsx
// Simple functional component
function Welcome() {
  return <h1>Hello, Welcome!</h1>;
}

// Arrow function component
const Welcome = () => {
  return <h1>Hello, Welcome!</h1>;
};

// Using the component
function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}
```

### 2. Class Components (Legacy)
```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, Welcome!</h1>;
  }
}
```

**Note**: Functional components with hooks are the modern standard.

---

## Props

Props (properties) are how you pass data from parent to child components. They are **read-only**.

### Passing Props
```jsx
// Parent Component
function App() {
  return (
    <div>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </div>
  );
}

// Child Component
function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>You are {props.age} years old.</p>
    </div>
  );
}
```

### Destructuring Props
```jsx
// Cleaner approach
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

### Default Props
```jsx
function Greeting({ name = "Guest", age = 18 }) {
  return <h1>Hello, {name}! Age: {age}</h1>;
}
```

### Props Children
```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h1>Title</h1>
  <p>Content here</p>
</Card>
```

---

## State

State is a built-in object used to store data that changes over time. When state changes, the component re-renders.

### Using State with Hooks (useState)
```jsx
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Multiple State Variables
```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        placeholder="Age"
        type="number"
      />
    </div>
  );
}
```

### State with Objects
```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (name) => {
    setUser({ ...user, name }); // Spread operator to keep other properties
  };

  return (
    <div>
      <input 
        value={user.name} 
        onChange={(e) => updateName(e.target.value)} 
      />
    </div>
  );
}
```

---

## React Hooks

Hooks are functions that let you use state and other React features in functional components.

### 1. useState - Managing State
```jsx
const [state, setState] = useState(initialValue);
```

### 2. useEffect - Side Effects
Runs after render. Used for data fetching, subscriptions, timers, etc.

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Runs after every render
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

#### useEffect with Dependency Array
```jsx
// Runs only once (on mount)
useEffect(() => {
  console.log('Component mounted');
}, []);

// Runs when 'count' changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// Cleanup function (runs on unmount)
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup
  };
}, []);
```

### 3. useContext - Context API
```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

### 4. Common Hook Rules
- Only call hooks at the top level (not inside loops, conditions, or nested functions)
- Only call hooks from React functions (components or custom hooks)

---

## Event Handling

React events use camelCase naming and pass functions as event handlers.

### Click Events
```jsx
function ButtonExample() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}

// Inline
<button onClick={() => alert('Clicked!')}>Click Me</button>
```

### Event with Parameters
```jsx
function List() {
  const handleClick = (id) => {
    console.log('Item clicked:', id);
  };

  return (
    <button onClick={() => handleClick(1)}>Item 1</button>
  );
}
```

### Form Events
```jsx
function Form() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Submitted:', text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text} 
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Common Events
- `onClick` - Mouse click
- `onChange` - Input change
- `onSubmit` - Form submission
- `onMouseEnter` - Mouse enter
- `onMouseLeave` - Mouse leave
- `onKeyDown` - Key press
- `onFocus` - Input focus
- `onBlur` - Input blur

---

## Conditional Rendering

Display content based on conditions.

### 1. If-Else with Variables
```jsx
function Greeting({ isLoggedIn }) {
  let message;
  
  if (isLoggedIn) {
    message = <h1>Welcome back!</h1>;
  } else {
    message = <h1>Please sign in.</h1>;
  }
  
  return <div>{message}</div>;
}
```

### 2. Ternary Operator
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}
```

### 3. Logical && Operator
```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

### 4. Switch Statement
```jsx
function Status({ status }) {
  switch(status) {
    case 'loading':
      return <p>Loading...</p>;
    case 'error':
      return <p>Error occurred!</p>;
    case 'success':
      return <p>Success!</p>;
    default:
      return <p>Unknown status</p>;
  }
}
```

---

## Lists and Keys

Rendering multiple items using the `map()` function.

### Basic List
```jsx
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number}>{number}</li>
      ))}
    </ul>
  );
}
```

### List with Objects
```jsx
function UserList() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

### Extracting List Item Component
```jsx
function UserItem({ user }) {
  return (
    <li>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </li>
  );
}

function UserList() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  return (
    <ul>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
```

### Why Keys are Important
- Keys help React identify which items have changed, added, or removed
- Keys should be unique among siblings
- Use stable IDs, not array indices (if list can be reordered)

```jsx
// ❌ Avoid using index as key if list order can change
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ Use unique ID
{items.map((item) => <li key={item.id}>{item.name}</li>)}
```

---

## Component Lifecycle

### Functional Components (with hooks)

```jsx
import { useState, useEffect } from 'react';

function LifecycleExample() {
  const [count, setCount] = useState(0);

  // componentDidMount - runs once after first render
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // componentDidUpdate - runs after every render
  useEffect(() => {
    console.log('Component updated');
  });

  // componentDidUpdate - runs when 'count' changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // componentWillUnmount - cleanup function
  useEffect(() => {
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## Complete Example: Todo App

Here's a complete example combining all the concepts:

```jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>No todos yet. Add one above!</p>}
    </div>
  );
}

export default TodoApp;
```

---

## Best Practices

1. **Keep Components Small**: Each component should do one thing
2. **Use Functional Components**: Modern React favors functional components with hooks
3. **Proper Key Usage**: Use unique, stable IDs for list items
4. **Don't Mutate State**: Always use setState functions
5. **Use Descriptive Names**: Component and variable names should be clear
6. **Organize Files**: Group related components together
7. **Clean Up Effects**: Always clean up subscriptions, timers, etc.
8. **Avoid Inline Functions in JSX**: Can cause unnecessary re-renders

```jsx
// ❌ Avoid
<button onClick={() => handleClick()}>Click</button>

// ✅ Better
<button onClick={handleClick}>Click</button>
```

---

## Next Steps

Once you're comfortable with the basics, explore:
- **React Router** - Navigation and routing
- **Context API** - State management
- **Redux** - Advanced state management
- **Custom Hooks** - Reusable logic
- **React Query** - Data fetching
- **Styled Components** - CSS-in-JS
- **TypeScript with React** - Type safety
- **Testing** - Jest and React Testing Library
- **Performance Optimization** - useMemo, useCallback, React.memo

---

## Useful Resources

- [Official React Documentation](https://react.dev/)
- [React Tutorial](https://react.dev/learn)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

---

Happy Learning! 🚀
