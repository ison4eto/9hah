import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Logout extends Component {
    logout = () => {
        sessionStorage.removeItem('authtoken')
        sessionStorage.removeItem('username')
    }

    render = () => {
        this.logout()
        return <Redirect to='/login' />
    }
}

export default withRouter(Logout)