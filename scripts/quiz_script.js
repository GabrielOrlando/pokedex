//                   [ Variaveis de controle dos iteis HTML ]
let quiz_img    = document.getElementById('quiz_img')
let quiz_resp_a = document.getElementById('quiz_resp_a')
let quiz_resp_b = document.getElementById('quiz_resp_b')
let quiz_resp_c = document.getElementById('quiz_resp_c')
let quiz_resp_d = document.getElementById('quiz_resp_d')
let quiz_resp_e = document.getElementById('quiz_resp_e')

//                   [ Variaveis de controle de alternativas e pontuação ]
let tempo_segundos = 120;
let resp_a = 0;
let resp_b = 0;
let resp_c = 0;
let resp_d = 0;
let resp_e = 0;
let pnts   = 0;
let erros  = 0;
let pokemonsSorteados = []
let timerId = null; //variável que armazena a chamada da função timeout

//                   [ Variaveis de controle do ID do pokemon escolhido ]
let pokemonRandom = Math.round(Math.random() * 151)
let pokemonRandomErrado1 = 0
let pokemonRandomErrado2 = 0
let pokemonRandomErrado3 = 0
let pokemonRandomErrado4 = 0

//                   [ Variavel de controle do pokemon correto ]
let pokemon_certo    = ''
let pokemon_errado1  = ''
let pokemonsArray  = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina', 'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'mr-mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew']


//                   [ FUNÇÕES ]
function buscaPokemon(id){ // função de conexão com a API e busca o pokemon [ CORRETO ] 
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        fetch(url)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Erro ao executar busca: ' + response.status)
            }
                return response.json()
        })
        .then(function (resolve){
            quiz_img.src   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resolve.id}.png`

            console.log(resolve)
        })
        .catch(function(reject){
            console.log(reject)
        }) 
}

function randomizaOrdemRespostas(){
    resp_a = Math.round(Math.random() * 4 + 1)
    console.log('resp_a = ' + resp_a)
}

function definirRespostas(){
    //resp_a = 1
    pokemon_certo = pokemonsArray[pokemonRandom-1]
    if(resp_a == 1){
        quiz_resp_a.value = `${pokemon_certo}`
        quiz_resp_b.value = `${pokemonsArray[pokemonRandomErrado1]}`
        quiz_resp_c.value = `${pokemonsArray[pokemonRandomErrado2]}`
        quiz_resp_d.value = `${pokemonsArray[pokemonRandomErrado3]}`
        quiz_resp_e.value = `${pokemonsArray[pokemonRandomErrado4]}`
    } else if(resp_a == 2){
        quiz_resp_b.value = `${pokemon_certo}`
        quiz_resp_a.value = `${pokemonsArray[pokemonRandomErrado1]}`
        quiz_resp_c.value = `${pokemonsArray[pokemonRandomErrado2]}`
        quiz_resp_d.value = `${pokemonsArray[pokemonRandomErrado3]}`
        quiz_resp_e.value = `${pokemonsArray[pokemonRandomErrado4]}`
    } else if(resp_a == 3){
        quiz_resp_c.value = `${pokemon_certo}`
        quiz_resp_b.value = `${pokemonsArray[pokemonRandomErrado1]}`
        quiz_resp_a.value = `${pokemonsArray[pokemonRandomErrado2]}`
        quiz_resp_d.value = `${pokemonsArray[pokemonRandomErrado3]}`
        quiz_resp_e.value = `${pokemonsArray[pokemonRandomErrado4]}`
    } else if(resp_a == 4){
        quiz_resp_d.value = `${pokemon_certo}`
        quiz_resp_b.value = `${pokemonsArray[pokemonRandomErrado1]}`
        quiz_resp_c.value = `${pokemonsArray[pokemonRandomErrado2]}`
        quiz_resp_a.value = `${pokemonsArray[pokemonRandomErrado3]}`
        quiz_resp_e.value = `${pokemonsArray[pokemonRandomErrado4]}`
    } else {
        quiz_resp_e.value = `${pokemon_certo}`
        quiz_resp_b.value = `${pokemonsArray[pokemonRandomErrado1]}`
        quiz_resp_c.value = `${pokemonsArray[pokemonRandomErrado2]}`
        quiz_resp_d.value = `${pokemonsArray[pokemonRandomErrado3]}`
        quiz_resp_a.value = `${pokemonsArray[pokemonRandomErrado4]}`
    }
}

function iniciaQuizFacil(){
    // Definir Pokemons
    if(erros == 3){
        
        var treinador = prompt(
            `Você Perdeu!
            Pontuação: ${pnts}
            
            Insira seu nome de treinador:`
            
        )

        local_nameTreinador = JSON.parse(localStorage.getItem('l_nameTreinador') || '[]')
        local_nameTreinador.push(treinador)
        localStorage.setItem("l_nameTreinador", JSON.stringify(local_nameTreinador))

        local_pntsTreinador = JSON.parse(localStorage.getItem('l_pntsTreinador') || '[]')
        local_pntsTreinador.push(pnts)
        localStorage.setItem("l_pntsTreinador", JSON.stringify(local_pntsTreinador))

        limpaDados()
        erros = 0
        pnts  = 0
        
        clearTimeout(timerId);
        document.getElementById('cronometro').innerHTML = "Tempo: 00";
        document.getElementById('pontuacao').innerHTML = "Pontos: 0";
        document.getElementById('span_erros').innerHTML = "Erros: 0";

        ranking()

    } else {
        naoRepete()
        //pokemonRandom = Math.round(Math.random() * 151)
        //pokemonsSorteados.push(pokemonRandom)
        console.log("sorteados: " + pokemonsSorteados)

        if(pokemonRandom >= 148){
            pokemonRandomErrado1 = pokemonRandom - 30
            pokemonRandomErrado2 = pokemonRandom - 20
            pokemonRandomErrado3 = pokemonRandom - 2
            pokemonRandomErrado4 = pokemonRandom - 3
        } else if(pokemonRandom <= 3){
            pokemonRandomErrado1 = pokemonRandom + 3
            pokemonRandomErrado2 = pokemonRandom + 2
            pokemonRandomErrado3 = pokemonRandom + 20
            pokemonRandomErrado4 = pokemonRandom + 30
        } else {
            pokemonRandomErrado1 = pokemonRandom + 3
            pokemonRandomErrado2 = pokemonRandom + 2
            pokemonRandomErrado3 = pokemonRandom - 2
            pokemonRandomErrado4 = pokemonRandom - 3
        }

        // Executa funções de definição das alternaativas
        buscaPokemon(pokemonRandom)
        randomizaOrdemRespostas()
        definirRespostas()
        verificaResposta()
        habilitar(quiz_resp_a)
        habilitar(quiz_resp_b)
        habilitar(quiz_resp_c)
        habilitar(quiz_resp_d)
        habilitar(quiz_resp_e)
        document.getElementById('pontuacao').innerHTML = "Pontos: " + pnts;
        document.getElementById('span_erros').innerHTML = "Erros: " + erros;
        /*
        console.log('pokemonRandom = ' + pokemonRandom)
        console.log('pokemon_certo = ' + pokemon_certo)
        console.log('pokemonRandomErrado1 = ' + pokemonRandomErrado1)
        console.log('pokemon_errado1 = ' + pokemonsArray[pokemonRandomErrado1])
        console.log('pokemon_errado2 = ' + pokemonsArray[pokemonRandomErrado2])
        console.log('pokemon_errado3 = ' + pokemonsArray[pokemonRandomErrado3])
        console.log('pokemon_errado4 = ' + pokemonsArray[pokemonRandomErrado4])

        console.log('q ' + pokemonsArray[pokemonRandom-1])
        */
    }
    
}

function iniciaQuizMedio(){
    // Definir Pokemons
    if(erros > 1){
        var treinadorM = prompt(
            `Você Perdeu!
            Pontuação: ${pnts}
            
            Insira seu nome de treinador:`
        )

        local_nameTreinadorM = JSON.parse(localStorage.getItem('l_nameTreinadorM') || '[]')
        local_nameTreinadorM.push(treinadorM)
        localStorage.setItem("l_nameTreinadorM", JSON.stringify(local_nameTreinadorM))

        local_pntsTreinadorM = JSON.parse(localStorage.getItem('l_pntsTreinadorM') || '[]')
        local_pntsTreinadorM.push(pnts)
        localStorage.setItem("l_pntsTreinadorM", JSON.stringify(local_pntsTreinadorM))

        limpaDados()
        erros = 0
        pnts  = 0

        rankingM()

    } else {
        naoRepete()
        //pokemonRandom = Math.round(Math.random() * 151)
        //pokemonsSorteados.push(pokemonRandom)
        console.log("sorteados: " + pokemonsSorteados)

        if(pokemonRandom >= 148){
            pokemonRandomErrado1 = pokemonRandom - 30
            pokemonRandomErrado2 = pokemonRandom - 20
            pokemonRandomErrado3 = pokemonRandom - 2
            pokemonRandomErrado4 = pokemonRandom - 3
        } else if(pokemonRandom <= 3){
            pokemonRandomErrado1 = pokemonRandom + 3
            pokemonRandomErrado2 = pokemonRandom + 2
            pokemonRandomErrado3 = pokemonRandom + 20
            pokemonRandomErrado4 = pokemonRandom + 30
        } else {
            pokemonRandomErrado1 = pokemonRandom + 3
            pokemonRandomErrado2 = pokemonRandom + 2
            pokemonRandomErrado3 = pokemonRandom - 2
            pokemonRandomErrado4 = pokemonRandom - 3
        }

        // Executa funções de definição das alternaativas
        buscaPokemon(pokemonRandom)
        randomizaOrdemRespostas()
        definirRespostas()
        verificaResposta()

        console.log('pokemonRandom = ' + pokemonRandom)
        console.log('pokemon_certo = ' + pokemon_certo)
        console.log('pokemonRandomErrado1 = ' + pokemonRandomErrado1)
        console.log('pokemon_errado1 = ' + pokemonsArray[pokemonRandomErrado1])
        console.log('pokemon_errado2 = ' + pokemonsArray[pokemonRandomErrado2])
        console.log('pokemon_errado3 = ' + pokemonsArray[pokemonRandomErrado3])
        console.log('pokemon_errado4 = ' + pokemonsArray[pokemonRandomErrado4])

        console.log('q ' + pokemonsArray[pokemonRandom-1])
    }
}

function btn_resp_a(){
    if(resp_a == 1){
        quiz_resp_a.style = "background: green"
        respostaCerta()
        timerQuiz()
    } else if(resp_a == 2){
        quiz_resp_a.style = "background: red"
        quiz_resp_b.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 3){
        quiz_resp_a.style = "background: red"
        quiz_resp_c.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 4){
        quiz_resp_a.style = "background: red"
        quiz_resp_d.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else {
        quiz_resp_a.style = "background: red"
        quiz_resp_e.style = "background: green"
        respostaErrada()
        timerQuiz()
    }
}

function btn_resp_b(){
    if(resp_a == 1){
        quiz_resp_a.style = "background: green"
        quiz_resp_b.style = "background: red"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 2){
        quiz_resp_b.style = "background: green"
        respostaCerta()
        timerQuiz()
    } else if(resp_a == 3){
        quiz_resp_b.style = "background: red"
        quiz_resp_c.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 4){
        quiz_resp_b.style = "background: red"
        quiz_resp_d.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else {
        quiz_resp_b.style = "background: red"
        quiz_resp_e.style = "background: green"
        respostaErrada()
        timerQuiz()
    }
}

function btn_resp_c(){
    if(resp_a == 1){
        quiz_resp_c.style = "background: red"
        quiz_resp_a.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 2){
        quiz_resp_c.style = "background: red"
        quiz_resp_b.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 3){
        quiz_resp_c.style = "background: green"
        respostaCerta()
        timerQuiz()
    } else if(resp_a == 4){
        quiz_resp_c.style = "background: red"
        quiz_resp_d.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else {
        quiz_resp_c.style = "background: red"
        quiz_resp_e.style = "background: green"
        respostaErrada()
        timerQuiz()
    }
}

function btn_resp_d(){
    if(resp_a == 1){
        quiz_resp_d.style = "background: red"
        quiz_resp_a.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 2){
        quiz_resp_d.style = "background: red"
        quiz_resp_b.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 3){
        quiz_resp_d.style = "background: red"
        quiz_resp_c.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 4){
        quiz_resp_d.style = "background: green"
        respostaCerta()
        timerQuiz()
    } else {
        quiz_resp_d.style = "background: red"
        quiz_resp_e.style = "background: green"
        respostaErrada()
        timerQuiz()
    }
}

function btn_resp_e(){
    if(resp_a == 1){
        quiz_resp_e.style = "background: red"
        quiz_resp_a.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 2){
        quiz_resp_e.style = "background: red"
        quiz_resp_b.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 3){
        quiz_resp_e.style = "background: red"
        quiz_resp_c.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else if(resp_a == 4){
        quiz_resp_e.style = "background: red"
        quiz_resp_d.style = "background: green"
        respostaErrada()
        timerQuiz()
    } else {
        quiz_resp_e.style = "background: green"
        respostaCerta()
        timerQuiz()
    }
}

function respostaCerta(){    
    pnts++

    desabilitar(quiz_resp_a)
    desabilitar(quiz_resp_b)
    desabilitar(quiz_resp_c)
    desabilitar(quiz_resp_d)
    desabilitar(quiz_resp_e)

    /*
    if(resp_a == 1){
        quiz_resp_a.removeEventListener("click", respostaCerta );
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else if(resp_a == 2){
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaCerta )
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else if(resp_a == 3){
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaCerta )
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else if(resp_a == 4){
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaCerta )
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else {
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaCerta )
    }
    */
}

function timerQuiz(){
    setTimeout(() => {
        limpaDados()
        iniciaQuizFacil()
    }, 1000);
}

function timerQuizM(){
    setTimeout(() => {
        limpaDados()
        iniciaQuizMedio()
    }, 1000);
}

function respostaErrada(){
    //alert('Errou')
    
    erros++

    desabilitar(quiz_resp_a)
    desabilitar(quiz_resp_b)
    desabilitar(quiz_resp_c)
    desabilitar(quiz_resp_d)
    desabilitar(quiz_resp_e)

    /*
    if(resp_a == 1){
        quiz_resp_a.removeEventListener("click", respostaCerta );
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else if(resp_a == 2){
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaCerta )
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else if(resp_a == 3){
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaCerta )
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else if(resp_a == 4){
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaCerta )
        quiz_resp_e.removeEventListener("click", respostaErrada)
    } else {
        quiz_resp_a.removeEventListener("click", respostaErrada)
        quiz_resp_b.removeEventListener("click", respostaErrada)
        quiz_resp_c.removeEventListener("click", respostaErrada)
        quiz_resp_d.removeEventListener("click", respostaErrada)
        quiz_resp_e.removeEventListener("click", respostaCerta )
    }
    */
}

function verificaResposta(){
    quiz_resp_a.addEventListener("click", btn_resp_a, false)
    quiz_resp_b.addEventListener("click", btn_resp_b, false)
    quiz_resp_c.addEventListener("click", btn_resp_c, false)
    quiz_resp_d.addEventListener("click", btn_resp_d, false)
    quiz_resp_e.addEventListener("click", btn_resp_e, false)
}

function limpaDados(){

    quiz_resp_a.style = ""
    quiz_resp_b.style = ""
    quiz_resp_c.style = ""
    quiz_resp_d.style = ""
    quiz_resp_e.style = ""

    quiz_resp_a.value = 'Resposta A'
    quiz_resp_b.value = 'Resposta B'
    quiz_resp_c.value = 'Resposta C'
    quiz_resp_d.value = 'Resposta D'
    quiz_resp_e.value = 'Resposta E'

    quiz_img.src = "img/poke.png"
}

function naoRepete(){
    pokemonRandom = Math.round(Math.random() * 151)
    for(i = 0; i < pokemonsSorteados.length; i++){
        if(pokemonRandom == pokemonsSorteados[i]){
            pokemonRandom = Math.round(Math.random() * 151)
            console.log("controle: " + pokemonRandom)
        }
    }
    pokemonsSorteados.push(pokemonRandom);
}

function desabilitar(elemento){
    elemento.disabled = true;
}

function habilitar(elemento){
    elemento.disabled = false;
}

function iniciaJogo(){

	var tempo_segundos = 90;

    iniciaQuizFacil()

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = "Tempo: " + tempo_segundos;

	contagem_tempo(tempo_segundos + 1)
	
}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
        erros = 3
        clearTimeout(timerId); //para a execução da função do settimeout
        iniciaQuizFacil()
		return false;
	}

	document.getElementById('cronometro').innerHTML = "Tempo: " + segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

// Ranking
//                   [ Variaveis de controle do ranking de pontuação ]
var local_nameTreinador = []
var treinadores = []
var topsT = []

var top1t = document.getElementById('top1t')
var top2t = document.getElementById('top2t')
var top3t = document.getElementById('top3t')
var top4t = document.getElementById('top4t')
var top5t = document.getElementById('top5t')

var top1p = document.getElementById('top1p')
var top2p = document.getElementById('top2p')
var top3p = document.getElementById('top3p')
var top4p = document.getElementById('top4p')
var top5p = document.getElementById('top5p')

local_nameTreinador = JSON.parse(localStorage.getItem('l_nameTreinador') || '[]')
local_pntsTreinador = JSON.parse(localStorage.getItem('l_pntsTreinador') || '[]')

function unique(value, index, self) { 
    return self.indexOf(value) === index;
}

function treinadoresDistintos(){
    treinadores = local_nameTreinador.filter(unique)
    console.log(treinadores)
}

function ranking(){

    for(i = 0; i < local_nameTreinador.length; i++){
        topsT[i] = [local_nameTreinador[i], local_pntsTreinador[i]]
    }

    topsT.sort(function (a, b) {
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    
    console.log(topsT)
    if(topsT.length >= 1){
        top1t.innerHTML = topsT[0][0]
    } else {
        top1t.innerHTML = "-"
    }
    if(topsT.length >= 1){
        top1p.innerHTML = topsT[0][1]
    } else {
        top1p.innerHTML = 0
    }
    
    if(topsT.length >= 2){
        top2t.innerHTML = topsT[1][0]
    } else {
        top2t.innerHTML = "-"
    }
    if(topsT.length >= 2){
        top2p.innerHTML = topsT[1][1]
    } else {
        top2p.innerHTML = 0
    }

    if(topsT.length >= 3){
        top3t.innerHTML = topsT[2][0]
    } else {
        top3t.innerHTML = "-"
    }
    if(topsT.length >= 3){
        top3p.innerHTML = topsT[2][1]
    } else {
        top3p.innerHTML = 0
    }

    if(topsT.length >= 4){
        top4t.innerHTML = topsT[3][0]
    } else {
        top4t.innerHTML = "-"
    }
    if(topsT.length >= 4){
        top4p.innerHTML = topsT[3][1]
    } else {
        top4p.innerHTML = 0
    }

    if(topsT.length >= 5){
        top5t.innerHTML = topsT[4][0]
    } else {
        top5t.innerHTML = "-"
    }
    if(topsT.length >= 5){
        top5p.innerHTML = topsT[5][1]
    } else {
        top5p.innerHTML = 0
    }

    if(topsT.length >= 6){
        top6t.innerHTML = topsT[5][0]
    } else {
        top5t.innerHTML = "-"
    }
    if(topsT.length >= 6){
        top6p.innerHTML = topsT[5][1]
    } else {
        top6p.innerHTML = 0
    }

    if(topsT.length >= 7){
        top7t.innerHTML = topsT[6][0]
    } else {
        top7t.innerHTML = "-"
    }
    if(topsT.length >= 7){
        top7p.innerHTML = topsT[6][1]
    } else {
        top7p.innerHTML = 0
    }

    if(topsT.length >= 8){
        top8t.innerHTML = topsT[7][0]
    } else {
        top8t.innerHTML = "-"
    }
    if(topsT.length >= 8){
        top8p.innerHTML = topsT[7][1]
    } else {
        top8p.innerHTML = 0
    }

    if(topsT.length >= 9){
        top9t.innerHTML = topsT[8][0]
    } else {
        top9t.innerHTML = "-"
    }
    if(topsT.length >= 9){
        top9p.innerHTML = topsT[8][1]
    } else {
        top9p.innerHTML = 0
    }

    if(topsT.length >= 10){
        top10t.innerHTML = topsT[9][0]
    } else {
        top10t.innerHTML = "-"
    }
    if(topsT.length >= 10){
        top10p.innerHTML = topsT[9][1]
    } else {
        top10p.innerHTML = 0
    }

}

// teste