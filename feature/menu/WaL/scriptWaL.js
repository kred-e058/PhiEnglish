// set variables
let currentURL = JSON.parse(localStorage.getItem('currentURL'));
let root = JSON.parse(localStorage.getItem('root'));
let tagName = localStorage.getItem('nameTagClicked');
let data = JSON.parse(localStorage.getItem('data'));

//title page
let title = document.querySelector('.title')
title.innerText = tagName

//random Data
let rdData = JSON.parse(localStorage.getItem('rdData'));

//SpeechSynthe sis Utterance 
let voices = speechSynthesis.getVoices();
speechSynthesis.onvoiceschanged= (() =>{
        voices = speechSynthesis.getVoices();
    })

//function to speak
function speakText(text) {
    let utterance = new SpeechSynthesisUtterance(text);    
    utterance.voice = voices[5];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

// practice
//set random arrays
let rdTerm = rdData[0];
let rdDef = rdData[1];
let id_ques = parseInt(localStorage.getItem('id_ques'));

function Dpl_currentId_ques(){
    //Display current id question
    let crid = document.querySelector('.cr-id-ques');
    let id_ques2 = id_ques + 1;
    crid.innerText = id_ques2 + '/' + rdTerm.length;
}
Dpl_currentId_ques()

function speakTerm(){
    speakText(rdTerm[id_ques]);
} ;speakTerm();

function hintAns(){
    let btnHide = document.querySelector('.btn-hide-ans');
    btnHide.classList.add('be-not-hide')
    btnHide.innerText = rdDef[id_ques];
}

// onclick Enter fast submit 
document.querySelector('.inputAns').addEventListener('keydown', (e) =>{
    if (e.key === 'Enter') {
        e.preventDefault();
        submit();
        e.target.value = ''
    }
})

function submit(){
    let texteare = document.querySelector('.inputAns');
    let userAns = texteare.value.trim().toLowerCase();

    //check answer
    if (userAns === rdTerm[id_ques].trim().toLowerCase() ) {
        texteare.classList.remove('wrong-ans');
        id_ques++;
        reDplAns();
        if (id_ques === rdTerm.length) {
            finish();
        } else{
            localStorage.setItem('id_ques', id_ques);
            texteare.value = '';
            Dpl_currentId_ques()
            speakTerm()
            reHintAns();
            reHintAns();
        }
        
    } else {
        texteare.classList.add('wrong-ans');
        console.log('animation wrong ans');
    }
}
if (id_ques >= rdTerm.length) finish();
function finish(){
    localStorage.setItem('SPM', 'finish')
    let ctn_body = document.querySelector('.container-body')
    ctn_body.innerHTML = '';

    //ctn res 
    let ctn_res = document.createElement('div');
    ctn_res.classList.add('ctn-res')
    ctn_body.appendChild(ctn_res);
    // result ...
    //wish
    let wish = document.createElement('div')
    wish.classList.add('awish')
    wish.innerHTML = '<img src="../../../greenTick.png" class="greenTick"><br>'
    wish.innerHTML += 'Congratulation! keep going +1%';
    ctn_res.appendChild(wish);

    //container bottom bar 
    let ctn_bbar = document.createElement('div')
    ctn_bbar.classList.add('ctn-bbar');
    ctn_body.appendChild(ctn_bbar);

    //btn do again
    let btn_DA = document.createElement('button');
    btn_DA.classList.add('btn-DA');
    btn_DA.classList.add('finish-btn');
    btn_DA.innerText = 'Do again'
    ctn_bbar.appendChild(btn_DA)
    btn_DA.onclick = () =>{
        localStorage.setItem('id_ques', '0');
        randomTaD();
        window.location.reload();
    }

    //btn continue
    let btn_continue = document.createElement('button');
    btn_continue.classList.add('btn-ctn');
    btn_continue.classList.add('finish-btn');
    btn_continue.innerText = 'Continue';
    ctn_bbar.appendChild(btn_continue);
    btn_continue.onclick = () => {
        localStorage.setItem('SPM', "menu");
        window.location = '../indexMn.html';
        // window.location.reload();
    }

    //Add learning analytis 
    let LA = JSON.parse(localStorage.getItem('LA'))
    LA.WaL++
    console.log(LA);
    localStorage.setItem('LA', JSON.stringify(LA));

    //make it be center 
    document.querySelector('.container-body').style.cssText=`
        text-align: center;
    `
     playAuClick2()
}

// onclick "You don't know"
document.querySelector('.dpl-ans').addEventListener('click', (e) =>{
    dplAns();
})
function dplAns(){
    let button = document.querySelector('.dpl-ans');
    button.innerText = rdTerm[id_ques];
}
function reDplAns(){
    let button = document.querySelector('.dpl-ans');
    button.innerText = "Bạn không biết?";
}

function goBack(){
    localStorage.setItem('SPM', 'menu');
    window.location = '../indexMn.html';
}


function randomTaD(){
    //Set variable
    let rdTerm = data[0];
    let rdDef = data[1];
    let index = randomIndex(data[0].length);
    let intermedialy = 0;

    //random data
    for (let i = 0; i < data[0].length; i++){
        intermedialy = rdTerm[i];
        rdTerm[i] = rdTerm[index[i]];
        rdTerm[index[i]] = intermedialy;
        intermedialy = rdDef[i];
        rdDef[i] = rdDef[index[i]];
        rdDef[index[i]] = intermedialy;
    }
      
    let rdAlts = randomAlts(rdDef);
    let rdData = [[...rdTerm], [...rdDef], [...rdAlts]];
    localStorage.setItem('rdData', JSON.stringify(rdData));
}

function randomIndex(len){
    let index = [];
    for (let i = 0 ; i < len; i ++){
        index[i] = i;
    }
    for (let i = 0 ; i < index.length; i++){
        index[i] = random(0, index.length-1);
        index[index[i]] = i;
    }
    return index;
}
function random(min, max){
    return Math.floor(Math.random() * (max-min+1)+min); 
}
function randomAlts(array){
    let alts = [];
    for (let i = 0 ; i < array.length; i++){
        alts[i] = [...array];
        alts[i].splice(i, 1);
        alts[i] = randomArray(alts[i]);
        alts[i].splice(3, alts[i].length);
        alts[i].push(array[i]);
        alts[i] = randomArray(alts[i]);
    }
    return alts;
}

function randomArray(array){
    let index = [];
    for (let i = 0 ; i < array.length; i ++){
        index[i] = i;
    }
    for (let i = 0 ; i < index.length; i++){
        index[i] = random(0, index.length-1);
        index[index[i]] = i;
    }
    let intermedialy = 0;
    for (let i = 0 ; i < array.length; i++){
        intermedialy = array[i];
        array[i] = array[index[i]];
        array[index[i]] = intermedialy
    }
    return array;
}  

//sound when click button 
document.querySelector('.submit').addEventListener('click', ()=>{
    playAuClick();
})
function playAuClick(){
    let click = new Audio("../../../click.wav");
    click.volume = 0.03;
    console.log(123);
    click.currentTime = 0;
    click.play();
}

//sound Winning 
function playAuClick2(){
    let click = new Audio('../../../winSound.wav')
    click.volume = 0.07;
    click.currentTime = 0;
    click.play();
}