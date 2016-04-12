import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
import TransitionGroup from 'react-addons-css-transition-group'
import { throttle } from 'lodash'

export class MagazineView extends Component {

  static propTypes = {
    onPageFlip: PropTypes.func.isRequired,
    pageCount: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { flipDirection: undefined, page: 0 }
  }

  onPageFlip = throttle((direction) => {
    this.setState({
      flipDirection: direction,
      page: this.state.page + (direction === 'forward' ? 2 : -2)
    })
    this.props.onPageFlip(direction)
  }, 800, { leading: true, trailing: false })

  render () {
    let { page } = this.state
    console.log('render', page > 1)
    let { pageCount } = this.props
    let leftPage = page > 1 ? `/images/rswinter/rswinter ${page}.jpeg` : undefined
    let rightPage = (page + 1) <= pageCount ? `/images/rswinter/rswinter ${page + 1}.jpeg` : undefined
    let { onPageFlip } = this
    let flippingForward = this.state.flipDirection === 'forward'
    let pageBackward = onPageFlip.bind(this, 'backward')
    let pageForward = onPageFlip.bind(this, 'forward')
    let {
      leftFaceDown,
      leftFaceUpBottom,
      leftFaceUpTop,
      leftFlip,
      rightFaceDown,
      rightFaceUpBottom,
      rightFaceUpTop,
      rightFlip
    } = styles
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

    return (
      <div className='container-fluid'>
        <div className={`row ${styles.magazine}`}>
          <div className={`col-xs-12 col-lg-6 ${styles.pageWrapper}`}>
            <div className={styles.pageLeft}>
              {leftPage
              ? (
                <div className={styles.arrow} onClick={pageBackward}>
                  <i className='fa fa-3x fa-angle-left fa-fw'></i>
                </div>
              )
              : ''}
              <TransitionGroup
                transitionName={transitionClassesLeft}
                transitionEnterTimeout={800}
                transitionLeaveTimeout={800}
              >
                {leftPage
                ? <img key={leftPage} src={leftPage} onClick={pageBackward} />
                : (
                  <div className={styles.info}>
                    <h1>Winter 2015</h1>
                  </div>
                )}
              </TransitionGroup>
            </div>
          </div>
          <div className={`col-xs-12 col-lg-6 ${styles.pageWrapper}`}>
            <div className={styles.pageRight}>
              <TransitionGroup
                transitionName={transitionClassesRight}
                transitionEnterTimeout={800}
                transitionLeaveTimeout={800}
              >
                {rightPage
                ? <img key={rightPage} src={rightPage} onClick={pageForward} />
                : ''}
              </TransitionGroup>
              {rightPage
              ? (
                <div className={styles.arrow} onClick={pageForward}>
                  <i className='fa fa-3x fa-angle-right fa-fw'></i>
                </div>
              )
              : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MagazineView
