import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import observer from '../../core/infrastructure/observer'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSearch = (e) => {
        e.preventDefault()
        if (!this.state.search) {
            observer.showNotification(400, 'Full in the such to get results')
            return
        }
        this.props.history.push('/search?q=' + this.state.search)

    }

    render() {
        return (
            <form className='navbar-form' role='search' onSubmit={this.handleSearch}>
                <div className='input-group'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search'
                        name='search'
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <div >
                        <button className='btn btn-default' type='submit'><i className='fa fa-search'></i></button>
                    </div>
                </div>
            </form>
        )
    }
}

export default withRouter(SearchForm)