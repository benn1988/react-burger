import React from 'react';

import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;

    // Making the form element more general, we pass in the element type through props
    // and we output the element using a switch statement
    // Pass all the other properties through props, by using the spread operator
    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
                />
            break;
        case 'textarea':
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
                />
            break;
        case 'select':
            inputElement = <select
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            value={option.value}
                            key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
                />
    }

    return (
        <div className={classes.Input}>
            <label>
                {inputElement}
            </label>
        </div>
    )
};

export default input;