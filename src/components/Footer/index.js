import React, { Component } from 'react'
// css
import styles from './styles.scss'

export class Footer extends Component {

  render () {
    // social media footer
    let _socialItems = [
      { icon: 'facebook', href: 'http://www.facebook.com/rallyshoplocal' }
      // { icon: 'twitter', href: 'http://www.twitter.com/RallyCasper' },
      // { icon: 'pinterest', href: 'http://www.pinterest.com/rallycasper/' },
      // { icon: 'instagram', href: 'http://instagram.com/rallylocal/' }
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
      <div className={`container-fluid ${styles.container}`}>
        <div className='row'>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.wrapper}`}>
            <div className={styles.copyright}>
              <div>
                <img src='/images/RallyShopLogo.png' alt='RallyShopLogo' />
                <h5>
                  <i className='fa fa-copyright fa-fw'></i>
                  {new Date().getFullYear()}&nbsp;Rally Shop Local,&nbsp;LLC
                </h5>
              </div>
            </div>
            <div className={styles.contact}>
              <div>
                <h5>303.587.5387</h5>
                <h5>hello@rallyshoplocal.com</h5>
              </div>
            </div>
            <div className={styles.social}>
              <div>{socialItems}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
