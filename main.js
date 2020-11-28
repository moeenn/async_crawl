const URL = require('url');
const inspect = require('./inspect');
const Queue = require('./queue')

// extract hostname from url
function urlHost(url) {
	const urlObj = URL.parse(url, true);
	return url.host;
}

async function main() {
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

main();