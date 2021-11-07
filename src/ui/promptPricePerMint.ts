import inquirer from 'inquirer';

export async function  promptPricePerMint() {
    const answers = await inquirer.prompt([
        {
            name: 'pricePerMint',
            message: 'Enter the price per mint (in ETH)',
            type: "number"
        }
    ]);


    return answers.pricePerMint;
}