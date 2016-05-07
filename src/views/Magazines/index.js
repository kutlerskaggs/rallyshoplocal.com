import React, { Component, PropTypes } from 'react'
import SectionTitle from 'components/SectionTitle'
// css
import styles from './styles.scss'

export class MagazineView extends Component {

  static propTypes = {
    error: PropTypes.string,
    magazines: PropTypes.array
  }

  render () {
    let { error, magazines } = this.props
    let output = error
      ? <h4>{error}</h4>
      : (
        magazines.map((magazine, index) => {
          return (
            <div key={magazine.id} className={`col-xs-12 col-md-6 col-lg-4 ${styles.magazine}`}>
              <a href={magazine.src} target='_blank'>
                <img src={magazine.image} />
                <h2>{magazine.title}</h2>
              </a>
            </div>
          )
        })
      )

    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <SectionTitle label='Magazines' />
          </div>
        </div>
        <div className='row center-xs'>
          <div className='row col-xs-12 col-md-10'>
            {output}
          </div>
        </div>
      </div>
    )
  }
}

export default MagazineView
