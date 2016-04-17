import React, { Component } from 'react'
// css
import styles from './styles.scss'

export class MagazineView extends Component {
  render () {
    // TODO make this dynamic
    let magazines = [{
      id: 1,
      image: 'images/spring-16.jpg',
      src: 'magazines/spring-16/index.html',
      title: 'Spring 2016'
    }, {
      id: 2,
      image: 'images/winter-15.jpg',
      src: 'magazines/winter-15/index.html',
      title: 'Winter 2015'
    }, {
      id: 3,
      image: 'images/fall-15.jpg',
      src: 'magazines/fall-15/index.html',
      title: 'Fall 2015'
    }]
    let _magazines = magazines.map((magazine, index) => {
      return (
        <div key={magazine.id} className={`col-xs-12 col-md-6 col-lg-4 ${styles.magazine}`}>
          <a href={magazine.src} target='_blank'>
            <img src={magazine.image} />
            <h2>{magazine.title}</h2>
          </a>
        </div>
      )
    })
    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-md-offset-1 col-md-10'>Magazines</h1>
        </div>
        <div className='row center-xs'>
          <div className='row col-xs-12 col-md-10'>
            {_magazines}
          </div>
        </div>
      </div>
    )
  }
}

export default MagazineView
