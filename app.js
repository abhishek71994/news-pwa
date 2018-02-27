const key = "2a57d3a0084c416bad1794a6e50fa675";
const main = document.querySelector('main');
window.addEventListener('load',e => {
	updateNews();
})
async function updateNews(){
	//update using the api
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${key}`);
	const json = await res.json();
	main.innerHTML = json.articles.map(createArticle).join('\n');
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