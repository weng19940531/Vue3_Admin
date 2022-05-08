// reference: https://vue-i18n.intlify.dev/installation.html

import { createI18n } from 'vue-i18n'
import { camelCase } from 'lodash-es'

export const fallbackLocale = 'zhCn'

const i18n = createI18n({ fallbackLocale })

export const langList = []
const langDetailMap = generateLocaleInfo()

function generateLocaleInfo() {
  const langDirRegExp = /(?<=\.\/)[^\/]*/gi
  const langFileMap = import.meta.glob('./**/!(index).js')

  return Object.keys(langFileMap).reduce((map, path) => {
    const [dirName] = path.match(langDirRegExp)
    const name = camelCase(dirName)

    if (!map[name]) {
      map[name] = {
        name,
        dirName,
        isLoaded: false,
        langDescMap: {},
        requestList: []
      }
    }

    map[name].requestList.push(async () => {
      return (await langFileMap[path]()).default
    })

    if (!langList.includes(name)) {
      langList.push(name)
    }

    return map
  }, {})
}

export function setI18nLanguage(lang) {
  i18n.global.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export async function loadLocaleMessages(lang) {
  const targetLangDetail = langDetailMap[lang]

  let langDescMap
  if (targetLangDetail.isLoaded) {
    langDescMap = targetLangDetail.langDescMap
  }
  if (!targetLangDetail.isLoaded) {
    const { requestList } = targetLangDetail
    langDescMap = await Promise.all(requestList.map(request => request())).then(res => {
      return Object.assign({}, ...res)
    })

    targetLangDetail.isLoaded = true
    targetLangDetail.langDescMap = langDescMap
  }

  i18n.global.setLocaleMessage(lang, langDescMap)
}

export default i18n

console.log('【生成语言包】', langDetailMap)
