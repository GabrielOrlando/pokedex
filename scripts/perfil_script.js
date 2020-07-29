// VARIAVEIS GERAIS
var session_nameUser = '';
var txtComp = document.getElementById('txtComp');
var postText = '';
var postTitle = '';

// VARIAVEIS DE CRIAÇÃO DE ELEMENTOS
var cPost_Location = document.getElementById('posts');
var cPost_Div = document.createElement('div');
var cPost_User = document.createElement('h4');
var cPost_Text = document.createElement('p');
var cPost_Date = document.createElement('p');
var cPost_NewListItem = document.createElement('li');
var cPost_Hr = document.createElement('hr');

// VARIAVEIS DE CONTROLE DE ELEMENTOS
var cPost_GetListItem = document.getElementsByTagName('li')[7];
var cPost_List = document.getElementById('list_comp');

// CONTROLE DE STORAGE
sessionStorage.getItem('s_user') != null ? session_nameUser = sessionStorage.getItem('s_user') : session_nameUser = 'Convidado'
local_userPosts = []
local_textPosts = []

function getPosts() {
    local_userPosts = JSON.parse(localStorage.getItem('l_userPosts') || '[]')
    local_textPosts = JSON.parse(localStorage.getItem('l_textPosts') || '[]')

    for (i = local_userPosts.length - 1; i >= 0 ; i--) {
        let li = createLi(local_userPosts[i],local_textPosts[i])
        addNaUl(li)
    }
}

function createLi(texto,texto1){
    let li = document.createElement('li')
    let h4 = document.createElement('h4')
    let p = document.createElement('p')
    let hr = document.createElement('hr')

    h4.innerHTML = texto
    p.innerHTML = texto1
    hr.style = "class: my-4"

    li.appendChild(h4)
    li.appendChild(p)
    li.appendChild(hr)

    return li
}

function addNaUl(elemento){
    let ul = document.getElementById('list_comp')
    ul.insertBefore(elemento, ul.firstChild)
}

function newPost() {
    var date = new Date()
    postText = txtComp.value
    postTitle = 'Em ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ', ' + session_nameUser + ' disse: '

    let li = createLi(postTitle,postText)
    local_userPosts.unshift(postTitle)
    local_textPosts.unshift(postText)
    addNaUl(li)
    localStorage.setItem("l_userPosts", JSON.stringify(local_userPosts))
    localStorage.setItem("l_textPosts", JSON.stringify(local_textPosts))
}