import React, { Component, PropTypes } from 'react'
// components
import Post from 'components/Post'
// css
import styles from './styles.scss'

export class PodcastsView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    activePodcast: PropTypes.string,
    podcasts: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    loadMore: PropTypes.func.isRequired,
    moreAvailable: PropTypes.bool.isRequired
  }

  render () {
    let { activePodcast, podcasts, posts } = this.props
    let { context: { router } } = this
    let _featuredPosts = posts.map((post) => {
      let { _category, ID: id, slug } = post
      let onClick = () => router.push(`/podcasts/${_category}/${slug}`)
      return (
        <div key={id} className='col-xs-12 col-sm-8 col-md-6 col-lg-5'>
          <Post post={post} onClick={onClick} />
        </div>
      )
    })
    let descriptions = {
      'cinema-danger-duo': 'Ray and Miranda engage in a spoiler heavy discussion of 3 films.',
      'no-label-roundtable': 'Unrehearsed amusement that is a talk among friends.'
    }
    let _podcastTitle = 'Podcasts'
    let _podcasts = podcasts.map((podcast) => {
      let { ID: id, name, slug } = podcast
      _podcastTitle = activePodcast === slug ? name : _podcastTitle
      let imgSrc = `/images/podcasts/${slug}.jpg`
      let onClick = () => this.context.router.push(`/podcasts/${slug}`)
      let activeStyle = activePodcast === slug ? styles.active : ''
      return (
        <div key={id} className={`${styles.podcastCard} ${activeStyle}`} onClick={onClick}>
          <div className={styles.podcastImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
          <div className={styles.podcastTitle}>
            <h1>{name}</h1>
            <h3 className={styles.hidden}>
              {descriptions[slug]}
            </h3>
          </div>
        </div>
      )
    })

    return (
      <div className='container-fluid'>

        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>
            {_podcastTitle}
          </h1>
        </div>

        <div className={`row center-xs ${styles.podcastsContainer} ${styles.hideSmall}`}>
          <div className='col-xs-12 col-lg-10'>
            {_podcasts}
          </div>
        </div>

        <div className={`row center-xs start-md ${styles.hideSmall}`}>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>Posts</h1>
        </div>

        <div className={`row center-xs ${styles.postsContainer}`}>
          {_featuredPosts}
        </div>

        <div className='row center-xs'>
          <div className='col-xs-12'>
            <input
              type='button'
              value='Load more'
              className={styles.loadMore}
              onClick={this.props.loadMore}
              style={{ display: this.props.moreAvailable ? 'initial' : 'none' }} />
          </div>
        </div>
      </div>
    )
  }
}

export default PodcastsView
