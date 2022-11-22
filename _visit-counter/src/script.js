const countEl = document.getElementById('count');

updateVisitCount();

function updateVisitCount() {
	fetch('https://api.countapi.xyz/update/vfa_name_05/vfa_key_05/?amount=1')
	.then(res => res.json())
	.then(res => {
		countEl.innerHTML = res.value;

        var vfa_visit_number = res.value;

        if (vfa_visit_number%2 == 0) {
            console.log(vfa_visit_number+' è un numero pari');
            //window.location.replace("https://www.vodafone.it/eshop/tariffe-e-prodotti/fibra-adsl-e-telefono/internet-a-casa/ar-test.html?pagina_pari");
        } else {
            console.log(vfa_visit_number+' è un numero dispari');
        }

        
	})
}