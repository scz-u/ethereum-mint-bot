import { ContractInterface, ethers } from "ethers";

/**
 * a wrapper around the ethers 
 */
export class Contract extends ethers.Contract {


    constructor(contractAddress: string, contractABI: ContractInterface, provider: ethers.providers.JsonRpcProvider){
        super(contractAddress, contractABI, provider)
    }

    /**
     * returns an array function names from the contract abi
     */
    get functionNames() {
        return Object.values(this.interface.functions).map((contractFunction) => {
          return contractFunction.name;  
        });
    }

}