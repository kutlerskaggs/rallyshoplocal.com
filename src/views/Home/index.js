import React, { Component, PropTypes } from 'react'
// components
import FeaturedPost from 'components/FeaturedPost'
import SectionTitle from 'components/SectionTitle'
// HOC
import Window from 'HOC/Window'
// css
import styles from './styles.scss'

class HomeView extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    posts: PropTypes.array.isRequired,
    window: PropTypes.object.isRequired
  }

  render () {
    let { posts, window: { isSmall, isMedium, isHuge } } = this.props
    let len = isSmall || isMedium || isHuge ? 4 : 3
    let _posts = posts.slice(0, len).map((post, index) => {
      let { _category, _type, ID: id, slug } = post
      let onClick = () => this.context.router.push(`/${_type}s/${_category}/${slug}`)
      let positions = ['start', 'centerLeft', 'end']
      len === 4 && positions.splice(2, 0, 'centerRight')
      return (
        <FeaturedPost key={id} onClick={onClick} post={post} position={positions[index]} />
      )
    })

    return (
      <div>
        <div className={`container-fluid ${styles.container}`}>
          <div className={`row center-xs ${styles.postsContainer}`}>
            <div className='col-xs-12 col-lg-10'>
              {_posts}
            </div>
          </div>
        </div>
        <div className={`container-fluid ${styles.container} ${styles.recentContainer}`}>
          <div className='row'>
            <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
              <SectionTitle label='Recent Posts' dark />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Window(HomeView)
