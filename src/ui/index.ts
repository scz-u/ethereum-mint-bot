import { promptContractAddress } from "./promptContractAddress.js";

export async function setup() {
    const contractAddress = await promptContractAddress();

    console.log(contractAddress);
}   