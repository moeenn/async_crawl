const fetch = require('node-fetch');
const cheerio = require('cheerio');
const URL = require('url');

async function downloadPage(url) {
	console.log(`Downloading Page: ${url}`);
	const res = await fetch(url);

	const result = {
		contentType: res.headers.get('content-type'),
		status: res.status
	};

	if(result.contentType === 'text/html') {
		result.content = await res.text();
		return result;
	}

	result.content = {};
	return result;
}

async function extractLinks(html) {
	const $ = cheerio.load(html);
	const links = $('a');
	const linksSet = new Set();
	const linkObjs = [];

	// set of unique URL strings
	$(links).each((index, link) => {
		const href = ($(link).attr('href')).trim();
		if (!href) return;
		linksSet.add(href);
	});

	// uniqueness of objects cannot be ensured in sets
	// therefore a simple array is used instead
	linksSet.forEach(link => {
		linkObjs.push(URL.parse(link, true));
	});

	return linkObjs;
}

async function InspectURL(urlObj) {
	// return empty sets in case of errors
	if(!urlObj.host) return new Set();
	if(!urlObj.href) return new Set();

	const result = await downloadPage(urlObj.href);
	let links = new Set();
	const filteredLinks = [];

	if(result.status === 200) {
		if(result.contentType === 'text/html') {
			links = await extractLinks(result.content);
		}
	}

	links.forEach(link => {
		// only add links on the current URL host
		if(link.host === urlObj.host) filteredLinks.push(link);

		// if host of not defined on a page link, it must be the current URL host
		if(link.host === null) {
			const newURLstring = `${urlObj.host}/${link.href}`;
			filteredLinks.push(URL.parse(newURLstring, true));
		}
	});

	return filteredLinks;
}

module.exports = InspectURL;