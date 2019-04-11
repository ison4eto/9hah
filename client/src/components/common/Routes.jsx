import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { withAuthorization } from '../../core/hocs/withAuthentication'

import Home from '../Home'
import NoMatch from '../NoMatch'

import LoginForm from '../user/LoginForm'
import RegisterForm from '../user/RegisterForm'
import Logout from '../user/Logout'

import CreateMeme from '../memes/CreateMeme'
import DetailsMeme from '../memes/details/DetailsMeme'
import ManageMemes from '../memes/manage/ManageMemes'
import ManageSingleMeme from '../memes/details/ManageSingleMeme'
import SearchResultPage from '../memes/SearchResultPage'
import GenerateMeme from '../memes/GenerateMeme';

import ManageCategories from '../categories/ManageCategory'
import CategoryPage from '../categories/CategoryPage'
import DeleteCategoryPage from '../categories/DeleteCategoryPage'
import EditCategoryPage from '../categories/EditCategoryPage'


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/home' component={Home} />

                <Route path='/login' component={LoginForm} />
                <Route path='/register' component={RegisterForm} />
                <Route path='/logout' component={Logout} />

                <Route path='/meme/create' component={CreateMeme} />
                <Route path='/meme/details/:id' component={DetailsMeme} />
                <Route path='/meme/generate' component={GenerateMeme} />

                <Route path='/search' component={SearchResultPage} />

                <Route path='/category/delete/:name' component={DeleteCategoryPage} />
                <Route path='/category/edit/:name' component={EditCategoryPage} />
                <Route path='/category/:name' component={CategoryPage} />

                <Route path='/admin/memes' component={withAuthorization(ManageMemes)} />
                <Route path='/admin/categories' component={withAuthorization(ManageCategories)} />
                <Route path='/admin/meme/:id' component={withAuthorization(ManageSingleMeme)} />

                <Route component={NoMatch} />
            </Switch>
        )
    }
}

export default Routes