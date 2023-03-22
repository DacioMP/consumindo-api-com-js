async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        var endereco = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var complemento = document.getElementById('complemento');
        var cidade = document.getElementById('cidade');
        var estado = document.getElementById('estado');

        endereco.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        complemento.value = consultaCEPConvertida.complemento;
        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}


var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));















/* --- Lidando com várias requisições ao mesmo tempo com Promise.all ---

let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

*/