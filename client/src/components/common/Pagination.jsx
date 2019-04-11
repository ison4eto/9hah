import React, { Component } from 'react'

import { ITEMS_PER_PAGE } from '../../core/infrastructure/constants'

import '../../styles/common/pagination.css'

export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: 1,
            activeClasses: [false, true]
        }
    }
    getPageNumbers = () => {
        const pages = Math.ceil(this.props.dataLength / ITEMS_PER_PAGE)
        let pagination = []
        for (let i = 1; i <= pages; i++) {
            pagination.push(<li className={`page-item${this.state.activeClasses[i] ? ' active' : ''}`} key={i}>
                <button className='page-link' onClick={this.changePage} id={i}>{i}</button>
            </li>)
        }
        return pagination
    }
    changePage = (e) => {
        const i = e.target.id
        this.setState(prevState => {
            const newItems = [...prevState.activeClasses]
            newItems[this.state.activePage] = false
            newItems[i] = true
            return { activeClasses: newItems }
        })
        this.setState({ activePage: i }, () => {
            const maxInd = this.state.activePage * ITEMS_PER_PAGE
            this.props.changeMaxIndex(maxInd)
        })


    }
    changePrevious = () => {
        this.setState(prevState => {
            const newItems = [...prevState.activeClasses]
            newItems[this.state.activePage] = false
            newItems[this.state.activePage - 1] = true
            return { activeClasses: newItems }
        })
        this.setState({ activePage: this.state.activePage - 1 }, () => {
            const maxInd = this.state.activePage * ITEMS_PER_PAGE
            this.props.changeMaxIndex(maxInd)
        })
    }

    changeNext = () => {
        this.setState(prevState => {
            const newItems = [...prevState.activeClasses]
            newItems[this.state.activePage] = false
            newItems[this.state.activePage + 1] = true
            return { activeClasses: newItems }
        })
        this.setState({ activePage: this.state.activePage + 1 }, () => {
            const maxInd = this.state.activePage * ITEMS_PER_PAGE
            this.props.changeMaxIndex(maxInd)
        })
    }


    render() {
        return (
            <nav aria-label='...' className='pagination-box'>
                <ul className='pagination'>
                    <li className={`page-item${this.state.activePage <= 1 ? ' disabled' : ''}`}>
                        <button className='page-link' onClick={this.changePrevious}>Previous</button>
                    </li>
                    {this.getPageNumbers()}
                    <li className={`page-item ${this.state.activePage >= Math.ceil(this.props.dataLength / ITEMS_PER_PAGE) ? 'disabled' : ''}`}>
                        <button className='page-link' onClick={this.changeNext}>Next</button>
                    </li></ul>
            </nav>
        )
    }
}

