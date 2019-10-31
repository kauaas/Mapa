var resultado;

function valorCidade(){
    var city = document.getElementById('cidade').value;
    return city;
}


function requisi() {
	//fazendo a requisição
	var requisicao = new XMLHttpRequest();
	var url = "http://api.mapbox.com/geocoding/v5/mapbox.places/"+ city +".json?access_token=pk.eyJ1IjoibGF1cmluZWEiLCJhIjoiY2sxaHI2M3J2MWk3bjNncW93a2ZneTIyMSJ9.IsCqY34SiFRNoGtHLTnEtQ"
    requisicao.open('GET', url, true); //abrindo a conexão

    requisicao.onreadystatechange = function(e) {
    	if (this.readyState == 4) {
    	//	consnova_ole.log(JSON.parse(this.response)); 
    		resultado = JSON.parse(this.response);
            	 
        }
        
    }
    requisicao.send();
    
}

function elementoOl(){

	var nova_div = document.createElement('div');
	nova_div.setAttribute('id', 'nova_div');
	var nova_ol = document.createElement('ol');
	nova_ol.setAttribute('id', 'nova_ol');
	document.getElementById('principal').appendChild(nova_div);
	document.getElementById('nova_div').appendChild(nova_ol);
	
}

function inserirItem(nome_do_item, id){
		
    var nova_li = document.createElement('li');
    nova_li.setAttribute('id', id);
    var nova_link = document.createElement('a');
    nova_link.setAttribute('href', '#');
    var texto = document.createTextNode(nome_do_item);
    nova_link.appendChild(texto);
    nova_li.appendChild(nova_link); 
    document.getElementById('lista').appendChild(nova_li);
    
}

for(let i = 0; i<5; i++){
    inserirItem('item' + i, 'id-' + i );

}
function main(){
    requisi();
    elementoOl();

}