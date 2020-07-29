var local_namePokemon = []
var contador = []
var nomes = []
var tops = []
var top1 = document.getElementById('top1')
var top2 = document.getElementById('top2')
var top3 = document.getElementById('top3')
var top4 = document.getElementById('top4')
var top5 = document.getElementById('top5')
var aux  = []

var bv_user = document.getElementById('bv_user')

local_namePokemon = JSON.parse(localStorage.getItem('l_namePoke') || '[]')
session_user = sessionStorage.getItem('s_user')


function unique(value, index, self) { 
    return self.indexOf(value) === index;
}

function nomesDistintos(){
    nomes = local_namePokemon.filter(unique)
    console.log(nomes)
}

function maisBuscados(){

    nomesDistintos()

    for(i = 0; i < nomes.length; i++){
        contador.push(0)
        for(j = 0; j < local_namePokemon.length - 1; j++){
            if(nomes[i] == local_namePokemon[j]){
                contador[i]++
            }
        }
        tops[i] = [nomes[i], contador[i]]
    }

    tops.sort(function (a, b) {
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    
    if(tops.length >= 1){
        top1.innerHTML = tops[0][0]
    } else {
        top1.innerHTML = "-"
    }
    if(tops.length >= 2){
        top2.innerHTML = tops[1][0]
    } else {
        top2.innerHTML = "-"
    }
    if(tops.length >= 3){
        top3.innerHTML = tops[2][0]
    } else {
        top3.innerHTML = "-"
    }
    if(tops.length >= 4){
        top4.innerHTML = tops[3][0]
    } else {
        top4.innerHTML = "-"
    }
    if(tops.length >= 5){
        top5.innerHTML = tops[4][0]
    } else {
        top5.innerHTML = "-"
    }
}

if(session_user != null){
    bv_user.innerHTML = "Bem vindo " + session_user + "!"
} else {
    bv_user.innerHTML = "Bem vindo convidado!"
}