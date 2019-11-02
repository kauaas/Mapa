var resultado;

function valorCidade(){
    var city = document.getElementById('cidade').value;
    return city;
}


function requisi() {
	//fazendo a requisição
	var requisicao = new XMLHttpRequest();
	var url = "http://api.mapbox.com/geocoding/v5/mapbox.places/"+ valorCidade() +".json?access_token=pk.eyJ1IjoibGF1cmluZWEiLCJhIjoiY2sxaHI2M3J2MWk3bjNncW93a2ZneTIyMSJ9.IsCqY34SiFRNoGtHLTnEtQ"
    requisicao.open('GET', url, true); //abrindo a conexão
console.log(url);
    requisicao.onreadystatechange = function(e) {
    	if (this.readyState == 4) {
    	//	consnova_ole.log(JSON.parse(this.response)); 
    		resultado = JSON.parse(this.response);
            repet();	 
        }
        
    }
    requisicao.send();
    
}

function elementoOl(){

	var nova_div = document.createElement('div');
	nova_div.setAttribute('id', 'nova_div');
	var nova_ol = document.createElement('ol');
	nova_ol.setAttribute('id', 'nova_ol');
	document.getElementById('listinha').appendChild(nova_div);
	document.getElementById('nova_div').appendChild(nova_ol);
	
}

function inserirItem(nome_do_item, id, LL){
		
    var nova_li = document.createElement('li');
    nova_li.setAttribute('id', id);
    var nova_link = document.createElement('a');
    
    nova_link.setAttribute('onclick', 'mostrarMapa()');
    var texto = document.createTextNode(nome_do_item);
    nova_link.appendChild(texto);
    nova_li.appendChild(nova_link); 
    document.getElementById('nova_ol').appendChild(nova_li);
    
}

function repet(){
for(let i = 0; i<5; i++){
  inserirItem(resultado.features[i].place_name, i, resultado.features[i].geometry.coordinates[1]+","+resultado.features[i].geometry.coordinates[0]);
}
}

function criarMap(){
    var map = document.createElement('div');
    map.setAttribute('id', "mapid");
    map.style.height = "300px";
    map.style.width = "300px";
    document.getElementById('Mapao').appendChild(map);
}

function mostrarMapa(){

    var mymap = L.map('mapid').setView([-14.28435,-42.71315], 15);
    
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
}

function main(){
    elementoOl();
    requisi();
    

}