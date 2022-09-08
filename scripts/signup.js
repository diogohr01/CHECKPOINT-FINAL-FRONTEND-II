window.onload = function () { 

    const botaoCadastro = document.getElementById('criarUsuario');
    botaoCadastro.addEventListener('click', salvarCliente); //configurando para quando houver click no botão acionar função salvarCliente
    
    function salvarCliente(){ // Função que irá receber os dados digitados e selva no localStorage


        const cliente = { //salvando dados digitados e retirando espaço do inicio e final
            nome: document.getElementById('nome').value.trim(),
            sobrenome: document.getElementById('sobrenome').value.trim(),
            email: document.getElementById('email').value.trim(),
            senha: document.getElementById('senha').value.trim(),
            confirmaSenha: document.getElementById('confirmaSenha').value.trim(),
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

    //Alertando usuário que falta preencher o campo

         //Avisa que falta preeencher nome
         document.getElementById("nome").addEventListener('focusout', function (){
            if(document.getElementById("nome").value === ''){document.getElementById("avisoNome").innerHTML =`Preencha este campo`}
            else{document.getElementById("avisoNome").innerHTML =``}
         });
    
         //Avisa que falta preeencher sobrenome
         document.getElementById("sobrenome").addEventListener('blur', function (){
            if(document.getElementById("sobrenome").value === ''){document.getElementById("avisoSobrenome").innerHTML =`Preencha este campo`}
            else{document.getElementById("avisoSobrenome").innerHTML =``}
         });
    
         //Avisa que falta preeencher email
         document.getElementById("email").addEventListener('blur', function (){
            if(document.getElementById("email").value === ''){document.getElementById("avisoEmail").innerHTML =`Preencha este campo`}
            else{document.getElementById("avisoEmail").innerHTML =``}
         });
    
         //Avisa que falta preeencher senha
        document.getElementById("senha").addEventListener('blur', function (){
        if(document.getElementById("senha").value === ''){document.getElementById("avisoSenha").innerHTML =`Preencha este campo`}
        else{document.getElementById("avisoSenha").innerHTML =``}
        });
         
    
         //Avisa que falta preeencher confirmação da senha
        document.getElementById("confirmaSenha").addEventListener('blur', function (){
            if(document.getElementById("confirmaSenha").value === ''){document.getElementById("avisoConfirmaSenha").innerHTML =`Preencha este campo`}
            else{document.getElementById("avisoConfirmaSenha").innerHTML =``}
        });
}