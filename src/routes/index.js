import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Home from 'containers/Home'
import Blogs from 'containers/Blogs'
import Blog from 'containers/Blogs/Blog'
import Post from 'containers/Blogs/Blog/Post'
import Podcasts from 'containers/Podcasts'
import Magazines from 'containers/Magazines'
import Creatives from 'containers/Creatives'
import About from 'containers/About'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home} />
    <Route path='/blogs' component={Blogs}>
      <Route path='/blogs/:blogId' component={Blog}>
        <Route path='/blogs/:blogId/:postId' component={Post} />
      </Route>
    </Route>
    <Route path='/podcasts' component={Podcasts} />
    <Route path='/magazines' component={Magazines} />
    <Route path='/creatives' component={Creatives} />
    <Route path='/about' component={About} />
  </Route>
)
