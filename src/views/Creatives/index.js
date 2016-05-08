import React, { Component, PropTypes } from 'react'
import SectionTitle from 'components/SectionTitle'
// css
import styles from './styles.scss'

export class CreativesView extends Component {

  static propTypes = {
    creatives: PropTypes.array,
    error: PropTypes.string
  }

  render () {
    let creatives = this.props.creatives.map((creative, index) => {
      return (
        <div key={index} className='row'>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.title}`}>
            <h2>{creative.name}</h2>
            <img src={`${creative.path}images/cover.jpg`} />
          </div>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.content}`}>
            <h3>Tiffannie</h3>
            <img src={`${creative.path}images/feature1.jpg`} />
            <p dangerouslySetInnerHTML={{ __html: creative.feature1 }}></p>
          </div>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.content}`}>
            <h3>Alyssa</h3>
            <img src={`${creative.path}images/feature2.jpg`} />
            <p dangerouslySetInnerHTML={{ __html: creative.feature2 }}></p>
          </div>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.contact}`}>
            <h3>Contact</h3>
            <span>email: blah@web.com</span>
            <span>phone: (307) 315-7230</span>
            <span>web: <a href='http://www.theglamourgypsies.com'>http://www.theglamourgypsies.com</a></span>
          </div>
        </div>
      )
    })

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <SectionTitle label='Creatives' />
          </div>
        </div>
        {creatives}
      </div>
    )
  }
}

export default CreativesView
