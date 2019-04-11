import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import observer from '../../core/infrastructure/observer'
import { BASE_URL } from '../../core/infrastructure/constants'

import Meme from '../../core/models/Meme'

import '../../styles/meme/creatememe.css'

class CreateMeme extends Component {
    constructor() {
        super()
        this.state = Meme.defaultState
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()

        const error = Meme.validate(this.state)
        if (error) {
            observer.showNotification(400, error)
            return
        }
        console.log(this.state)
        let formData = new FormData()
        for (let key in this.state) {
            if(key === 'file')
                continue
            formData.append(key, this.state[key])
        }
        axios.post(BASE_URL + '/meme/upload', formData)
            .then((result) => {
                observer.showNotification(result.status, 'You successfully added a meme for approvision')
                this.setState(Meme.defaultState)
            })
            .catch(err => {
                console.error(err)
            })

    }

    handleChange(e) {
        switch (e.target.name) {
            case 'selectedFile':
                this.setState({
                    selectedFile: e.target.files[0],
                    file: URL.createObjectURL(e.target.files[0]),
                    imageUrl: e.target.files[0].name
                })
                break
            default:
                this.setState({ [e.target.name]: e.target.value })
        }
    }
    render() {
        const error = this.state.title.length === 0 ||
            this.state.imageUrl.length === 0
        return (
            <div className='card bg-light'>
                <article className='card-body'>
                    <h4 className='card-title mt-3 text-center'>
                        Create New Meme
              </h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group input-group'>
                            <input
                                name='title'
                                className='form-control'
                                placeholder='Title'
                                type='text'
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <img className='meme-preview' src={this.state.file} alt=''/>

                        <div className='form-group input-group'>
                            <input
                                name='selectedFile'
                                className='form-control'
                                type='file'
                                accept='image/*'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='form-group create-meme'>
                            <button
                                type='submit'
                                className='btn btn-primary btn-block'
                                disabled={error}
                            >
                                Create
                    </button>
                        </div>
                    </form>
                </article>
            </div >
        )
    }

}

export default withRouter(CreateMeme)



