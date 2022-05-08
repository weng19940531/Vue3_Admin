<template>
  <el-config-provider :locale="locale">
    <router-view v-if="visible" />
  </el-config-provider>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import useLocaleStore from '@/store/useLocaleStore'

export default defineComponent({
  name: 'App',
  setup() {
    const localeStore = useLocaleStore()

    const visible = ref(false)
    const locale = computed(() => localeStore.ElLocale)

    localeStore.initLang().then(() => {
      visible.value = true
    })

    return {
      visible,
      locale
    }
  }
})
</script>
