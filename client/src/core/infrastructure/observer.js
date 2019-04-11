let subscriptions = {
    'notification': []
}

let events = {
    notification: 'notification'
}

let subscribe = (eventName, fn) => {
    subscriptions[eventName].push(fn)
}

let trigger = (eventName, data) => {
    subscriptions[eventName].forEach(fn => fn(data))
}

let showNotification = (statusCode, text) => {
    let type = ''
    if (statusCode >= 200 && statusCode < 300) {
        type = 'success'
    } else if (statusCode >= 400 && statusCode < 600) {
        type = 'error'
    } else {
        type = 'loading'
    }
    trigger(events.notification, { type, text })
}

export default {
    events,
    subscribe,
    trigger,
    showNotification
}
