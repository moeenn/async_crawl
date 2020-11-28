const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function downloadPage(url) {
	console.log(`Downloading Page: ${url}`);
	const res = await fetch(url);
	const html = await res.text();
	return html;
}

async function extractLinks(html) {
	const $ = cheerio.load(html);
	const links = $('a');
	const linksSet = new Set();

	$(links).each((index, link) => {
		const href = ($(link).attr('href')).trim();
		if (!href) return;

		linksSet.add(href);
	});

	return linksSet;
}

async function InspectLink(url) {
	const html = await downloadPage(url);
	return await extractLinks(html);
}

module.exports = InspectLink;