import React, { Component, PropTypes } from 'react'
// components
import Post from 'components/Post'
// css
import styles from './styles.scss'

export class BlogsView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    blogs: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    loadMore: PropTypes.func.isRequired,
    moreAvailable: PropTypes.bool.isRequired
  }

  render () {
    let { blogs, posts } = this.props
    let { context: { router } } = this
    let _featuredPosts = posts.map((post) => {
      let { _category, content, featured_image, ID: id, slug } = post
      let onClick = () => router.push(`/blogs/${_category}/${slug}`)
      let el = document.createElement('div')
      el.innerHTML = content
      let preview = el.textContent.slice(0, 500)
      return (
        <div key={id} className='col-xs-12 col-sm-8 col-md-6 col-lg-5'>
          <Post
            content={preview}
            imgSrc={featured_image}
            post={post}
            onClick={onClick} />
        </div>
      )
    })
    let _blogs = blogs.map((blog) => {
      let { ID: id, name, slug } = blog
      let imgSrc = `/images/blogs/${slug}.jpg`
      let onClick = () => this.context.router.push(`/blogs/${slug}`)
      return (
        <div key={id} className={styles.blogCard} onClick={onClick}>
          <div className={styles.blogImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
          <div className={styles.blogRotate}></div>
          <div className={styles.blogTitle}>
            <h1>{name}</h1>
          </div>
        </div>
      )
    })

    return (
      <div className='container-fluid'>

        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>Blogs</h1>
        </div>
        <div className={`row ${styles.blogsContainer}`}>
          <div className='col-xs-12 col-lg-offset-1 col-lg-10'>
            {_blogs}
          </div>
        </div>

        <div className='row center-xs start-md'>
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

export default BlogsView
