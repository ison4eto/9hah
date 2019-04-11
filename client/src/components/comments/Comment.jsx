import React, { Component } from 'react'

class Comment extends Component {
    createdBefore(createdOnString) {
        let dateIsoFormat = createdOnString

        let diff = new Date() - (new Date(dateIsoFormat))
        diff = Math.floor(diff / 60000)
        if (diff < 1) return 'less than a minute ago'
        if (diff < 60) return diff + ' minute' + pluralize(diff) + ' ago'
        diff = Math.floor(diff / 60)
        if (diff < 24) return diff + ' hour' + pluralize(diff) + ' ago'
        diff = Math.floor(diff / 24)
        if (diff < 30) return diff + ' day' + pluralize(diff) + ' ago'
        diff = Math.floor(diff / 30)
        if (diff < 12) return diff + ' month' + pluralize(diff) + ' ago'
        diff = Math.floor(diff / 12)
        return diff + ' year' + pluralize(diff) + ' ago'
    }

    render() {
        return (
            <div>
                <strong className='pull-left primary-font'>{this.props.title}</strong>
                <small className='pull-right text-muted'>
                    <i className='fa fa-clock-o' aria-hidden='true'></i>
                    {this.createdBefore(this.props.date)}
                </small>
                <br />
                <li className='ui-state-default'>{this.props.content} </li>
            </div>
        )
    }
}

export default Comment

function pluralize(value) {
    if (value !== 1) return 's'
    else return ''
}