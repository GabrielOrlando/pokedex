let nomePoke = document.getElementById('namePoke')
let idPoke   = document.getElementById('idPoke')
let hp       = document.getElementById('hp-val')
let attack   = document.getElementById('at-val')
let def      = document.getElementById('def-val')
let sattack  = document.getElementById('sat-val')
let sdef     = document.getElementById('sdef-val')
let spd      = document.getElementById('spd-val')
let type1    = document.getElementById('type1-val')
let type2    = document.getElementById('type2-val')
let slide1   = document.getElementById('pokedex-primeiro-slide')
let slide2   = document.getElementById('pokedex-segundo-slide')
let slide3   = document.getElementById('pokedex-terceiro-slide')
let slide4   = document.getElementById('pokedex-quarto-slide')

var l_idPoke = []
var local_idPoke
//let $button = document.getElementById('btnBuscar')
//$button.addEventListener('click',buscar)

function buscar(){ // função de executar busca ao clicar no botão
    
    let buscaId = document.getElementById('txtBuscar');
    buscaDados(buscaId.value.toLowerCase());
}

function buscaDados(id){ // função de conexão com a API e busca de dados
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        fetch(url)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Erro ao executar busca: ' + response.status)
            }
                return response.json()
        })
        .then(function (resolve){
            slide1.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resolve.id}.png`
            slide2.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${resolve.id}.png`
            slide3.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${resolve.id}.png`
            slide4.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${resolve.id}.png`

            nomePoke.innerHTML = `${resolve.name}`
            idPoke.innerHTML   = `${resolve.id}`
            hp.innerHTML       = `${resolve.stats[0].base_stat}`
            attack.innerHTML   = `${resolve.stats[1].base_stat}`
            def.innerHTML      = `${resolve.stats[2].base_stat}`
            sattack.innerHTML  = `${resolve.stats[3].base_stat}`
            sdef.innerHTML     = `${resolve.stats[4].base_stat}`
            spd.innerHTML      = `${resolve.stats[5].base_stat}`
            type1.innerHTML    = `${resolve.types[0].type.name}`
            
            local_idPoke = JSON.parse(localStorage.getItem('l_idPoke') || '[]')
            local_idPoke.push(resolve.id)
            localStorage.setItem("l_idPoke", JSON.stringify(local_idPoke))

            local_namePoke = JSON.parse(localStorage.getItem('l_namePoke') || '[]')
            local_namePoke.push(resolve.name)
            localStorage.setItem("l_namePoke", JSON.stringify(local_namePoke))


            if(resolve.types.length > 1){
                type2.style = 'display: block'
                type2.innerHTML    = `${resolve.types[1].type.name}`
            } else {
                type2.style = 'display: none'
                type2.innerHTML = 'Null'
            }

            console.log(resolve)
        })
        .catch(function(reject){
            console.log(reject)
        }) 
}     