import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
import Window from 'HOC/Window'

class _HomeView extends Component {

  static propTypes = {
    content: PropTypes.array.isRequired,
    window: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    // for use on mobile and tablet only
    this.state = { reveal: {} }
  }

  onTouchTap (id) {
    let { window } = this.props
    if (window.isTablet || window.isMobile) {
      this.setState({
        reveal: {
          [id]: !this.state.reveal[id]
        }
      })
    }
  }

  render () {
    let { content } = this.props

    let showRevealStyle = {
      transform: 'translate3d(0, 0, 0)'
    }

    let _content = content.map((item) => {
      let onTouchTap = this.onTouchTap.bind(this, item.id)
      let el = document.createElement('div')
      el.innerHTML = item.content
      let image = el.getElementsByTagName('img')[0]
      // get biggest image available up to 600px wide
      let imgSrc = image.src.replace(/\/s[0-9]+\//, '/w600/')
      return (
        <div key={item.id} className='col-xs-12 col-lg-6' onClick={onTouchTap}>
          <div className={styles.cardWrapper}>
            <div className={styles.card}>
              <div className={styles.cardImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
              <div className={styles.cardContent}>
                <div className={styles.title}>
                  <h1>{item.title}</h1>
                </div>
                <div className={styles.reveal} style={this.state.reveal[item.id] ? showRevealStyle : {}}>
                  <p>{el.textContent.slice(0, 500)}</p>
                </div>
                <i className={`fa fa-${item.type === 'blog' ? 'pencil' : 'microphone'} fa-fw ${styles.icon}`}></i>
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div className={styles.splashContent}>
          <div className='container-fluid'>
            <div className={'row center-xs middle-xs'}>
              <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
                {_content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const HomeView = Window(_HomeView)
export default HomeView
