import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import { BASE_URL } from '../../../core/infrastructure/constants'
import observer from '../../../core/infrastructure/observer'

import Meme from '../../../core/models/Meme'
import CommentsSection from '../../comments/CommentsSection'
import RateSection from './RateSection'
import RatingsField from './RatingsField'

import '../../../styles/meme/detailsmeme.css'

class MemeDetails extends Component {
    memeId = this.props.match.params.id
    userRatings = 0
    constructor(props) {
        super(props)
        this.state = {
            meme: Meme.defaultState,
            commentsNum: 0,
            starUpdate: ''
        }
    }
    getMeme = () => {
        Axios.get(BASE_URL + '/meme/' + this.memeId)
            .then(res => {
                this.setState({ meme: res.data })
            })
            .catch(console.error)
    }
    componentDidMount() {
        this.getMeme()
    }
    
    deleteMeme = () => {
        Axios.post(BASE_URL + '/meme/unapprove', { _id: this.memeId })
            .then((res) => {
                observer.showNotification(res.status, 'Meme deleted')
                this.props.history.push('/home')
            })
            .catch(console.error)
    }
    getCommentsNum = (num) => {
        this.setState({ commentsNum: num })
    }
    postRatings = (index) => {
        this.userRatings = index
    }
    changeRatings = () => {
        this.getMeme()
    }
    
    
    render() {
        return (
            <section className='wrapper'>
                <article className='post'>
                    <h1>
                        {this.state.meme.title}
                        {sessionStorage.getItem('authtoken') ?
                            <div>
                                <Link to={`/admin/meme/${this.memeId}`}>
                                    <button className='btn btn-info'>Edit</button>
                                </Link>
                                <button type='button' className='btn btn-danger' onClick={this.deleteMeme}>Delete</button>
                            </div> :
                            null}

                    </h1>
                    <div className='header row justify-content-center'>
                        <RatingsField ratings={this.state.meme.ratings}/>
                        <span className='col-md-3 mr-auto'>
                            <a href='#comments'>{this.state.commentsNum} Comments</a>
                        </span>
                    </div>
                    <div className='col thumbnail'>
                        <img src={'/uploads/' + this.state.meme.imageUrl} alt='meme' />
                    </div>
                </article>
                <RateSection 
                    changeRatings={this.changeRatings}
                    dbRatings={this.state.meme.ratings}
                    peopleRated={this.state.meme.peopleRated}
                    memeId={this.memeId}
                />
                <CommentsSection memeId={this.memeId} getCommentsNum={this.getCommentsNum} />

            </section>
        )
    }
}

export default MemeDetails

