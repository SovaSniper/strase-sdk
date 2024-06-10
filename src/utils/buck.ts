import { AbiItem, PublicClient, WalletClient, encodeFunctionData, getContract } from "viem";
import { getStraseBuckAddress } from "./constants";
import { abi } from "../abi/token";
import { getClient } from "./client";
import { ChainID } from "./evm";

export class StraseBuck {
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
        const address = getStraseBuckAddress(chain) as `0x${string}`;
        this.publicWallet = getClient(chain);
        this.abi = abi as AbiItem[];

        let client: any = { public: this.publicWallet };
        if (wallet) {
            client = { public: this.publicWallet, wallet: wallet };
        }
        this.contract = getContract({ address, abi, client, })
    }

    async balanceOf(address: string) {
        return this.contract.read.balanceOf([address]);
    }

    async allowance(owner: string, spender: string) {
        return this.contract.read.allowance([owner, spender]);
    }

    async transfer(to: string, value: string) {
        return this.contract.write.allowance([to, value]);
    }

    async approve(spender: string, value: string) {
        return this.contract.write.allowance([spender, value]);
    }

    transferEncode(to: string, value: string) {
        return encodeFunctionData({
            abi,
            functionName: 'transfer',
            args: [to, value]
        })
    }

    async approveEncode(spender: string, value: string) {
        return encodeFunctionData({
            abi,
            functionName: 'approve',
            args: [spender, value]
        })
    }

    async tip() {
        return this.contract.write.tip();
    }

    tipEncode() {
        return encodeFunctionData({
            abi,
            functionName: 'tip',
        })
    }

    async name() {
        return this.contract.read.name();
    }

    async symbol() {
        return this.contract.read.symbol();
    }

    async decimal() {
        return this.contract.read.decimal();
    }

    async totalSupply() {
        return this.contract.read.totalSupply();
    }
}