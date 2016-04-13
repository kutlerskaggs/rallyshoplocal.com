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
      let onClick = () => router.push(`/blogs/${post.blog.id}/${post.id}`)
      let el = document.createElement('div')
      el.innerHTML = post.content
      let image = el.getElementsByTagName('img')[0]
      // get biggest image available up to 600px wide
      let imgSrc = image.src.replace(/\/s[0-9]+\//, '/w600/')
      let preview = el.textContent.slice(0, 500)
      return (
        <Post key={post.id} content={preview} imgSrc={imgSrc} post={post} type='blog' onClick={onClick} />
      )
    })

    let _blogs = blogs.map((blog) => {
      let imgSrc = `/images/blogs/${blog.id}.jpg`
      let onClick = () => this.context.router.push(`/blogs/${blog.id}`)
      return (
        <div key={blog.id} className='col-xs-12 col-lg-4'>
          <div className={styles.cardWrapper} onClick={onClick}>
            <div className={styles.card}>
              <div className={styles.cardImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
              <div className={styles.cardContent}>
                <div className={styles.title}>
                  <h1>{blog.name}</h1>
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
