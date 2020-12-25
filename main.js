const URL = require('url');
const https = require('https');
const inspectURL = require('./inspect');
const Queue = require('./queue')

async function main_old() {
	// example crawl starting point
	const addr = 'https://www.foxhq.com/showgals.php';

	// primary queue
	const linkQueue = new Queue();
	linkQueue.setDataType("String");

	const processPage = async (url) => {
		// get a set of links
		const linkset = await inspect(url);
		linkQueue.enqueue(linkset);

		linkset.forEach(link => {
			console.log(`[link] :: ${link}`);
		// 	const linkObj = URL.parse(link, true);

		// ignore links leading to other hosts
		// 	if(linkObj.host !== hostname) continue;
		});

	};

	linkQueue.setCallback(processPage);

	// start the process
	const startingPoint = new Set([addr]);
	linkQueue.enqueue(startingPoint);
}

async function main() {
		// const startingURLstring = 'https://www.foxhq.com/natasha-nice-nicely-done-badoinkvr/11.jpg';
		const startingURLstring = 'https://www.foxhq.com/showgals.php';
		const startingURL = URL.parse(startingURLstring, true);

		const links = await inspectURL(startingURL);

		links.forEach(link => {
			console.log(link.href);
		});
		console.log('Total Links: ', links.length);
}

main();