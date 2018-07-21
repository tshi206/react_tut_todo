import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {TodoItem} from "./todoitem/TodoItem"; // see : https://stackoverflow.com/questions/33956201/how-to-import-and-export-components-using-react-es6-webpack
import {AddItem} from "./additem/AddItem";
import {About} from "./about";

// require css
require('./css/index.css');

class App extends React.Component{

    render() {
        // see https://github.com/ReactTraining/react-router/issues/4105
        return (
            <Router>
                <Switch>
                    <Route exact={true} path={'/'} component={ () => <TodoComponent msg="I LIKE BURGER" burger={myBurger} /> } />
                    <Route path={'/about'} component={About}/>
                </Switch>
            </Router>
        );
    }

}

// Create component
class TodoComponent extends React.Component {

    // initialize state
    constructor(props) {
        super(props);
        // add properties in the state object
        // all react component has a builtin 'state' property which is an object
        this.state = {
            todos : ["wash up", "eat burgers", 'take a nap', 'buy burgers'],
            currentTime : 0
        };

        // start timer
        this.timer();

        // see comments in https://www.youtube.com/watch?v=iUPWpXsmuaM&list=PL4cUxeGkcC9i0_2FF-WhtRIfIJ1lXlTZR&index=11
        // ES6 React.Component doesn't auto bind methods to itself. See also : https://stackoverflow.com/questions/33973648/react-this-is-undefined-inside-a-component-function
        // We need to use explicit binding because 'this' only holds valid reference to the component class WITHIN template/predefined method (e.g., constructor(), render(), etc.). For more details see comments for TodoItem's constructor
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    // lifecycle methods
    componentWillMount() {
        // after constructor(), this gets called BEFORE render()
        console.log("component will mount")
    }

    componentDidMount() {
        // this gets called after render()
        console.log("component mounted")
        // good for grabbing of external data
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // console.log("component will update");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("component did update");
        // good for sending network requests
    }

    // little timer method
    timer() {
        setInterval(() => {
            this.setState({
               currentTime : new Date().toTimeString()
            });
        }, 1000);
    };

    // implement the mandatory method (or 'override' if you like)
    render() {

        // local variable todos
        let todos = this.state.todos;
        todos = todos.map((item, index) => {
            return(
                <TodoItem item={item} key={index} onDelete={ this.onDelete }/>
            );
        }); // return an array of JSX elements, 'key' is a predefined property of react elements, it serves as a unique identifier for that component just like 'id' property for html elements. Because we will output multiple instances of the TodoItem class as JSX elements, React needs a way to uniquely identify any of them so that it can render individual updates for each TodoItem element respectively, then the 'key' property comes to play.

        // noinspection JSUnresolvedVariable
        return ( // JSX goes here, at most one root element, everything must be wrapped in the root element, can't have multiple top-level elements
            // every react component has a built in property (or 'field' if you like) called 'props' which we can use to serve data binding
            // JSX does not allow comment tags :(
            <div>
                <h1>Hello World</h1>
                <p>test</p>
                <p>{this.props.msg}</p>
                <p><strong>
                    Burger name: {this.props.burger.name}
                </strong></p>
                <p><strong>
                    Burger smell factor: {this.props.burger.smellFactor}
                </strong></p>
                <p><strong>
                    Burger price: {this.props.burger.price}
                </strong></p>
                <p><strong>
                    time: {this.state.currentTime}
                </strong></p>
                <div id="todo-list">
                    <Link to={'/about'}>About</Link>
                    <p onClick={TodoComponent.clicked}>The busiest people have the most leisure...</p>
                    <ul>
                        {todos}
                    </ul>
                    <AddItem onAdd={this.onAdd}/>
                </div>
            </div>
        );
    }

    // event handler methods
    static clicked() {
        alert("you clicked me!!!!!");
    }

    onDelete(item) {
        let updatedTodos = this.state.todos.filter( val => {
            return val !== item;
        });
        this.setState({
            todos: updatedTodos
        })
    }

    onAdd(item) {
        let updatedTodos = this.state.todos;
        updatedTodos.push(item);
        this.setState({
            todos: updatedTodos
        });
    }

}

let myBurger = {
    name : "smoky children ultimate",
    smellFactor : "Extreme punk",
    price : "14.50"
};

// put component into html page
// when referencing variables/objects we use curly braces, e.g., burger={myBurger}
ReactDOM.render(<App/>, document.getElementById("todo-wrapper"), () => console.log("it works"));