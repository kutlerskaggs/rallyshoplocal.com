import React, { Component } from 'react'
import MagazinesView from 'views/Magazines'
// utils
import { basePath, s3 } from 'utils/AWS'
import { sortBy } from 'lodash'

export default class Magazines extends Component {

  constructor (props) {
    super(props)
    this.state = {
      error: undefined,
      magazines: []
    }
  }

  componentWillMount () {
    let magazines = []
    let magazinesPath = 'magazines'
    let params = { Prefix: `${magazinesPath}/covers` }
    s3.listObjectsV2(params, (err, data) => {
      // end here if an error occurred
      if (err) {
        this.setState({ error: 'We\'re having some trouble getting our magazines for you. Please check back later.' })
        return
      }
      // filter function
      let isFile = (data) => /\.[0-9a-z]+$/i.test(data.Key)
      // mapping function
      let createMagazine = (data, index) => {
        let image = `${basePath}/${data.Key}`
        let edition = data.Key.split('/').pop().split('.')[0]
        let src = `${basePath}/${magazinesPath}/${edition}/index.html`
        let title = (edition[0].toUpperCase() + edition.slice(1)).replace('-', ' ')
        return { id: index, image, src, title }
      }
      // get files, sort desc, map to objects
      magazines = sortBy(data.Contents.filter(isFile), 'LastModified').reverse().map(createMagazine)
      this.setState({ error: undefined, magazines })
    })
  }

  render () {
    let { error, magazines } = this.state
    return <MagazinesView error={error} magazines={magazines} />
  }
}
