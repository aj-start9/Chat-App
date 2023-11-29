import React, { useEffect, useState } from 'react'
import classes from './messages.module.css'
import jwt_decode from "jwt-decode";
import firebase_config from './../../shared/firebase'

const MessagesHistory = (props) => {
    const [messages, setMessages] = useState([])
    const decoded = jwt_decode(localStorage.getItem('token'));

    useEffect(() => {
        firebase_config.database().ref('messages')
            .on('value', data => {
                let temp = []
                const messages = data.val()
                console.log(messages)
                for (let key in messages) {
                    if (messages[key].from === decoded.email || messages[key].to === decoded.email)
                        temp.push({ ...messages[key] })
                }
                setMessages(temp)
            })

    }, [])
    console.log(props.currentuser)
    return [].concat(messages).reverse().map(item => (
        <div
            style={{
                display: ((props.currentuser === item.from) || (props.currentuser === item.to))
                    ? 'flex' : 'none'
            }}
            className={"message"} key={item.id}>
            {console.log(item)}
            {
                props.currentuser ? <div
                    style={{ marginLeft: item.from === decoded.email ? 'auto' : '1%' }}
                    class="message-body">
                    {item.text}
                </div> : null
            }

        </div>
    ));
}


export default MessagesHistory