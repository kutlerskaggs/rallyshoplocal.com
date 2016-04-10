import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
import Window from 'HOC/Window'

class _HomeView extends Component {

  static propTypes = {
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
    let content = [{
      id: 1,
      title: 'THE NOT COSMO GUIDE TO GETTING IT ON',
      body: 'Cosmopolitan magazine is supposedly geared towards contemporary women having contemporary sex. It’s marketed towards young professionals, to well dressed “20 – something’s” (a phrase I’ve grown to',
      type: 'blog',
      image: 'images/cosmo.jpg'
    }, {
      id: 2,
      title: 'PHOTOS OF PHANTOM FITNESS',
      body: 'I am not sure when the “before and after” photos became synonymous with success. Usually associated with workout programs or diet trends, this pictorial reference, or',
      type: 'blog',
      image: 'images/fitness.jpg'
    }, {
      id: 3,
      title: 'BONE MUSIC: NOT THE BARRY WHITE KIND',
      body: '“Bone Records” recorded on used X-Ray film in 1950’s USSR   This edition of Horse Trough Time Machine is dedicated to Sonic Rainbow, our beloved',
      type: 'blog',
      image: 'images/bones.jpg'
    }, {
      id: 4,
      title: 'CINEMA DANGER DUO PODCAST EPISODE 9',
      body: 'Raymond and Miranda as the Cinema Danger Duo Cinema Danger Duo is a bi-weekly podcast with two friends, Ray and Miranda, who have had too',
      type: 'blog',
      image: 'images/cinema.jpg'
    }, {
      id: 5,
      title: 'CONSPICUOUS CONSUMPTION',
      body: '“Expenditure on or consumption of luxuries on a lavish scale in an attempt to enhance one’s prestige.” The term was introduced by sociologist, Thorsten Veblen,',
      type: 'podcast',
      image: 'images/toilet.jpg'
    }, {
      id: 6,
      title: 'OUR EXPERIMENTS IN ENVIRONMENTALLY FRIENDLY PERIOD PRODUCTS',
      body: 'When I first started my period I did what most beginners do: I stuffed toilet paper into my underwear and panicked. I attempted to hide',
      type: 'blog',
      image: 'images/period.jpg'
    }]

    let showRevealStyle = {
      transform: 'translate3d(0, 0, 0)'
    }

    let _content = content.map((item) => {
      let onTouchTap = this.onTouchTap.bind(this, item.id)
      return (
        <div key={item.id} className='col-xs-12 col-lg-6' onClick={onTouchTap}>
          <div className={styles.cardWrapper}>
            <div className={styles.card}>
              <div className={styles.cardImage} style={{backgroundImage: `url('${item.image}')`}}></div>
              <div className={styles.cardContent}>
                <div className={styles.title}>
                  <h1>{item.title}</h1>
                </div>
                <div className={styles.reveal} style={this.state.reveal[item.id] ? showRevealStyle : {}}>
                  <p>{item.body}</p>
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
