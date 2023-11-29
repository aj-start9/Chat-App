import React from 'react';
import Backdrop from '../UI/Backdrop/backdrop'
const Modal = (props) => (
    <div style={{
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh',
        transform: ((props.error) || (props.submit)) ? 'translateY(0)' : 'translateY(-100vh)',
        transition: 'all 1s'
    }}>
        <Backdrop
            cancel={props.cancel} //function
            submit={props.submit}
            error={props.error} />
        {props.children}
    </div>
)

export default Modal;