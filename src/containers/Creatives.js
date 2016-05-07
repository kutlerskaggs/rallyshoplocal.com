import React, { Component } from 'react'
import CreativesView from 'views/Creatives'
import { s3 } from 'utils/AWS'

export default class Creatives extends Component {

  constructor (props) {
    super(props)
    this.state = {
      error: undefined,
      creatives: []
    }
  }

  componentWillMount () {
    let creativesPath = 'creatives/'
    let params = { Delimiter: '/', Prefix: `${creativesPath}` }
    s3.listObjectsV2(params, (err, data) => {
      console.log(err, data)
      // end here if an error occurred
      if (err) {
        this.setState({
          error: 'We\'re having some trouble getting our creative\'s profiles for you. Please check back later.'
        })
        return
      }

      // let slugs = data.CommonPrefixes.map((item) => item.Prefix.split('/')[1])
      // let capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`
      // let promises = []
      /* slugs.map((slug) => {
        let params = { Key: `${creativesPath}/${slug}/` }
        // batch requests for all .txt files (feature1.txt & feature2.txt)
        // https://github.com/aws/aws-sdk-js/issues/623
      })
      // map slugs/files into objects to be passed to CreativesView
      creatives = creatives.map((slug) => ({
        name: slug.split('-').map(capitalize).join(' '),
        feature1: {
          content:
        }
      })) */

      // this.setState({ creatives, error: undefined })
    })
  }

  render () {
    let { error, creatives } = this.state
    return <CreativesView error={error} creatives={creatives} />
  }
}
