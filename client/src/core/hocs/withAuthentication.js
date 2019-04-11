import React, {Component} from 'react'

export function withAuthorization(WrappedComponent, roles) {
    return class WithAuthorization extends Component {

        render = () => {
            let authtoken = sessionStorage.getItem('authtoken')
            if (authtoken) {
                return <WrappedComponent {...this.props} />
            } else {
                return <h1>Unauthorized</h1>
            }
        }
    }
}