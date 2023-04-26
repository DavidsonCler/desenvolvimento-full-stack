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
  Função para obter a lista de produtos de cada pedido e comentários existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListOrder = async (nfOrder) => {
  console.log(nfOrder)
  let url = 'http://127.0.0.1:5000/produtos_pedido?pedido_nf=' + nfOrder;
  fetch(url, {
    method: 'get'
  }).then((response) => response.json()).then((data) => forEach(data.map(data.pedido_nf, data.nome, pedido.quantidade, data.valor, data.valor_total)));
}


// const getListOrder = async (nfOrder) => {
  // console.log(nfOrder)
  // let url = 'http://127.0.0.1:5000/produtos_pedido?pedido_nf=' + nfOrder;
  // fetch(url, {
    // method: 'get'
  // }).then((response) => response.json()).then((data) => {
    // data.order.forEach(order => insertListOrder(order.nf, order.cpf_cliente, order.nome_cliente, order.endereco_cliente, order.telefone_cliente, order.subtotal, order.total_produtos, order.total_cometarios));
    // data.order.forEach(comentarios => insertComments(comentarios.texto));
    // data.order.forEach(produtos => insertItens(produtos.pedido_nf, produtos.mome, produtos.quantidade, produtos.valor, produtos.quantidade, produtos.valor_total));
  // }).catch((error) => {
    // console.error('Error:', error);
  // });
// }

// const getListOrder = async (nfOrder) => {
  // console.log(nfOrder)
  // let url = 'http://127.0.0.1:5000/produtos_pedido?pedido_nf=' + nfOrder;
  // fetch(url, {
    // method: 'get'
  // }).then((response) => response.json()).then((data) => {
    // (data.products.entries(produto)) => insertListOrder(produto.);
  // }).catch((error) => {
    // console.error('Error:', error);
  // });
// }
// data.order.forEach(comentarios => insertComments(comentarios.texto));



const getComments = async (nfOrder) => {
  let url = 'http://127.0.0.1:5000/pedido?nf=2' + nfOrder;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pedido.entries(comments) > insertComments(comments.texto);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  ----------------------1500----------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/




// const getOnlyItens = async (nfOrder) => {
  // console.log(nfOrder)
  // let url = 'http://127.0.0.1:5000/produtos_pedido?pedido_nf=' + nfOrder;
  // fetch(url, {
    // method: 'get'
  // }).then((response) => response.json()).then((data) => {
    // data.order.forEach(produtos => insertItens(produtos.pedido_nf, produtos.mome, produtos.quantidade, produtos.valor, produtos.quantidade, produtos.valor_total));
  // }).catch((error) => {
    // console.error('Error:', error);
  // });
// }





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
const postItem = async (inputNf, inputName, inputQuantity, inputValue, inputTotalValue) => {
  const formData = new FormData();
  formData.append('pedido_nf', inputNf);
  formData.append('nome', inputName);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputValue);
  formData.append('valor_total', inputTotalValue);

  let url = 'http://127.0.0.1:5000/produto';
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
    // row.onclick = () => onClickRowTable(item[0]);

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
const insertItens = (itemNF, itemName, itemQuantity, itemValue, itemTotalValue) => {
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


// function getSelectedOrder(){
  // let order = document.getElementsByClassName("rowData");
  // var row = order.insertRow();

  // for (var i = 0; i < order.length; i++) {
    // row.onclick = () => getListOrder(order[0])
  // }
 
      // alert("Por favor, selecione um item na lista!")
    
  
// }

// if(order == 0 || NaN){
  // alert("Por favor, selecione um item na lista!")
// }else{
  // if(confirm("Você selecionou o pedido NF: "+order)){
    // console.log('getSelectedOrder', order)
    // getListItensOrder(order)
    // switchVisibleProduct()
    // this.nfOrderRow,order = 0;

  // }else{

const insertComments = (text) => {
  var item = [text]
  let table = document.getElementById('comments');
  
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  //row.onclick = () => onClickRowTable(item[0]);
    
   
  }

  insertButtonClose(row.insertCell(-1))
  document.getElementById("text")
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
  span.title = "Clique para remover :(";

  span.appendChild(txt);
  parent.appendChild(span);

}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão addTxt para cada item da lista
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
  // --------------------------------------------------------------------------------------
  // Função para adicionar comentário de acordo com o click do mouse
  // --------------------------------------------------------------------------------------
*/
const addComment = () => {
  let orderTxt = document.getElementsByClassName("addTxt");
  let i
  for (i = 0; i < orderTxt.length; i++) {
    orderTxt[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const orderTxt = div.getElementsByTagName('td')[0].innerHTML
      document.getElementById("input-1").style.display = 'none';
      switchVisibleTxt(1);
      self.nfOrder = orderTxt
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
// */
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
//  getListOrder(index)
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

function addCommentBtn(){
  let txt = document.getElementById("txt").value;
  let nfOrderTxt = self.nfOrder;
  if(nfOrderTxt == 0 || NaN){
    alert("Erro, selecione um item na lista")
  }else if(confirm("Deseja adicionar o comentário:\n" + txt +"\nNf do pedido: "+ nfOrderTxt)){
    addComments(nfOrderTxt, txt)
    switchVisibleTxt(0)
    this.nfOrderRow,nfOrderTxt = 0;
    txt, document.getElementById("txt").value = "";
    alert("Adicionado!")
    getComments()
    insertComments()

}else{
  alert("Cancelado!")
}
}
    
    
// let addTxt = document.getElementsByClassName("dataRow");
// for (i = 0; i < addTxt.length; i++) {
  // addTxt[i].onclick = async function () {
    // switchVisibleTxt(1);
    // let div = this.parentElement.parentElement;
    // const order = div.getElementsByTagName('td')[0].innerHTML;
    // switchVisibleTxt(0);
    // return order,txt
  // }
// }
  
// function getRowOrder() {

// let dataRow = document.getElementsByClassName("dataRow");
// for (i = 0; i < dataRow.length; i++) {
  // dataRow[i].onclick = async function () {
    // let div = this.parentElement.parentElement;
    // const dataRow = div.getElementsByTagName('td')[0].innerHTML;

      // insertItens(dataRow)
    // }
    

  // }
// }



    

function switchVisibleTxt(show) {
  if (document.getElementById('txtArea')) {
     
    if (show == 1) {
        document.getElementById('txtArea').style.display = 'block';         
      }
    else if (show == 0) {
        document.getElementById('txtArea').style.display = 'none';
         
      }
  }
}
function switchVisibleMenu(show) {
  document.getElementById('txtArea').style.display = 'none';
  
  if (document.getElementById('menu-1')) {

      if (document.getElementById('menu-1').style.display == 'none' && show == 1) {
          document.getElementById('menu-1').style.display = 'block';
          document.getElementById('menu-2').style.display = 'none';
          document.getElementById('input-1').style.display = 'block';
        
          if(document.getElementById('input-2')){
          if(document.getElementById('input-2').style.display == 'none' && show == 2){
            document.getElementById('input-2').style.display = 'block';
            document.getElementById('input-1').style.display = 'none';
         
          }else{
            document.getElementById('input-1').style.display = 'none';
          }
        }
          
      }
      else {
          document.getElementById('menu-1').style.display = 'none';
          document.getElementById('menu-2').style.display = 'block';
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
const prodcpd = () => {
  let inputName = document.getElementById("inputName").value;
  let inputQuantity = document.getElementById("inputQuantity").value;
  let inputValue = document.getElementById("inputValue").value;
  let totalValue = document.getElementById("totalValue").value;
 let selection = self.nfOrderRow
  if       (inputClient === '') {
    alert("Escreva o nome do Cliente");
  }else if (inputValue == null ) {
    alert("O  não pode ser nulo!");    
  } else if ( isNaN(inputValue)) {
    alert("O valor está em tipo incorreto!");
  } else {
    insertList(inputName, inputQuantity, inputValue, totalValue)
    postOrder(selection, inputName, inputQuantity, inputValue, totalValue)
    alert("Pedido Registrado!");
    alert("Não se esqueça de adicionar produtos ao Pedido!")
  }
}





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


