import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Meme extends Component {
    render() {
        return (
            <div className='col-xs-12 col-sm-6 col-md-4'>
                <Link to={`/meme/details/${this.props._id}`}>
                    <div className='meme-container'>
                        <img src={'/uploads/' + this.props.imageUrl} alt='cat' />
                    </div>
                </Link>
            </div>
        )
    }
}

export default Meme