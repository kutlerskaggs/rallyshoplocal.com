import React, { Component, PropTypes } from 'react'
// components
import Post from 'components/Post'
import SectionTitle from 'components/SectionTitle'
// css
import styles from './styles.scss'
import Waypoint from 'react-waypoint'
import TransitionGroup from 'react-addons-css-transition-group'

export class BlogsView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    activeBlog: PropTypes.string,
    blogs: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    loadMore: PropTypes.func.isRequired,
    moreAvailable: PropTypes.bool.isRequired
  }

  render () {
    let { activeBlog, blogs, posts } = this.props
    let { context: { router } } = this
    let _featuredPosts = posts.map((post, index) => {
      let { _category, ID: id, slug } = post
      let onClick = () => router.push(`/blogs/${_category}/${slug}`)
      let sizes = {
        0: 'medium',
        3: 'large'
      }
      let size = sizes[(index + 7) % 7] || 'small'
      return <Post key={id} size={size} post={post} onClick={onClick} />
    })
    /** fade/slide in */
    let transitionClasses = {
      enter: styles.enter,
      enterActive: styles.enterActive
    }

    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            <SectionTitle label='Blog Posts' />
          </div>
        </div>

        <div className='row center-xs start-md'>
          <div className={`col-xs-12 col-lg-offset-1 col-lg-10 ${styles.postsContainer}`}>
            <TransitionGroup
              transitionName={transitionClasses}
              transitionEnterTimeout={500}
            >
              {_featuredPosts}
            </TransitionGroup>
            <Waypoint onEnter={this.props.loadMore} />
          </div>
        </div>
      </div>
    )
  }
}

export default BlogsView
