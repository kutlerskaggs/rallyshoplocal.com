import React, { Component } from 'react'
import SectionTitle from 'components/SectionTitle'
import styles from './styles.scss'

export class AboutView extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <SectionTitle label='About' />
          </div>
        </div>
        <div className={`row ${styles.about}`}>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <div>
              <h3>NICOLE CRABB</h3>
              <span>ART DIRECTOR</span>

              <h3>MIRANDA BERDAHL</h3>
              <span>EDITOR</span>

              <h3>RAYMOND CRAIG</h3>
              <span>PHOTOGRAPHY EDITOR</span>

              <h3>AMY HARRIS</h3>
              <span>FASHION EDITOR</span>

              <h3>SEAN INGLEDEW</h3>
              <span>COPY WRITER</span>

              <h3>MAT CRABB</h3>
              <span>COPY WRITER</span>
            </div>
            <div>
              <h3>ALYSSA NAVARRO</h3>
              <span>BEAUTY EDITOR</span>

              <h3>SHAYLEE HERSHMAN</h3>
              <span>BEAUTY EDITOR</span>

              <h3>DANA MILLER</h3>
              <span>PHOTOGRAPHER</span>

              <h3>CHRIS LUSE</h3>
              <span>PHOTOGRAPHER</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutView
