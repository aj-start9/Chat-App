import React, { Component } from 'react';
import classes from './login.module.css'
import SubmitBtn from '../../../component/button/button'
import firebase_config from '../../../shared/firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from "react-router-dom"
import axios from 'axios'

class Login extends Component {
    state = {
        email: '',
        password: '',
        error_text: '',
        error: false,
        submit: false,
        loader: false
    }

    data_update = (itemkey, itemvalue) => {
        this.setState({ [itemkey]: itemvalue })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if ((this.state.email === '') || (this.state.password === '')) {
            alert('Please fill Email or Password')
            return
        }
        this.setState({ submit: true, loader: true })
        firebase_config.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                    .then(res => {
                        const idToken = res
                        localStorage.setItem('token', idToken)
                        localStorage.setItem('type', 'email')
                        this.updateStatus({email:this.state.email})
                    })
            })
            .catch(err => {
                alert(err.message)
                this.setState({ loader: false, submit: false, error: true, error_text: err.message })
            })
    }

    updateStatus = (user_data) => {
        firebase_config.database().ref('users').orderByChild('email').equalTo(user_data.email)
            .once('value', data => {
                if (data.val() === null) {
                    firebase_config.database().ref('users').push(user_data)
                        .then(res => {
                            this.props.history.push('/chat')
                        })
                        .catch(err => {
                            alert('Error', err.message)
                        })
                }
                else {
                    firebase_config.database().ref(`users/${Object.keys(data.val())}`).update({ status: 'active' })
                        .then(res => {
                            this.props.history.push('/chat')
                        })
                }
            })
    }

    googleAuth = (e) => {
        e.preventDefault()
        const auth = firebase.auth();
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        auth.signInWithPopup(provider)
            .then(res => {
                localStorage.setItem('token', res.credential.idToken)
                localStorage.setItem('type', 'google')
                console.log(res)
                const user_data = {
                    name: res.user.displayName,
                    email: res.user.email,
                    status: 'active'
                }
                this.updateStatus(user_data)
            })
            .catch(err => {
                alert(err.message)
            })
    }

    render() {
        return (
            <div className={classes.main_div} >
                <div className={classes.card}>
                    <p className={classes.login_text}>Login</p>
                    <form >
                        <div class={['form-group', classes.input_div].join(' ')} style={{ marginBottom: 40 }}>
                            <label className={classes.label_custom} for="exampleInputEmail1">Email</label><br></br>
                            <input type="email" className={['form-control', classes.custom_input].join(' ')} id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })} />
                        </div>
                        <div class={['form-group', classes.input_div].join(' ')} >
                            <label className={classes.label_custom} for="exampleInputPassword1">Password</label><br></br>
                            <input type="password" class="form-control" className={['form-control', classes.custom_input].join(' ')}
                                id="exampleInputPassword1" placeholder="Password" value={this.state.password}
                                onChange={(e) => this.data_update('password', e.target.value)} />
                        </div>
                        <div className={classes.btn_div}>
                            <SubmitBtn onSubmit={this.onSubmit} text="Submit" />
                        </div>
                        <div className={classes.google_login}>
                            <SubmitBtn text="Sign with Google" onSubmit={this.googleAuth} />
                        </div>
                        <Link to="/signup">for Signup</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;

