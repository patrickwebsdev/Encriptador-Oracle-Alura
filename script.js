const mensaje = document.getElementById('mensaje');
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const ningunMensaje = document.getElementById('ningunMensaje');
const mensajeEncontrado = document.getElementById('mensajeEncontrado');
const copiarMensaje = document.getElementById('copiarMensaje');
const mensajeEncriptado = document.getElementById('mensajeEncriptado');
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalButton");

const llaves = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}

const reversedLlaves = Object.keys(llaves).reduce((accum, next) => {
    const value = llaves[next];
    accum[value] = next;
    return accum;
}, {})

/**
 * 
 * @param {Record<string,string>} diccionario
 * 
 */

function preRegExp(diccionario){
    const preRegex = Object.keys(diccionario).reduce((accum, next) => accum+"|"+next);
    return new RegExp(preRegex, 'g')
}

function encriptarTexto(text, diccionario){
    return text.replace(preRegExp(diccionario), (match) => diccionario[match]);
}

function checkString(string){
    const check = /[^a-z 0-9]/g.test(string);
    if(check){
        modal.style.display = "flex";
    }
    return !check;
}

function toggleMensaje(texto, textoEncriptado){
    if(checkString(texto) && texto != ""){
        if(mensajeEncontrado.classList.contains('aside__content--none')){
            mensajeEncontrado.classList.toggle('aside__content--none');
            ningunMensaje.classList.toggle('aside__content--none');
        }
        mensajeEncriptado.innerHTML = textoEncriptado;
    }
}
modalButton.addEventListener('click', function(e){
    e.preventDefault();
    modal.style.display = "none";
});
encriptar.addEventListener('click', function(e){
    e.preventDefault();
    toggleMensaje(mensaje.value, encriptarTexto(mensaje.value, llaves));
})
desencriptar.addEventListener('click', function(e){
    e.preventDefault();
    toggleMensaje(mensaje.value, encriptarTexto(mensaje.value, reversedLlaves));
})
copiarMensaje.addEventListener('click', () => {
    navigator.clipboard.writeText(mensajeEncriptado.innerHTML);
})