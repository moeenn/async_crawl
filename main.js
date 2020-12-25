const URL = require('url');
const inspectURL = require('./inspect');
const Queue = require('./queue')

async function main() {
		const startingURLstring = 'https://www.foxhq.com/showgals.php';
		const startingURL = URL.parse(startingURLstring, true);

		const links = await inspectURL(startingURL);

		links.forEach(link => {
			console.log(link.href);
		});
		console.log('Total Links: ', links.length);
}

main();