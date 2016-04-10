import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Home from 'containers/Home'
import Blogs from 'containers/Blogs'
import Podcasts from 'containers/Podcasts'
import Magazines from 'containers/Magazines'
import Magazine from 'containers/Magazines/Magazine'
import Creatives from 'containers/Creatives'
import About from 'containers/About'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home} />
    <Route path='/blogs' component={Blogs} />
    <Route path='/podcasts' component={Podcasts} />
    <Route path='/magazines' component={Magazines}>
      <Route path='/magazines/:id' component={Magazine} />
    </Route>
    <Route path='/creatives' component={Creatives} />
    <Route path='/about' component={About} />
  </Route>
)
