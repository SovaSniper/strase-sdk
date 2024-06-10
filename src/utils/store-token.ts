import { AbiItem, PublicClient, WalletClient, encodeFunctionData, getContract } from "viem";
import { getStoreTokenAddress } from "./constants";
import { abi } from "../abi/store-token";
import { getClient } from "./client";
import { ChainID } from "./evm";

export class StoreToken {
    contract: any;
    publicWallet: PublicClient;
    abi: AbiItem[];

    constructor({
        chain = ChainID.BASE_MAINNET,
        wallet,
    }: {
        chain: string,
        wallet?: WalletClient
    }) {
        const address = getStoreTokenAddress(chain) as `0x${string}`;
        this.publicWallet = getClient(chain);
        this.abi = abi as AbiItem[];

        let client: any = { public: this.publicWallet };
        if (wallet) {
            client = { public: this.publicWallet, wallet: wallet };
        }
        this.contract = getContract({ address, abi, client, })
    }


    redeem(storeId: string) {
        return this.contract.write.redeem([storeId]);
    }

    redeemEncode(storeId: string) {
        return encodeFunctionData({
            abi: abi,
            functionName: 'redeem',
            args: [storeId]
        });
    }

    async getStore(): Promise<TokenRedeemables[]> {
        return await this.contract.read.getStore() as TokenRedeemables[];
    }

    async store(storeId: string): Promise<TokenRedeemables> {
        return await this.contract.read.store([storeId]) as TokenRedeemables;
    }
}

export interface TokenRedeemables {
    id: bigint;
    payoutAmount: bigint;
    redeemAmount: bigint;
    active: boolean;
}