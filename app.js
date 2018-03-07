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
			await navigator.serviceWorker.register('sw.js');
			console.log("Servie worker is registered!");
		}
		catch(error){
			console.log("Service worker registration failed!",error);
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
				<div class="col s12 m6">
					<div class="card">
						<div class="card-image">
							<img src="${article.urlToImage}">
							<span class="card-title">${article.title}</span>
						</div>
						<div class="card-content">
							<p>${article.description}</p>
						</div>
						<div class="card-action"><a href=${article.url} target="_blank">More..</a></div>
					</div>
				</div>
	`
}