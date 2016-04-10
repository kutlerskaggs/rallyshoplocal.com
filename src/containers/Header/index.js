import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles.scss'

export default class Header extends Component {
  render () {
    // desktop/mobile menu links
    let _menuItems = ['Home', 'Blogs', 'Podcasts', 'Magazines', 'Creatives', 'About']
    let menuItems = _menuItems.map((item) => {
      let isHome = item === 'Home'
      return (
        <Link
          key={item}
          to={`/${isHome ? '' : item.toLowerCase()}`}
          className={`menu-list-item-content ${styles.navItem}`}
          activeClassName={styles.navItemActive}
          onlyActiveOnIndex={isHome}
          data-hover={item}
        >
        {item}
        </Link>
      )
    })

    return (
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src='/images/logo_full_white.svg' />
        </div>
        <nav className={styles.navWrapper}>
          {menuItems}
        </nav>
      </div>
    )
  }
}
