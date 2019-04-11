import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'

import UserNavigation from './UserNavigation'
import SearchForm from './SearchForm'

import '../../styles/common/navigation.css'

class Navigationbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getCategories = () => {
        Axios.get(BASE_URL + '/category/all')
            .then(res => {
                this.setState({ categories: res.data })
            }).catch(console.error)
    }
    renderCategories = () => {
        return this.state.categories.map((p) =>
            <DropdownItem key={p.name} href={`/category/${p.name}`}>
                {p.name}
            </DropdownItem>)
    }
    componentDidMount() {
        this.getCategories()
    }

    render() {
        const adminCategory = (
            <div>
                <DropdownItem divider />
                <DropdownItem href={'/admin/categories'}>
                    All
                </DropdownItem>
            </div>
        )
        return (
            <div>
                <Navbar color='light' light expand='md'>
                    <NavbarBrand href='/'>9hah</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink href='/home'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/meme/create'>New Meme</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/meme/generate'>Meme Generator</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Categories
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.categories ? this.renderCategories() : null}
                                    {sessionStorage.getItem('authtoken') ? adminCategory : null}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem >
                                <SearchForm />
                            </NavItem>
                        </Nav>
                        <UserNavigation />
                    </Collapse>

                </Navbar>
            </div>
        )

    }
}

export default withRouter(Navigationbar)