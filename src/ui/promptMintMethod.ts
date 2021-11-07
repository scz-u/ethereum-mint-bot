

import inquirer from 'inquirer';

export async function  promptMintMethod(methods: string[]) {
    const answers = await inquirer.prompt([
        {
            name: 'mintMethod',
            message: 'Select the contract method used to mint',
            type: 'list',
            choices: methods.map((name) => { return { name }})
        }
    ]);

    return answers.mintMethod;
}