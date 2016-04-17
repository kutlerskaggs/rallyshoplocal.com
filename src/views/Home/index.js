import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// components
import Post from 'components/Post'

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
      let { _category, _type, content, featured_image, ID: id, slug } = post
      let onClick = () => this.context.router.push(`/${_type}s/${_category}/${slug}`)
      let el = document.createElement('div')
      el.innerHTML = content
      let preview = el.textContent.slice(0, 500)
      return (
        <div key={id} className='col-xs-12 col-sm-8 col-md-6 col-lg-5'>
          <Post
            content={preview}
            imgSrc={featured_image}
            onClick={onClick}
            post={post} />
        </div>
      )
    })

    return (
      <div className='container-fluid'>
        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>Featured</h1>
        </div>
        <div className={`row center-xs ${styles.postsContainer}`}>
          {_posts}
        </div>
      </div>
    )
  }
}
