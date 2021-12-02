import React, { useEffect, useState } from "react";
import * as ethers from 'ethers';

export interface ContractContextType {
    contractAddress?: string;
    contractABI?: ethers.ContractInterface;
    provider?: ethers.providers.JsonRpcProvider,
    contract?: ethers.Contract;
    setContractAddress: (contractAddress: string) => void;
    setContractABI: (contractABI: ethers.ContractInterface) => void;
    setProvider: (provider: ethers.providers.JsonRpcProvider) => void;
}

export function ContractContextProvider({ children }: any) {
    const [contractAddress, setContractAddress] =useState("");
    const [contractABI, setContractABI] = useState<ethers.ContractInterface | undefined>();
    const [contract, setContract] = useState<ethers.Contract | undefined>();
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | undefined>();

    useEffect(() => {
        console.log(contractAddress, !!contractABI, provider);
        
        if(contractAddress && contractABI && provider) {
            console.log('setting contract')
            setContract(new ethers.Contract(contractAddress, contractABI, provider));
        }
    }, [contractAddress, contractABI, provider])

    const value = { contractAddress, contractABI,contract, provider, setProvider, setContractAddress, setContractABI};
  
    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
}

const ContractContext = React.createContext<ContractContextType>({} as ContractContextType);
export default ContractContext;