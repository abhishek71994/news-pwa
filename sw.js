const staticAssets = [
	'./',
	'./style.css',
	'./app.js'
];

self.addEventListener('install',event => {
	console.log("installed");
})
self.addEventListener('fetch',event => {
	console.log("Fetching happening..");
})