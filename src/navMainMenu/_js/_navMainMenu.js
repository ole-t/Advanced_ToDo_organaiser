export {activateMainMenu ,f_activateMainMenu, f_deActivateMainMenu}

let activateMainMenu=false;


function f_activateMainMenu() {
    console.log(" ");
    activateMainMenu=true;  
    let m_elem= document.getElementById('navMainMenu');
    m_elem.classList.add('hoverActivate');  
    console.log("activateMainMenu= "+activateMainMenu);
    
}

function f_deActivateMainMenu() {
    console.log(" ");
    activateMainMenu=false;
    document.getElementById('navMainMenu').classList.remove('hoverActivate');  
    console.log("activateMainMenu= "+activateMainMenu);
}

