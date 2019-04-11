import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategoryListItem extends Component {

    render() {
        return (
            <tr>
                <th>
                    <Link to={`/category/${this.props.name}`}>{this.props.name}</Link>
                </th>
                <th>
                    <Link to={`/category/edit/${this.props.name}`}>
                        <button className='btn btn-info'>
                            <i className='fa fa-edit'></i>
                        </button>
                    </Link >
                </th>
                <th>
                    <Link to={`/category/delete/${this.props.name}`}>
                        <button className='btn btn-danger'><i className='fa fa-trash' aria-hidden='true'></i></button>
                    </Link>
                </th>
            </tr >
        )
    }
}

export default CategoryListItem