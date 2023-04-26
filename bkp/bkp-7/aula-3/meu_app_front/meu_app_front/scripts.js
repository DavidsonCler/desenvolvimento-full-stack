/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de pedidos existentes do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListOrders = async () => {
  let url = 'http://127.0.0.1:5000/pedidos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pedidos.forEach(order => insertListOrder(order.nf, order.cpf_cliente, order.nome_cliente, order.telefone_cliente, order.endereco_cliente, order.valor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de produtos de cada pedido existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListItensOrder = async (nfOrder) => {
  console.log(nfOrder)
  let url = 'http://127.0.0.1:5000/produtos_pedido?pedido_nf=' + nfOrder;
  fetch(url, {
    method: 'get'
  }).then((response) => response.json()).then((data) => {
    data.products.forEach(product => insertListProduct(product.nf, product.nome, product.quantity, product.valor, product.subtotal))
  }).catch((error) => {
    console.error('Error:', error);
  });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getListOrders()


/*
  --------------------------------------------------------------------------------------
  Função para colocar o item de Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postOrder = async (inputCPF, inputClient, inputAddress, inputMobile) => {
  const formData = new FormData();
  formData.append('cpf_cliente', inputCPF);
  formData.append('nome_cliente', inputClient);
  formData.append('endereco_cliente', inputAddress);
  formData.append('telefone_cliente', inputMobile);

  let url = 'http://127.0.0.1:5000/pedido';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar o item de Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputCPF, inputClient, inputAddress, inputMobile) => {
  const formData = new FormData();
  formData.append('cpf_cliente', inputCPF);
  formData.append('nome_cliente', inputClient);
  formData.append('endereco_cliente', inputAddress);
  formData.append('telefone_cliente', inputMobile);

  let url = 'http://127.0.0.1:5000/pedido';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}



// const targetDiv = document.getElementById("third");
// const btnItem = document.getElementById("addItem");
// const btnOrder = document.getElementById("addOrder");
// const btn = document.getElementById("toggle");
// btn.onclick = function () {
  // if (targetDiv.style.display !== "none") {
    // targetDiv.style.display = "none";
  // } else {
    // targetDiv.style.display = "block";
  // }
// };

/*
  --------------------------------------------------------------------------------------
  Função para inserir Pedidos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListOrder = (orderNF, clientCPF, clientName, clientMobile, clientAddress, orderValue) => {
  var item = [orderNF, clientCPF, clientName, clientMobile, clientAddress, orderValue]
  let table = document.getElementById('orderTable');
 
  
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
    row.onclick = () => onClickRowTable(item[0]);
    
   
  }
  insertButtonAdd(row.insertCell(-1))
  insertButtonClose(row.insertCell(-1))
  document.getElementById("orderNF")
  document.getElementById("clientCPF")
  document.getElementById("clientMobile")
  document.getElementById("clientAddress")
  document.getElementById("orderValue")
  
  addComment()
  removeElement()
 

}
/*
  --------------------------------------------------------------------------------------
  Função para colocar o item de Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const insertListProduct = (itemNF, itemName, itemQuantity, itemValue, itemTotalValue) => {
  var item = [itemNF, itemName, itemQuantity, itemValue, itemTotalValue]
  let table = document.getElementById('itemTable');
  
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  //row.onclick = () => onClickRowTable(item[0]);
    
   
  }

  insertButtonClose(row.insertCell(-1))
  document.getElementById("itemNF")
  document.getElementById("itemName")
  document.getElementById("itemQuantity")
  document.getElementById("itemValue")
  document.getElementById("itemTotalValue")
  
  removeElement()
 

}

/*
  --------------------------------------------------------------------------------------
  Função para colocar o item de Pedido na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
// const postItem = async (inputCPF, inputClient, inputAddress, inputMobile) => {
  // const formData = new FormData();
  // formData.append('cpf_cliente', inputCPF);
  // formData.append('nome_cliente', inputClient);
  // formData.append('endereco_cliente', inputAddress);
  // formData.append('telefone_cliente', inputMobile);

  // let url = 'http://127.0.0.1:5000/pedido';
  // fetch(url, {
    // method: 'post',
    // body: formData
  // })
    // .then((response) => response.json())
    // .catch((error) => {
      // console.error('Error:', error);
    // });



/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonClose = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u2716");
  span.className = "close";
  span.title = "Clique para remover o pedido :(";

  span.appendChild(txt);
  parent.appendChild(span);

}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão add para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonAdd = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u271A");
  span.className = "addTxt";
  span.title = "Clique para adicionar um comentário neste pedido!";
  span.appendChild(txt);
  parent.appendChild(span);
}





/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
// const addComment = () => {
  // let add = document.getElementsByClassName("close");
 // var table = document.getElementById('myTable');
  // let i;
  // for (i = 0; i < add.length; i++) {
    // add[i].onclick = function () {
      // let div = this.parentElement.parentElement;
      // const Item = div.getElementsByTagName('td')[0].innerHTML
      // if (confirm("Você tem certeza?")) {

        // deleteItem(Item)
        // alert("Removido!")
      // }
    // }
  // }
// }
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  //var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const Item = div.getElementsByTagName('td')[0].innerHTML
      
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(Item)
        alert("Removido!")
      }
    }
  }
  // div.getElementsByTagName('td')[8].onclick() = 'event.stopPropagation();return false;';
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar comentário de acordo com o click do mouse
  --------------------------------------------------------------------------------------
// */
const addComment = () => {
  let add = document.getElementsByClassName("addTxt");
  let i
  for (i = 0; i < add.length; i++) {
    add[i].onclick = function () {
      switchVisibleTxt();
      let div = this.parentElement.parentElement;
       
div.getElementsByTagName('td').onclick() = 'event.stopPropagation();return false;'
self.nfOrderRow = txtOrder
} 
}
}









/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (nf) => {
  console.log(nf)
  let url = 'http://127.0.0.1:5000/pedido?nf=' + nf;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const addComments = async (nfOrderTxt, txt) => {
 
  const formData = new FormData();
  formData.append('pedido_nf',nfOrderTxt);
  formData.append('texto',txt);



  console.log(nfOrderTxt)
  let url = 'http://127.0.0.1:5000/comentario'
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/

const newOrder = () => {
  let inputCPF = document.getElementById("newCPF").value;
  let inputClient = document.getElementById("newClient").value;
  let inputAddress = document.getElementById("newAddress").value;
  let inputMobile = document.getElementById("newMobile").value;
 // let clientNF = document.getElementsById("orderNF").value;
  if       (inputClient === '') {
    alert("Escreva o nome do Cliente!");
  }else if (inputAddress === '') {
    alert("O endereço não pode ser nulo!");    
  } else if (isNaN(inputCPF) || isNaN(inputMobile)) {
    alert("O CPF do cliente e o telefone precisam ser somente números!");
  } else {
    //insertList(clientNF, inputCPF, inputClient, inputAddress, inputMobile)
    postOrder(inputCPF, inputClient, inputAddress, inputMobile)
    alert("Pedido Registrado!");
    alert("Não se esqueça de adicionar produtos ao Pedido!")
    getListOrders();
    
  }
}





////////////////////////////////////////////////////////////////
// function onClickOrderBtn() {
  // let odr_btn = document.getElementById("btn-holder");
  // odr_btn.onclick() = switchVisibleMenu()
//  alert(index);
//  console.log('onClickRowTable', index);
// }


function onClickRowTable(index) {
//  alert(index);
// getListItensOrder(index)
self.nfOrderRow = index
alert("Você selecionou o pedido NF:  "+ index)
 
 console.log('onClickRowTable', index);
}

function switchVisibleProduct() {
  if (document.getElementById('menu-1')) {

      if (document.getElementById('menu-1').style.display == 'block') {
          document.getElementById('menu-1').style.display = 'none';
          document.getElementById('menu-2').style.display = 'block';
      }
      else {
          document.getElementById('menu-1').style.display = 'none';
          document.getElementById('menu-2').style.display = 'block';
      }
  }
}



function getSelectedOrder(){
  let order = self.nfOrderRow
  if(order == 0 || NaN){
    alert("Por favor, selecione um item na lista!")
  }else{
    if(confirm("Você selecionou o pedido NF: "+order)){
      console.log('getSelectedOrder', order)
      getListItensOrder(order)
      switchVisibleProduct()
      this.nfOrderRow,order = 0;

    }else{
      alert("Por favor, selecione um item na lista!")
    }
  }
}

function addOrderComment(){
  let txt = document.getElementById("txt").value;
  let nfOrderTxt = self.nfOrderRow;
 
  if(nfOrderTxt == 0){
    alert("Por favor, selecione um item na lista!")
  }else if(confirm("Deseja adicionar o comentário:\n" + txt +"\nNf do pedido: "+ nfOrderTxt)){
    addComments(nfOrderTxt, txt)
    // getListItensOrder(nfOrderTxt)
    this.nfOrderRow,nfOrderTxt = 0;
    txt, document.getElementById("txt").value = "";

  }else{
    alert("Cancelado!")
  }
    }  

    

function switchVisibleTxt() {
  if (document.getElementById('txtArea')) {

      if (document.getElementById('txtArea').style.display == 'none') {
          document.getElementById('txtArea').style.display = 'block';
          document.getElementById('menu-2').style.display = 'none';
      }
      else {
          document.getElementById('txtArea').style.display = 'none';
         //  document.getElementById('menu-2').style.display = 'block';
      }
  }
}
function switchVisibleMenu() {
  if (document.getElementById('menu-1')) {

      if (document.getElementById('menu-1').style.display == 'none' || self.nf !== null) {
          document.getElementById('menu-1').style.display = 'block';
          document.getElementById('menu-2').style.display = 'none';
        if(document.getElementById('input-1')){
          if(document.getElementById('input-1').style.display == 'none'){
            document.getElementById('input-1').style.display = 'block';
          }else{
            document.getElementById('input-1').style.display = 'none';
          }
        }
          
      }
      else {
          document.getElementById('menu-1').style.display = 'none';
         //  document.getElementById('menu-2').style.display = 'block';
      }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////
// window.onload = () => {
  // var table = document.getElementById("myTable");
  // var rows = table.getElementsByTagName("tr");
  // for (let i = 0; i < rows.length; i++) {
    // let currentRow = table.rows[i];
    // console.log('currentRow', currentRow);
    // currentRow.onclick = () => onClickRowTable(currentRow.rowIndex);
  // }
// }

// /*
  // --------------------------------------------------------------------------------------
  // Função para adicionar um novo item com nome, quantidade e valor 
  // --------------------------------------------------------------------------------------
// */
// const newitem = () => {
  // let inputName = document.getElementById("inputName").value;
  // let inputQuantity = document.getElementById("inputQuantity").value;
  // let inputValue = document.getElementById("inputValue").value;
  // let totalValue = document.getElementById("totalValue").value;
//  let orderNF = document.getElementById(!"orderNF").value
  // if       (inputClient === '') {
    // alert("Escreva o nome do Produto");
  // }else if (inputValue == null ) {
    // alert("O  não pode ser nulo!");    
  // } else if ( isNaN(inputValue)) {
    // alert("O valor está em tipo incorreto!");
  // } else {
    // insertList(inputName, inputQuantity, inputValue, totalValue)
    // postOrder(inputName, inputQuantity, inputValue, totalValue)
    // alert("Pedido Registrado!");
    // alert("Não se esqueça de adicionar produtos ao Pedido!")
  // }
// }





// const insertListOrder = (orderNF, clientCPF, clientName, clientMobile, clientAddress, orderValue) => {
  // var item = [orderNF, clientCPF, clientName, clientMobile, clientAddress, orderValue]
  // let table = document.getElementById('orderTable');
  
  // var row = table.insertRow();

  // for (var i = 0; i < item.length; i++) {
    // var cel = row.insertCell(i);
    // cel.textContent = item[i];
  // // row.onclick = () => onClickRowTable(item[0]);
    
   
  // }
  // insertButton(row.insertCell(-1))
  // document.getElementById("orderNF")
  // document.getElementById("clientCPF")
  // document.getElementById("clientMobile")
  // document.getElementById("clientAddress")
  // document.getElementById("orderValue")
  
 
  // removeElement()
  // addComent()

// }


