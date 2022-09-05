window.onload = function () { 

    const emailDigitado = document.getElementById('inputEmail'); //Salvando email digitado
    const senhaDigitada = document.getElementById('inputPassword'); //Salvando senha digitada
    const botao = document.getElementById('login'); 
    botao.addEventListener('click', verificandoCadastro); //Capturando clique no botão e direcionando para a função
    

    function verificandoCadastro(){
        
        let dadoLocais = JSON.parse(localStorage.getItem(emailDigitado.value)); //Salvando dados do localStorage na variavel

        if(emailDigitado.value != "" && senhaDigitada.value != ""){  //testando se os campos de login estão preenchidos

            if(localStorage.getItem(emailDigitado.value)){ //testando se existe cadatsro com esse e-mail

                if(dadoLocais.email == emailDigitado.value && dadoLocais.senha == senhaDigitada.value){ //Testando se email e senha estão corretos

                    JSON.stringify(localStorage.setItem("logado",dadoLocais.email)); //colocando o 
                    window.location.href = "./tarefas.html"; //redirecionando usuário para pagina de tarefas,depois de acrtar usuário e senha

                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Email ou Senha Inválido',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                }
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'E-mail não cadastrado',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  .then((result) => {
                    if(result.dismiss=== Swal.DismissReason.timer){
                        window.document.location.href = "./signup.html";
                    }
                  });
            }

        }
        event.preventDefault();
    
    }
}