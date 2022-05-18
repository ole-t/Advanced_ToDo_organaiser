import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './m_private_forms.css';
import { myTD_BS, saveLocalStorage, deleteLocaleStorage } from '../privateFormsAndFunctions/m_private_functions.js';
import { myRandomId } from '../m_globalFunctions';

function PrivateListMenuSingleBlock(props) {
    //const [currentIndexArray, set_currentIndexArray] = useState(props.currentIndexArray);
    const [, updateStateLocal] = useState();
    const [activeStatusList, set_activeStatusList] = useState(props.activeStatus);
    const ref_inputListName = useRef();

    useEffect(() => {
        // меняем стейты с учетом данных из пропсов после создания документа        
        //set_currentIndexArray(props.currentIndexArray);
        set_activeStatusList(props.activeStatus);
    }
        , [props.activeStatus]  // запускаем "useEffect" только в случае, если поменялось значение "props.activeStatus"
    );

    return (
        <div
            className={activeStatusList ? "privateList_MenuSingleBlock isActive_privateList_MenuSingleBlock" : "privateList_MenuSingleBlock"}
            id={props.item_ID}
            onClick={props.m_onClick}
        >
            <input
                ref={ref_inputListName}
                type="text"
                readOnly={true} // запрещаем редактирование по умолчанию
                className="input_ListName"
                defaultValue={props.itemText}

                onDoubleClickCapture={() => {
                    ref_inputListName.current.readOnly = false;
                    ref_inputListName.current.selectionStart = ref_inputListName.current.value.length; // курсор в конец текста
                }} // разрешаем редактирование

                // после потери фокуса записываем данные с поля ввода
                onBlur={() => {
                    // если ячейка находится в состоянии редактирования
                    if (ref_inputListName.current.readOnly === false) {
                        console.log(ref_inputListName.current.value);
                        props.f_writeListNameInBD(ref_inputListName.current.value);
                        ref_inputListName.current.readOnly = true; //блокировка редактирования
                    }
                }}

                // Обрабатываем нажатие "Enter" и "Escape":
                onKeyDownCapture={(e) => {
                    // если ячейка находится в состоянии редактирования
                    if (ref_inputListName.current.readOnly === false) {
                        console.log(String(e.code));
                        switch (String(e.code)) {
                            case "Enter": {
                                props.f_writeListNameInBD(ref_inputListName.current.value);
                                ref_inputListName.current.readOnly = true;
                                break;
                            }
                            case "NumpadEnter": {
                                props.f_writeListNameInBD(ref_inputListName.current.value);
                                ref_inputListName.current.readOnly = true;
                                break;
                            }
                            case "Escape": {
                                ref_inputListName.current.selectionStart = ref_inputListName.current.value.length; // курсор в конец текста, чтобы снять визуальное выделение текста
                                ref_inputListName.current.value = props.itemText; // возвращаем начальное значение
                                updateStateLocal(Math.random());  // перерисовываем элемент без внесения изменений
                                ref_inputListName.current.readOnly = true;
                                break;
                            }
                            case "NumpadEscape": {
                                ref_inputListName.current.selectionStart = ref_inputListName.current.value.length; // курсор в конец текста, чтобы снять визуальное выделение текста
                                ref_inputListName.current.value = props.itemText; // возвращаем начальное значение
                                updateStateLocal(Math.random());  // перерисовываем элемент без внесения изменений
                                ref_inputListName.current.readOnly = true;
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        //e.stopPropagation();
                    }
                }}
            />
            {/* 
            {props.itemText} currentIndexArray= {props.currentIndexArray} activeStatus={String(activeStatusList)}
 */}
            <div
                className="delListMarker"
                onClickCapture={() => { props.m_delClick() }}
            >
                {'\u2718'}
            </div>
        </div>
    )
}
//--------------
function PrivateListMenu() {
    const [, updateState] = useState();
    const [need_LISTS_scrollAfterAddItem, set_need_LISTS_scrollAfterAddItem] = useState(false);
    const my_dispatch = useDispatch();
    const activePrivateListFromRedux = Number(useSelector(mState => mState.m_Redus_ActivePrivListAndItem.currentActivePrivateList));
    let m_ListPrivateMenu;

    useEffect(() => {
        if (need_LISTS_scrollAfterAddItem === true) {
            const m_scroll_ListsBlock = document.getElementById("menu_priv_List_contenner");
            m_scroll_ListsBlock.scrollTop = m_scroll_ListsBlock.scrollHeight;
            set_need_LISTS_scrollAfterAddItem(false);
        }
    }, [need_LISTS_scrollAfterAddItem]);

    if (myTD_BS.length > 0) {
        m_ListPrivateMenu = myTD_BS.map(
            (item, index) => (
                <div className='blockArray' key={item.id_key} >
                    <PrivateListMenuSingleBlock
                        itemText={item.listName}
                        item_ID={item.id_key}
                        currentIndexArray={index}
                        m_onClick={() => handle_ClickPrivateList(index)}
                        activeStatus={(activePrivateListFromRedux === index) ? true : false}

                        m_delClick={() => {
                            my_dispatch(
                                { type: "SET_dialogDeletePrivateList_TRUE" }
                            );
                        }}

                        f_writeListNameInBD={(inputText) => {
                            myTD_BS[index].listName = inputText;
                            updateState(Math.random());
                            saveLocalStorage();
                        }}
                    />
                </div>
            )
        )
    }

    return (
        <div className="privateMenu_ListBlock">

            <div className='menu_priv_List_contenner' id='menu_priv_List_contenner'>
                {m_ListPrivateMenu}
            </div>

            <button className='btn_AddPrivateList'
                onClickCapture={() => {
                    my_dispatch({ type: "SET_currentActivePrivItem", new_currentActivePrivateItem: -1 });
                    myTD_BS.push(
                        {
                            listName: "Новый список",
                            id_key: myRandomId(),
                            newList: [],
                        }
                    )
                    saveLocalStorage();
                    my_dispatch({ type: "SET_currentActivePrivateList", new_currentActivePrivateList: myTD_BS.length - 1 });

                    set_need_LISTS_scrollAfterAddItem(true);
                }}
            >
                Add new list
            </button>

            {/*   По умолчанию эта форма скрытав   */}
            < FormDeletePrivateList />
        </div>
    )

    function handle_ClickPrivateList(newActiveIndexArray) {
        if (activePrivateListFromRedux !== newActiveIndexArray) {
            my_dispatch({ type: "SET_currentActivePrivItem", new_currentActivePrivateItem: -1 })
        }

        my_dispatch({ type: "SET_currentActivePrivateList", new_currentActivePrivateList: newActiveIndexArray });
    }
}
// ---------------------------------------------------
function PrivateListSingleItem(props) {
    const ref_textInput01 = useRef();
    const [, updateStateLocal] = useState();

    return (
        <div
            className={(props.activeItemStatus === true) ? "privateList_SingleItem active_privateList_SingleItem" : "privateList_SingleItem"}

            id={props.singleItem_ID}
            onClick={props.f_itemOnClick}
        >
            <div className="nomPP">{props.index + 1} . </div>

            <div
                className='customCheckbox_01'
                onClickCapture={() => { props.f_CLICK_customCheckbox_01() }}
            >
                <div
                    className={(props.checkBox01_value) ? "markerBlock" : "mDisplayNone"}
                >
                    {'\u2714'}
                </div>
            </div>

            <input
                ref={ref_textInput01}
                type="text"
                readOnly={true}
                className={(props.checkBox01_value) ? "itemText checked_ItemText" : "itemText"}
                defaultValue={props.itemText}
                onDoubleClick={() => {
                    ref_textInput01.current.readOnly = false;
                    ref_textInput01.current.selectionStart = ref_textInput01.current.value.length;
                }}
                onBlur={() => {
                    if (ref_textInput01.current.readOnly === false) {
                        console.log(ref_textInput01.current.value);
                        props.f_writeItemTextInBD(ref_textInput01.current.value);
                        ref_textInput01.current.readOnly = true; //блокировка редактирования
                    }
                }}

                onKeyDownCapture={(e) => {
                    if (ref_textInput01.current.readOnly === false) {
                        console.log(String(e.code));
                        switch (String(e.code)) {
                            case "Enter": {
                                props.f_writeItemTextInBD(ref_textInput01.current.value);
                                ref_textInput01.current.readOnly = true;
                                break;
                            }
                            case "NumpadEnter": {
                                props.f_writeItemTextInBD(ref_textInput01.current.value);
                                ref_textInput01.current.readOnly = true;
                                break;
                            }
                            case "Escape": {
                                ref_textInput01.current.selectionStart = ref_textInput01.current.value.length; // курсор в конец текста, чтобы снять визуальное выделение текста
                                ref_textInput01.current.value = props.itemText; // возвращаем начальное значение
                                updateStateLocal(Math.random());  // перерисовываем элемент без внесения изменений
                                ref_textInput01.current.readOnly = true;
                                break;
                            }
                            case "NumpadEscape": {
                                ref_textInput01.current.selectionStart = ref_textInput01.current.value.length; // курсор в конец текста, чтобы снять визуальное выделение текста
                                ref_textInput01.current.value = props.itemText; // возвращаем начальное значение
                                updateStateLocal(Math.random());  // перерисовываем элемент без внесения изменений
                                ref_textInput01.current.readOnly = true;
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }
                }}
            />

            <div className="comment_is_marker" >
                {(props.comments !== "") ? "..." : ""}
            </div>

            <div className='del_Inem_Button' onClickCapture={() => { props.f_deleteCurrentItem() }} >
                {'\u2718'}
            </div>

        </div>
    )
}
//--------------
// Текущий ToDo список в центральном окне
function CurrentPrivateList() {
    const [, updateState] = useState();
    const [need_ITEM_scrollAfterAddItem, set_need_ITEM_scrollAfterAddItem] = useState(false);
    //const [activeItemIndex, set_activeItemIndex] = useState(-1);
    const my_dispatch = useDispatch();
    const activePrivateListFromRedux = Number(useSelector(mState => mState.m_Redus_ActivePrivListAndItem.currentActivePrivateList));
    const activePrivateItemFromRedux = Number(useSelector(mState => mState.m_Redus_ActivePrivListAndItem.currentActivePrivateItem));

    let m_CurrentPrivateList; // вывод массива со списком
    let currentListName = "Список не выбран";
    //const ref_textComment = useRef();
    const ref_commentsInputRight = useRef();

    console.log("");
    console.log("Из запуска CurrentPrivateList --- activePrivateListFromRedux= " + activePrivateListFromRedux);
    console.log("Из запуска CurrentPrivateList --- activePrivateItemFromRedux= " + activePrivateItemFromRedux);

    useEffect(() => {
        if (need_ITEM_scrollAfterAddItem === true) {
            // пролистываем форму вниз
            const m_ITEM_scrollBlock = document.getElementById("currentPrivateList_block");
            m_ITEM_scrollBlock.scrollTop = m_ITEM_scrollBlock.scrollHeight;
            set_need_ITEM_scrollAfterAddItem(false);
        }
    }, [need_ITEM_scrollAfterAddItem]);

    if (activePrivateListFromRedux >= 0) {

        m_CurrentPrivateList = myTD_BS[activePrivateListFromRedux].newList.map(
            (item, index) => (
                <div className='blockArray' key={item.myToDoID} >
                    <PrivateListSingleItem
                        index={index}
                        checkBox01_value={item.checkBox01}
                        itemText={item.toDoText}
                        comments={item.comments}
                        singleItem_ID={item.myToDoID}
                        activeItemStatus={(index === activePrivateItemFromRedux) ? true : false}
                        f_itemOnClick={() => {
                            // console.log("CLICK ON ITEM: " + index);
                            //set_activeItemIndex(index);
                            my_dispatch({ type: "SET_currentActivePrivItem", new_currentActivePrivateItem: index });
                        }}
                        f_deleteCurrentItem={() => {
                            my_dispatch({ type: "SET_currentActivePrivItem", new_currentActivePrivateItem: -1 });
                            updateState(Math.random());
                            myTD_BS[activePrivateListFromRedux].newList.splice(index, 1);
                        }}
                        f_CLICK_customCheckbox_01={() => {
                            myTD_BS[activePrivateListFromRedux].newList[index].checkBox01 = !(myTD_BS[activePrivateListFromRedux].newList[index].checkBox01); // меняем на противоположное
                            updateState(Math.random());
                            console.log("f_CLICK_customCheckbox_01: " + (myTD_BS[activePrivateListFromRedux].newList[index].checkBox01));
                        }}

                        f_writeItemTextInBD={(inputText) => {
                            myTD_BS[activePrivateListFromRedux].newList[index].toDoText = inputText;
                            updateState(Math.random());
                            saveLocalStorage();
                        }}

                        f_writeItemCommentInBD={(inputText) => {
                            myTD_BS[activePrivateListFromRedux].newList[index].comments = inputText;
                            updateState(Math.random());
                            saveLocalStorage();
                        }}
                    />

                </div>
            )
        )
    }
    else {
        m_CurrentPrivateList = "To-do list is empty";
    }

    return (
        <div className="currentPrivateList">

            <FormAddPrivateItem f_need_ITEM_scrollAfterAddItem={() => {
                set_need_ITEM_scrollAfterAddItem(true);
                console.log("Был вызван updateState");
            }} />

            <div className="privListBlock">
                <div className="privListBlock_left">

                    <div className='listNameBlock'>
                        <div className='listNameInfo'>
                            {
                                ((activePrivateListFromRedux >= 0) ? myTD_BS[activePrivateListFromRedux].listName : "")
                            }
                        </div>
                    </div>

                    <div className='currentPrivateList_block' id='currentPrivateList_block'>
                        {m_CurrentPrivateList}
                    </div>
                </div>

                <div className="privListBlock_right">

                    <div className='privListBlock_right_SUB_LEFT'>
                        <div className="commentHeader">
                            {((activePrivateListFromRedux >= 0) && (activePrivateItemFromRedux >= 0)) ?
                                (activePrivateItemFromRedux + 1) + ". " +
                                myTD_BS[activePrivateListFromRedux].newList[activePrivateItemFromRedux].toDoText : ""
                            }
                        </div>

                        <textarea
                            className="commentsInputRight"
                            ref={ref_commentsInputRight}
                            type="text"
                            //maxLength={20}
                            disabled={(activePrivateItemFromRedux >= 0) ? false : true}
                            value={(activePrivateItemFromRedux < 0) ? "" : myTD_BS[activePrivateListFromRedux].newList[activePrivateItemFromRedux].comments}
                            onChange={() => {
                                console.log(ref_commentsInputRight.current.value);
                                myTD_BS[activePrivateListFromRedux].newList[activePrivateItemFromRedux].comments = ref_commentsInputRight.current.value;
                                updateState(Math.random());
                            }}
                        >
                        </textarea>

                    </div>

                    <div className='privListBlock_right_SUB_RIGHT'>
                        <div className="dopInfoZaglav">
                            Comments
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
//----------------------------

// Название списка List перед списком  ToDo
function ListNameInfo(props) {

    const activePrivateListFromRedux = Number(useSelector(mState => mState.m_Redus_ActivePrivListAndItem.currentActivePrivateList));
    return (
        <div className='listNameInfo'>
            <div> Текущий список: </div>
            <div>
                {myTD_BS[activePrivateListFromRedux].ListNameInfo}
            </div>
        </div>
    )
}
//----------------------------

function FormAddPrivateItem(props) {
    const [isDisabledButtonOk, set_isDisabledButtonOk] = useState(true);
    const ref_inputText = useRef();
    const ref_Button_Ok = useRef();
    const my_dispatch = useDispatch();
    const activePrivateListFromRedux = Number(useSelector(mState => mState.m_Redus_ActivePrivListAndItem.currentActivePrivateList));

    useEffect(() => {
        ref_inputText.current.value = "";
    }, [activePrivateListFromRedux]  // при изменении activePrivateListFromRedux
    );

    return (
        <div
            className='formNewItemPrivate'
            tabIndex={-1}
        >

            <div className='newItemPrivateContent' tabIndex={-1} >
                <div className='m_note'> Add ToDo item: </div>
                <input
                    ref={ref_inputText}
                    className='inputNewItems'
                    type="text"
                    disabled={(activePrivateListFromRedux >= 0) ? false : true}
                    onInputCapture={() => {
                        (ref_inputText.current.value === "") ? set_isDisabledButtonOk(true) : set_isDisabledButtonOk(false);
                        console.log("ref_inputText.current.value = " + ref_inputText.current.value);
                    }}

                    onKeyDownCapture={(e) => {
                        if (ref_inputText.current.value !== "") {
                            console.log(String(e.code));
                            switch (String(e.code)) {
                                case "Enter": {
                                    addNewItemPrivate();
                                    set_isDisabledButtonOk(true);
                                    break;
                                }
                                case "NumpadEnter": {
                                    addNewItemPrivate();
                                    set_isDisabledButtonOk(true);
                                    break;
                                }
                                case "Escape": {
                                    ref_inputText.current.value = "";
                                    set_isDisabledButtonOk(true);
                                    break;
                                }
                                case "NumpadEscape": {
                                    ref_inputText.current.value = "";
                                    set_isDisabledButtonOk(true);
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                    }}
                />

                <button
                    ref={ref_Button_Ok}
                    disabled={isDisabledButtonOk}
                    tabIndex={-1}
                    onClick={() => {
                        addNewItemPrivate();
                        set_isDisabledButtonOk(true);
                    }} > --- Ok --- </button>

            </div>
        </div>
    )

    function addNewItemPrivate() {
        console.log("--- Ok --- CLICK");
        let newItemText = ref_inputText.current.value;
        ref_inputText.current.value = "";

        myTD_BS[activePrivateListFromRedux].newList.push(
            {
                myToDoID: myRandomId(),
                timeOfUpdate: Date.now(),
                toDoText: newItemText,
                checked: false,
                deleted: false,
                comments: "",
            }
        )
        saveLocalStorage();

        my_dispatch({ type: "SET_currentActivePrivItem", new_currentActivePrivateItem: myTD_BS[activePrivateListFromRedux].newList.length - 1 });

        // пролистываем форму вниз после добавления записи
        props.f_need_ITEM_scrollAfterAddItem();
    }
}
//----------------------------

function FormDeletePrivateList() {
    const my_dispatch = useDispatch();
    const isActive_dialogDeletePrivateList = (useSelector(mState => mState.m_Redus_dialogDeletePrivateList.isActive_dialogDeletePrivateList));
    const activePrivateListFromRedux = Number(useSelector(mState => mState.m_Redus_ActivePrivListAndItem.currentActivePrivateList));
    const [, updateState] = useState();
    const ref_delForm = useRef();

    console.log(' ');
    console.log("Из функции чтения диспатч: isActive_dialogDeletePrivateList= " + isActive_dialogDeletePrivateList
    );

    useEffect(() => {
        ref_delForm.current.focus();
    })

    return (
        <div className={(isActive_dialogDeletePrivateList === true) ? "universalDialogForm" : "mDisplayNone"} >

            <div
                className='sub_universalDialogForm'
                ref={ref_delForm}
                tabIndex={9999} // назначаем tabIndex, чтобы иметь возможность присвоить в дальнейшем фокус этому блоку
                onKeyDown={(e) => {
                    console.log(String(e.code));
                    switch (String(e.code)) {
                        case "Enter": {
                            deleteCurrentPrivateList();
                            my_dispatch({ type: "SET_dialogDeletePrivateList_FALSE" });
                            break;
                        }
                        case "NumpadEnter": {
                            deleteCurrentPrivateList();
                            my_dispatch({ type: "SET_dialogDeletePrivateList_FALSE" });
                            break;
                        }
                        case "Escape": {
                            my_dispatch({ type: "SET_dialogDeletePrivateList_FALSE" })
                            break;
                        }
                        case "NumpadEscape": {
                            my_dispatch({ type: "SET_dialogDeletePrivateList_FALSE" })
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }}
            >

                <div> Delete the current list </div>
                <div>
                    " {(activePrivateListFromRedux >= 0) ? (myTD_BS[activePrivateListFromRedux].listName) : ""} "
                </div>

                <div>
                    which includes {(activePrivateListFromRedux >= 0) ? (myTD_BS[activePrivateListFromRedux].newList.length) : ""} items?
                </div>

                <button onClickCapture={() => {
                    deleteCurrentPrivateList();
                    my_dispatch({ type: "SET_dialogDeletePrivateList_FALSE" });
                }}   >
                    --- Delete ---
                </button>

                <button onClickCapture={() => {
                    my_dispatch({ type: "SET_dialogDeletePrivateList_FALSE" })
                }}
                >
                    --- Cancel ---
                </button>

            </div>
        </div>
    )


    function deleteCurrentPrivateList() {
        let deleteIndex = activePrivateListFromRedux;
        myTD_BS.splice(deleteIndex, 1);
        saveLocalStorage();
        let newActiveList = (((myTD_BS.length - 1) >= deleteIndex) ? (deleteIndex) : (deleteIndex - 1));
        // перерисовываем обновленный список методом обнуления текущего списка в меню :
        my_dispatch({ type: "SET_currentActivePrivateList", new_currentActivePrivateList: -1 });

        // назначаем newActiveList
        my_dispatch({ type: "SET_currentActivePrivateList", new_currentActivePrivateList: newActiveList });
        my_dispatch({ type: "SET_currentActivePrivItem", new_currentActivePrivateItem: -1 });
    }
}

//----------------------------

export { PrivateListMenu, CurrentPrivateList, };

