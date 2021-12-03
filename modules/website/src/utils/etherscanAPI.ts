import { ContractInterface } from '@ethersproject/contracts';
import axios from 'axios';
import { Network } from '../constants';


async function getContractABI(address: string, network: Network): Promise<{result?: ContractInterface, error?: string}>{
    let url = 'https://api.etherscan.io/api'
    if(network === Network.Goerli) {
        url = 'https://api-goerli.etherscan.io/api'
    }
    try {
        const response = await axios.get(url, {
            params: {
                module: 'contract',
                action: 'getabi',
                address,
            },
        })

        const body: any = response.data;
        if(body?.status === '1'){
            const result = JSON.parse(body.result);
            return { result };
        } 
        console.log(`Failed to get contract: ${body?.status} ${body?.message}`);
        return {error: body?.result};
    } catch (err) {
        console.error(err)
        return {error: 'unknown'};
    }
}

export { getContractABI }
