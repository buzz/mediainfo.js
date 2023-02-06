// @types/gulp-babel is incomplete as it lacks `envName` property in `options`

declare module 'gulp-babel' {
  function babel(options?: { envName: string }): NodeJS.ReadWriteStream
  export default babel
}
