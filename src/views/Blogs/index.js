import React, { Component, PropTypes } from 'react'
// components
import Post from 'components/Post'

export class BlogsView extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    featuredPosts: PropTypes.array.isRequired
  }

  render () {
    let { featuredPosts } = this.props
    console.log(this.context.router.state)
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

    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className='row col-xs-12 col-lg-10'>
            <h1>Featured Posts</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{_featuredPosts}</div>
            <h1>Blogs</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogsView
