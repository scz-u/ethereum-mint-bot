import { BigNumber } from "ethers";
import { Wallet } from "@ethersproject/wallet";

type ABIInput = unknown;

export interface Config {
    /**
     * contract address to mint from
     */
    contractAddress: string;

    /**
     * wallet to mint with
     */
    wallet: Wallet;


    /**
     * name of the mint method to call
     */
    mintMethod: ABIInput;

    /**
     * price per item to mint (in wei)
     */
    pricePerMint: BigNumber;

    /**
     * number of NFTs to attempt to mint
     */
    amountToMint: number;
}