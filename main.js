const URL = require('url');
const inspectURL = require('./inspect');
const Queue = require('./queue');

async function main() {
		const startingURLstring = 'https://www.foxhq.com/showgals.php';
		// const startingURLstring = 'https://www.foxhq.com/caroline-busty-lace-bella-club/';
		const startingURL = URL.parse(startingURLstring, true);

		const links = await inspectURL(startingURL);
		links.forEach(link => {
			console.log('Link: ', link.href);
		});

		console.log('Total Links: ', links.length);
}

main();