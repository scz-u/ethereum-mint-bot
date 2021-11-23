import {BigNumber, ContractInterface, providers} from "ethers";
import {isDev} from "./utils/isDev";
import {promptJsonRpcUrl} from "./prompts/promptJsonRpcUrl";
import {Contract, getContractABI} from "@jfrazier-eth/minter";
import {promptContractAddress} from "./prompts/promptContractAddress";
import {promptMintMethod} from "./prompts/promptMintMethod";
import {promptPricePerMint} from "./prompts/promptPricePerMint";
import {promptAmountToMint} from "./prompts/promptAmountToMint";


/**
 * getProvider gets the user selected JSON RPC URL and returns
 * a provider
 *
 * @returns a provider
 */
export async function getProvider(): Promise<providers.JsonRpcProvider> {
    let jsonRpcUrl;

    if(isDev()) {
        jsonRpcUrl = process.env.JSON_RPC_URL;
    }

    if(!jsonRpcUrl) {
        jsonRpcUrl = await promptJsonRpcUrl();
    }

    const provider = new providers.JsonRpcProvider(jsonRpcUrl);

    return provider;
}

/**
 * getContract gets the user selected contract address, gets the contract abi,
 * and returns the corresponding contract
 *
 * @param provider used to create the contract object
 */
export async function getContract(provider: providers.JsonRpcProvider): Promise<Contract> {
    let contractAddress;

    if(isDev()){
        contractAddress = process.env.CONTRACT_ADDRESS;
    }

    if(!contractAddress){
        contractAddress = await promptContractAddress();
    }

    const contractABI: ContractInterface = await getContractABI(contractAddress);

    const contract = new Contract(contractAddress, contractABI, provider);

    return contract;
}

/**
 * getMintMethod gets the user selected name for the method to call to mint
 *
 * @param contract containing methods to select from
 * @returns the selected method name
 */
export async function getMintMethod(contract: Contract) {
    let method;
    if(isDev()) {
        method = process.env.MINT_METHOD;
    }

    if(!method){
        method = await promptMintMethod(contract.functionNames);
    }

    return method;
}

/**
 * getPricePerMint gets the user entered price per mint in ether and converts it to wei
 *
 * @returns the price per mint in wei
 */
export async function getPricePerMint(): Promise<BigNumber> {
    let pricePerMintInETH;
    if(isDev()) {
        const price = parseFloat(process.env.PRICE_PER_MINT ?? "");
        if(!Number.isNaN(price)){
            pricePerMintInETH = price;
        }
    }

    if(pricePerMintInETH === undefined) {
        pricePerMintInETH = await promptPricePerMint();
    }

    const priceInWei = BigNumber.from(pricePerMintInETH*10e9).mul(BigNumber.from(10).pow(8))

    return priceInWei;
}

export async function getAmountToMint(){
    let amountToMint;
    if(isDev()) {
        const amount = parseInt(process.env.AMOUNT_TO_MINT ?? "", 10);
        if(!Number.isNaN(amount)){
            amountToMint = amount;
        }
    }

    if(amountToMint === undefined) {
        amountToMint = await promptAmountToMint();
    }

    return amountToMint;
}

