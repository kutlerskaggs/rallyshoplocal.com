import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Home from 'containers/Home'
import Posts from 'containers/Posts'
import Post from 'containers/Posts/Post'
import Magazines from 'containers/Magazines'
import Creatives from 'containers/Creatives'
import About from 'containers/About'

// TODO better place for this?
let scrollTop = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0
}

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute onEnter={scrollTop} component={Home} />
    <Route path='/:type' onEnter={scrollTop} component={Posts}>
      <Route path='/:type/:categorySlug' onEnter={scrollTop} component={Posts}>
        <Route path='/:type/:categorySlug/:postSlug' onEnter={scrollTop} component={Post} />
      </Route>
    </Route>
    <Route path='/magazines' component={Magazines} />
    <Route path='/creatives' component={Creatives} />
    <Route path='/about' component={About} />
  </Route>
)
