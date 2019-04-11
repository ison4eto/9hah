import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { BASE_URL } from '../../../core/infrastructure/constants'
import observer from '../../../core/infrastructure/observer'

import Meme from '../../../core/models/Meme'
import CategoriesMultiselect from '../../categories/CategoriesMultiselect'

import '../../../styles/meme/unapprovedmeme.css'

class UnapprovedMeme extends Component {
    constructor() {
        super()
        this.state = Meme.defaultState
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteMeme = this.deleteMeme.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        axios.put(BASE_URL + '/meme/approve', this.state)
            .then(result => {
                observer.showNotification(result.status, 'Meme approved')
                this.props.getMemes()
            }).catch(console.error)


    }
    componentDidMount() {
        let meme = {
            _id: this.props._id,
            title: this.props.title,
            imageUrl: this.props.imageUrl,
            ratings: this.props.ratings,
            categories: this.props.categories,
            approved: this.props.approved,
            date: this.props.date
        }
        this.setState(meme)
    }

    handleChange(e) {
        if (!e.target) {
            let categories = []
            e.forEach(e => {
                categories.push(e.label)
            })
            this.setState({ categories })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }

    }

    deleteMeme() {
        axios.post(BASE_URL + '/meme/unapprove', { _id: this.state._id })
            .then((res) => {
                observer.showNotification(res.status, 'Meme unapproved')
                this.props.getMemes()
            })
            .catch(console.error)
    }

    render() {
        return (

            <div className='meme'>

                <form className='col' onSubmit={this.handleSubmit}>
                    <div className='form-row justify-content-md-center'>
                        <label className='col-sm-2 col-lg-1 col-form-label' htmlFor='title'>Title</label>
                        <input
                            type='text'
                            className='form-control col-sm-5'
                            name='title'
                            id='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='form-row justify-content-md-center'>
                        <label className='col-sm-2 col-lg-1 col-form-label categories' htmlFor='categories'>Categories</label>
                        <CategoriesMultiselect handleChange={this.handleChange} />
                    </div>
                    <div className='form-row justify-content-md-center'>
                        <button type='submit' className='btn btn-success col-sm-3 col-4 col-form-label'>Approve</button>
                        <button type='button' onClick={this.deleteMeme} className='btn btn-danger col-sm-3 col-4 col-form-label'>Delete</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default withRouter(UnapprovedMeme)