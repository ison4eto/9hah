import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap'
import axios from 'axios'

import { BASE_URL } from '../../../core/infrastructure/constants'

import UnapprovedMeme from './UnapprovedMeme'

export default class ManageMemes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memes: [],
            activeIndex: 0
        }
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToIndex = this.goToIndex.bind(this)
        this.getSlides = this.getSlides.bind(this)
    }
    getMemes = () => {
        axios.get(BASE_URL + '/admin/memes')
            .then(result => {
                this.setState({ memes: result.data || [] })
            }).catch(console.error)
    }

    componentDidMount = () => this.getMemes()


    next() {
        const nextIndex = this.state.activeIndex === this.state.memes.length - 1 ? 0 : this.state.activeIndex + 1
        this.setState({ activeIndex: nextIndex })
    }

    previous() {
        const nextIndex = this.state.activeIndex === 0 ? this.state.memes.length - 1 : this.state.activeIndex - 1
        this.setState({ activeIndex: nextIndex })
    }

    goToIndex(newIndex) {
        this.setState({ activeIndex: newIndex })
    }
    getSlides() {
        const slides = this.state.memes.map((item) => {
            return (
                <CarouselItem key={item._id}>
                    <UnapprovedMeme getMemes={this.getMemes} {...item} />
                </CarouselItem>
            )
        })
        return slides
    }
    render() {
        const slides = this.state.memes.map((item) => {
            return (
                <CarouselItem key={'img' + item._id}>
                    <img src={'/uploads/' + item.imageUrl} alt='cat' />
                </CarouselItem>
            )
        })

        if (this.state.memes.length === 0) {
            return (
                <div className='jumbotron'>
                    <h1 className='display-4'>No more subbmited memes</h1>
                    <Link className='badge badge-light' to='/home'>See the subbmited ones</Link>
                </div>
            )
        }
        return (
            <div>
                <Carousel
                    activeIndex={this.state.activeIndex}
                    interval={false}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={this.state.memes} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
                    <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
                </Carousel>
                <Carousel
                    activeIndex={this.state.activeIndex}
                    interval={false}
                    next={this.next}
                    previous={this.previous}
                >
                    {this.getSlides()}
                </Carousel>
            </div>
        )
    }
}

