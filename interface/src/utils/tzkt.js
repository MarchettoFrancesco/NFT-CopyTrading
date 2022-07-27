// TODO 8 - Fetch storage of the Lottery by completing fetchStorage

import { tezos } from "./tezos";
import axios from "axios";
import config from "../config";

export const hex2buf = (hex) => {
	return new Uint8Array(
		hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16))
	);
};

export function bytes2Char(hex) {
	return Buffer.from(hex2buf(hex)).toString("utf8");
}

export const fetchData = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(
				`https://api.jakartanet.tzkt.io/v1/contracts/KT1CnEw84tkBhfCKns428M27jXNDbb6wgMTc/bigmaps/data/keys`
			);
			const response1 = await axios.get(
				`https://api.jakartanet.tzkt.io/v1/contracts/KT1QqzwQcufYWP9Myg8MESZ6rWGGrwCW81gT/bigmaps/token_metadata/keys`
			);
			const d1 = response.data;
			const d2 = response1.data;
			let tokenData = [];
			for (let i = 0; i < d1.length; i++) {
				const s = bytes2Char(d2[i].value.token_info[""])
					.split("//")
					.at(-1);

				const res = await axios.get("https://ipfs.io/ipfs/" + s);

				const l1 = d1[i].value;
				const l2 = res.data;
				tokenData[i] = {
					...l1,
					...l2,
					token_id: d2[i].value.token_id,
				};
			}
			console.log(tokenData);
			dispatch({ type: "SET_TOKEN_DATA", payload: tokenData });

		} catch (e) {
			console.log(e);
		}
	};
};
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
            dispatch(fetchData());
		} catch (e) {
			console.log(e);
		}
	};
};

export const collectNFT = ({ Tezos, amount, id }) => {
	return async (dispatch) => {
		try {
			const contract = await Tezos.wallet.at(config.contractAddress);

			const op = await contract.methods
				.collect(id)
				.send({ mutez: true, amount: amount });
			await op.confirmation();
            dispatch(fetchData());
		} catch (e) {
			console.log(e);
		}
	};
};