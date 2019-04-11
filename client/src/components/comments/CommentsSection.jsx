import React, { Component } from 'react'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'

import Comment from './Comment'
import CreateCommentForm from './CreateCommentForm'

class CommentsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }



    getComments = () => {
        Axios.get(BASE_URL + '/comment/' + this.props.memeId)
            .then(res => {
                this.setState({ comments: res.data }, () => {
                    this.props.getCommentsNum(this.state.comments.length)
                })
            })
            .catch(console.error)


    }
    componentDidMount() {
        this.getComments()
    }

    render() {
        return (
            <div className='container'>
                <div className='well'>
                    <h4 id='comments'>
                        What do you think about this meme?
                        </h4>
                    <CreateCommentForm getComments={this.getComments} memeId={this.props.memeId} />
                    <hr />
                    <ul
                        id='sortable'
                        className='list-unstyled ui-sortable'>
                        {this.state.comments ? this.state.comments.map((p, i) => <Comment key={p._id} index={i} {...p} />) : null}
                    </ul>
                </div>
            </div>

        )
    }
}

export default CommentsSection