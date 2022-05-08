import defineStoreFactory from './defineStoreFactory'
import store from 'store'
import * as elLangMap from 'element-plus/lib/locale/index'
import { LANG_KEY } from '@/constant/storeKey'
import { langList, fallbackLocale, setI18nLanguage, loadLocaleMessages } from '@/locale'

const state = () => ({
  lang: '',
  langList
})

const actions = {
  async initLang() {
    await this.setLang(store.get(LANG_KEY) ?? fallbackLocale)
  },
  async setLang(lang) {
    if (this.lang === lang) return

    if (elLangMap[lang] && langList.includes(lang)) {
      await loadLocaleMessages(lang)
      setI18nLanguage(lang)
      this.lang = lang
      store.set(LANG_KEY, lang)
    }
  }
}

const getters = {
  ElLocale: state => {
    return elLangMap[state.lang] ?? elLangMap[fallbackLocale]
  }
}

export default defineStoreFactory('locale', {
  state,
  actions,
  getters
})
