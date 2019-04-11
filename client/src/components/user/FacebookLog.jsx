import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import observer from '../../core/infrastructure/observer';

class FacebookLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    click = () => {
        this.setState({ cliced: true }, this.responseFacebook)
    }

    loginFacebook = (facebookUser) => {
        sessionStorage.setItem('username', facebookUser.name)
        sessionStorage.setItem('authtoken', facebookUser.accessToken)

    }
    errorFacebook = (facebookUser) => {

    }

    responseFacebook = (facebookUser) => {
        if (this.state.clicked) {
            sessionStorage.setItem('username', facebookUser.name)
            sessionStorage.setItem('authtoken', facebookUser.accessToken)
            observer.showNotification(200, 'Logged in successfully')
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <FacebookLogin
                cssClass='facebook social'
                appId='928690664185988'
                autoLoad={true}
                textButton='Login'
                fields='name,email'
                onClick={this.click}
                callback={this.responseFacebook} />
        );
    }
}

export default withRouter(FacebookLog);