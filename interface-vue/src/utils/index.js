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
export const mintNFT = ({ Tezos, amount, metadata }) => {
	return async (dispatch) => {
		try {
			const contract = await Tezos.wallet.at(config.contractAddress);
			let bytes = "";
			for (var i = 0; i < metadata.length; i++) {
				bytes += metadata.charCodeAt(i).toString(16).slice(-4);
			}
			const op = await contract.methods.mint(amount, bytes).send();
			await op.confirmation();

		} catch (e) {
			console.log(e);
		}
	};
};
export const collectNFT =({collect}) => {
	return async (dispatch) => {
		try {
			const contract = await Tezos.wallet.at(config.contractAddress);
      const op = await contract.methods.collect(collect)
			await op.confirmation();

		} catch (e) {
			console.log(e);
		}
	};
};
export const _ = null
