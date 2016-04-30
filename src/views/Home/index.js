import React, { Component, PropTypes } from 'react'
// components
import FeaturedPost from 'components/FeaturedPost'
// css
import styles from './styles.scss'

export default class HomeView extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render () {
    let { posts } = this.props

    let _posts = posts.map((post, index) => {
      let { _category, _type, ID: id, slug } = post
      let onClick = () => this.context.router.push(`/${_type}s/${_category}/${slug}`)
      let positions = ['start', 'center', 'end']
      return (
        <FeaturedPost key={id} onClick={onClick} post={post} position={positions[index]} />
      )
    }).slice(0, 3) // limit 3

    return (
      <div>
        <div className='container-fluid'>
          <div className='row center-xs start-md'>
            <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>Featured</h1>
          </div>
          <div className={`row center-xs ${styles.postsContainer}`}>
            <div className='col-xs-12 col-lg-10'>
              {_posts}
            </div>
          </div>
        </div>
        <div className={`container-fluid ${styles.recentContainer}`}></div>
      </div>
    )
  }
}
