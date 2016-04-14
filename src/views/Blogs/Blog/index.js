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
      let onClick = () => this.context.router.push(`/blogs/${post.blog.id}/${post.id}`)
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

    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
            <h1>{this.props.blog.name}</h1>
            {posts}
          </div>
        </div>
      </div>
    )
  }
}

export default BlogView
