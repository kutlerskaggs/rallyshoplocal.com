import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Home from 'containers/Home'
import Blogs from 'containers/Blogs'
import BlogPost from 'containers/Blogs/Post'
import Podcasts from 'containers/Podcasts'
import PodcastPost from 'containers/Podcasts/Post'
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
    <Route path='/blogs' onEnter={scrollTop} component={Blogs}>
      <Route path='/blogs/:blogSlug' onEnter={scrollTop} component={Blogs}>
        <Route path='/blogs/:blogSlug/:postSlug' onEnter={scrollTop} component={BlogPost} />
      </Route>
    </Route>
    <Route path='/podcasts' onEnter={scrollTop} component={Podcasts}>
      <Route path='/podcasts/:podcastSlug' onEnter={scrollTop} component={Podcasts}>
        <Route path='/podcasts/:podcastSlug/:postSlug' onEnter={scrollTop} component={PodcastPost} />
      </Route>
    </Route>
    <Route path='/magazines' component={Magazines} />
    <Route path='/creatives' component={Creatives} />
    <Route path='/about' component={About} />
  </Route>
)
