/*
  --------------------------------------------------------------------------------------
  Função para obter rua, bairro, cidade e estado, consultando API dos Correios
  --------------------------------------------------------------------------------------
*/

function getAddressByCEP() {
  const cepInput = document.getElementById('newCep');
  const cep = cepInput.value.replace(/\D/g, ''); // Remove non-digit characters

  if (cep.length === 8) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          const newRua = document.getElementById('newRua');
          const newBairro = document.getElementById('newBairro');
          const newCidade = document.getElementById('newCidade');
          const newEstado = document.getElementById('newEstado');

          newRua.value = data.logradouro;
          newBairro.value = data.bairro;
          newCidade.value = data.localidade;
          newEstado.value = data.uf;

        } else {
          alert('CEP não encontrado');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar endereço:', error);
      });
  }
}


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
        data.assistentes_terapeuticos.forEach(assistente_terapeutico => insertList(assistente_terapeutico.nome, assistente_terapeutico.telefone, assistente_terapeutico.cep, assistente_terapeutico.rua, assistente_terapeutico.numero, assistente_terapeutico.inputComplemento, assistente_terapeutico.bairro, assistente_terapeutico.cidade, assistente_terapeutico.estado))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  /*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET por Estado do Terapeuta
  --------------------------------------------------------------------------------------
*/
const getListByEstado = async () => {
  // clearTable()
  const terapeuta_estado = document.getElementById('buscaEstado').value.toUpperCase();
  
  if (isValidUF(terapeuta_estado))
    // Checa se UF é válida
    console.log('Estado válido');
  else {
    alert('Estado inválido');
    return;
  }


  let url = 'http://127.0.0.1:5000/assistentes_terapeuticos_estado?estado=' + terapeuta_estado;
  console.log(url)

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.assistentes_terapeuticos.forEach(assistente_terapeutico => insertListByEstado(assistente_terapeutico.nome, assistente_terapeutico.telefone, assistente_terapeutico.cep, assistente_terapeutico.rua, assistente_terapeutico.numero, assistente_terapeutico.complemento, assistente_terapeutico.bairro, assistente_terapeutico.cidade, assistente_terapeutico.estado))
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

  // getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postAssistenteTerapeutico = async (inputNome, inputTelefone, inputCep, inputRua, inputNumero, inputComplemento, inputBairro, inputCidade, inputEstado ) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('telefone', inputTelefone);
    formData.append('cep', inputCep);
    formData.append('rua', inputRua);
    formData.append('numero', inputNumero);
    formData.append('complemento', inputComplemento);
    formData.append('bairro', inputBairro);
    formData.append('cidade', inputCidade);
    formData.append('estado', inputEstado);
  
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
    let inputTelefone = document.getElementById("newTelefone").value;
    let inputCep = document.getElementById("newCep").value.replace(/-/g, '').replace(/\D/g, '');
    let inputRua = document.getElementById("newRua").value;
    let inputNumero = document.getElementById("newNumero").value;
    let inputComplemento = document.getElementById("newComplemento").value;
    let inputBairro = document.getElementById("newBairro").value;
    let inputCidade = document.getElementById("newCidade").value;
    let inputEstado = document.getElementById("newEstado").value;

  
    if (inputNome === '') {
      alert("Escreva o nome de um Assistente Terapeutico!");
    } else if (isNaN(inputTelefone)) {
      alert("Telefone precisa ser números!");
    } else if (inputCep.length !== 8 || isNaN(inputCep)) {
      alert("CEP deve ter 8 números!");
    } else {
      insertList(inputNome, inputTelefone, inputCep, inputRua, inputNumero, inputComplemento, inputBairro, inputCidade, inputEstado)
      postAssistenteTerapeutico(inputNome, inputTelefone, inputCep, inputRua, inputNumero, inputComplemento, inputBairro, inputCidade, inputEstado)
      alert("Assistente Terapeutico adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nome, telefone, cep, rua, numero, complemento, bairro, cidade, estado) => {
    var assistente_terapeutico = [nome, telefone, cep, rua, numero, complemento, bairro, cidade, estado]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < assistente_terapeutico.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = assistente_terapeutico[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newNome").value = "";
    document.getElementById("newTelefone").value = "";
    document.getElementById("newCep").value = "";
    document.getElementById("newRua").value = "";
    document.getElementById("newNumero").value = "";
    document.getElementById("newComplemento").value = "";
    document.getElementById("newBairro").value = ""; 
    document.getElementById("newCidade").value = "";
    document.getElementById("newEstado").value = "";

  
    removeElement()
  }


  const insertListByEstado = (nome, telefone, cep, rua, numero, complemento, bairro, cidade, estado) => {
    var terapeuta_estado = [nome, telefone, cep, rua, numero, complemento, bairro, cidade, estado]
    var table = document.getElementById('myTable');
    var row = table.insertRow();

    for (var i = 0; i < terapeuta_estado.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = terapeuta_estado[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newNome").value = "";
    document.getElementById("newTelefone").value = "";
    document.getElementById("newCep").value = "";
    document.getElementById("newRua").value = "";
    document.getElementById("newNumero").value = "";
    document.getElementById("newComplemento").value = "";
    document.getElementById("newBairro").value = ""; 
    document.getElementById("newCidade").value = "";
    document.getElementById("newEstado").value = "";

  
    removeElement()
  }




  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const toggleBtn1 = document.getElementById('toggleBtn1');
  const toggleBtn2 = document.getElementById('toggleBtn2');
  
  toggleBtn1.addEventListener('click', () => {
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
  });
  
  toggleBtn2.addEventListener('click', () => {
    screen2.classList.add('hidden');
    screen1.classList.remove('hidden');
  });
  


    /*
    --------------------------------------------------------------------------------------
    Opção de função para limpar tabela Busca Terapeutas antes de carregar os valores da nova busca
    --------------------------------------------------------------------------------------
  */  
  function clearTable() {
    const tableBody = document.querySelector('#myTable tbody');
    // Limpar a tabela existente
    tableBody.innerHTML = '';
  }






  /*
    --------------------------------------------------------------------------------------
    Limpar a tabela ao clicar no botão "Buscar" na tela de Busca Terapeutas
    --------------------------------------------------------------------------------------
  */
  const buscarBtn = document.getElementById('buscarBtn');
  const tableBody = document.querySelector('#myTable tbody');

  buscarBtn.addEventListener('click', () => {
  const rows = tableBody.querySelectorAll('tr');
  for (let i = 1; i < rows.length; i++) {
    rows[i].remove();
  }
});





  /*
    --------------------------------------------------------------------------------------
    Função para checar se a UF é válida de com um Array
    --------------------------------------------------------------------------------------
  */

const validUFs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function isValidUF(uf) {
  return validUFs.includes(uf.toUpperCase());
}