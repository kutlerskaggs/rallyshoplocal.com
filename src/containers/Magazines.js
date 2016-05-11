import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
// components
import MagazinesView from 'views/Magazines'

class Magazines extends Component {

  static propTypes = {
    magazines: PropTypes.object.isRequired
  }

  render () {
    let { error, items } = this.props.magazines
    return <MagazinesView error={error} magazines={items} />
  }
}

let stateToProps = (state) => {
  let { magazines } = state
  return { magazines }
}

export default connect(stateToProps)(Magazines)
