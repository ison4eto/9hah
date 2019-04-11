import React, { Component } from 'react'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'
import observer from '../../core/infrastructure/observer'

import Comment from '../../core/models/Comment'

class CreateCommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = Comment.defaultState
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    addComment = (e) => {
        e.preventDefault()
        const error = Comment.validate(this.state)
        if (error) {
            observer.showNotification(400, error)
            return
        }
        let data = {
            content: this.state.content,
            title: this.state.title,
            memeId: this.props.memeId
        }
        Axios.post(BASE_URL + '/comment/upload', data)
            .then(res => {
                observer.showNotification(res.status, 'Comment added')
                this.props.getComments()
            }).catch(console.error)
    }
    
    render() {
        return (
            <form onSubmit={this.addComment}>
                        <input
                            type='text'
                            name='title'
                            onChange={this.handleChange}
                            value={this.state.title}
                            className='form-control input-sm chat-input'
                            placeholder='Write your title here...' />
                        <input
                            type='text'
                            name='content'
                            onChange={this.handleChange}
                            value={this.state.content}
                            className='form-control input-sm chat-input'
                            placeholder='Write your message here...' />

                        <button className='btn btn-primary btn-sm' type='submit'>Add Comment</button>
                    </form>
        )
    }
}

export default CreateCommentForm