import React, { Component } from 'react'
import HomeView from 'views/Home'
import Loader from 'components/loader'
import { sortBy } from 'lodash'

export default class Home extends Component {

  constructor (props) {
    super(props)
    this.state = { content: [], loading: false }
  }

  componentWillMount () {
    let promises = []
    let apiKey = 'AIzaSyA3zd8Vp7IDsWvkepT0h0fNKBkCFku58j0'
    let blogs = [
      '2901360073818541851',
      '4269772225470041486'
    ]
    this.setState({ loading: true })
    blogs.forEach((blog) => {
      let promise = fetch(`https://www.googleapis.com/blogger/v3/blogs/${blog}/posts?key=${apiKey}`).then((res) => {
        res.json().then((json) => {
          let { content } = this.state
          content = content.concat(json.items)
          content = sortBy(content, ['published']).reverse()
          this.setState({ content })
        })
      })
      promises.push(promise)
    })
    Promise.all(promises).then(() => {
      this.setState({ loading: false })
    })
    // TODO push blogs/podcasts into store and retreive from there otherwise
  }

  render () {
    return this.state.loading
      ? <Loader />
      : <HomeView content={this.state.content} />
  }
}
