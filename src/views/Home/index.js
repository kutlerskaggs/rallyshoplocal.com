import React, { Component, PropTypes } from 'react'
// components
import PostAngled from 'components/PostAngled'
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
      return (
        <div key={id} className={`col-xs-12 col-sm-8 col-md-6 col-lg-4 ${styles.postContainer}`}>
          <PostAngled onClick={onClick} post={post} />
        </div>
      )
    }).slice(0, 3) // limit 3

    return (
      <div>
        <div className='container-fluid'>
          <div className='row center-xs start-md'>
            <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>Featured</h1>
          </div>
          <div className={`row center-xs ${styles.postsContainer}`}>
            {_posts}
          </div>
        </div>
        <div className={`container-fluid ${styles.recentContainer}`}></div>
      </div>
    )
  }
}
