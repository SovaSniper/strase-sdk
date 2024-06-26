import { ChainID } from "./evm"

const DEFAULT_NETWORK = ChainID.BASE_SEPOLIA;

const constants: Constants = {
    [ChainID.BASE_MAINNET]: {
        tokenAddress: "0x4aB0496134e73c04eeA598a62bA5FAee8eEb035E",
        functionConsumer: "0xb2848716726D57773804D95B2D3a67CC063AF37f",
        store: {
            gift: "0x02349cd6EAFE3D9888dc51f64caE684a274BFBaB",
            token: "0x227E6502C2B8D0F0131fA38b085397a0bB6B7C0A",
        },
        usdc: "0xFa6d9894bEcFe12526a1aDc5092195D60C9ED1C7",
    },
    [ChainID.BASE_SEPOLIA]: {
        tokenAddress: "0x4aB0496134e73c04eeA598a62bA5FAee8eEb035E",
        functionConsumer: "0xb2848716726D57773804D95B2D3a67CC063AF37f",
        store: {
            gift: "0x7C4cda4A49bb829ecbAC9c2380c77A483912EEf9",
            token: "0x227E6502C2B8D0F0131fA38b085397a0bB6B7C0A",
        },
        usdc: "0xFa6d9894bEcFe12526a1aDc5092195D60C9ED1C7"  // This is Mocked
    }
}

export const getConsumerAddress = (chain: string = DEFAULT_NETWORK) => {
    return constants[chain]?.functionConsumer || "";
}

export const getStraseBuckAddress = (chain: string = DEFAULT_NETWORK) => {
    return constants[chain]?.tokenAddress || "";
}

export const getStoreGiftAddress = (chain: string = DEFAULT_NETWORK) => {
    return constants[chain]?.store?.gift || "";
}

export const getStoreTokenAddress = (chain: string = DEFAULT_NETWORK) => {
    return constants[chain]?.store?.token || "";
}

interface Constants {
    [chain: string]: ConstantData
}

interface ConstantData {
    tokenAddress: `0x${string}`,
    functionConsumer: `0x${string}`,
    store: {
        gift: `0x${string}`,
        token: `0x${string}`,
    },
    usdc: `0x${string}`,
}