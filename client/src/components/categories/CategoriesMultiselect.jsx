import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import Axios from 'axios'

import { BASE_URL } from '../../core/infrastructure/constants'

class CategoriesMultiselect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }


    getCategories = () => {
        Axios.get(BASE_URL + '/category/all')
            .then(res => {
                let categories = []
                res.data.forEach(e => {
                    categories.push({
                        value: e.name,
                        label: e.name
                    })
                })
                this.setState({ categories })
            }).catch(console.error)
    }


    componentDidMount() {
        this.getCategories()
    }

    render() {
        return (
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                onChange={this.props.handleChange}
                isMulti
                options={this.state.categories}
                defaultValue={this.props.selected}
                styles={customStyles}
            />
        )
    }
}

export default CategoriesMultiselect

const customStyles = {
    menu: () => ({
        position: 'relative',
        'zIndex': 1000,
        'background': '#fafafa'
    }),
}