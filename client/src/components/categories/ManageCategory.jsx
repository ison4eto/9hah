import React, { Component } from 'react'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'
import observer from '../../core/infrastructure/observer'

import CategoryListItem from './CategoryListItem'

class ManageCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            category: ''
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
        Axios.post(BASE_URL + '/category', {category: this.state.category})
            .then(res => {
                observer.showNotification(res.status, 'Category added successfully')
                this.setState({
                    category: '',
                    categories: this.getCategories()
                })
            }).catch(err =>{
                observer.showNotification(406, 'This category is already added')
            })
    }
    getCategories = () => {
        Axios.get(BASE_URL+'/category/all')
            .then(res=>{
               this.setState({categories: res.data})
            }).catch(console.error)
    }
    componentDidMount() {
        this.getCategories()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='category'
                        label='Add new category'
                        value={this.state.category}
                        onChange={this.onChange}
                    />
                    <button type='submit'>Add</button>
                </form>
                <div className='categories-table'>
                    <table>
                        {this.state.categories ? this.state.categories.map((p) => <CategoryListItem key={p.name} getCategories={this.getCategories}{...p}/>): null}
                    </table>
                </div>
            </div>
        )
    }
}

export default ManageCategories