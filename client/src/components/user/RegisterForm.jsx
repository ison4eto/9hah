import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import observer from '../../core/infrastructure/observer'
import { BASE_URL } from '../../core/infrastructure/constants'
import User from '../../core/models/User'

import '../../styles/common/authform.css'
import GoogleLog from './GoogleLog';

class RegisterForm extends Component {
    constructor() {
        super()
        this.state = User.defaultState
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const error = User.validate(this.state)
        if (error) {
            observer.showNotification(400, error)
            return
        }
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(BASE_URL + '/register', data)
            .then(result => {
                console.log(result)
                sessionStorage.setItem('username', result.data.username)
                sessionStorage.setItem('authtoken', result.data.Authentication)
                observer.showNotification(result.status, 'User registered successfully')
                this.props.history.push('/')
            }).catch(err => {
                console.log(err)
                if (err.response.status === 409) {
                    observer.showNotification(err.response.status, 'User with given username already exists')
                    return
                }
                observer.showNotification(err.response.status, 'Error')
            })

    }

    handleChange(e) {
        let fieldName = e.target.name
        let fieldValue = e.target.value
        this.setState({ [fieldName]: fieldValue })

    }

    render() {
        return (
            <div className='card bg-light'>
                <article className='card-body mx-auto'>
                    <h4 className='card-title mt-3 text-center'>
                        Create Account
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
                            />
                        </div>
                        <div className='error' hidden={!this.state.username}>
                            {User.validateUsername(this.state.username)}
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
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='error' hidden={!this.state.password}>
                            {User.validatePassword(this.state.password)}
                        </div>
                        <div className='form-group input-group'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>
                                    <i className='fa fa-lock' />
                                </span>
                            </div>
                            <input
                                name='passwordRep'
                                className='form-control'
                                placeholder='Repeat password'
                                value={this.state.passwordRep}
                                onChange={this.handleChange}
                                type='password' />
                        </div>
                        <div className='error' hidden={!this.state.passwordRep}>
                            {User.validatePasswordRep(this.state.password, this.state.passwordRep)}
                        </div>
                        <div className='form-group'>
                            <button
                                type='submit'
                                className='btn btn-primary btn-block'
                                disabled={User.validate(this.state)}
                            >
                                Create Account
                            </button>
                        </div>
                        <p className='text-center'>
                            Have an account?
                            <Link className='badge badge-light' to='/login'>Log In</Link>
                        </p>
                    </form>
                    <GoogleLog />
                </article>
            </div>
        )
    }
}

export default withRouter(RegisterForm)
