import React, { Component, PropTypes } from 'react'
import SectionTitle from 'components/SectionTitle'

export class CreativesView extends Component {

  static propTypes = {
    creatives: PropTypes.array,
    error: PropTypes.string
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <SectionTitle label='Creatives' />
          </div>
        </div>
        <div className='row center-xs middle-xs' style={{ height: 150 }}>
          <h2 className='col-xs-12 col-lg-offset-1 col-lg-10'>
            Check back soon to see a showcase of local businesses!
          </h2>
        </div>
      </div>
    )
  }
}

export default CreativesView
