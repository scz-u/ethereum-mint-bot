import { Network } from "../constants";
import { getContractABI as getContractABIRequest } from "../utils/etherscanAPI";

export async function getContractABI(address: string, network: Network) {
    return getContractABIRequest(address, network);
}