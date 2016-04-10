import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'

export class MagazineView extends Component {

  static propTypes = {
    left: PropTypes.string,
    right: PropTypes.string,
    onPageFlip: PropTypes.func.isRequired
  }

  render () {
    let { onPageFlip } = this.props
    let pageBackward = () => { onPageFlip() }
    let pageForward = () => { onPageFlip(true) }

    return (
      <div className='container-fluid'>
        <div className={`row ${styles.magazine}`}>
          <div className='col-xs-12 col-lg-6'>
            <img src={this.props.left} className={styles.page} onClick={pageBackward} />
          </div>
          <div className='col-xs-12 col-lg-6'>
            <img src={this.props.right} className={styles.page} onClick={pageForward} />
          </div>
        </div>
      </div>
    )
  }
}

export default MagazineView
