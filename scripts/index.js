window.onload = function () {
    let botao = document.getElementById("botaoAcessar");

    botao.addEventListener("click", function (event) {
        let emailDigitado = document.getElementById("inputEmail").value.trim();
        let senhaDigitada = document.getElementById("inputPassword").value.trim();
        let dados = {
            email: emailDigitado,
            password: senhaDigitada
        };
        if (emailDigitado != "" && senhaDigitada != "") {
            console.log(dados);
            dados = JSON.stringify(dados);
            let request = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: dados
            }
            fetch('https://ctd-todo-api.herokuapp.com/v1/users/login/', request)
                .then(function (resultado) {
                    if (resultado.status == 200 || resultado.status == 201) {
                        sweetalert2('success', 'Login realizado com sucesso', "./tarefas.html");
                        return resultado.json();
                    } else {
                        sweetalert2('error', 'Usuário e/ou senha inválidos', "./index.html")
                        throw resultado;
                    }
                })
                .then(function (data) {
                    //manipulamos a resposta
                    sessionStorage.setItem("jwt", JSON.stringify(data.jwt));
                    console.log(data)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        event.preventDefault();
    });
}