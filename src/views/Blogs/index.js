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
    featuredPosts: PropTypes.array.isRequired
  }

  render () {
    let { blogs, featuredPosts } = this.props
    let { context: { router } } = this

    let _featuredPosts = featuredPosts.map((post) => {
      let { _category, content, featured_image, ID: id, slug } = post
      let onClick = () => router.push(`/blogs/${_category}/${slug}`)
      let el = document.createElement('div')
      el.innerHTML = content
      let preview = el.textContent.slice(0, 500)
      return (
        <Post
          key={id}
          content={preview}
          imgSrc={featured_image}
          post={post}
          onClick={onClick} />
      )
    })
    let _blogs = blogs.map((blog) => {
      let { ID: id, name, slug } = blog
      let imgSrc = `/images/blogs/${slug}.jpg`
      let onClick = () => this.context.router.push(`/blogs/${slug}`)
      return (
        <div key={id} className='col-xs-12 col-lg-4'>
          <div className={styles.cardWrapper} onClick={onClick}>
            <div className={styles.card}>
              <div className={styles.cardImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
              <div className={styles.cardContent}>
                <div className={styles.title}>
                  <h1>{name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
            <h1 style={{ textAlign: 'left' }}>Featured Posts</h1>
            {_featuredPosts}
            <h1>Blogs</h1>
            {_blogs}
          </div>
        </div>
      </div>
    )
  }
}

export default BlogsView
