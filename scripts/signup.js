window.onload = function () {  
    let botao = document.getElementById("criar");

    botao.addEventListener("click",function(event){
        event.preventDefault();
        cadastrar();
    });
 
    function cadastrar() {

        //Salvando dados digitados pelo usuário
        let nomeDigitado = document.getElementById("nome").value;
        let sobrenomeDigitado = document.getElementById("sobrenome").value;
        let emailDigitado = document.getElementById("email").value;
        let senhaDigitada = document.getElementById("senha").value;
        let confimaSenhadigitada = document.getElementById("confirmaSenha").value;

        //Salvando informações digitadas em um obejeto literal
        let dados = {
            firstName: nomeDigitado,
            lastName: sobrenomeDigitado,
            email: emailDigitado,
            password: senhaDigitada
        };


        //Trasnformando convertando de javascript para uma String JSON 
        dados = JSON.stringify(dados);

        //Criando um obejeto com informações do cabeçario da API
        let request = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: dados
    
        }

        //Enviando dados para a API
        fetch('https://ctd-todo-api.herokuapp.com/v1/users', request)
        .then(function (resultado) {
            if (resultado.status == 200 || resultado.status == 201) {
                sweetalert2('success','Cadastro realizado com sucesso',"./index.html");
                return resultado.json();
            } else {
                if (resultado.status == 400) {
                    sweetalert2('error','Cadastro já existe',"./signup.html");
                return resultado.json();tarefas
                }
                throw resultado;
            }
        })

        .then(function(data) {
            //manipulamos a resposta        
            console.log(data);
            console.log("Passou por aqui");
            
        })

        .catch(function(error) {
            console.log(error)
        });
        
    }
}