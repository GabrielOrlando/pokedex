let index_slide1       = document.getElementById('index_slide1')
let index_slide2       = document.getElementById('index_slide2')
let index_slide3       = document.getElementById('index_slide3')
let index_slide4       = document.getElementById('index_slide4')
let index_nome_pokemon = document.getElementById('index-nome-pokemon')

var log_nome = document.getElementById("log_nome")
var log_senha = document.getElementById("log_senha")

var cad_nome = document.getElementById("cad_nome")
var cad_senha = document.getElementById("cad_senha")

var local_user = []
var local_senhaTreinador = []
var session_user = []

function buscaImagens(id){ // função de conexão com a API e busca de imagens
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        fetch(url)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Erro ao executar busca: ' + response.status)
            }
                return response.json()
        })
        .then(function (resolve){
            index_slide1.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resolve.id}.png`
            index_slide2.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${resolve.id}.png`
            index_slide3.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${resolve.id}.png`
            index_slide4.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${resolve.id}.png`
            index_nome_pokemon.innerHTML = `Pokemon sendo exibido: ${resolve.name}`

            console.log(resolve)
        })
        .catch(function(reject){
            console.log(reject)
        }) 
}

function iniciaSlideIndex(){
    let numRandom = Math.round(Math.random() * 151)
    buscaImagens(numRandom)
    //console.log(numRandom)
}

function timer(){
    setInterval(iniciaSlideIndex, 20000)
}

function login(){

    local_user = JSON.parse(localStorage.getItem('l_user') || '[]')
    local_senhaTreinador = JSON.parse(localStorage.getItem('l_senhaTreinador') || '[]')

    var control = false
    for(i = 0; i < local_user.length; i++){
        if(local_user[i].toLowerCase() == log_nome.value.toLowerCase() && local_senhaTreinador[i] == log_senha.value){
            sessionStorage.setItem("s_user", log_nome.value)
            window.location.href = "home.html"
            control = true
            break;
        } else {
            control = false
        }
    }
    if(control == false){
        alert("Usuário e/ou senha inválidos!")
    }
}

function cadastro(){
    local_user = JSON.parse(localStorage.getItem('l_user') || '[]')
    local_user.push(cad_nome.value.toLowerCase())
    localStorage.setItem("l_user", JSON.stringify(local_user))

    local_senhaTreinador = JSON.parse(localStorage.getItem('l_senhaTreinador') || '[]')
    local_senhaTreinador.push(cad_senha.value)
    localStorage.setItem("l_senhaTreinador", JSON.stringify(local_senhaTreinador))

    alert('Cadastro realizado com sucesso!')
}

function foco(){
    log_nome.focus()
}

iniciaSlideIndex()