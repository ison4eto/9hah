import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import observer from '../../core/infrastructure/observer';

class GoogleLog extends Component {
    loginGoogle = (googleUser) => {
        sessionStorage.setItem('username', googleUser.getBasicProfile().getName())
        sessionStorage.setItem('authtoken', googleUser.getAuthResponse().id_token)
        observer.showNotification(200, 'Logged in successfully')
        this.props.history.push('/')
    }
    errorGoogle = (res) => {
        console.log(res)
    }
    render() {
        return (
            <span className='social-outer'>
                <GoogleLogin
                    className='google social'
                    clientId='201062189284-rbj4oqn541jt52t2q0n7mmrm5qdshn1j.apps.googleusercontent.com'
                    buttonText='Login'
                    onSuccess={this.loginGoogle}
                    onFailure={this.errorGoogle}
                />
            </span>
        );
    }
}

export default withRouter(GoogleLog);