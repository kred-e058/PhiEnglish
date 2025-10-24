

function set_root_local(){
    if (JSON.parse(localStorage.getItem("root")) === null){
        let root = new Object; 
        root.home = {
            data: {
                indexFile:0,
                indexFolder:0
            }
        };
        localStorage.setItem("root", JSON.stringify(root))
        console.log(root);
    }
    if (localStorage.getItem('currentURL') === null){
        localStorage.setItem('currentURL', '');
    }
    if (localStorage.getItem('nameTagClicked') === null){
        localStorage.setItem('nameTagClicked', '');
    }
    if (localStorage.getItem('id_ques') === null){
        localStorage.setItem('id_ques', "0")
    }
    if (localStorage.getItem('rdData') === null){
        localStorage.setItem('rdData', '');
    }
    if (localStorage.getItem('data') === null){
        localStorage.setItem('data', '');
    }
    if (localStorage.getItem('LA') === null){
        let LA = new Object
        LA = {
            MC: 0, 
            WaL: 0
        }
        console.log(LA);
        localStorage.setItem('LA', JSON.stringify(LA));
    }
    if (localStorage.getItem('listName') === null){
        let listName = new Object
        listName = {
            thisisdraftno3onecansetthisnameomgm2m1m194 : 1
        };
        localStorage.setItem('listName', JSON.stringify(listName));
    }
}
set_root_local();



function clearlocal(){
    let root = JSON.parse(localStorage.getItem("root"))
    localStorage.removeItem("root");
    window.localStorage.clear();
    window.location.reload();
    set_root_local();
}

function showRootLocal(){
    let root = JSON.parse(localStorage.getItem("root"));
    console.log(root);
}