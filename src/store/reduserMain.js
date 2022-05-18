
// --------------------------------------
const default_priv_bis_select = {
    select_priv_bis: "priv",
}

const reduser_select_Priv_or_Bis = (my_state = default_priv_bis_select, my_action) => {
    switch (my_action.type) {

        case "SET_select_priv_bis":
            console.clear();
            console.log("Из диспатч - select_priv_bis= " + my_action.select_Priv_or_Bis);
            return { my_state, select_priv_bis: my_action.select_Priv_or_Bis };
        default: return my_state;
    }
}

export { reduser_select_Priv_or_Bis, }