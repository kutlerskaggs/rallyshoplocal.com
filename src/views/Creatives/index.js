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
      if (!creative.config) {
        return ''
      }
      let { feature1, feature2, email, phone, web } = creative.config
      return (
        <div key={index} className={`row ${styles.creative}`}>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.title}`}>
            <h2>{creative.name}</h2>
            <img src={`${creative.path}images/cover.jpg`} />
          </div>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.content}`}>
            <h3>{feature1}</h3>
            <div><img src={`${creative.path}images/feature1.jpg`} /></div>
            <p dangerouslySetInnerHTML={{ __html: creative.feature1 }}></p>
          </div>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.content}`}>
            <h3>{feature2}</h3>
            <div><img src={`${creative.path}images/feature2.jpg`} /></div>
            <p dangerouslySetInnerHTML={{ __html: creative.feature2 }}></p>
          </div>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.contact}`}>
            <h3>Contact</h3>
            {phone ? <span>{phone}</span> : ''}
            {email ? <span>{email}</span> : ''}
            {web ? <span><a href={web}>{web}</a></span> : ''}
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
