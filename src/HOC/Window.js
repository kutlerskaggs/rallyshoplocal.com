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
          isTiny: width <= 767,
          isSmall: width > 767 && width <= 991,
          isMedium: width > 991 && width <= 1200,
          isLarge: width > 1200 && width <= 1919,
          isHuge: width > 1919
        }
      })
    }

    render () {
      return <_Component window={this.state.window} {...this.props} />
    }
  }
}
