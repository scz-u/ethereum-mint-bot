import axios from 'axios';


const client = axios.create({
    baseURL: 'https://api.etherscan.io/api'
});

async function getContractABI(address: string) {
    try {
        const response = await client.get('', {
            params: {
                module: 'contract',
                action: 'getabi',
                address,
            },
        })

        const body: any = response.data;
        if(body?.status === '1'){
            const result = JSON.parse(body.result);
            return result;
        } 
        console.log(`Failed to get contract: ${body?.status} ${body?.message}`);
        return {};
    } catch (err) {
        console.error(err)
        return {}
    }
}

export { getContractABI }
