
const default_ActivePrivListAndItem = {
    currentActivePrivateList: -1,
    currentActivePrivateItem: -1,
}

const reduser_ActivePrivListAndItem = (
    my_state = default_ActivePrivListAndItem,
    my_action) => {

    //console.clear();
    console.log("Из диспатч - new_currentActivePrivateList= " + my_action.new_currentActivePrivateList);

    console.log("Из диспатч - new_currentActivePrivateItem= " + my_action.new_currentActivePrivateItem);

    switch (my_action.type) {

        case "SET_currentActivePrivateList":
            // вырашение ниже работает и без троеточия, а также без выражения "...state," - в случае, когда состояние state представлено отдельной переменной, а не структурой данных
            // в данном случае три точки перед "state"  (...my_state) - необходимы потому, что стейт представляет структуру данных, и нам нежно не перезаписать всю структуру целиком, а только заменить в этой структуре отделльную переменную
            return { ...my_state, currentActivePrivateList: my_action.new_currentActivePrivateList }

        case "SET_currentActivePrivItem":
            // вырашение ниже работает и без троеточия, а также без выражения "...state," - в случае, когда состояние state представлено отдельной переменной, а не структурой данных
            // в данном случае три точки перед "state"  (...my_state) - необходимы потому, что стейт представляет структуру данных, и нам нежно не перезаписать всю структуру целиком, а только заменить в этой структуре отделльную переменную
            return { ...my_state, currentActivePrivateItem: my_action.new_currentActivePrivateItem }

        default: return my_state;
    }
}

// --------------------------------

const reduser_dialogDeletePrivateList = (isActive_dialogDeletePrivateList = false, my_action) => {
    switch (my_action.type) {
        case "SET_dialogDeletePrivateList_TRUE":
            return { isActive_dialogDeletePrivateList: true }

        case "SET_dialogDeletePrivateList_FALSE":
            return { isActive_dialogDeletePrivateList: false }

        default: return isActive_dialogDeletePrivateList;
    }
}

// --------------------------------
// --------------------------------

export { reduser_ActivePrivListAndItem, reduser_dialogDeletePrivateList }



