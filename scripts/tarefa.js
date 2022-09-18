//os recursos são acionados no final do carregamento da pag 
window.onload = function () {
  //testando se o usuário esta logado
  let semPermissao = this.sessionStorage.getItem("jwt");
  if(!semPermissao){
    sweetalert2('error','Sessão Finalizada',"./index.html")
  }

  //Usando o botão finalizar tarefa
  document.getElementById('closeApp').addEventListener("click",function(event){
    event.preventDefault();
    sessionStorage.removeItem('jwt');
    verificarLogin();
  });

  //Função verifica se a sessão expirou
  function verificarLogin(){
    let semPermissao = this.sessionStorage.getItem("jwt");
    if(!semPermissao){
      sweetalert2('error','Sessão Finalizada',"./index.html")
    }
  }

  //Função para adicionar nome do usuário
  function adicionarNome() {
    let request = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization:JSON.parse(this.sessionStorage.getItem("jwt"))
      }
    }
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe',request)
    .then(function (resultado) {
      if (resultado.status == 200 || resultado.status == 201) {
        return resultado.json();
      }else {
        if (resultado.status == 400) {
          sweetalert2('error','Não foi dessa vez',"./signup.html");
          return resultado.json();
        }
        throw resultado;
      }
    })
    .then(function(data){
   
    document.getElementById("nomeUsuario").innerHTML =`${data.firstName} ${data.lastName}`;
    })
  }
  //chamando função
  adicionarNome()

  //Listando tarefas dol usuário logado salvas na API
  function buscarTarefasApi() {
    let request = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization:JSON.parse(this.sessionStorage.getItem("jwt"))
      }, 
    }
  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks/',request)
  .then(function (resultado) {
    if (resultado.status == 200 || resultado.status == 201) {
      return resultado.json();
    }else {
      if (resultado.status == 400) {
        sweetalert2('error','Não foi dessa vez',"./signup.html");
        return resultado.json();
      }
      throw resultado;
    }
  })
  .then(function(data){
    //manipulamos a resposta 
    data.forEach((tarefas) =>{
    const criaLi = document.createElement("li");
    criaLi.setAttribute('class', 'tarefa')
    criaLi.setAttribute('id', tarefas.id)
    criaLi.innerHTML = 
        `
        <div class="not-done"></div>
        <div class="descricao">
        <p class="nome">${tarefas.description}</p>
        <p class="timestamp">Criada em: ${dayjs(tarefas.createdAt).format('DD/MM/YY')}</p>
        </div>
        <button id="botaoExcluirTarefa" type="submit">
        <img src="./assets/lixeira-tarefas.svg" alt="Apagar uma tarefa">
        </button>
        `
    if(tarefas.completed == false){
      document.getElementById("addTarefasPendentes").appendChild(criaLi)
    }
    else{
      document.getElementById("addTarefasTerminadas").appendChild(criaLi)
    }
  });
  })
  .catch(function(error) {
    console.log(error)
  });
  }

  buscarTarefasApi();

  document.getElementById('botaoNovaTarefa').addEventListener("click",function(event){
    event.preventDefault();
    let dadosTarefa = {
      description: document.getElementById("novaTarefa").value,
      completed: "false"
  };

  dadosTarefa = JSON.stringify(dadosTarefa);
    
    let request = {
      method: "POST",
      headers: {
          'Content-type': 'application/json',
          Authorization:JSON.parse(sessionStorage.getItem("jwt"))
      },
      body: dadosTarefa
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks/', request)
  .then(function (resultado) {
      if (resultado.status == 200 || resultado.status == 201) {
          return resultado.json();
      } else {
          sweetalert2('error','Usuário e/ou senha inválidos',"./index.html")
          throw resultado;
      }
  })
  .then(function(data) {
    sweetalert2('success','Tarefa cadastrada',"./tarefas.html")
      //manipulamos a resposta
  })
  .catch(function(error) {
      console.log(error)
  });
  })
}