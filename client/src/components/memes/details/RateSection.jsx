import React, { Component } from 'react'
import Axios from 'axios'
import { BASE_URL } from '../../../core/infrastructure/constants'
import observer from '../../../core/infrastructure/observer'

class RateSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: [],
            isRated: false
        }
    }
    rate = (e) => {
        let index = Number(e.target.id)
        for (let i = 1; i <= index; i++) {
            this.setState(prevState => {
                const newItems = [...prevState.isChecked]
                newItems[i] = true
                return { isChecked: newItems }
            })
        }
        for (let i = index + 1; i <= 10; i++) {
            this.setState(prevState => {
                const newItems = [...prevState.isChecked]
                newItems[i] = false
                return { isChecked: newItems }
            })
        }
        this.setState({ isRated: true })
        let newRating = calculateRatings(Number(this.props.dbRatings), Number(e.target.id), Number(this.props.peopleRated)+1)
        Axios.post(BASE_URL + '/meme/rate/' + this.props.memeId, { ratings: newRating })
            .then(res => {
                this.props.changeRatings()
                observer.showNotification(res.status, 'You rated successfully')
            })
            .catch(console.error)

    }
    render() {
        return (
            <article>
                <h4>Rate this meme</h4>
                <div>
                    <span className={`fa fa-star ${this.state.isChecked[1] ? 'checked' : ''}`} id='1' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[2] ? 'checked' : ''}`} id='2' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[3] ? 'checked' : ''}`} id='3' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[4] ? 'checked' : ''}`} id='4' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[5] ? 'checked' : ''}`} id='5' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[6] ? 'checked' : ''}`} id='6' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[7] ? 'checked' : ''}`} id='7' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[8] ? 'checked' : ''}`} id='8' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[9] ? 'checked' : ''}`} id='9' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                    <span className={`fa fa-star ${this.state.isChecked[10] ? 'checked' : ''}`} id='10' onClick={this.state.isRated ? () => { return false } : this.rate}></span>
                </div>
            </article>
        )
    }
}

export default RateSection

function calculateRatings(dbRatings, newRatings, peopleRated){
    return dbRatings + ((newRatings-dbRatings)/peopleRated)
}