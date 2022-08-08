const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b55bad6060msh5af437009d535c4p1453a8jsnb2df1e047201',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};

fetch('https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc', options)
	.then(response => response.json())
	.then(data => {
		data.forEach(element => {
			if(element.symbol === "btc" || element.symbol === "eth" || element.symbol === "bnb"){
				mostrarCriptos(element.name,element.current_price,element.high_24h,element.image)
			}
		});
	})
	.catch(err => console.error(err));

	const cripto_container = document.getElementById("box")


function mostrarCriptos (name, precio_actual, precio_alto, img){
	let div = document.createElement("div");
	div.innerHTML =`
		<div class="box_cripto">
			<h1>${name}</h1>
			<h4>Precio actual</h4>
			<p>$${precio_actual}</p>
			<h4>Mayor 24hs</h4>
			<p>$${precio_alto}</p>
		</div>
		<picture>
			<img id="img-cripto" src=${img}>
		</picture>
	`
	cripto_container.appendChild(div)
}


