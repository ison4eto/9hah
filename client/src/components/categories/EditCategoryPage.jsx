import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'
import observer from '../../core/infrastructure/observer'

import CategoryPage from './CategoryPage'

class EditCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: this.props.match.params.name
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (!this.state.category) {
            observer.showNotification(406, 'Please submit a category')
            return
        }
        Axios.post(BASE_URL + `/category/edit/${this.props.match.params.name}`, { name: this.state.category })
            .then(res => {
                observer.showNotification(res.status, `Category eddited successfully. ${res.data.memesModified}`)
                this.props.history.push('/admin/categories')
            }).catch(console.error)
    }
    return = () => {
        observer.showNotification(200, `You canceled the editing of ${this.props.match.params.name} category`)
        this.props.history.push('/admin/categories')
    }
    render() {
        return (
            <div>
                <p>Are you sure you want to change the category?
                    <button className='btn btn-info' onClick={this.return}>Go back</button>
                </p>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='category'
                        value={this.state.category}
                        onChange={this.onChange}
                    />
                    <button type='submit'>Change</button>
                </form>
                <p>These are all memes in this category:</p>
                <CategoryPage {...this.props} />
            </div>
        )
    }
}

export default withRouter(EditCategoryPage)