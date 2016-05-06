import React, { Component, PropTypes } from 'react'
// components
import Loader from 'components/Loader'
import Post from 'components/Post'
import SectionTitle from 'components/SectionTitle'
// css
import styles from './styles.scss'
import Waypoint from 'react-waypoint'
import TransitionGroup from 'react-addons-css-transition-group'

export class PostsView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    type: PropTypes.string
  }

  render () {
    let { category, posts, type } = this.props
    let { context: { router } } = this
    let title = category || (type === 'blogs' ? 'Blog Posts' : 'Podcasts')
    /** fade/slide in */
    let transitionClasses = {
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: '__leave__',
      leaveActive: '__leaveActive__'
    }
    let featuredPosts = []
    let featuredPostsGroup = []
    posts.forEach((post, index) => {
      let { _category, ID: id, slug } = post
      let onClick = () => router.push(`/${type}/${_category}/${slug}`)
      let sizes = {
        0: 'medium',
        7: 'large'
      }
      let groups = {
        4: 'medium',
        7: 'large',
        13: 'small'
      }

      let position = (index + 14) % 14
      let size = sizes[position] || 'small'
      let _post = <Post key={id} size={size} post={post} onClick={onClick} />
      featuredPostsGroup.push(_post)

      let group = groups[position]
      if (group || (index + 1 === posts.length)) {
        // last item in current group
        let _posts = (
          <TransitionGroup
            key={`${type}${featuredPosts.length}`}
            className={styles[group]}
            transitionName={transitionClasses}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={0}
          >
            {featuredPostsGroup}
          </TransitionGroup>
        )
        featuredPosts.push(_posts)
        featuredPostsGroup = []
      }
      return <Post key={id} size={size} post={post} onClick={onClick} />
    })

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <SectionTitle label={title} />
          </div>
        </div>

        <div className='row'>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.postsContainer}`}>
            {featuredPosts}
            <Waypoint onEnter={this.props.loadMore} />
            <div className={styles.loader}>{this.props.loading ? <Loader /> : ''}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostsView
