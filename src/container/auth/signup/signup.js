import React, { Component } from 'react';
import classes from './signup.module.css'
import SubmitBtn from '../../../component/button/button'
import firebase_config from '../../../shared/firebase'
import { Link } from "react-router-dom"
import axios from 'axios'

class Signup extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        error_text: '',
        error: false,
        submit: false,
        loader: false
    }

    data_update = (itemkey, itemvalue) => {
        this.setState({ [itemkey]: itemvalue })
    }

    onSubmit = (e) => {
        console.log(this.state)
        e.preventDefault()
        if ((this.state.email === '') || (this.state.password === '') || (this.state.name === '')) {
            alert('Please fill Email or Password or name')
            return
        }
        if (this.state.password.length < 6) {
            alert('Password should have at least 6 character')
            return
        }
        const data = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }

        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMaH0wvi5j-kOAcxjl3UAlP6ykKnHY7G4`, data)
            .then(res => {
                const new_data = {
                    name: this.state.name,
                    email: this.state.email,
                }
                axios.post(`https://chat-app-4ee30-default-rtdb.firebaseio.com//users.json?auth=${res.data.idToken}`, new_data)
                    .then(res => {
                        this.props.history.push('/login')
                    })
                    .catch(err => {
                        alert('Error', err.message)
                    })
            })
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }

    render() {
        return (
            <div className={classes.main_div} >
                <div className={classes.card}>
                    <p className={classes.login_text}>Signup</p>
                    <form onSubmit={this.onSubmit}>
                        <div class={['form-group', classes.input_div].join(' ')} style={{ marginBottom: 40 }}>
                            <label className={classes.label_custom} for="exampleInputEmail1">Name</label><br></br>
                            <input type="text" className={['form-control', classes.custom_input].join(' ')} id="exampleInputEmail1"
                                aria-describedby="name" placeholder="Enter email" value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })} />
                        </div>
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
                        <Link to="/">for Login</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;

