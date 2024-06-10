
import { AbiItem, getContract } from "viem";
import { getClient } from "./client";
import { abi } from "../abi/parser";
import { ChainID } from "./evm";

export const address = "0x14b9602F6Bdf92B0D268Fe6524E479742D96FeD9" as `0x${string}`

export class ParserContract {
    contract: any;
    client: any;
    abi: AbiItem[];

    constructor(chain: string = ChainID.BASE_SEPOLIA) {
        this.client = getClient(chain);
        this.abi = abi as AbiItem[];
        this.contract = getContract({
            address,
            abi,
            client: this.client,
        })
    }

    async pack(amount: BigInt, status: BigInt): Promise<BigInt> {
        return this.contract.read.pack([amount, status])
    }

    async parse(data: string): Promise<PaymentData> {
        return this.contract.read.parse([data]) as PaymentData
    }

    async parseAsString(data: string): Promise<PaymentData> {
        return this.contract.read.parseAsString([data]) as PaymentData
    }
}

interface PaymentData {
    amount: BigInt;
    status: BigInt;
}