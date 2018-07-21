import * as React from 'react';
import {Link} from "react-router-dom";

// noinspection JSUnusedLocalSymbols
export const About = props => {
    return (
        <div>
            <Link to={'/'}>Home</Link>
            <h2>All about me</h2>
        </div>
    );
};