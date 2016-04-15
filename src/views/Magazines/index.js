import React, { Component } from 'react'

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
    let _magazines = magazines.map((magazine) => {
      return (
        <div className='row middle-xs' key={magazine.id} style={{ position: 'relative' }}>
          <img src='images/Brush.1.svg' style={{ position: 'absolute', top: 50, left: 0, zIndex: 1 }} />
          <div className='col-xs-12 col-lg-6' style={{ marginBottom: 30, textAlign: 'right', zIndex: 2 }}>
            <a href={magazine.src} target='_blank'>
              <img src={magazine.image} style={{ width: 300 }}/>
            </a>
          </div>
          <div className='col-xs-12 col-lg-6' style={{ marginBottom: 30, zIndex: 2 }}>
            <h1 style={{ fontSize: '4rem', color: '#111' }}>{magazine.title}</h1>
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
