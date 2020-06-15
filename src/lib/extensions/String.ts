/* eslint-disable no-extend-native */
export {}

const badWordsRegex = require('badwords-list').regex
const appendedBadWordsRegex = '|dicks)\b/gi'
let badWordsRegexString = badWordsRegex.toString()
badWordsRegexString = badWordsRegexString.substr(0, badWordsRegexString.length - 6) + appendedBadWordsRegex
const regex = new RegExp(badWordsRegexString, 'gi')

declare global {
  interface String {
    sanitize(nsfw: boolean): string;
  }
}

String.prototype.sanitize = function (nsfw: boolean) {
  return nsfw && this
    ? this.replace(regex, function (a) {
      return '*'.repeat(a.length)
    }).toString()
    : this.toString()
}
