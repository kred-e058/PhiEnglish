// set variables
let currentURL = JSON.parse(localStorage.getItem('currentURL'));
let root = JSON.parse(localStorage.getItem('root'));
let tagName = localStorage.getItem('nameTagClicked');
let data = JSON.parse(localStorage.getItem('data'));
let id_ques = parseInt(localStorage.getItem('id_ques'));

let rdData = JSON.parse(localStorage.getItem('rdData'));
let rdTerm = rdData[0];
console.log(rdData);
let rdDef = rdData[1];

function currentIdQues(){
    let crid = document.querySelector('.cr-id-ques');
    let id_ques2 = id_ques+1;
    crid.innerText = id_ques2 + '/' + rdTerm.length;
}
currentIdQues();

function set_FlashCard(){
    let flashcard = document.querySelector('.flashcard');
    flashcard.innerHTML = rdTerm[id_ques];
    flashcard.onclick = () =>{
        if (flashcard.classList.length === 2){
            flashcard.classList.remove('flipped');
            flashcard.innerHTML = rdTerm[id_ques];
        }else {
            flipped();
        }
    }
}
set_FlashCard();

function flipped(){
    let flashcard = document.querySelector('.flashcard');
    flashcard.classList.add('flipped');
    flashcard.innerText = rdDef[id_ques];
}

function nextQues(){
    speechSynthesis.cancel();
    if (id_ques+1 >= rdTerm.length){
        finish();
        return ;
    }
    id_ques++;
    localStorage.setItem('id_ques', id_ques);
    set_FlashCard();
    let flashcard = document.querySelector('.flashcard');
    if (flashcard.classList.length === 2){
            flashcard.classList.remove('flipped');
    }
    currentIdQues();
    speakText(rdTerm[id_ques]);
}
function preQues(){
    speechSynthesis.cancel();
    if (id_ques === 0) return ;
    id_ques--;
    localStorage.setItem('id_ques', id_ques);
    set_FlashCard();
    let flashcard = document.querySelector('.flashcard');
    if (flashcard.classList.length === 2){
            flashcard.classList.remove('flipped');
    }
    currentIdQues();
    speakText(rdTerm[id_ques]);
}

//set voices
let voices = speechSynthesis.getVoices();
speechSynthesis.addEventListener('voiceschanged', () =>{
    voices = speechSynthesis.getVoices();
})

function speakText(text){
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1;
    utterance.voice = voices[5];
    speechSynthesis.speak(utterance);
}
//onclick speaker 
document.querySelector('.speaker').onclick = () =>{
    speakText(rdTerm[id_ques]);
}

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
    wish.innerHTML = '<img src="./greenTick.png" class="greenTick"><br>'
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
        window.location = './feature/menu/indexMn.html';
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
}
function goBack(){
    localStorage.setItem('SPM', 'menu');
    window.location = './feature/menu/indexMn.html'
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