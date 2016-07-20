import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'

export default class SectionTitle extends Component {

  static propTypes = {
    dark: PropTypes.bool,
    label: PropTypes.string.isRequired
  }

  render () {
    return (
      <h4 className={`${styles.title} ${this.props.dark ? styles.dark : ''}`}>
        <span>{this.props.label}</span>
        <hr />
      </h4>
    )
  }
}
