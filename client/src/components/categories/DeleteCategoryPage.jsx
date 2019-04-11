import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'
import observer from '../../core/infrastructure/observer'

import CategoryPage from './CategoryPage'

class DeleteCategoryPage extends Component {
    deleteCategory = () => {
        Axios.post(BASE_URL + `/category/delete/${this.props.match.params.name}`)
            .then(res => {
                observer.showNotification(res.status, `Category deleted. ${res.data.memesModified}`)
                this.props.history.push('/admin/categories')
            }).catch(console.error)
    }
    return = () => {
        observer.showNotification(200, `You canceled the deleting of ${this.props.match.params.name} category`)
        this.props.history.push('/admin/categories')
    }
    render() {
        return (
            <div>
                <p>Are you sure you want to delete the category?
                    <button className='btn btn-danger' onClick={this.deleteCategory}>Yes</button>
                    <button className='btn btn-info' onClick={this.return}>No</button>
                </p>
                <p>These are all memes in this category:</p>
                <CategoryPage {...this.props} />
            </div>
        )
    }
}

export default withRouter(DeleteCategoryPage)