import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import Loader from 'components/Loader'
// redux
import { getCategories, getPosts } from 'redux/modules/actions/posts'
// styles
// import 'styles/vendor/styles' TODO moved to CoreLayout .... still working?

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { initialLoad: true }
  }

  componentWillMount () {
    let { dispatch, getState } = this.props.store
    // get categories (bloggers/podcasts) and sample blogs/podcasts
    Promise.all([
      getCategories()(dispatch, getState),
      getPosts('blogs')(dispatch, getState),
      getPosts('podcasts')(dispatch, getState)
    ]).then(() => { this.setState({ initialLoad: false }) })
  }

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
    // TODO use transition group to animate initial loader out
    return (
      <Provider store={this.props.store}>
        <div>
          {this.state.initialLoad
          ? <Loader />
          : this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
