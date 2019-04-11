import React, { Component } from 'react'

class RatingsField extends Component {
    makeStars = () => {
        let ratings = []
        let dbRating = Math.ceil(this.props.ratings)
        for (let i = 0; i < dbRating; i++) {
            ratings.push(<span className='fa fa-star checked' key={i}></span>)
        } for (let i = dbRating; i < 10; i++) {
            ratings.push(<span className='fa fa-star' key={i}></span>)
        }
        return ratings
    }
    render() {
        return (
            <div className='ratings col-md-3 offset-md-3'>
                {this.makeStars()}
            </div>
        )
    }
}

export default RatingsField