import React, { Component } from 'react'
import CreativesView from 'views/Creatives'

export default class Creatives extends Component {

  constructor (props) {
    super(props)
    this.state = { creatives: [] }
  }

  componentWillMount () {
    let { AWS } = window
    AWS.config.region = 'us-west-2'
    let s3 = new AWS.S3()
    let params = {
      Bucket: 'www-rallyshoplocal-com'
    }
    s3.makeUnauthenticatedRequest('listObjects', params, (err, data) => {
      console.log(err, data)
    })
  }

  render () {
    return (
      <CreativesView creatives={this.state.creatives} />
    )
  }
}
