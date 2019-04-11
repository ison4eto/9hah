import React from 'react'

import Axios from 'axios'
import { BASE_URL } from '../../core/infrastructure/constants'
import observer from '../../core/infrastructure/observer'

import '../../styles/meme/generatememe.css'

export default class GenerateMeme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topText: 'What if I told you',
            bottomText: 'that you can make custom memes',
            file: '/memegenerator-default.png',
            fontSizeTop: 40,
            fontSizeBottom: 40,
            title: ''
        }
        this.ctx = {}
    }

    componentDidMount() {
        this.drawCanvas()
    }


    drawCanvas = () => {
        const canvas = this.refs.canvas
        const img = this.refs.image
        this.ctx = canvas.getContext('2d')
        img.onload = () => {
            this.setState({
                width: img.width,
                height: img.height
            }, () => {
                this.ctx.canvas.width = img.width
                this.ctx.canvas.height = img.height


                this.drawMeme()

            })

        }

    }
    drawMeme = () => {
        this.ctx.drawImage(this.refs.image, 0, 0)

        //top text
        this.ctx.font = `${this.state.fontSizeTop}px Impact`
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(this.state.topText.toUpperCase(), this.state.width / 2, 20 + this.state.fontSizeTop)

        //top text border
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = Math.ceil(this.state.fontSizeTop / 20)
        this.ctx.strokeText(this.state.topText.toUpperCase(), this.state.width / 2, 20 + this.state.fontSizeTop)

        //bottom text
        this.ctx.font = `${this.state.fontSizeBottom}px Impact`
        this.ctx.lineWidth = Math.ceil(this.state.fontSizeBottom / 20)
        this.ctx.fillText(this.state.bottomText.toUpperCase(), this.state.width / 2, this.state.height - 30)
        this.ctx.strokeText(this.state.bottomText.toUpperCase(), this.state.width / 2, this.state.height - 30)
    }
    handleChange = (e) => {
        switch (e.target.name) {
            case 'selectedFile':
                this.setState({ file: URL.createObjectURL(e.target.files[0]) }, () => {
                    this.drawCanvas()
                })
                break
            case 'fontSizeTop':
            case 'fontSizeBottom':
                try {
                    this.setState({ [e.target.name]: Number(e.target.value) }, () => {
                        this.drawMeme()
                    })
                } catch (e) {
                    this.setState({ [e.target.name]: 40 }, () => {
                        this.drawMeme()
                    })
                } finally {
                    break
                }
            default:
                this.setState({ [e.target.name]: e.target.value }, () => {
                    this.drawMeme()
                })
        }


    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (!this.state.title) {
            observer.showNotification(400, 'Please fill in the title')
            return
        }

        srcToFile(this.refs.canvas.toDataURL(), 'meme.png', 'image/png')
            .then(file => {
                let formData = new FormData()
                formData.append('selectedFile', file)
                formData.append('title', this.state.title)
                Axios.post(BASE_URL + '/meme/upload', formData)
                    .then((result) => {
                        observer.showNotification(result.status, 'You successfully added a meme for approvision')
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
            .catch(console.error)

    }
    changeSize = (position, index) => {
        switch (position) {
            case 'top':
                this.setState({ fontSizeTop: this.state.fontSizeTop + index }, () => {
                    this.drawMeme()
                })
                break
            case 'bottom':
                this.setState({ fontSizeBottom: this.state.fontSizeBottom + index }, () => {
                    this.drawMeme()
                })
                break
            default:
                break
        }
    }
    render() {
        return (
            <div id='meme-content width-limit'>
                <h1>Make your custom meme</h1>
                <section className='editor'>
                    <div className='width-limit'>
                        <div className='preview-area'>
                            <div className='image-container'>
                                <canvas ref='canvas' />
                                <img src={this.state.file} alt='meme' ref='image' className='hidden' />
                            </div>
                        </div>
                        <div className='caption' id='editor-scrollfloating'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='form-group input-group'>
                                    <input
                                        name='selectedFile'
                                        className='form-control'
                                        type='file'
                                        accept='image/*'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='field'>
                                    <textarea
                                        name='topText'
                                        className='form-control'
                                        placeholder='Top Text'
                                        maxLength={31}
                                        value={this.state.topText}
                                        onChange={this.handleChange}
                                    />
                                    <div className='textarea-control'>
                                        <ul className='segment-control font-size' >
                                            <li>
                                                <a onClick={() => this.changeSize('top', -1)}>
                                                    <span className='decrease-font-size'>Decrease font size</span>
                                                </a>
                                            </li>
                                            <li className='seperator'>
                                                <input name='fontSizeTop' type='number' value={this.state.fontSizeTop} onChange={this.handleChange} />
                                            </li>
                                            <li>
                                                <a onClick={() => this.changeSize('top', 1)}>
                                                    <span className='increase-font-size'>Increase font size</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='field'>
                                    <textarea
                                        name='bottomText'
                                        className='form-control'
                                        placeholder='Bottom Text'
                                        maxLength={30}
                                        defaultValue={this.state.bottomText}
                                        onChange={this.handleChange}
                                    />
                                    <div className='textarea-control'>
                                        <ul className='segment-control font-size' >
                                            <li>
                                                <a onClick={() => this.changeSize('bottom', -1)}>
                                                    <span className='decrease-font-size'>Decrease font size</span>
                                                </a>
                                            </li>
                                            <li className='seperator'>
                                                <input name='fontSizeBottom' type='number' value={this.state.fontSizeBottom} onChange={this.handleChange} />
                                            </li>
                                            <li>
                                                <a onClick={() => this.changeSize('bottom', 1)}>
                                                    <span className='increase-font-size'>Increase font size</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='form-group input-group'>
                                    <input
                                        name='title'
                                        className='form-control'
                                        placeholder='Title'
                                        type='text'
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='form-group input-group'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-block'
                                    >
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id='page-mask' className='mask hide' />
                </section>
            </div>

        )
    }
}


function srcToFile(src, fileName, mimeType) {
    return (fetch(src)
        .then(function (res) { return res.arrayBuffer() })
        .then(function (buf) { return new File([buf], fileName) })
    )
}