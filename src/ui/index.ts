import { ContractInterface, providers } from "ethers";
import { Contract } from "../models/Contract.js";
import { getContractABI } from "../services/etherscan.js";
import { isDev } from "../utils/isDev.js";
import { promptContractAddress } from "./promptContractAddress.js";
import { promptJsonRpcUrl } from "./promptJsonRpcUrl.js";
import { promptMintMethod } from "./promptMintMethod.js";
import dotenv from 'dotenv';

export async function setup() {

    if(isDev()) {
        dotenv.config();
    }

    const provider = await getProvider();

    const contract = await getContract(provider);

    const method = await getMintMethod(contract)

    console.log(method);




}


async function getProvider(): Promise<providers.JsonRpcProvider> {
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

async function getContract(provider: providers.JsonRpcProvider): Promise<Contract> {
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

async function getMintMethod(contract: Contract) {
    let method;
    if(isDev()) {
        method = process.env.MINT_METHOD;
    }

    if(!method){
        method = await promptMintMethod(contract.functionNames);
    }

    return method;
}