import React, { useState } from 'react'
import UsersList from './../../component/users_list/users_list'
import MessagesHistory from './../../component/messages/messages'
import jwt_decode from "jwt-decode";
import firebaase_config from './../../shared/firebase'

const ChatApp = () => {

    const [currentuser, setCurrentuer] = useState(null)
    const [message, setMessage] = useState("")
    const decoded = jwt_decode(localStorage.getItem('token'));

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.length) {
            return;
        }
        const newMessage = {
            text: message,
            id: Date.now(),
            from: decoded.email,
            to: currentuser
        };
        firebaase_config.database().ref('messages').push(newMessage)
            .then(res => {
                setMessage(" ")
            })
            .catch(err => {
                alert(err.message)
            })

    }


    return (
        <div class="app">
            <div class="contact-list">
                <h1 class="title">My messages</h1>
                <UsersList onCurrentUser={(email) => { setCurrentuer(email) }}
                    currentuser={currentuser} />
            </div>
            <div class="messages">
                <div class="messages-history">
                    <MessagesHistory currentuser={currentuser} />
                </div>
                {currentuser ? <form class="messages-inputs" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Send a message" onChange={handleChange} value={message} />
                    <button ><i style={{color:'white'}} class="material-icons">send</i></button>
                </form> : null}
            </div>
        </div>
    );
}

export default ChatApp

