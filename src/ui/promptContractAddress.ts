import inquirer from 'inquirer';
import { utils } from 'ethers';

export async function  promptContractAddress() {
    const answers = await inquirer.prompt([
        {
            name: 'contractAddress',
            message: 'Enter the contract address',
            validate: (address) => utils.isAddress(address) ? true : "Invalid address"
        }
    ]);

    return answers.contractAddress;
}