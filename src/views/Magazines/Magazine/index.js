import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'

export class MagazineView extends Component {

  static propTypes = {
    left: PropTypes.string,
    right: PropTypes.string
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className={`row ${styles.magazine}`}>
          <div className='col-xs-12 col-lg-6'>
            <img src={this.props.left} style={{ height: 690 }} />
          </div>
          <div className='col-xs-12 col-lg-6'>
            <img src={this.props.right} style={{ height: 690 }} />
          </div>
        </div>
      </div>
    )
  }
}

export default MagazineView
