import React from 'react';
import classes from './button.module.css';

const Submit = (props) => {
    return (
        <button type="submit" className={classes.btn_custom} onClick={props.onSubmit}>
            <span className={classes.record}>{props.text}</span>
        </button>
    )
}

export default Submit