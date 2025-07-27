//console.dir(document); //shows all the properties, methods inside the <!DOCTYPE html>

/*
 * var = global variable declaration
 * let = accessible only to its function scope
 * const = fixed variable value
 * localStorage - saves data indefinitely until explicitly deleted
 */

//GLOBAL VARIABLES DECLARATION
const html_body = document.querySelector('body');
const main_header = document.querySelector('#main-header');
const navbar = document.querySelector('nav');
const main_section = document.querySelector('section');
const main_footer = document.querySelector('#main-footer');

const footerEnd = main_footer.querySelector('.footer-end');
/*****/

//FUNCTIONS

//retain theme on load
document.addEventListener("DOMContentLoaded",function(){
    const setMode = localStorage.getItem("mode"); //for UI theme
    const i_switchMode = localStorage.getItem("iconSwitch"); //for toggle icon state
        
    //update changes accordingly
    toggleMode(setMode);    
    
    //retain icon state
    let toggleIcon = navbar.querySelector("#toggle-icon i");
    
    if(i_switchMode === "on"){
        //switch icon to 'on'
        toggleIcon.classList.add("fa-toggle-on");
        toggleIcon.classList.remove("fa-toggle-off");
    }else{
        //switch icon to 'off'
        toggleIcon.classList.add("fa-toggle-off");
        toggleIcon.classList.remove("fa-toggle-on");
    } 
});

//toggle theme icon
navbar.querySelector("#toggle-icon").addEventListener("click",function(event){

    event.preventDefault(); //prevent page reload
    
    //check which element was clicked
    let i_icon = event.target;
    
    //if <a> or <li> was clicked, find the <i> inside it
    if (i_icon.tagName.toLowerCase() !== 'i') {
        i_icon = event.target.querySelector('i');
    }
    
    //if <i> was clicked or found, change its class name
    if (i_icon.tagName.toLowerCase() == 'i'){
        i_icon.classList.toggle("fa-toggle-off");
        i_icon.classList.toggle("fa-toggle-on");        
    }
    
    let mode = i_icon.classList.contains("fa-toggle-on") ? "dark" : "light";

    let iconSwitch = i_icon.classList.contains("fa-toggle-on") ? "on" : "off";
    
    //update changes accordingly
    toggleMode(mode);   
    
    //save toggle mode for UI theme
    localStorage.setItem("mode",mode);
    //save toggle icon state
    localStorage.setItem("iconSwitch",iconSwitch);    
});

//mode is funciton's parameter
function toggleMode(mode){
    
    //mode = toggle

    const arrTags = [html_body,main_header,navbar,main_footer,footerEnd];   
    let arrColor = ["white","black"];
    let brdrColor = "2px solid black";
    
    if(mode==="dark"){
        arrColor = ["black","white"];
        brdrColor = "2px solid red";
    }else{
        arrColor = ["white","black"];
        brdrColor = "2px solid black";
    }
       
    for(let i=0; i<arrTags.length; i++){
        
        arrTags[i].style.backgroundColor = arrColor[0];
        arrTags[i].style.color = arrColor[1];
        
        if(arrTags[i]===navbar || arrTags[i]===footerEnd){            
            arrTags[i].style.borderBlock = brdrColor;          
        }
        if(arrTags[i]===main_footer){
            arrTags[i].style.borderTop = brdrColor;  
        } 
        
        if(mode!="dark"){          
            if(arrTags[i]===main_header || arrTags[i]===navbar || arrTags[i]===main_footer || arrTags[i]===footerEnd){
                arrTags[i].style.backgroundColor = "#FAF9F6";
                arrTags[i].style.color = arrTags[1];
                
                if(arrTags[i]===main_footer){
                    arrTags[i].style.borderTop = "none";    
                }
            }
        }
    }
    
    //selects all a in the navbar
    const navlist = navbar.querySelectorAll('a');   
    toggleMode_1(mode,navlist);
    
    //tricky, added to ensure functional and uniformed theme
    if(!(window.location.toString().includes("playground"))){
    
        //selects all img and button in main_section
        let descImg = main_section.querySelectorAll('img');
        let btn = main_section.querySelectorAll('button');

        let arrImgs = ["img/cpp.png","img/r.png","img/sql.png"];    
        let imgBorder = "none";
        let imgRadius = "none";          
        let btnBgColor = "white";

        if(mode==="dark"){
            arrImgs = ["img/cpp_dark1.png","img/r_dark1.png","img/sql_dark1.png"];
            imgBorder = "2px solid red";
            imgRadius = "50%";        
            btnBgColor = "transparent";
        }else{
            arrImgs = ["img/cpp.png","img/r.png","img/sql.png"];
            imgBorder = "none";
            imgRadius = "none";         
            btnBgColor = "white";
        }

        for(let i=0; i<arrImgs.length; i++){
            descImg[i].src = arrImgs[i];
            descImg[i].style.border = imgBorder;
            descImg[i].style.borderRadius = imgRadius;
        }

        for(let i=0; i<btn.length; i++){
            btn[i].style.backgroundColor = btnBgColor;
        }
    }
    
    //selects all a in the main_footer
    const footerlist = main_footer.querySelectorAll('a');   
    toggleMode_1(mode,footerlist);
       
}

function toggleMode_1(mode,element){
    
    txtColor = "black";
    bgColor = "transparent";   
    
    if(mode==="dark"){
        txtColor = "white";
        bgColor = "transparent";
    }else{
        txtColor = "black";
        bgColor = "transparent";        
    }
    
    for(let i=0; i<element.length; i++){
        
        element[i].style.color = txtColor;
        element[i].style.backgroundColor = bgColor;
            
        //hover effect
        element[i].addEventListener('mouseenter', function(event) {
            
            if (mode==="dark"){
                txtColor = "red";
                bgColor = "black";
            }else{
                txtColor = "white";
                bgColor = "#36454F";                
            }

            event.target.style.color = txtColor;
            event.target.style.backgroundColor = bgColor;            
            
        });
        element[i].addEventListener('mouseleave', function(event) {

            if (mode==="dark"){
                txtColor = "white";
                bgColor = "black";
            }else{
                txtColor = "black";
                bgColor = "#FAF9F6";                
            }

            event.target.style.color = txtColor;
            event.target.style.backgroundColor = bgColor;    
            
        });          
    }
}

const main_sect_button = main_section.querySelectorAll('.button');
main_sect_button.forEach(sect_button=>{
    sect_button.addEventListener("click",()=>{
        if(sect_button.id === "btn-cpp"){
            alert("Visit: https://pmccc-profile.github.io/bne-dev-test-phase/ to check the ongoing development");
        }else{
            alert("A work in progress.");
        }
    });
});
