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
    activeBlog: PropTypes.string,
    blogs: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    loadMore: PropTypes.func.isRequired,
    moreAvailable: PropTypes.bool.isRequired
  }

  render () {
    let { activeBlog, blogs, posts } = this.props
    let { context: { router } } = this
    let _featuredPosts = posts.map((post) => {
      let { _category, excerpt, featured_image, ID: id, slug } = post
      let onClick = () => router.push(`/blogs/${_category}/${slug}`)
      featured_image = `${featured_image}?resize=600%2C600`
      let el = document.createElement('div')
      el.innerHTML = excerpt
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
    let descriptions = {
      'connie-lingus': 'Female sex narrative.',
      'horse-trough-time-machine': 'Witty, historical escapade. Read, laugh, learn, drink, vomit, repeat.',
      'thomas-foolery': 'A cunning linguist\'s perspective of culture, stereotypes, and life.'
    }
    let _blogTitle = 'Blogs'
    let _blogs = blogs.map((blog) => {
      let { ID: id, name, slug } = blog
      _blogTitle = activeBlog === slug ? name : _blogTitle
      let imgSrc = `/images/blogs/${slug}.jpg`
      let onClick = () => this.context.router.push(`/blogs/${slug}`)
      return (
        <div key={id} className={`${styles.blogCard} ${activeBlog === slug ? styles.active : ''}`} onClick={onClick}>
          <div className={styles.blogImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
          <div className={styles.blogTitle}>
            <h1>{name}</h1>
            <h3 className={styles.hidden}>
              {descriptions[slug]}
            </h3>
          </div>
        </div>
      )
    })

    return (
      <div className='container-fluid'>

        <div className='row center-xs start-md'>
          <h1 className='col-xs-12 col-lg-offset-1 col-lg-10'>
            {_blogTitle}
          </h1>
        </div>
        <div className={`row center-xs ${styles.blogsContainer} ${styles.hideSmall}`}>
          <div className='col-xs-12 col-lg-10'>
            {_blogs}
          </div>
        </div>

        <div className={`row center-xs start-md ${styles.hideSmall}`}>
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
