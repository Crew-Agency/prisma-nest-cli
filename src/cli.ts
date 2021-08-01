import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {
	const args = arg(
		{},
		{
			argv: rawArgs.slice(2),
		}
	);
	return {
		template: args._[0],
	};
}

async function promptForMissingOptions(options) {
	const defaultTemplate = 'Rest Api';

	const answers = await inquirer.prompt({
		type: 'list',
		name: 'template',
		message: 'Please choose which Api template to use',
		choices: ['Rest Api', 'GraphQL'],
		default: defaultTemplate,
	});

	return {
		...options,
		template: answers.template,
	};
}

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	options = await promptForMissingOptions(options);
	console.log(options);
}
