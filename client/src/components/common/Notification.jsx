import React, { Component } from 'react'

import observer from '../../core/infrastructure/observer'

import NotificationData from '../../core/models/NotificationData'

export default class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = NotificationData.defaultState

        this.updateNotification = this.updateNotification.bind(this)

        observer.subscribe(observer.events.notification, this.updateNotification)
    }

    updateNotification(data) {
        this.setState({
            text: data.text,
            type: data.type
        })
        setTimeout(() => {
            this.hideNotification()
        }, data.duration || 2000)
    }

    hideNotification() {
        this.setState(NotificationData.defaultState)
    }

    render() {
        const text = this.state.text
        const divClassName = NotificationData.types[this.state.type]
        if (!text) {
            return null
        }
        let classNames = `${divClassName} text-center p-3 mb-2 text-white`
        return (
            <div className={classNames}><span>{text}</span></div>
        )
    }
}
