import { ChainID } from "./evm"

const DEFAULT_NETWORK = ChainID.BASE_SEPOLIA;

const constants: Constants = {
    [ChainID.BASE_MAINNET]: {
        tokenAddress: "0x4aB0496134e73c04eeA598a62bA5FAee8eEb035E",
        functionConsumer: "0x628447Dea0388Ad017d64161719492feea155ecf",
    },
    [ChainID.BASE_SEPOLIA]: {
        tokenAddress: "0x4aB0496134e73c04eeA598a62bA5FAee8eEb035E",
        functionConsumer: "0x628447Dea0388Ad017d64161719492feea155ecf",
    }
}

export const getConsumerAddress = (chain: string = DEFAULT_NETWORK) => {
    return constants[chain]?.functionConsumer || "";
}

export const getStraseBuckAddress = (chain: string = DEFAULT_NETWORK) => {
    return constants[chain]?.tokenAddress || "";
}

interface Constants {
    [chain: string]: ConstantData
}

interface ConstantData {
    tokenAddress: `0x${string}`,
    functionConsumer: `0x${string}`,
}