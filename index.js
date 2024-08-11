const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const search = document.getElementById('search');
const submit = document.getElementById('submit') ;
let products ;
let mode = 'create'  ;
let idCourant ;
let searchBy = 'title' ;

if(localStorage.item == null){
  products = [] ;
}
else{
  products = JSON.parse(localStorage.item);
  showData() ;
}
 



function totalPrice(){
   if(price.value.length!=0){
     total.textContent = +price.value + +taxes.value + +ads.value - +discount.value  ;
     total.style.backgroundColor = 'green'; 
   }
}

submit.onclick = function (){
  if (title.value.length != 0 && price.value.length != 0){  
    totalPrice() ;
    const newProduct = {
      title: title.value ,
      price : price.value ,
      ads : ads.value ,
      taxes : taxes.value ,
      discount : discount.value ,
      total : total.textContent ,
      count : count.value ,
      category : category.value 
    }
    if (mode == 'create') {      
      if (count.value > 0) {
        for (let i = 0; i < count.value; i++) {
          products.push(newProduct) ;
        }
      }
      else{
        products.push(newProduct) ;
      }
    }
    else{
      products[idCourant] = newProduct ;
      submit.textContent = 'create'
      count.style.display = 'block';  
      mode = 'create'
    }
    
    localStorage.item = JSON.stringify(products) ;
    showData() ;
    clearAll();
  
  
  }


}

function showData(){
    document.querySelector('tbody').innerHTML = "" ;
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    document.querySelector('tbody').innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.taxes}</td>
      <td>${product.ads}</td>
      <td>${product.discount}</td>
      <td>${product.total}</td>
      <td>${product.category}</td>
      <td><button onclick="update(this.id)" id="${i}">update</button></td>
      <td><button onclick="deletData(${i})">delete</button></td>
    </tr> `
    
  }
  if (products.length>0) {
    document.getElementById('deletAll').innerHTML = `<button onclick="deletAll()">Delete All (${products.length})</button>`
  }else{
    document.getElementById('deletAll').innerHTML = '' ;
  }
}

function deletData(id){
  if(mode != 'update'){
    products.splice(id , 1) ;
    localStorage.item = JSON.stringify(products) ;
    showData() ;
  }
  else{
    window.alert('you must update the current item first') ;
  }
}

function clearAll(){
  title.value = '' ;
  price.value = '' ;
  ads.value = '' ;
  taxes.value = '' ;
  discount.value = ''  ;
  total.textContent = '' ;
  count.value = '' ;
  category.value = '' ;
  total.style.backgroundColor = '#cd2323' ;
}

function deletAll() {
  clearAll() ;
  mode = 'create' ;
  submit.textContent = 'create' ;
  count.style.display = 'block' ;
  localStorage.clear() ;
  products.splice(0) ;
  showData() ;
}


function update(id){
  const item = products[id] ;
  title.value = item.title ;
  price.value = item.price ;
  ads.value = item.ads ;
  taxes.value = item.taxes ;
  discount.value = item.discount  ;
  category.value = item.category ;
  totalPrice() ;
  idCourant = id ; 
  count.style.display = 'none' ;
  submit.textContent = 'update' ;
  mode = 'update' ;
  scroll({
    top : 0 ,
    behavior : 'smooth' ,
  })

}


function searchData(){

  document.querySelector('tbody').innerHTML = '' ;
  for (let i = 0; i < products.length; i++) {
    if(searchBy == 'title'){
      if (products[i].title.includes(search.value)) {
        document.querySelector('tbody').innerHTML += `
        <tr>
          <td>${i+1}</td>
          <td>${products[i].title}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          <td>${products[i].category}</td>
          <td><button onclick="update(this.id)" id="${i}">update</button></td>
          <td><button onclick="deletData(${i})">delete</button></td>
        </tr> `
      }
      
    }
    else{
      if (products[i].category.includes(search.value)) {
        document.querySelector('tbody').innerHTML += `
        <tr>
          <td>${i+1}</td>
          <td>${products[i].title}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          <td>${products[i].category}</td>
          <td><button onclick="update(this.id)" id="${i}">update</button></td>
          <td><button onclick="deletData(${i})">delete</button></td>
        </tr> `
      }
    }
    
  }
  
}

function searchMode(id){
  if(id == 'byTitle'){
    searchBy = 'title' ; 
    search.placeholder = 'Search By Title'
  }
  else{
    searchBy = 'category' ; 
    search.placeholder = 'Search By Category'
  }
  searchData();
}
