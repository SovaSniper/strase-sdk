import { AbiItem, PublicClient, WalletClient, encodeFunctionData, getContract, toHex } from "viem";
import { getStoreGiftAddress } from "./constants";
import { abi } from "../abi/store-gift";
import { getClient } from "./client";
import { ChainID } from "./evm";

const callbackGasLimit = 300_000;
export class StoreGiftCards {
    contract: any;
    publicWallet: PublicClient;
    subscriptionId: string = "60";
    abi: AbiItem[];

    constructor({
        chain = ChainID.BASE_MAINNET,
        wallet,
    }: {
        chain: string,
        wallet?: WalletClient
    }) {
        const address = getStoreGiftAddress(chain) as `0x${string}`;
        this.publicWallet = getClient(chain);
        this.abi = abi as AbiItem[];

        let client: any = { public: this.publicWallet };
        if (wallet) {
            client = { public: this.publicWallet, wallet: wallet };
        }
        this.contract = getContract({ address, abi, client, })
    }

    /**
     * 
     * @param publishableKey 
     * @param paymentIntent 
     * @returns 
     */
    async sendRequest(email: string, storeId: string) {
        const args = [toHex(email)];

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
            storeId,
        ]);
    }

    sendRequestEncode(email: string, storeId: string) {
        const args = [toHex(email)];

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
                storeId,
            ]
        });
    }

    async getStore(): Promise<GiftRedeemables[]> {
        return await this.contract.read.getStore() as GiftRedeemables[];
    }

    async store(storeId: string): Promise<GiftRedeemables> {
        return await this.contract.read.store([storeId]) as GiftRedeemables;
    }
}

export interface GiftRedeemables {
    id: bigint;
    redeemAmount: bigint;
    active: boolean;
}

const source = `
const email = args[0]

const apiResponse = await Functions.makeHttpRequest({
    url: "https://strase-nine.vercel.app/api/chain/redeem",
    method: "POST",
    data: {
        "email": email,
    }
})

if (apiResponse.error) {
    console.error(apiResponse.error)
    throw Error("Request failed", apiResponse.error)
}

const { data } = apiResponse;

return Functions.encodeString(data.result)
`.trim();