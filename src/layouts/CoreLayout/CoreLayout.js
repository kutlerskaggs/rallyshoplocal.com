import React, { PropTypes } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
// css
import '../../styles/core.scss'
import '../../styles/vendor/styles'
import styles from './styles.scss'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    return (
      <div>
        <Header />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default CoreLayout
