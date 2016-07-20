let s3Uri = 'https://s3-us-west-2.amazonaws.com'
let bucket = 'www-rallyshoplocal-com'
let defaultParams = { Bucket: bucket }
let _s3 = new window.AWS.S3()
let s3 = {}

s3.getObject = (params, cb) => {
  params = Object.assign(params, defaultParams)
  _s3.makeUnauthenticatedRequest('getObject', params, cb)
}

s3.listObjectsV2 = (params, cb) => {
  params = Object.assign(params, defaultParams)
  _s3.makeUnauthenticatedRequest('listObjectsV2', params, cb)
}
export { s3 }

// access s3 with absolute urls so we don't have to store
// magazines, etc. in project
// webpack will replace __PROD__ with true in production
let basePath = __PROD__ ? '' : `${s3Uri}/${bucket}`
export { basePath }
