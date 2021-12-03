import React, { ReactNode, useEffect, useState } from "react";
import {providers, ContractInterface, Contract} from 'ethers';
import { Network } from "../constants";

export interface ContractContextType {
    contractAddress?: string;
    contractABI?: ContractInterface;
    providerURL?: string,
    contract?: Contract;
    chainId: number,
    setContractAddress: (contractAddress: string) => void;
    setContractABI: (contractABI: ContractInterface) => void;
    setProviderURL: (providerURL: string) => void;
    setChainId: (chainId: Network) => void;
}

export function ContractContextProvider({ children }: { children: ReactNode}) {
    const [contractAddress, setContractAddress] =useState("");
    const [contractABI, setContractABI] = useState<ContractInterface | undefined>();
    const [contract, setContract] = useState<Contract | undefined>();
    const [providerURL, setProviderURL] = useState("");
    const [chainId, setChainId] = useState<Network>(Network.Mainnet);

    useEffect(() => {

        if(contractAddress && contractABI && providerURL) {
            const network = providers.getNetwork(chainId);
            const provider = new providers.JsonRpcProvider(providerURL, network);

            setContract(new Contract(contractAddress, contractABI, provider));
        } 
    }, [contractAddress, contractABI, providerURL, chainId])

    const value = { contractAddress, contractABI,contract, providerURL, chainId, setProviderURL, setContractAddress, setContractABI, setChainId};
  
    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
}

const ContractContext = React.createContext<ContractContextType>({} as ContractContextType);
export default ContractContext;