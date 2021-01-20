const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes"

let object;
let array = [];

class VelibStation{
	constructor(name, capacity, mechanicalBike, eBike, docksAvalaible, geoLoc){
		this.name           = name;
		this.capacity       = capacity;
		this.mechanicalBike = mechanicalBike;
		this.eBike          = eBike
		this.docksAvalaible = docksAvalaible
		this.geoLoc         = geoLoc;
	};


	show(){

		let section       = document.createElement("DIV");
		section.innerHTML = `
			<div class="card" style="width: 20rem;">
				<div class="card-body">
					<h2 class="card-title">${this.name} </h2>
					<ul>
						<li>Normal bike : ${this.mechanicalBike}</li>
						<li>Ebike : ${this.eBike}</li>
						<li>Docks avalaible : ${this.docksAvalaible}</li>
						<li>Total capacity : ${this.capacity}</li>
					</ul>
				</div>
			</div>
		`
		document.getElementById("display").appendChild(section);
	}
};

updateInfo = () => {
	let object;
	let array = [];

	fetch(URL)
	  .then((response) => response.json() )
	  .then((item) =>  {

	  		for( i = 0; i < 100; i++ ){
	  			  		object = item.records[i].fields

	  					let name           = object.name;
	  					let mechanicalBike = object.mechanical;
	  					let geoLoc 		   = object.coordonnees_geo;
	  					let eBike          = object.ebike;
	  					let docksAvalaible = object.numdocksavailable;
	  					let capacity       = object.capacity;

	  					array.push(new VelibStation(name, capacity, mechanicalBike, eBike, docksAvalaible, geoLoc));
	  		}

	  		let mainDiv = document.querySelector("#display");
	  		
	  		mainDiv.innerHTML = "";



	  		array.forEach((station) => {
	  			station.show()
	  		});
	  		
	  });
};

start = () => {
  updateInfo();
  setInterval(function(){ updateInfo()}, 60000);
};


start();

