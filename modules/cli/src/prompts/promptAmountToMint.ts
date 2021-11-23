import inquirer from 'inquirer';

export async function  promptAmountToMint() {
    const answers = await inquirer.prompt([
        {
            name: 'amountToMint',
            message: 'Enter the number of NFTs to mint',
            type: "number"
        }
    ]);


    return answers.amountToMint;
}