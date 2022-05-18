import { createStore, combineReducers } from "redux";

import { reduser_ActivePrivListAndItem, reduser_dialogDeletePrivateList } from "./reduserPrivate.js";
import { reduser_select_Priv_or_Bis, } from "./reduserMain.js";

// --------------------------------------
// все редюсеры
const all_redusers = combineReducers(
    {
        // редюсеры можно передавать просто списком, а можно структурой "ключ: значение"
        m_Redus_ActivePrivListAndItem: reduser_ActivePrivListAndItem,
        m_Redus_dialogDeletePrivateList: reduser_dialogDeletePrivateList,
        m_Redus_select_Priv_or_Bis: reduser_select_Priv_or_Bis,
    }
)

// экспортируем все сторы для их передачи в главный файл приложения
const globStore = createStore(all_redusers);
export { globStore };





