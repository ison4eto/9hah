import React, { Component } from 'react'
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'


class UserNavigation extends Component {

    render() {
        let user = sessionStorage.getItem('username')
        if (!user) {
            return (
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink href='/login'>Log In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/register'>Register</NavLink>
                    </NavItem>
                </Nav>
            )
        }
        return (
            <Nav className='ml-auto' navbar>
                <NavItem>
                    <NavLink href='/admin/memes'>Welcome {user}!</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/logout'>Logout</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default UserNavigation
