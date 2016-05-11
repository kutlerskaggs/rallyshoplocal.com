import { basePath, s3 } from 'utils/AWS'
import each from 'async/each'

export const RECEIVE_CREATIVES = 'RECEIVE_CREATIVES'
export const ERROR_FETCHING_CREATIVES = 'ERROR_FETCHING_CREATIVES'

// called once on app startup
export const getCreatives = () => {
  return (dispatch) => {
    let creativesPath = 'creatives/'
    let params = { Delimiter: '/', Prefix: `${creativesPath}` }
    let error = 'We\'re having some trouble getting our creative\'s profiles for you. Please check back later.'

    return s3.listObjectsV2(params, (err, data) => {
      // end here if an error occurred
      if (err) {
        return dispatch(errorFetchingCreatives(error))
      }

      // map result of listObjectsV2 to an array of creatives
      // {
      //    name: 'Some Creative Name',
      //    feature1: 'My business does...',
      //    feature2: 'We love the earth and shit...',
      //    prefix: 'creatives/some-creative-name/',
      //    contact: {
      //      email: 'dog@woof.com',
      //      phone: '555-555-5555',
      //      web: 'http://www.dog.com'
      //    }
      // }
      let capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`
      let creatives = data.CommonPrefixes.map((commonPrefix) => {
        let prefix = commonPrefix.Prefix
        let name = prefix.split('/')[1].split('-').map(capitalize).join(' ')
        return { name, path: `${basePath}/${prefix}`, prefix }
      })
      let files = []
      let filesPerCreative = ['config.json', 'feature1.txt', 'feature2.txt']
      creatives.forEach((creative) => {
        let { name, prefix } = creative
        filesPerCreative.forEach((fileName) => {
          files.push({
            creative: name,
            name: fileName,
            key: `${prefix}${fileName}`
          })
        })
      })
      each(files, (file, cb) => {
        s3.getObject({ Key: file.key }, (err, contents) => {
          if (err) {
            // TODO error handling
            return cb()
          }
          let creative = creatives.find((creative) => creative.name === file.creative)
          let fileNameParts = file.name.split('.')
          creative[fileNameParts[0]] = fileNameParts[1] === 'txt'
            ? contents.Body.toString().replace(/\n/g, '<br/>')
            : JSON.parse(contents.Body.toString())
          cb()
        })
      }, (err) => {
        if (err) {
          return dispatch(errorFetchingCreatives(error))
        }
        return dispatch(receiveCreatives(creatives))
      })
    })
  }
}

export const errorFetchingCreatives = (error) => ({ type: ERROR_FETCHING_CREATIVES, error })
export const receiveCreatives = (creatives) => ({ type: RECEIVE_CREATIVES, creatives })
