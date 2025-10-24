let SPM = localStorage.getItem('SPM');
let fromPage = (SPM === 'menu')?'menu': 'input';

function onclickSetting(){
    let ctn = document.querySelector('.container')
    let popup_ctn = document.querySelector('.popup-ctn');
    popup_ctn.style.display = 'flex';

}

function setpopup(){
    let popup_ctn = document.querySelector('.popup-ctn');
    //close popup 
    let close_btn = document.createElement('img');
    close_btn.src = '../../goback_but.png';
    close_btn.classList.add('close-popup');
    close_btn.onclick = () => {
        popup_ctn.innerHTML = '';
        setpopup();
        document.querySelector('.popup-ctn').style.display = 'none';
    }
    popup_ctn.appendChild(close_btn);

    //popup container button 
    let ctn_btns = document.createElement('div');
    ctn_btns.classList.add('popup-ctn-button');
    popup_ctn.appendChild(ctn_btns);

    //rename 
    let btn_rename = document.createElement('button');
    btn_rename.classList.add('pu-rename');
    btn_rename.innerText = 'Đổi tên';
    btn_rename.onclick = (e) =>{
        rename(e.target);
    }
    ctn_btns.appendChild(btn_rename);

    //Edit feature
    if (fromPage === 'menu'){
        ctn_btns.appendChild(document.createElement('br'));
        let btn_edit = document.createElement('button');
        btn_edit.innerText = 'Chỉnh sửa danh sách từ vựng';
        btn_edit.classList.add('pu-rename');
        btn_edit.classList.add('pu-edit');
        btn_edit.onclick = () => {
            window.location = "../input/indexIP.html";
        }
        ctn_btns.appendChild(btn_edit);
    }
}
setpopup();

function rename(e){
    e.style.display = 'none';
    let nametitle = localStorage.getItem('nameTagClicked');
    let container = document.querySelector('.popup-ctn-button')
    
    //Warning
    let popup_ctn = document.querySelector('.popup-ctn');
    let warning = document.createElement('span');
    warning.innerText = "Tên đã bị trùng! Xin hãy nhập tên khác"
    warning.classList.add('warning');
    warning.classList.add('hide');
    popup_ctn.prepend(warning);

    //textarea 
    let textarea = document.createElement('textarea');
    textarea.classList.add('input-rename');
    textarea.value = nametitle;
    container.appendChild(textarea)
    container.appendChild(document.createElement('br'))

    //button submit 
    let btn_submit = document.createElement('button');
    btn_submit.innerText = "Lưu";
    btn_submit.classList.add('btn_save_nnam');
    btn_submit.onclick = () =>{
        submitRename()
    }
    container.appendChild(btn_submit);

}
function submitRename(){
    let new_name = document.querySelector('.input-rename').value.trim();
    let old_name = tagName.trim();
    let entriesPath = Object.entries(path);
    console.log(entriesPath);
    for (let e of entriesPath){
        if (e[0] === new_name) {
            let warning = document.querySelector('.warning');
            warning.classList.remove('hide');
            console.log("warning animation")
            return 0;
        }
    }
    entriesPath.forEach( e =>{  
            e[0] = e[0]===old_name?new_name : e[0]; 
            e[1].name = e[0];
        })
    for (let e in path){
        delete path[e];
    }
    path = Object.assign(path, Object.fromEntries(entriesPath));
    localStorage.setItem("root", JSON.stringify(root));
    tagName = localStorage.setItem('nameTagClicked', new_name);
    window.location.reload();
}


function get_current_urlObject(root){
    let list_url = currentURL.urlsBar;
    let path = root;
    for (let i = 0; i < list_url.length; i++){
        path = path[list_url[i]].data;
    }
    return path;
}