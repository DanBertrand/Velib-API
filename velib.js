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
};


fetch(URL)
  .then((response) => response.json() )
  .then((item) =>  {

  		for( i = 0; i < 1; i++ ){
  			  		object = item.records[i].fields

  					let name           = object.name;
  					let mechanicalBike = object.mechanical;
  					let geoLoc 		   = object.coordonnees_geo;
  					let eBike          = object.ebike;
  					let docksAvalaible = object.numdocksavailable;
  					let capacity       = object.capacity;

  					array.push(new VelibStation(name, capacity, mechanicalBike, eBike, docksAvalaible, geoLoc));
  		}

  		array.forEach((station) => {

  		   let section = document.createElement("DIV");
  		   section.style.backgroundColor = "red";
  		   let string = `${station.name}`
  		   let textstation = document.createTextNode(string);  
  		   section.appendChild(textstation);  
  		   document.getElementById("display").appendChild(section);
  		})
  		
  });



