add_URL('home');
open_page();
function createTag(isNew, old_name){
    //Setup local 
    let root = JSON.parse(localStorage.getItem("root"));
    let get_url = get_URL();
    let path = get_current_urlObject(root);
    if (isNew) path.indexFile ++;

    // container block 
    let div = document.querySelector(".container-block");
    let container = document.createElement("div");
    container.classList.add("icon-box");
    
    // img 
    let newTag = document.createElement("img");
    newTag.src='./file.png';
    newTag.classList.add("iconTag");
    //onclick
    newTag.onclick = (e) =>{
        openTag(e,path);
    }
    //name
    let name = document.createElement("div");
    name.classList.add("icon-name");
    // if (!old_name) name.innerText = "New tag " + String(path.indexFile)
    //     else name.innerText = old_name;

    name.innerText = old_name?old_name:"New tag " + String(path.indexFile);
    name.addEventListener("dblclick", function (){
        changeName(container, name, newTag );
    });

    container.appendChild(newTag);
    container.appendChild(name);
    div.appendChild(container);   

    let listIconBox = document.querySelectorAll(".icon-box");
    dragAndDrop(listIconBox);

    // localStorage 
    path[name.innerText]={
        type:'file',
        name: name.innerText,
        data: path[name.innerText]?.data || []
    }
    localStorage.setItem("root", JSON.stringify(root));

    // store currentURL
    let currentURL = {
        urlsBar: get_URL()
    }
    localStorage.setItem('currentURL', JSON.stringify(currentURL));
}

function createFolder(isNew, old_name){
     //Setup localStorage
    let root = JSON.parse(localStorage.getItem("root"));
    let get_url = get_URL();
    let path = get_current_urlObject(root);
    if (isNew) path.indexFolder ++;

    let div = document.querySelector(".container-block");

    let container = document.createElement("div");
    container.classList.add("icon-box");

    let newFolder = document.createElement("img");
    newFolder.src = './thumuc.png';
    newFolder.classList.add("iconFolder");
    //name
    let name = document.createElement("div");
    name.classList.add("icon-name");
    if (isNew) name.innerText="New folder " + path.indexFolder
        else name.innerText = old_name;
    name.addEventListener("dblclick", function (){
        changeName(container, name, newFolder);
    })
    container.appendChild(newFolder);
    container.appendChild(name);
    div.appendChild(container);

    //ONCLICK 
    newFolder.onclick = (e) =>{
        // console.log(e.target.nextElementSibling.firstChild.data);
        add_URL(e.target.nextElementSibling.firstChild.data, 1);
        open_page(1);
    }
    //update list 
    let listIconBox = document.querySelectorAll(".icon-box");
    dragAndDrop(listIconBox);

    //localStorage 
    if (isNew){
        path[name.innerText] = {
            type: 'folder',
            name: name.innerText,
            data: {
                indexFile: 0,
                indexFolder:0
            }
        }
        localStorage.setItem("root", JSON.stringify(root));
    }

}

function changeName(container, name, icon){
    let div = document.querySelector(".container-block");
        let root = JSON.parse(localStorage.getItem("root"));
        let path = get_current_urlObject(root);
        let entriesPathObject = Object.entries(path);
        for (let [key, value] of entriesPathObject){
            console.log(key, value);
        }
        let old_name = name.innerText;
    name.remove();
    name=document.createElement("input");
    name.placeholder = "Enter";
    container.appendChild(name);
    name.style.cssText=`
        width: 80px;
        margin-left: 12px;
    `;
    name.addEventListener("change", function(e){
        let new_name = name.value;
        //localStorage 
        let root = JSON.parse(localStorage.getItem("root"));
        let path = get_current_urlObject(root); 
        let check = 1;
        let list_keys = Object.keys(path);
        list_keys.forEach(e =>{
            if (e === new_name) {
                alert("Trùng tên!");
                check = undefined;
            }
        })

        if (check){
            let new_name = name.value;
            name.remove();
            name = document.createElement("div");
            name.classList.add("icon-name");
            name.addEventListener("dblclick", function (){
                changeName(container, name, icon)
            })
            name.innerText = new_name;
            container.appendChild(name);

            let entriesPath = Object.entries(path);
            entriesPath.forEach( e =>{  
                e[0] = e[0]===old_name?new_name : e[0]; 
                e[1].name = e[0];
            })
            for (let e in path){
                delete path[e];
            }
            path = Object.assign(path, Object.fromEntries(entriesPath));
            localStorage.setItem("root", JSON.stringify(root));
        }
        else {
            let new_name = name.value;
            name.remove();
            name = document.createElement("div");
            name.classList.add("icon-name");
            name.innerText = old_name;
            name.addEventListener("dblclick", function (){
                changeName(container, name, icon)
            })
            container.appendChild(name);
        }
    })
}

function dragAndDrop(listIconBox){
//scopeY
    listIconBox.forEach(element => {
        element.addEventListener("dragstart", () =>{
            element.classList.add("dragging");
        })
        element.addEventListener("dragend", () =>{
            element.classList.remove("dragging");
        })
    });
// drag over
    let  container = document.querySelector(".container-2");
    container.addEventListener("dragover", e => {
        let draggble = document.querySelector(".dragging");
        e.preventDefault();
        container.appendChild(draggble);
    });
}

function add_URL(name, isBack){
    let url = document.querySelector('.url');
    // ADD slash
    let slash = document.createElement('span');
    slash.textContent = '/ ';
    url.appendChild(slash);
   
    // ADD link
    let link_folder = document.createElement('button');
    link_folder.textContent = name;
    link_folder.classList.add('folder-url');
    link_folder.onclick = (e) =>{
        erase_right_side_in_URL(e);
        open_page(isBack);
    }
    url.appendChild(link_folder);
}
function open_page(isBack){
    // Page folder
    let container = document.querySelector('.container-block');
    //clear 
    container.innerHTML = "";
    // Back button 
    if (isBack){
        let back_button = document.createElement("button");
        back_button.classList.add('back_button');
        back_button.textContent = 'Back';
        back_button.onclick = () => {back_buttonHome();}
        container.appendChild(back_button);
    }
    // Display blocks
    let root = JSON.parse(localStorage.getItem("root"));
    let path = get_current_urlObject(root);

    const list_keys = Object.keys(path)
    const list_values = Object.values(path);
    for (let i = 0; i < list_keys.length; i++){
        let typeE = list_values[i].type
        if (typeE === "file"){
            createTag(undefined, list_keys[i])
        }
        if (typeE === "folder"){
            createFolder(undefined, list_keys[i])
        }
    }
}
function openTag(e, path){
    let name = e.target.nextSibling.innerText
    localStorage.setItem('nameTagClicked', name);
    localStorage.setItem('SPM', 'menu');

    window.location.href = (path[name]?.data.length ===0)? './feature/input/indexIP.html': './feature/menu/indexMn.html'; 
}
function back_buttonHome(){
    let listE_urlBar = document.querySelector('.url').children;
    listE_urlBar[listE_urlBar.length-1].remove();
    listE_urlBar[listE_urlBar.length-1].remove();
    let url  = document.querySelector('.url');
    if (listE_urlBar.length === 2) open_page()
        else open_page(1);
}

function get_URL(){
    let url = document.querySelector('.url');
    let list_folder_in_url_bar = [];
    for (let i = 1 ; i < url.children.length; i+=2){
        list_folder_in_url_bar.push(url.children[i].innerText);
    }
    // console.log(list_folder_in_url_bar);
    return list_folder_in_url_bar;
}

function erase_right_side_in_URL(e){
    e.originalTarget.classList.add('clicked');
    let listE_urlBar = document.querySelector('.url').children;
    let numberList = 0; for (let i = 0; i < listE_urlBar.length; i ++) numberList++;
    for (let i = 1; i < listE_urlBar.length; i += 2) {
        if (listE_urlBar[i].classList[1]) {
            for (let j = 0; j < numberList-i-1; j++){
                listE_urlBar[i+1].remove();
            }
            break;
        }
    }
    e.originalTarget.classList.remove('clicked');

}

function get_current_urlObject(root){
    let list_url = get_URL();
    let path = root;

    for (let i = 0; i < list_url.length; i++){
        path = path[list_url[i]].data;
    }
    return path;
}

function show_containerBox(){
    let container = document.querySelectorAll('.url')
    console.log(container[0].children);
}

