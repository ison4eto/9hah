import React, { Component } from 'react'
import Axios from 'axios'

import { BASE_URL, ITEMS_PER_PAGE } from '../core/infrastructure/constants'

import Meme from './memes/Meme'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { memes: [] }

    }
    getMemes = () =>
        Axios.get(BASE_URL + '/meme/all')
            .then(res => {
                this.setState({ memes: res.data.sort(sortByDate).slice(0, ITEMS_PER_PAGE) })
            })
            .catch(console.log)

    componentDidMount = () => this.getMemes()
    render() {
        return (
            <div className='container'>
                {this.state.memes.map((p, i) => <Meme key={p._id} index={i} {...p} />)}
            </div>
        )
    }
}

function sortByDate(a, b) {
    const date1 = new Date(a.date)
    const date2 = new Date(b.date)
    return date2 - date1
}