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
            for(let i = 0; i<5; i++){ //percorrendo o array de objetos
                inserirItem(resultado.features[i].place_name, i, resultado.features[i].geometry.coordinates[1], resultado.features[i].geometry.coordinates[0]);
              }
        }
        
    }
    requisicao.send();
    
}

function elementoOl(){ //Criando div e ol para listar os place_names
document.getElementById('listinha').innerHTML = " "; //limpando a div 'listinha' para q não seja criada outras 5 li e div e ol quando clicar no botão de pesquisar
	var nova_div = document.createElement('div');
	nova_div.setAttribute('id', 'nova_div');
	var nova_ol = document.createElement('ol');
	nova_ol.setAttribute('id', 'nova_ol');
	document.getElementById('listinha').appendChild(nova_div);
	document.getElementById('nova_div').appendChild(nova_ol);
	
}

function inserirItem(nome_do_item, id, lat, long){ //Inserindo a lista de nome dos locais
        
    var arm = 'mostrarMapa('+lat+','+long+')';
    var nova_li = document.createElement('li');
    nova_li.setAttribute('id', id);
    var nova_link = document.createElement('a');
    
    nova_link.setAttribute('onclick', arm);
    var texto = document.createTextNode(nome_do_item);
    nova_link.appendChild(texto);
    nova_li.appendChild(nova_link); 
    document.getElementById('nova_ol').appendChild(nova_li);
    
}


function criarMap(){ //criando div onde vai ser gerado o mapa
    var map = document.createElement('div');
    map.setAttribute('id', "mapid");
    map.style.height = "500px";
    map.style.width = "500px";
    document.getElementById('fixed').appendChild(map);
}

function mostrarMapa(lat, long){ //Gerando o mapa em si na div 'mapid'
    document.getElementById('fixed').innerHTML = " "; //limpando a div, para q não haja erro ao carregar o mapa novamente
    criarMap();

    var mymap = L.map('mapid').setView([lat, long], 15);
    
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
    }).addTo(mymap);
    L.marker([lat, long]).addTo(mymap);
    L.circle([lat, long], 100, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("this is a circle! BIOS");

}

function main(){ //chamando as funções necessarias ao clicar no botão de pesquisar
    elementoOl();
    requisi();
    

}