import React, { Component } from 'react'
import MagazinesView from 'views/Magazines'

export default class Magazines extends Component {

  constructor (props) {
    super(props)
    this.state = { magazines: [] }
  }

  componentWillMount () {
    let magazines = []
    let s3 = new window.AWS.S3()
    // TODO this needs to be relative when deployed so we don't have awful magazine urls
    let s3Uri = 'https://s3-us-west-2.amazonaws.com'
    let bucket = 'www-rallyshoplocal-com'
    let magazinesPath = 'assets/magazines'
    let params = {
      Bucket: bucket,
      Prefix: `${magazinesPath}/covers`
    }
    s3.makeUnauthenticatedRequest('listObjects', params, (err, data) => {
      if (err) {
        this.setState({ error: 'We\'re having some trouble getting our magazines for you. Please check back later.' })
      }

      let isFile = (data) => /\.[0-9a-z]+$/i.test(data.Key)
      let createMagazine = (data, index) => {
        let image = `${s3Uri}/${bucket}/${data.Key}`
        let edition = data.Key.split('/').pop().split('.')[0]
        let src = `${s3Uri}/${bucket}/${magazinesPath}/${edition}/index.html`
        let title = (edition[0].toUpperCase() + edition.slice(1)).replace('-', ' ')
        return { id: index, image, src, title }
      }
      magazines = data.Contents.filter(isFile).map(createMagazine)
      this.setState({ magazines })
    })
  }

  render () {
    let { error, magazines } = this.state
    return <MagazinesView error={error} magazines={magazines} />
  }
}
