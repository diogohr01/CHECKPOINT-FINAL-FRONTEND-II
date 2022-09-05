window.onload = function () { 

    const botaoCadastro = document.getElementById('criarUsuario');
    botaoCadastro.addEventListener('click', salvarCliente); //configurando para quando houver click no botão acionar função salvarCliente
    
    function salvarCliente(){ // Função que irá receber os dados digitados e selva no localStorage


        const cliente = {
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            confirmaSenha: document.getElementById('confirmaSenha').value,
        }
        
        if(cliente.nome != "" && cliente.sobrenome != "" && cliente.email != "" && cliente.senha != "" && cliente.confirmaSenha){ //testando se os campos estão preenchidos

            if(localStorage.getItem(cliente.email)){ //testando se o email digitado já etsá cadastrado

                Swal.fire({ // Usando a biblioteca sweetalert2
                    icon: 'error',
                    title: 'E-mail já está cadastrado',
                    showConfirmButton: false,
                    timer: 1500,
                  });           
            }
            else{
                
                if(cliente.senha != cliente.confirmaSenha){ //testando se a senha e a confirmação da senha estão iguais
                    Swal.fire({ // Usando a biblioteca sweetalert2
                        icon: 'error',
                        title: 'As senhas não conferem',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                
                else{
                    localStorage.setItem(cliente.email,JSON.stringify(cliente)); //salvando no localStorage os dados do usuário                
                    Swal.fire({ // Usando a biblioteca sweetalert2
                        icon: 'success',
                        title: 'Cadastro realizado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    .then((result) => { //Redirecinando para tela inicial apois apresentar o alerta
                        if(result.dismiss=== Swal.DismissReason.timer){
                            window.document.location.href = "./index.html";
                        }
                      });
                }
            }
         }
        event.preventDefault();
    }
    
}