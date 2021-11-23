import { BigNumber } from "ethers";
import dotenv from 'dotenv';
import { isDev } from "./utils/isDev.js";
import { setTerminalTitle } from './utils/setTerminalTitle.js';

import {getAmountToMint, getContract, getMintMethod, getPricePerMint, getProvider} from "./ui";

export async function main() {
    console.clear();

    if(isDev()) {
        dotenv.config();
    }

    const provider = await getProvider();

    const contract = await getContract(provider);

    const mintMethodName = await getMintMethod(contract);

    const mintMethod = contract.interface.getFunction(mintMethodName);

    if(!mintMethod.payable) {
        throw new Error('selected method is not payable')
    }

    if(mintMethod.inputs.length !== 1) {
        throw new Error("cannot mint from this contract");
    }

    const pricePerMintInWei = await getPricePerMint();

    const amountToMint = await getAmountToMint();

    const totalPrice = pricePerMintInWei.mul(amountToMint);

    setTerminalTitle(`Amount to mint: ${amountToMint}. Total Price: ${totalPrice.div(BigNumber.from(10).pow(15)).toNumber() / 100} ETH`)

    return {
        provider,
        contract,
        mintMethodName,
        pricePerMintInWei,
        amountToMint,
        totalPrice
    }
}


main();