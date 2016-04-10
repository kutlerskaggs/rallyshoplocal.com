import React, { Component } from 'react'
import { Link } from 'react-router'
// css
// import styles from './styles.scss'

export class MagazineView extends Component {
  render () {
    let magazines = [{
      id: 1,
      image: 'images/rsspringcover.png'
    }, {
      id: 2,
      image: 'images/rswintercover.png'
    }, {
      id: 3,
      image: 'images/rsfallcover.png'
    }]
    let _magazines = magazines.map((magazine) => {
      return (
        <div key={magazine.id} className='col-xs-12 col-md-2 col-lg-3'>
          <Link
            key={magazine.id}
            to={`/magazines/${magazine.id}`}
            // className={styles.magazine}
          >
            <img src={magazine.image} />
          </Link>
        </div>
      )
    })
    return (
      <div className='container-fluid' style={{ paddingTop: 150 }}>
        <div className={'row center-xs middle-xs'}>
          {_magazines}
        </div>
      </div>
    )
  }
}

export default MagazineView
