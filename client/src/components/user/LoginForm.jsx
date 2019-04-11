import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import observer from '../../core/infrastructure/observer'
import { BASE_URL } from '../../core/infrastructure/constants'

import '../../styles/common/authform.css'
import GoogleLog from './GoogleLog';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isValid = this.isValid.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        if (!this.isValid()) {
            observer.showNotification(400, 'Please fill in all fields')
            return
        }
        axios.post(BASE_URL + '/login', this.state)
            .then(result => {
                sessionStorage.setItem('username', result.data.username)
                sessionStorage.setItem('authtoken', result.data.Authentication)
                observer.showNotification(result.status, 'Logged in successfully')
                this.props.history.push('/')
            }).catch(err => {
                if (err.response.status === 404 || err.response.status === 400) {
                    observer.showNotification(err.response.status, 'Invalid Credentials')
                    return
                }
                console.log(err)
            })
    }

    handleChange(e) {
        let fieldName = e.target.name
        let fieldValue = e.target.value
        this.setState({ [fieldName]: fieldValue })
    }

    isValid() {
        return this.state.username.length !== 0 ||
            this.state.password.length !== 0
    }


    render() {
        return (
            <div className='card bg-light'>
                <article className='card-body mx-auto'>
                    <h4 className='card-title mt-3 text-center'>
                        Log In
                    </h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group input-group'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>
                                    <i className='fa fa-user' />
                                </span>
                            </div>
                            <input
                                name='username'
                                className='form-control'
                                placeholder='Username'
                                type='text'
                                value={this.state.username}
                                onChange={this.handleChange}
                                onFocus={this.validateInput}
                            />
                        </div>
                        <div className='form-group input-group'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>
                                    <i className='fa fa-lock' />
                                </span>
                            </div>
                            <input
                                name='password'
                                className='form-control'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
                                onFocus={this.validateInput}
                            />
                        </div>
                        <div className='form-group'>
                            <button
                                type='submit'
                                className='btn btn-primary btn-block'
                                disabled={!this.isValid()}
                            >
                                Log In
                            </button>
                        </div>
                        <p className='text-center'>
                            Don't have an account?
                            <Link className='badge badge-light' to='/register'>
                                Register
                            </Link>
                        </p>
                    </form>
                        <GoogleLog />
                </article>
            </div>
        )
    }
}

export default withRouter(LoginForm)