import { basePath, s3 } from 'utils/AWS'
import { sortBy } from 'lodash'

export const RECEIVE_MAGAZINES = 'RECEIVE_MAGAZINES'
export const ERROR_FETCHING_MAGAZINES = 'ERROR_FETCHING_MAGAZINES'

// called once on app startup
export const getMagazines = () => {
  return (dispatch) => {
    let magazines = []
    let magazinesPath = 'magazines'
    let params = { Prefix: `${magazinesPath}/covers` }
    let error = 'We\'re having some trouble getting our magazines for you. Please check back later.'

    return s3.listObjectsV2(params, (err, data) => {
      // end here if an error occurred
      if (err) {
        return dispatch(errorFetchingMagazines(error))
      }
      // filter function
      let isFile = (data) => /\.[0-9a-z]+$/i.test(data.Key)
      // mapping function
      let createMagazine = (data, index) => {
        let image = `${basePath}/${data.Key}`
        let edition = data.Key.split('/').pop().split('.')[0]
        let src = `${basePath}/${magazinesPath}/${edition}/index.html`
        let title = (edition[0].toUpperCase() + edition.slice(1)).replace('-', ' ')
        return { id: index, image, src, title }
      }
      // get files, sort desc, map to objects
      magazines = sortBy(data.Contents.filter(isFile), 'LastModified').reverse().map(createMagazine)
      dispatch(receiveMagazines(magazines))
    })
  }
}

export const errorFetchingMagazines = (error) => ({ type: ERROR_FETCHING_MAGAZINES, error })
export const receiveMagazines = (magazines) => ({ type: RECEIVE_MAGAZINES, magazines })
