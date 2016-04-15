import React, { Component, PropTypes } from 'react'
// components
import Post from 'components/Post'
// css
import styles from './styles.scss'

export class BlogView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    blog: PropTypes.object.isRequired
  }

  render () {
    let { blog } = this.props
    let posts = blog.posts.map((post) => {
      let { _category, content, featured_image, ID: id, slug } = post
      let onClick = () => this.context.router.push(`/blogs/${_category}/${slug}`)
      let el = document.createElement('div')
      el.innerHTML = content
      let preview = el.textContent.slice(0, 500)
      return (
        <Post
          key={id}
          content={preview}
          imgSrc={featured_image}
          post={post}
          type='blog'
          onClick={onClick} />
      )
    })

    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
            <h1>{this.props.blog.attributes.name}</h1>
            {posts}
          </div>
        </div>
      </div>
    )
  }
}

export default BlogView
