export {}

const badWordsRegex = require('badwords-list').regex
const regex = new RegExp(badWordsRegex, 'gi')

declare global {
  interface String {
    sanitize(nsfw: boolean): string;
  }
}

// eslint-disable-next-line no-extend-native
String.prototype.sanitize = function (nsfw: boolean) {
  return nsfw && this
    ? this.replace(regex, function (a) {
      return '*'.repeat(a.length)
    }).toString()
    : this.toString()
}
