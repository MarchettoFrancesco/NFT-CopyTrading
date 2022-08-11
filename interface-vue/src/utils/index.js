// eslint-disable-next-line object-curly-newline
import { getCurrentInstance, reactive, toRefs, watch } from '@vue/composition-api'

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy

  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}
export const config = {
  contractAddress : "KT1MbXntDHjtwYwu3YEpJy9FRciGuku1XD8u", 
  tokenAddress: "KT1MbXntDHjtwYwu3YEpJy9FRciGuku1XD8u"
}

export const _ = null
