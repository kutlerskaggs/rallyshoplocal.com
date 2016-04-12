import React, { Component } from 'react'

export default (_Component) => {
  return class Window extends Component {

    constructor (props) {
      super(props)
      this.state = { window: {} }
    }

    componentWillMount () {
      let height = window.innerHeight
      let width = window.innerWidth

      this.setState({
        window: {
          height: height,
          width: width,
          isTablet: width > 414 && width <= 1199,
          isMobile: width <= 414,
          isHighRes: width > 1920
        }
      })
    }

    render () {
      return <_Component window={this.state.window} {...this.props} />
    }
  }
}
