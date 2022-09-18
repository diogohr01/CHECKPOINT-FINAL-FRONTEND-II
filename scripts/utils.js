//Função para usar Alertas do sweetalert2
function sweetalert2(icon,title,link){
        Swal.fire({ // Usando a biblioteca sweetalert2
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1500
    })
    .then((result) => { //Redirecinando para tela inicial apois apresentar o alerta
        if(result.dismiss=== Swal.DismissReason.timer){
            window.document.location.href = link;
        }
    });
}

//função para limpar uma variavel
function limparCampo(campo){
    campo.value="";
  }