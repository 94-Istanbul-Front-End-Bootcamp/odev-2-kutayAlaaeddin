let data = [];

const fetchData = () => {
	fetch('data.json')
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
			//json'dan okunan verinin data array'ine atanması
			data = responseData;
			document.getElementById('filterButton').disabled = false;

			listData(responseData);
		})
		.catch((err) => {
			//hata yönetimi
			console.log(err);
		});
};
const listData = (data) => {
	let list = document.querySelector('.list');
	list.innerHTML = data.map((element) => {
		return `
        <li class="list-group-item" id=${element.id}>
            <span class='bold'>name:</span> ${element.name}   ${element.age}   </li>
      

        `;
	});
};

const filterData = () => {

	let elementList = document.getElementsByClassName('show');
	var i;
	for (i = 0; i < elementList.length; i++) {
		elementList[i].setAttribute('style', '');
	}
};

function hasChange() {
	//her iki seçenek de seçildiği durum
   
    if (document.getElementById('item1').checked && document.getElementById('item2').checked) {
        let filteredData = data.filter((element) => element.age >= 18 && element.isActive);
        listData(filteredData);
    }
    //ilk seçenek seçilip ikincisi seçilmediği durum
    else if (document.getElementById('item1').checked && !document.getElementById('item2').checked) {
        let filteredData = data.filter((element) => element.age >= 18);
        listData(filteredData);
    }
     //ilk seçenek seçilmeyip ikincisi seçildiği durum
    else if (!document.getElementById('item1').checked && document.getElementById('item2').checked) {
        let filteredData = data.filter((element) => element.isActive);
        listData(filteredData);
    }
    //ikisi de seçilmediği durum (default)
    else{
        listData(data)
    }
}
// text boxtan gelen karakerin verilerle kaşılaştırılması..
function onclickhandler(e) {
    document.getElementById('item2').checked=false
    document.getElementById('item1').checked=false
    let filteredData = data.filter((element) => element.name.slice(0,1).toUpperCase()===e.value.toUpperCase());
    listData(filteredData);
  }
  
