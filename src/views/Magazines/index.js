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
        <div className={`row middle-xs ${styles.wrapper}`} key={magazine.id}>
          <div className={`col-xs-12 ${styles.brush}`}>
            <img src={`images/Brush.${index + 1}.svg`} />
          </div>
          <div className='row middle-xs col-xs-12'>
            <div className='col-xs-12 col-lg-6' style={{ marginBottom: 30, textAlign: 'right', zIndex: 2 }}>
              <a href={magazine.src} target='_blank'>
                <img src={magazine.image} style={{ width: 300 }}/>
              </a>
            </div>
            <div className='col-xs-12 col-lg-6' style={{ marginBottom: 30, zIndex: 2 }}>
              <h1 style={{ fontSize: '4rem', color: '#111' }}>{magazine.title}</h1>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className='container-fluid'>
        {_magazines}
      </div>
    )
  }
}

export default MagazineView
