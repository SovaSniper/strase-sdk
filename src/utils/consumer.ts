import { PublicClient, WalletClient, getContract, toHex } from "viem";
import { getConsumerAddress } from "./constants";
import { getClient } from "./client";
import { abi } from "../abi/consumer";
import { encodeFunctionData } from 'viem'
import { ChainID } from "./evm";

const callbackGasLimit = 300_000;
export class FunctionConsumer {
    contract: any;
    publicWallet: PublicClient;
    subscriptionId: string = "60";

    constructor(chain: string = ChainID.BASE_MAINNET, wallet: WalletClient) {
        const address = getConsumerAddress(chain) as `0x${string}`;
        this.publicWallet = getClient(chain);

        this.contract = getContract({
            address,
            abi,
            client: { public: this.publicWallet, wallet: wallet },
        })
    }

    /**
     * 
     * @param publishableKey 
     * @param paymentIntent 
     * @returns 
     */
    async sendRequest(publishableKey: string, paymentIntent: string) {
        const args = [toHex(publishableKey), toHex(paymentIntent)];

        // console.log("Sending request to Chainlink node", args);
        return await this.contract.write.sendRequest([
            source, // source
            "0x", // user hosted secrets - encryptedSecretsUrls - empFty in this example
            0, // don hosted secrets - slot ID - empty in this example
            0, // don hosted secrets - version - empty in this example
            args,
            [], // bytesArgs - arguments can be encoded off-chain to bytes.
            this.subscriptionId,
            callbackGasLimit,
        ]);
    }

    sendRequestEncode(publishableKey: string, paymentIntent: string) {
        const args = [toHex(publishableKey), toHex(paymentIntent)];

        // console.log("Sending request to Chainlink node", source);
        return encodeFunctionData({
            abi: abi,
            functionName: 'sendRequest',
            args: [
                source, // source
                "0x", // user hosted secrets - encryptedSecretsUrls - empFty in this example
                0, // don hosted secrets - slot ID - empty in this example
                0, // don hosted secrets - version - empty in this example
                args,
                [], // bytesArgs - arguments can be encoded off-chain to bytes.
                this.subscriptionId,
                callbackGasLimit,
            ]
        });
    }
}

// TODO: Include Mainnet API, as currently only testnet is supported
// const source = fs
//     // .readFileSync(path.resolve("source.js"))
//     .readFileSync("./source.js")
//     .toString();
const source = `
const publicKey = args[0]
const paymentIntent = args[1]

const apiResponse = await Functions.makeHttpRequest({
    url: "https://strase-nine.vercel.app/api/chain/verify/test",
    method: "POST",
    data: {
        "publishableKey": publicKey,
        "paymentIntent": paymentIntent,
    }
})

if (apiResponse.error) {
    console.error(apiResponse.error)
    throw Error("Request failed", apiResponse.error)
}

const { data } = apiResponse;

return Functions.encodeString(data.result)
`.trim();