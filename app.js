const key = "2a57d3a0084c416bad1794a6e50fa675";
const main = document.querySelector('main');
const select =  document.querySelector('#selector');
const defaultSource = 'techcrunch';
window.addEventListener('load',async e => {
	updateNews();
	await createSource();
	select.value = defaultSource;

	//adding a change event for the source selector
	select.addEventListener('change', e => {
		updateNews(e.target.value);
	});
	//adding the service worker
	if('serviceWorker' in navigator){
		try{
			navigator.serviceWorker.register('sw.js');
			console.log("Servie worker is registered!");
		}
		catch(error){
			console.log("Service worker registration failed!");
		}
	}
})
async function updateNews(source = defaultSource){
	//update using the api
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${key}`);
	const json = await res.json();
	main.innerHTML = json.articles.map(createArticle).join('\n');
}
async function createSource(){
	const resSource = await fetch(`https://newsapi.org/v2/sources?apiKey=${key}`);
	const jsonSource =  await resSource.json();
	select.innerHTML = jsonSource.sources
	.map(source => `<option value="${source.id}">${source.name}</option>`).join("\n");
}
function createArticle(article){
	return `
		<div class="article">
			<a href=${article.url}>
				<h1>${article.title}</h1>
				<img src="${article.urlToImage}">
				<p>${article.description}</p>
			</a>
		</div>
	`
}