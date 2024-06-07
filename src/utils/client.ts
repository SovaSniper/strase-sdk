import { createPublicClient, http } from "viem"
import { ChainID, getRPC } from "./evm"

export const getClient = (chain: string = ChainID.BASE_MAINNET) => {
    const rpcUrl = getRPC(chain)
    return createPublicClient({
        transport: http(rpcUrl),
    })
}
