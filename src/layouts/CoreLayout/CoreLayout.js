import React, { PropTypes } from 'react'
import Header from 'containers/Header'
import { Link } from 'react-router'
// css
import '../../styles/core.scss'
import '../../styles/vendor/styles'
import styles from './styles.scss'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    // sitemap
    let sitemapItems = ['HOME', 'BLOGS', 'PODCASTS', 'MAGAZINES', 'CREATIVES', 'ABOUT']
    let _sitemapItems = sitemapItems.map((item) => {
      let isHome = item === 'HOME'
      return (
        <h5 key={item}>
          <Link to={`/${isHome ? '' : item.toLowerCase()}`}>
            {item}
          </Link>
        </h5>
      )
    })
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
        <div className={styles.footer}>
          <div className={styles.copyright}>
            <img src='/images/RallyShopLogo.png' alt='RallyShopLogo' />
            <h5>
              <i className='fa fa-copyright fa-fw'></i>
              {new Date().getFullYear()}&nbsp;Rally Shop Local,&nbsp;LLC
            </h5>
          </div>
          <div className={styles.sitemap}>
            {_sitemapItems}
          </div>
          <div className={styles.social}>
            <div>{socialItems}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CoreLayout
