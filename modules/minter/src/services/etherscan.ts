import {ContractInterface, utils } from 'ethers';
import got from 'got';
import { JSONParseSafely } from '../utils/JSONParseSafely.js';

/**
 * uses the etherscan api to get the contract's abi
 * 
 * @param contractAddress to get the abi for
 * @returns the contract abi
 * @throw if an error occurs or the abi does not exist
 */
export async function getContractABI(contractAddress: string): Promise<ContractInterface> {
    if(!contractAddress || !utils.isAddress(contractAddress)) {
        throw new Error('invalid contract address');
    }

    let response;
    try{
        response = await got.get('https://api.etherscan.io/api', {
            searchParams: {
                module: 'contract',
                action: 'getabi',
                address: contractAddress
            },
            throwHttpErrors: false,
        });
    } catch(e) {}


    switch(response?.statusCode) {
        case 200:   
            const responseBody = JSONParseSafely(response?.body);

            if (responseBody?.status != '1') {
                throw new Error(`failed to get contract abi. ${responseBody?.message}`);
            }
            const abi = responseBody.result;

            return abi;

        case 404: 
            throw new Error('contract not found');

        case 429: 
            throw new Error('rate limited');

        default: 
            throw new Error(`unkown error. status code: ${response?.statusCode}`)
    }

}

