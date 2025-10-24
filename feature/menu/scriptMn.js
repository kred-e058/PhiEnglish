let currentURL = JSON.parse(localStorage.getItem('currentURL'));
let root = JSON.parse(localStorage.getItem('root'));
let tagName = localStorage.getItem('nameTagClicked');
let data = get_current_urlObject(root)[tagName].data;
let path = get_current_urlObject(root);
//title page
let title = document.querySelector('.title')
title.innerText = tagName
//container-body
if (!localStorage.getItem('SPM')){
    localStorage.setItem('SPM', "menu")
}
if (localStorage.getItem('SPM') === 'menu'){
    add_practice_btn();
}
switch (localStorage.getItem('SPM')){
    case 'menu':
        add_practice_btn();
        localStorage.setItem('data', JSON.stringify({...data}))
        break;
    case 'MC':
        multipleChoice();
        break;
    case 'finish':
        finish(); 
        break;
}
console.log(data);
function add_practice_btn(){
    document.querySelector('.container-body').innerHTML = `
                <button class="practice-btn" onclick="
                    localStorage.setItem('id_ques', '0');
                    randomMC();
                    multipleChoice()">Multiple choice</button><br>

            <button class="practice-btn" onclick="
                window.location = './WaL/indexWaL.html';
                localStorage.setItem('id_ques', 0); 
                randomMC();">Writting by listen</button><br>

            <button class="practice-btn" onclick="
                window.location = './flashcard/indexfd.html';
                localStorage.setItem('id_ques', 0); 
                randomMC();">Flashcards</button><br>
            <button class="practice-btn" onclick="
                window.location = './mixStory/indexMS.html'
                localStorage.setItem('id_ques', 0); 
            ">Adding story</button>
            `
}
function multipleChoice(){
    // remove Setting button 
    let ctn_header = document.querySelector('.header');
    let settingImg = document.querySelector('.setting');
    settingImg.style.display = 'none';
    let nothingIMG = document.createElement('img');
    nothingIMG.classList.add('nothingImg')
    nothingIMG.src = '../../backgroundItem__NOTHING.png';
    ctn_header.appendChild(nothingIMG);

    let id = localStorage.getItem('id_ques');
    let rdData = JSON.parse(localStorage.getItem('rdData'));
    let rdTerm = rdData[0];
    let  rdDef = rdData[1]
    let  rdAlts = rdData[2];
    //refresh
    localStorage.setItem('SPM', "MC")
    let container = document.querySelector('.container-body');
    container.style.css = `
        background-color: #94a1b2;
    `
    container.innerHTML = '';

    //ctn-ques
    let ctn_ques = document.createElement('div');
    ctn_ques.classList.add('ctn-ques')
    container.appendChild(ctn_ques)

    //display "Term"
    let strTerm = document.createElement('span');
    strTerm.innerHTML= '<strong>Term</strong>';
    ctn_ques.appendChild(strTerm);

    //counter ques
    let cnumQ = document.createElement('span')
    cnumQ.innerText = (parseInt(id)+1) + '/' + data[0].length
    cnumQ.style.cssText = `
        position: absolute;
        right: 30px;
    `
    ctn_ques.appendChild(cnumQ);

    // question
    let title_ques  = document.createElement('div');
    title_ques.classList.add('title-question');
    title_ques.innerText = rdTerm[id];
    ctn_ques.appendChild(title_ques);

    // container alts
    let ctn_answers = document.createElement('div');
    ctn_answers.classList.add('ctn-alts')
    container.appendChild(ctn_answers);
    
    // Alternatives
    for (let i = 0 ; i < ((rdTerm.length>=4)?4:rdTerm.length); i ++){
        let alts  = document.createElement('button');
        alts.classList.add('alts');
        alts.innerText= rdAlts[id][i];
        ctn_answers.appendChild(alts)
        alts.onclick= (e) => {
            let element = e.target.innerText;
            if (element === rdDef[id]) {
                if (document.querySelectorAll('.btn-nextQs').length === 0) isTrueAns(container);
                e.target.style.border = '2px solid yellow';
            } else {
                e.target.style.cssText = `
                    background:  #323240;
                    color:  #323240;
                    border: 0;
                `

            }
        }
    }
    setAudio();

}

function isTrueAns(ctn, tof){
    //btn next ques
    let id = parseInt(localStorage.getItem('id_ques'))
    let btn_nextQs = document.createElement('button');
    btn_nextQs.classList.add('btn-nextQs');
    btn_nextQs.innerText = 'Next';
    btn_nextQs.onclick = () =>{
        id++;
        if (id === data[0].length) { 
            finish()
            btn_nextQs.remove();
        } else{
            localStorage.setItem('id_ques', id);
            multipleChoice();
            btn_nextQs.remove();
        }
    }
    document.querySelector('.container').appendChild(btn_nextQs);
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
    wish.innerHTML = '<img src="../../greenTick.png" class="greenTick"><br>'
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
        randomMC();
        localStorage.setItem('SPM', 'MC');
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
        window.location.reload();
    }

    //Add learning analytis 
    let LA = JSON.parse(localStorage.getItem('LA'))
    LA.MC++
    localStorage.setItem('LA', JSON.stringify(LA));

    // Sound winning 
    playAuClick2();
}

function randomMC(){
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
function goBack(){
    if (localStorage.getItem('SPM') === 'menu'){
        window.location = '../../index.html';
    }else {
        let settingImg = document.querySelector('.setting');
        settingImg.style.display = 'block';
        let nothingIMG = document.querySelector('.nothingImg');
        nothingIMG.remove();
        localStorage.setItem('SPM', 'menu');
        add_practice_btn();
    }
}


function get_current_urlObject(root){
    let list_url = currentURL.urlsBar;
    let path = root;

    for (let i = 0; i < list_url.length; i++){
        path = path[list_url[i]].data;
    }
    return path;
}

//sound when click button 
function setAudio(){
    document.querySelectorAll('.alts').forEach(e => {
    e.addEventListener('click', ()=>{
        playAuClick();
        })
    });
}
function playAuClick(){
    let click = new Audio("../../click.wav");
    click.volume = 0.03;
    console.log(123);
    click.currentTime = 0;
    click.play();
}

//winning audio
function setAudio2(){
    playAuClick2();
}
function playAuClick2(){
    let click = new Audio("../../winSound.wav");
    click.volume = 0.05;
    click.currentTime = 0;
    click.play();
}