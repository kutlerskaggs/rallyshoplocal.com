import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles.scss'

export default class Header extends Component {

  constructor (props) {
    super(props)
    this.state = { openMobileMenu: false }
    this.closeMobileMenu = this.closeMobileMenu.bind(this)
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  closeMobileMenu () {
    this.setState({ openMobileMenu: false })
  }

  toggleMobileMenu () {
    this.setState({ openMobileMenu: !this.state.openMobileMenu })
  }

  render () {
    // desktop/mobile menu links
    let { openMobileMenu } = this.state
    let _menuItems = ['home', 'blogs', 'podcasts', 'magazines', 'creatives', 'about']
    let menuItems = _menuItems.map((item) => {
      let isHome = item === 'home'
      // TODO ---------------------
      // TODO create absolutely positioned element to fix fucked up font on Safari
      // TODO apply 3d transforms to :before/after, but not the label
      // TODO ---------------------
      return (
        <div key={item} className={styles.navItemWrapper}>
          <Link
            to={`/${isHome ? '' : item}`}
            className={styles.navItem}
            activeClassName={styles.navItemActive}
            onlyActiveOnIndex={isHome}
            data-hover={item}
            onClick={this.closeMobileMenu}
          >
            {item}
          </Link>
        </div>
      )
    })

    return (
      <div className={`container-fluid ${styles.container}`}>
        <div className='row'>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.wrapper}`}>
            <div className={styles.logo}>
              <Link to='/'>
                <img src='/images/RallyShopLogo.png' alt='RallyShopLogo' />
              </Link>
            </div>
            <nav className={`${styles.navWrapper} ${openMobileMenu ? styles.openMobileMenu : ''}`}>
              {menuItems}
            </nav>
            <a
              className={`fa fa-${openMobileMenu ? 'times' : 'bars'} fa-fw ${styles.mobileToggle}`}
              onClick={this.toggleMobileMenu}>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
