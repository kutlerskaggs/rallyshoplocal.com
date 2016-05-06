import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import Loader from 'components/Loader'
import TransitionGroup from 'react-addons-css-transition-group'
// redux
import { getCategories, getPosts } from 'redux/modules/actions/posts'
// css
import styles from './styles.scss'

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
      <Router key='router' history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../../redux/utils/createDevToolsWindow').default(this.props.store)
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
    let transitionClasses = {
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive
    }

    return (
      <Provider store={this.props.store}>
        <div>
          <TransitionGroup
            transitionName={transitionClasses}
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}
          >
            {this.state.initialLoad
            ? <div key='loader' className={styles.loaderWrapper}><Loader /></div>
            : this.content}
          </TransitionGroup>
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
