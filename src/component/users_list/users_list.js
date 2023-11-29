import React, { useEffect, useState } from 'react'
import firebase_config from './../../shared/firebase'
import classes from './users_list.module.css'
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

const ContactList = (props) => {

    const [users, setUsers] = useState([])
    const decoded = jwt_decode(localStorage.getItem('token'));

    useEffect(() => {
        firebase_config.database().ref('users')
            .on('value', data => {
                let temp = []
                const users = data.val()

                for (let key in users) {
                    if (decoded.email !== users[key].email)
                        temp.push({ ...users[key] })
                }
                setUsers(temp)
                temp.length > 0 && props.onCurrentUser(temp[0].email)

            })
    }, [])

    const onLogout = () => {
        firebase_config.database().ref('users').orderByChild('email').equalTo(decoded.email)
            .once('value', data => {
                console.log(data)
                firebase_config.database().ref(`users/${Object.keys(data.val())}`).update({ status: 'inactive' })
                    .then(res => {
                        firebase_config.auth().signOut()
                            .then(function () {
                                localStorage.clear()
                                props.history.replace('/')
                            })
                            .catch(function (error) {
                                // An error happened
                            });

                    })
            })
    }

    return (
        <React.Fragment>
            {
                users.length === 0 ? <p style={{
                    color: 'green', marginLeft: '10px'
                }}>You do not have any Contacts</p> :
                    <ul className={classes.list}>
                        {users.map(item => (
                            <div className={classes.user_sub}>
                                <div className={classes.image}>
                                    {item.name[0].toUpperCase()}
                                    <div
                                        style={{ display: item.status === 'active' ? 'flex' : 'none' }}
                                        className={classes.dot}>

                                    </div>
                                </div>
                                <li
                                    style={{ backgroundColor: props.currentuser === item.email ? '#ccc' : 'transparent' }}
                                    className={classes.main} onClick={() => props.onCurrentUser(item.email)}>
                                    {item.name}
                                </li>
                            </div>

                        ))}
                    </ul>}
            <div className={classes.account_info}>
                <p>My Account</p>
                {decoded.email}
                <div onClick={onLogout} className={classes.logout}>Logout</div>
            </div>
        </React.Fragment>

    )
}


export default withRouter(ContactList)