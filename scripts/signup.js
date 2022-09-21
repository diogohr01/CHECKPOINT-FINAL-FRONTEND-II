window.onload = function () {

    let botao = document.getElementById("criar");

    botao.addEventListener("click", function (event) {
        event.preventDefault();
        cadastrar();
    });

    function cadastrar() {
        //Salvando dados digitados pelo usuário
        let nomeDigitado = document.getElementById("nome").value.trim();
        let sobrenomeDigitado = document.getElementById("sobrenome").value.trim();
        let emailDigitado = document.getElementById("email").value.trim();
        let senhaDigitada = document.getElementById("senha").value.trim();
        let confimaSenhadigitada = document.getElementById("confirmaSenha").value.trim();

        //Salvando informações digitadas em um obejeto literal
        let dados = {
            firstName: nomeDigitado,
            lastName: sobrenomeDigitado,
            email: emailDigitado,
            password: senhaDigitada
        };

        // Convertendo de javascript para uma String JSON 
        dados = JSON.stringify(dados);
        //Criando um objeto com informações do cabeçario da API
        let request = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: dados
        }
        if (nomeDigitado != "" && sobrenomeDigitado != "" && emailDigitado != "" && senhaDigitada != "" && confimaSenhadigitada != "") {
            if (senhaDigitada != confimaSenhadigitada) {
                sweetalert2('error', 'Senhas não conferem', "./signup.html")
            }
            else {//Enviando dados para a API
                fetch('https://ctd-todo-api.herokuapp.com/v1/users', request)
                    .then(function (resultado) {
                        if (resultado.status == 200 || resultado.status == 201) {
                            sweetalert2('success', 'Cadastro realizado com sucesso', "./index.html");
                            return resultado.json();
                        }
                        else {
                            if (resultado.status == 400) {
                                sweetalert2('warning', 'Cadastro já existe', "./signup.html");
                                return resultado.json();
                            }
                            throw resultado;
                        }
                    })
                    .catch(function (error) {
                        sweetalert2('error', 'Erro ao conectar ao Servidor', "./signup.html");
                        console.log(error)
                    });
            }
        }
    }

    //Avisa que falta preeencher nome
    document.getElementById("nome").addEventListener('blur', function () {
        if (document.getElementById("nome").value === '') {
            document.getElementById("avisoNome").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoNome").innerHTML = ``
        }
    });

    //Avisa que falta preeencher sobrenome
    document.getElementById("sobrenome").addEventListener('blur', function () {
        if (document.getElementById("sobrenome").value === '') {
            document.getElementById("avisoSobrenome").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoSobrenome").innerHTML = ``
        }
    });

    //Avisa que falta preeencher email
    document.getElementById("email").addEventListener('blur', function () {
        if (document.getElementById("email").value === '') {
            document.getElementById("avisoEmail").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoEmail").innerHTML = ``
        }
    });

    //Avisa que falta preeencher senha
    document.getElementById("senha").addEventListener('blur', function () {
        if (document.getElementById("senha").value === '') {
            document.getElementById("avisoSenha").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoSenha").innerHTML = ``
        }
    });

    //Avisa que falta preeencher confirmação da senha
    document.getElementById("confirmaSenha").addEventListener('blur', function () {
        if (document.getElementById("confirmaSenha").value === '') {
            document.getElementById("avisoConfirmaSenha").innerHTML = `Preencha este campo`
        }
        else {
            document.getElementById("avisoConfirmaSenha").innerHTML = ``
        }
    });
}