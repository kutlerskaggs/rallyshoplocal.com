import React, { PropTypes } from 'react'
import Header from 'containers/Header'
// css
import '../../styles/core.scss'
import '../../styles/vendor/styles'
import styles from './styles.scss'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    // social media footer
    let _socialItems = [
      { icon: 'facebook', href: 'http://www.facebook.com/rally-casper' },
      { icon: 'twitter', href: 'http://www.twitter.com/RallyCasper' },
      { icon: 'pinterest', href: 'http://www.pinterest.com/rallycasper/' },
      { icon: 'instagram', href: 'http://instagram.com/rallylocal/' }
    ]
    let socialItems = _socialItems.map((item) => {
      return (
        <div key={item.icon} className={styles.socialIcon}>
          <a href={item.href} className={`fa fa-${item.icon} fa-fw`}></a>
          <a href={item.href} className={styles.socialAnimation}></a>
        </div>
      )
    })

    return (
      <div>
        <Header />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.social}>
          {socialItems}
        </div>
      </div>
    )
  }
}

export default CoreLayout
