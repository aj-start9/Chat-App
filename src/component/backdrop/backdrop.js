import React from 'react';
import classes from './backdrop.module.css';

const RecordingBackdrop = (props) =>
    (((props.error)||(props.submit)) ?
        <div className={classes.main_div}
            onClick={() => {
                props.cancel();
            }}>
        </div> : null
    )


export default RecordingBackdrop