import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

import { BASE_URL } from '../../../core/infrastructure/constants'
import observer from '../../../core/infrastructure/observer'

import Meme from '../../../core/models/Meme'
import CategoriesMultiselect from '../../categories/CategoriesMultiselect'

class ManageSingleMeme extends Component {
    memeId = this.props.match.params.id
    constructor(props) {
        super(props)
        this.state = Meme.defaultState
    }
    handleChange = (e) => {
        if (!e.target) {
            let categories = []
            e.forEach(e => {
                categories.push(e.label)
            })
            this.setState({ categories })
        }
        else {
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

    }
    handleSubmit = (e) => {
        e.preventDefault()
        const error = Meme.validate(this.state)
        if (error) {
            observer.showNotification(400, error)
            return
        }
        console.log(this.state.categories)
        let formData = new FormData()
        for (let key in this.state) {
            if (key === 'file')
                continue
            formData.append(key, this.state[key])
        }
        Axios.put(BASE_URL + '/meme/edit/' + this.memeId, formData)
            .then(result => {
                observer.showNotification(result.status, 'Meme changed')
                this.props.history.push('/meme/details/' + this.memeId)
            }).catch(console.error)


    }


    getMeme = () => {
        Axios.get(BASE_URL + '/meme/' + this.memeId)
            .then(res => {
                this.setState(res.data)
            })
            .catch(console.error)
    }
    componentDidMount() {
        this.getMeme()
    }
    getDefaultCategories = () => {
        let selected = this.state.categories
        let data = []
        selected.forEach(e => {
            data.push({
                value: e,
                label: e
            })
        })
        return data

    }
    


    render() {
        return (
            <div className='card bg-light'>
                <article className='card-body'>
                    <h4 className='card-title mt-3 text-center'>
                        Edit meme
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
                        <img className='meme-preview' src={this.state.file ? this.state.file : `/uploads/${this.state.imageUrl}`} alt='meme' />
                        <div className='form-group input-group'>
                            <input
                                name='selectedFile'
                                className='form-control'
                                type='file'
                                accept='image/*'
                                onChange={this.handleChange}
                            />
                        </div>
                        {this.state.categories.length === 0 ? <CategoriesMultiselect handleChange={this.handleChange} /> : null}
                        {this.getDefaultCategories().length > 0 ? <CategoriesMultiselect handleChange={this.handleChange} selected={this.getDefaultCategories()} /> : null}

                        <div className='form-group create-meme'>
                            <button
                                type='submit'
                                className='btn btn-primary btn-block'

                            >
                                Edit
                    </button>
                            
                        </div>
                    </form>
                </article>
            </div >
        )
    }
}

export default withRouter(ManageSingleMeme)