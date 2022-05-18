
import { myRandomId } from '../m_globalFunctions';

let myTD_BS = [];

// удалить - заполнение массива пустыми данными
function zapoln() {
    for (let i = 0; i < 5; i++) {
        myTD_BS.push({
            listName: "My list №" + (i + 1),
            id_key: myRandomId(),
            newList: [],
        })

        for (let i2 = 0; i2 < 5; i2++) {
            myTD_BS[i].newList.push({
                myToDoID: myRandomId(),
                timeOfUpdate: Date.now(),
                checkBox01: false,
                toDoText: "My ToDo №" + (i + 1) + " - " + (i2 + 1),
                checked: false,
                deleted: false,
                comments:String(""),
            })
        }
    }
    console.log(myTD_BS);
}
zapoln();


function saveLocalStorage() {
    localStorage.setItem('myLocalStorage', JSON.stringify(myTD_BS));
    console.log('Был сохранен myLocalStorage');
}

function loadLocalStorage() {
    let qqq = localStorage.getItem('myLocalStorage');
    localStorage.getItem('myStorage');

    console.log('Содержимое LocalStorag');
    console.log(qqq);

    if (qqq != null) {
        myTD_BS = JSON.parse(qqq);
        console.log('Был прочитан myLocalStorage');
    }
}
loadLocalStorage();

function deleteLocaleStorage() {
    localStorage.removeItem('myLocalStorage');
}



//---------------------------------
export { myTD_BS, saveLocalStorage, loadLocalStorage, deleteLocaleStorage};