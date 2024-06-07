export enum ChainID {
    BASE_MAINNET = "8453",
    BASE_SEPOLIA = "84532",
}

const rpc: { [key: string]: string } = {
    [ChainID.BASE_MAINNET]: "https://mainnet.base.org",
    [ChainID.BASE_SEPOLIA]: "https://sepolia.base.org",
}

export const getRPC = (chain: string = ChainID.BASE_MAINNET) => rpc[chain] || rpc[ChainID.BASE_MAINNET];