import React, { Component } from 'react'
import styles from './styles.scss'

export class AboutView extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>About</h1>
        </div>
        <div className={`row ${styles.about}`}>
          <div className='col-xs-12 col-sm-6 col-lg-offset-1 col-lg-5'>
            <h2>NICOLE CRABB</h2>
            <span>ART DIRECTOR</span>

            <h2>MIRANDA BERDAHL</h2>
            <span>EDITOR</span>

            <h2>RAYMOND CRAIG</h2>
            <span>AMY HARRIS</span>

            <h2>AMY HARRIS</h2>
            <span>FASHION EDITOR</span>

            <h2>SEAN INGLEDEW</h2>
            <span>COPY WRITER</span>

            <h2>MAT CRABB</h2>
            <span>COPY WRITER</span>
          </div>
          <div className='col-xs-12 col-sm-6 col-lg-5'>
            <h2>MOLLY JOHNSON</h2>
            <span>BEAUTY EDITOR</span>

            <h2>ALYSSA NAVARRO</h2>
            <span>BEAUTY EDITOR</span>

            <h2>SHAYLEE HERSHMAN</h2>
            <span>BEAUTY EDITOR</span>

            <h2>DANA MILLER</h2>
            <span>PHOTOGRAPHER</span>

            <h2>CHRIS LUSE</h2>
            <span>PHOTOGRAPHER</span>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutView
