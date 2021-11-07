import inquirer from 'inquirer';

export async function  promptJsonRpcUrl() {
    const answers = await inquirer.prompt([
        {
            name: 'jsonRPC',
            message: 'Enter a JSON RPC provider URL',
        }
    ]);

    return answers.jsonRPC;
}