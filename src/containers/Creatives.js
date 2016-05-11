import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
// components
import CreativesView from 'views/Creatives'

export default class Creatives extends Component {

  static propTypes = {
    creatives: PropTypes.object.isRequired
  }

  render () {
    let { error, items } = this.props.creatives
    return <CreativesView error={error} creatives={items} />
  }
}

let stateToProps = (state) => {
  let { creatives } = state
  return { creatives }
}

export default connect(stateToProps)(Creatives)
