let currentURL = JSON.parse(localStorage.getItem('currentURL'));
let root = JSON.parse(localStorage.getItem('root'));



let path = get_current_urlObject(root);
let tagName = localStorage.getItem('nameTagClicked');
let index = 1;
for (let i = 0; i < 3; i++){
    add_blocks(index);
}
document.querySelector('.title').innerText = tagName;
function add_blocks(id){
    let containerInput = document.querySelector('.container-input');
    containerInput.appendChild(document.createElement('br'));
    //container_column
    let container_column = document.createElement('div');
    container_column.classList.add('input-Row');
    containerInput.appendChild(container_column);
    //number and trash
    let div = document.createElement('div');
    div.innerText = index;
    div.classList.add('title-input-bar')
    container_column.appendChild(div);
    // trash
    let trashIcon = document.createElement('img');
    trashIcon.src='./trash-icon.png';
    trashIcon.classList.add('trash-icon');
    trashIcon.onclick=(e)=>{
        deleteElement(e);
    }

    div.appendChild(trashIcon);
    //boxT
    boxT = document.createElement('div');
    boxT.classList.add('d0-inp');
    boxT.classList.add('d1-inpTerm');
    container_column.appendChild(boxT);

    //textarea term
    let textarea1 = document.createElement('textarea');
    textarea1.classList.add('inp-text');
    textarea1.classList.add('isTerm');
    textarea1.placeholder = 'input';
    boxT.appendChild(textarea1);
    boxT.innerHTML+=  'Enter Term';

    //boxD
    boxD = document.createElement('div');
    boxD.classList.add('d0-inp');
    boxD.classList.add('d2-inpDefinition');
    container_column.appendChild(boxD);    

    //textarea definition 
    let textarea2 = document.createElement('textarea');
    textarea2.classList.add('inp-text');
    textarea2.classList.add('isDefinition');
    textarea2.placeholder = 'input';
    boxD.appendChild(textarea2);
    boxD.innerHTML+=  'Enter Definition';

    index++;
}

document.querySelector('.goBack-page').addEventListener('click', ()=>{
    window.location = '../index.html';
})

function addMoreBut(e){
    for (let i = 0; i < 3; i++)
    add_blocks();
    if (e === undefined) return;
    if (e.srcElement.classList[1] === "buttonMore-inend"){
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function submit(){
    //Get Term 
    let list_term = document.querySelectorAll('.isTerm')
    let list_term_value = [];
    for (let i = 0; i < list_term.length; i++){
        list_term[i].value = list_term[i].value.trim();
        list_term_value[i] = list_term[i].value;
    }
    //Get Definition
    let list_def = document.querySelectorAll('.isDefinition');
    let list_def_value = []
    for (let i = 0; i < list_def.length; i++){
        list_def[i].value = list_def[i].value.trim();
        list_def_value[i] = list_def[i].value;
    }

    //filter
    for (let i = 0; i < list_def_value.length; i++){
        if (list_term_value[i] === '' && list_def_value[i]===''){
            list_term_value.splice(i, 1);
            list_def_value.splice(i, 1);
            i--;
        }
    }
    
    //localStorage
    let data = path[tagName].data =[];
    data[0] = list_term_value;
    data[1] = list_def_value;
    // console.log(data);
    // console.log(root);
    localStorage.setItem("root", JSON.stringify(root));
    console.log(JSON.parse(localStorage.getItem("root")));
    window.location = '/index.html';
}
function deleteElement(e){
    let element = e.target.offsetParent.parentElement;
    // element.remove();
}

function get_current_urlObject(root){
    let list_url = currentURL.urlsBar;
    let path = root;

    for (let i = 0; i < list_url.length; i++){
        path = path[list_url[i]].data;
    }
    return path;
}

        // <div class="container-body">
        //     <div class="input-Row">
        //         <div style="text-align: start; margin-left: 5px; font-weight: 600; font-size: 20px;">1</div>
        //         <div class="d0-inp d1-inpTerm">
        //             <textarea class="inp-text isTerm">input</textarea><br>
        //             Enter Term
        //         </div>
        //         <div class="d0-inp d2-inpDefinition isDefinition">
        //             <textarea class="inp-text">input</textarea><br>
        //             Enter Definitione
        //         </div>
        //     </div>
        // </div>