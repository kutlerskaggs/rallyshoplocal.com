import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Home from 'containers/Home'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home} />
  </Route>
)
