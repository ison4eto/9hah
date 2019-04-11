import React, { Component } from 'react'
import './App.css'

import Navigationbar from './components/common/Navigationbar'
import Notification from './components/common/Notification'
import Routes from './components/common/Routes'

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Navigationbar />
                <Notification />
                <Routes />
            </div>
        )
    }
}

export default App
