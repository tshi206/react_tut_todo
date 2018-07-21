import * as React from 'react';

require("../css/addItem.css");

export class AddItem extends React.Component {

    constructor(props) {
        super(props);

        // create ref for JSX element
        // see https://stackoverflow.com/questions/43873511/deprecation-warning-using-this-refs
        // see also https://reactjs.org/docs/refs-and-the-dom.html
        this.textRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form id="add-todo" onSubmit={this.handleSubmit}>
                <input type="text" required ref={this.textRef} />
                <input type="submit" value="Hit me" />
            </form>
        );
    }

    //custom method
    handleSubmit(e) {
        e.preventDefault(); // e is the event obj, preventDefault() under this context will stop the page from reloading itself since the default event of a form upon submission is to reload the page (the event listener we registered is 'onSubmit') and we don't want it to happen in this component.
        console.log(this.textRef.current);
        console.log(this.textRef.current.value);
        this.props.onAdd(this.textRef.current.value);
    }

}