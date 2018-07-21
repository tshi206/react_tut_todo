import * as React from "react";

// require css
require('../css/todoItem.css');

export class TodoItem extends React.Component{

    /**
     * IMPORTANT NOTICE:
     * keyword 'this' is only referred to the enclosing class if and only if it is accessed FROM WITHIN template methods (e.g., constructor(), render(), etc.). Custom methods cannot access 'this' by default, one way to fix this is explicitly bind 'this' to every custom methods within template methods. In this case, we bind 'this' to our custom method in the constructor in which we can access the valid 'this'. For example, in constructor (or any template/predefined methods of React), go:
     *      this.myCustomMethod = this.myCustomMethod.bind(this);
     *  Another way to get around this is change the way you reference the custom methods WITHIN render() since render() is one of the template/predefined method where 'this' is a reference to the component class. For example, change the following:
     *      <span className="my-element" onClick={this.myCustomMethod}> my element </span>
     *  To this:
     *      <span className="my-element" onClick={ () => this.myCustomMethod }> my-element </span>
     *  This is essentially define an inline lambda (anonymous function) in which you will have a valid 'this' for your reference and the actual invocation (and execution) of the custom method occurs WITHIN this lambda RATHER THAN somewhere OUTSIDE the render() method.
     *  HOWEVER, the second way might not work sometimes, hence the first way of explicit binding is recommended as per official documentation says
      */
    constructor(props) {
        super(props);
        // see comments in https://www.youtube.com/watch?v=iUPWpXsmuaM&list=PL4cUxeGkcC9i0_2FF-WhtRIfIJ1lXlTZR&index=11
        // ES6 React.Component doesn't auto bind methods to itself. See also : https://stackoverflow.com/questions/33973648/react-this-is-undefined-inside-a-component-function
        this.handleDelete = this.handleDelete.bind(this); // bind TodoItem class to this method, otherwise js won't be able to recognize the correct 'this', just need to get used to it
    }

    render() {
        return (
            <li>
                <div className="todo-item">
                    <span className="item-name">
                        {this.props.item}
                    </span>
                    <span className="item-delete" onClick={this.handleDelete}> x </span>
                </div>
            </li>
        );
    }

    // custom event handler methods
    handleDelete() {
        console.log(this);
        console.log(this.props);
        console.log(this.props.item);
        console.log(this.props.onDelete);
        this.props.onDelete(this.props.item);
    }

}