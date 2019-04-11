import React, { Component } from 'react'
import Axios from 'axios'

import { BASE_URL, ITEMS_PER_PAGE } from '../../core/infrastructure/constants'

import Meme from '../memes/Meme'
import Pagination from '../common/Pagination'

class CaregoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memes: [],
            maxIndex: 9
        }
    }

    getMemesByCategory = () => {
        Axios.get(BASE_URL + '/category/' + this.props.match.params.name)
            .then(memes => {
                this.setState({ memes: memes.data })

            })
            .catch(console.error)
    }
    componentDidMount() {
        this.getMemesByCategory()
    }
    changeMaxIndex = (i) => {
        this.setState({ maxIndex: i })

    }


    render() {
        if (this.state.memes.length === 0) {
            return <p>No memes in this category</p>
        }
        return (
            <div className='container'>
                <div className='container'>
                    {this.state.memes.slice(this.state.maxIndex - ITEMS_PER_PAGE, this.state.maxIndex).map((p, i) => <Meme key={p._id} index={i} {...p} />)}
                </div>
                <Pagination dataLength={this.state.memes.length} changeMaxIndex={this.changeMaxIndex} />
            </div>

        )
    }



}

export default CaregoryPage