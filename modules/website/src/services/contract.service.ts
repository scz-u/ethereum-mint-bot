import { getContractABI as getContractABIRequest } from "../utils/etherscanAPI";

export async function getContractABI(address: string) {
    return getContractABIRequest(address);
}