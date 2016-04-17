import React, { Component } from 'react'

export class CreativesView extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>Creatives</h1>
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
