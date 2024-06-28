/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/assistentes_terapeuticos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.assistentes_terapeuticos.forEach(assitente_terapeutico => insertList(assitente_terapeutico.nome, assitente_terapeutico.cidade, assitente_terapeutico.estado, assitente_terapeutico.telefone))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postAssistenteTerapeutico = async (inputNome, inputCidade, inputEstado, inputTelefone) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('cidade', inputCidade);
    formData.append('estado', inputEstado);
    formData.append('telefone', inputTelefone);
  
    let url = 'http://127.0.0.1:5000/assistente_terapeutico';
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
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const assistente_terapeutico = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteAssistenteTerapeutico(assistente_terapeutico)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteAssistenteTerapeutico = (assistente_terapeutico) => {
    console.log(assistente_terapeutico)
    let url = 'http://127.0.0.1:5000/assistente_terapeutico?nome=' + assistente_terapeutico;
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
    Função para adicionar um novo item com nome, quantidade e valor 
    --------------------------------------------------------------------------------------
  */
  const newAssistenteTerapeutico = () => {
    let inputNome = document.getElementById("newNome").value;
    let inputCidade = document.getElementById("newCidade").value;
    let inputEstado = document.getElementById("newEstado").value;
    let inputTelefone = document.getElementById("newTelefone").value;
  
    if (inputNome === '') {
      alert("Escreva o nome de um Assistente Terapeutico!");
    } else if (isNaN(inputTelefone)) {
      alert("Telefone precisa ser números!");
    } else {
      insertList(inputNome, inputCidade, inputEstado, inputTelefone)
      postAssistenteTerapeutico(inputNome, inputCidade, inputEstado, inputTelefone)
      alert("Assistente Terapeutico adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nameAssitenteTerapeutico, cidade, estado, telefone) => {
    var assistente_terapeutico = [nameAssitenteTerapeutico, cidade, estado, telefone]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < assistente_terapeutico.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = assistente_terapeutico[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newNome").value = "";
    document.getElementById("newCidade").value = "";
    document.getElementById("newEstado").value = "";
    document.getElementById("newTelefone").value = "";
  
    removeElement()
  }