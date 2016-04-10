import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
import TransitionGroup from 'react-addons-css-transition-group'

export class MagazineView extends Component {

  static propTypes = {
    left: PropTypes.string,
    right: PropTypes.string,
    onPageFlip: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { flipDirection: undefined }
  }

  onPageFlip (direction) {
    this.setState({ flipDirection: direction })
    this.props.onPageFlip(direction)
  }

  render () {
    let { onPageFlip } = this
    let pageBackward = onPageFlip.bind(this, 'backward')
    let pageForward = onPageFlip.bind(this, 'forward')
    let flippingForward = this.state.flipDirection === 'forward'
    let { leftFaceUpTop, leftFaceUpBottom, leftFlip, leftFaceDown, rightFaceUpTop, rightFaceUpBottom, rightFlip, rightFaceDown } = styles
    let transitionClassesLeft = {
      enter: flippingForward ? leftFaceDown : leftFaceUpBottom,
      enterActive: flippingForward ? leftFlip : 'blah',
      leave: flippingForward ? leftFaceUpBottom : leftFaceUpTop,
      leaveActive: flippingForward ? 'blah' : leftFaceDown
    }
    let transitionClassesRight = {
      enter: flippingForward ? rightFaceUpBottom : rightFaceDown,
      enterActive: flippingForward ? 'blah' : rightFlip,
      leave: flippingForward ? rightFaceUpTop : rightFaceUpBottom,
      leaveActive: flippingForward ? rightFaceDown : 'blah'
    }

    let left = this.props.left ? <img src={this.props.left} className={styles.page} onClick={pageBackward} /> : <h1>Winter 2015</h1>

    return (
      <div className='container-fluid'>
        <div className={`row ${styles.magazine}`}>
          <div className={`col-xs-12 col-lg-6 ${styles.pageWrapper}`}>
            <TransitionGroup
              transitionName={transitionClassesLeft}
              transitionEnterTimeout={800}
              transitionLeaveTimeout={800}
            >
              <img key={this.props.left} src={this.props.left} className={styles.page} onClick={pageBackward} />
            </TransitionGroup>
          </div>
          <div className={`col-xs-12 col-lg-6 ${styles.pageWrapper}`}>
            <TransitionGroup
              transitionName={transitionClassesRight}
              transitionEnterTimeout={800}
              transitionLeaveTimeout={800}
            >
              <img key={this.props.right} src={this.props.right} className={styles.page} onClick={pageForward} />
            </TransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default MagazineView
