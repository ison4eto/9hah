import React, { Component } from 'react'
import Axios from 'axios'

import { ITEMS_PER_PAGE, BASE_URL } from '../../core/infrastructure/constants'

import Meme from '../memes/Meme'
import Pagination from '../common/Pagination'

class SearchResultPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memes: [],
            maxIndex: 9,
            search: this.props.location.search.substring(3)
        }
    }

    getMemes= () => {
        Axios.post(BASE_URL + '/search', { search: this.state.search })
        .then(res => {
           this.setState({ memes: res.data })
        })
        .catch(console.error)
    }
    componentDidMount() {
        this.getMemes()
    }
    changeMaxIndex = (i) => {
        this.setState({ maxIndex: i })

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ search: nextProps.location.search.substring(3) }, () =>{
            this.getMemes()
        })
    }
    
    render() {
        if(!this.state.memes.length){
            return <p>{`No matches for '${this.state.search}'`}</p>
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

export default SearchResultPage