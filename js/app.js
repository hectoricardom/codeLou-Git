
var _root = null;
var index = 0;
var animatinClass = '';
var scroll  = 0;
var indexB = 0;
var slideOpen = false;
var lastIndexSld = 0;
var lastIndexScroll = 0;
var listH = [];
var totalHeight = 0;
var paddingT = 250;
var dark = true;
var isMobile = 750;


/********************************** TOOGLE DARK-LIGHT THEME STYLE **********************************************/


function changetheme(e) {   
    var bdy = document.getElementsByTagName('body')[0];
    if(dark){
        dark = false;
        let style = `--tip__card--p-color--:#777;--color-logo_:#333;--color-base--hover:#e91e63;--background--color: #f5f5f5;--colorText_: #263238;--icon--color_: #b0bec5;--tip__card--backgropund-Color--:#fff;--tab--nav-Color--:#92989b;--fill--theme--color:#666;`;
        bdy.style = style;
    }else{
        dark = true;
        let style = `--tip__card--p-color--:#aaaaaa;--color-logo_:#fff;--color-base--hover:#e91e63;--background--color: #263238;--colorText_: #f5f5f5;--icon--color_: #b0bec5;--tip__card--backgropund-Color--:#444;--tab--nav-Color--:#fff;--fill--theme--color:#f5f5f5;`;
        bdy.style = style;
    }    
}




/********************************** UPDATE SLIDE TECHNOLOGY INDEX AND RENDERING THE COMPONENTS **********************************************/


function nextSlide(e) {  
    var ls = document.querySelectorAll('[data-index]');
    var i = 0;
    if(ls.length-1===index){
        i = 0;
    }else{
        i = index+1;
    }
    ls[index].setAttribute("class",``);
    ls[i].setAttribute("class",`active`);
    index = i;    
}

function prevSlide(e) {
    var ls = document.querySelectorAll('[data-index]');
    var i = 0;
    if(0===index){
        i = ls.length-1;
    }else{
        i = index - 1;
    }
    ls[index].setAttribute("class",``);
    ls[i].setAttribute("class",`active`);
    index = i;
}





function updSlide(e) {
    var i = e
    if(e.target){ 
        var td = e.target && e.target.getAttribute("sprite-index");
        i = td && parseInt(td);
    }
    if(i+1){
        var sprit = document.querySelectorAll('[sprite-index]');    
        var ls = document.querySelectorAll('[data-index]');
        ls[index].setAttribute("class",``);
        ls[i].setAttribute("class",`active`);
        sprit[index].setAttribute("class",``);
        sprit[i].setAttribute("class",`active`);
        index = i;
    }
}



/********************************** TOGGLE SLIDEMENU  **********************************************/



function openSlideMenu(e) {
    var SlideMenu  = document.getElementById('SlideMenu');
    var overlay  = document.getElementById('overlay');
    if(slideOpen){
        slideOpen = false;
        SlideMenu.style.opacity=0;
        SlideMenu.style.transform=`translate3d(-110%, 0, 0)`;
        overlay.style.visibility='hidden';
    }
    else{
        slideOpen = true;
        SlideMenu.style.opacity=1;
        overlay.style.visibility='visible';
        SlideMenu.style.transform=`translate3d(0, 0, 0)`;
    }
}




/**********************************  NAV TABS AND INDICATOR BAR  **********************************************/


function changeIndexTab(e) {
    var Ind = null;  
    var ls = document.querySelectorAll('[data-item]');  
    if(e.target){       
        for(let tb in ls){
            let hh = ls[tb];
            if(hh && hh.parentNode && hh.contains(e.target)){ 
                var td = hh.getAttribute("data-item");
                var s = td && parseInt(td);
                Ind = s;
            }
        }
    }else{
        Ind = e;
    }
    if(Ind>=0 && indexB !== Ind){
        var els = document.querySelectorAll('[aria-labelledby]');
        ls[indexB].setAttribute("class",`center_Tab_Nav_Item`);
        ls[Ind].setAttribute("class",`center_Tab_Nav_Item is-active`);        
        tabIndicator(Ind)
        els[indexB].setAttribute("aria-hidden",`true`);
        els[Ind].setAttribute("aria-hidden",`false`);
        indexB = Ind;
        if(window.outerWidth<isMobile){
            var ttab = ((isMobile-window.outerWidth)/16)+55;
            scroll2(ttab)
        }
    }    
}

function tabIndicator(i){
    var ls = document.querySelectorAll('[data-item]'); 
    var sprite  = document.getElementById('c-tabs-nav__indicator');
    sprite.style.left = `${ls[i].getBoundingClientRect().width*i}px`;
    sprite.style.width = `${ls[i].getBoundingClientRect().width}px`;  
}



function tabNavIndicator(s){
    var listTabH = [],  sumTH=0;       
    var els = document.querySelectorAll('[tab-index]');
    for(let ss in els){
        let hh = els[ss];       
        if(hh.parentNode){            
            listTabH.push({l:sumTH,w:hh.getBoundingClientRect().width});
            sumTH+=hh.getBoundingClientRect().width;
        }      
    }
    var elsD = document.querySelectorAll('[tab-slide-index]');
    elsD[lastIndexScroll].style.color='#92989b';
    elsD[lastIndexScroll].style.fontWeight= 'normal';
    if(elsD[s]){
        elsD[s].style.color='var(--color-base--hover)';
        elsD[s].style.fontWeight= 600;
    }    
    let navsprite  = document.getElementById('header-tabs-nav__indicator');
    if(navsprite){
        navsprite.style.left = `${listTabH[s].l}px`; 
        navsprite.style.width = `${listTabH[s].w}px`;
    }
}


/********************************** RECALCULATE SECTION HEIGHT  **********************************************/



function reCalcSection(){
    listH = [];
    var sumH=0;
    var sctlist = document.getElementsByTagName('section');
    for(var ss in sctlist){
        var hh = sctlist[ss];       
        if(hh.parentNode){ 
            var lastS = sumH;
            sumH+=hh.getBoundingClientRect().height;
            listH.push({s:lastS,e:sumH});
        }      
    }
}






/********************************** SCROLL 2 SECTION BY HEIGHT  **********************************************/




function ScrollIntoView(e,b) {
    var s = e;    
    if(e.target){
        var td = e.target && e.target.getAttribute("tab-index");
        s = td && parseInt(td);
    }
    if(s>=0){
        tabNavIndicator(s);     
        lastIndexScroll = s;
        reCalcSection();
        if(!b){
            totalHeight = (listH[listH.length-1].e/2)+paddingT;
            let rtop = listH[s].s/2;
            if(rtop>=0){
                scroll2(rtop)
            }
        }
    }
}   


function ScrollIntoViewSlideM(e) {
    var td = e.target && e.target.getAttribute("tab-slide-index");
    var s = td && parseInt(td);
    var b =false;
    if(s>=0){
        tabNavIndicator(s);     
        lastIndexScroll = s;
        reCalcSection();
        if(!b){
            totalHeight = (listH[listH.length-1].e/2)+paddingT;
            let rtop = listH[s].s/2;
            if(rtop>=0){
                scroll2(rtop);
                openSlideMenu();
            }
        }
    }
} 




function setBodyheight() {
    reCalcSection();
    totalHeight =  (listH[listH.length-1].e/2)+paddingT;
    _root.style.height = totalHeight+'px';
}




/********************************** ACTION EVENTS  **********************************************/

function scrollEvent() {
    scroll  =  window.pageYOffset || document.documentElement.scrollTop; 
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    if(totalHeight>scroll+windowHeight){         
        _root.style.transform = `translate3d(0px,-${scroll}px,0)`; 
        _root.style['transition-duration'] = animatinClass;
        var rt = scroll*2 + 20;
        for(var sp in listH){
            if(rt<listH[sp].e && rt>=listH[sp].s){    
                ScrollIntoView(sp*1,true)
            } 
        }
    }    
    IsInViewport()
}


function resizeEvent(e) {
    if(lastIndexScroll==0){
        if(window.outerWidth<isMobile){
            var ttab = ((isMobile-window.outerWidth)/16)+55;
            scroll2(ttab)
        }
    }
    tabIndicator(indexB)
    tabNavIndicator(lastIndexScroll)
    setBodyheight()
}


function scroll2(s){    
    var t2t = s;
    if(s.target){
        t2t = 0;
    }
    animatinClass = `.52s`;
    setTimeout(()=>{
        _root.style.transform = `translate3d(0px,-${t2t}px,0)`;
        _root.style['transition-duration'] = animatinClass;
        window.scrollTo(0,t2t);
        setTimeout(()=>{
            animatinClass = `.0002s`;
        },500)       
    },5)
}




/********************************** IN VIEW PORT   **********************************************/

function IsInViewport(){
    var els = document.querySelectorAll('[is-in-viewport=false]');
    for(var ss =0;ss<els.length;ss++){
        if(isAnyPartOfElementInViewport(els[ss])){
            els[ss].setAttribute("is-in-viewport",true);
        }else{
            //els[ss].setAttribute("is-in-viewport",false);           
        }  
    }
}



function isAnyPartOfElementInViewport(el) {        
    const rect = el.getBoundingClientRect();    
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    return (vertInView && horInView);
}


/********************************** LOADING APP  **********************************************/






function loadApp(){
    _root = document.getElementById("root");
    changetheme();
    document.addEventListener('scroll',scrollEvent);
    window.addEventListener('resize',resizeEvent); 

        /********************************** CLICK EVENTS  **********************************************/

    var tab_nav_index = document.querySelectorAll('[tab-index]'); 
    for(let tb in tab_nav_index){
        let hh = tab_nav_index[tb];
        if(hh && hh.parentNode){ 
            hh.addEventListener('click',ScrollIntoView);
        }
    }

    var tab_slide_index = document.querySelectorAll('[tab-slide-index]');
    for(let tb in tab_slide_index){
        let hh = tab_slide_index[tb];
        if(hh && hh.parentNode){
            hh.addEventListener('click',ScrollIntoViewSlideM);
        }
    }

    var sprite_index = document.querySelectorAll('[sprite-index]');    
    for(let sprt in sprite_index){
        let hh = sprite_index[sprt];
        if(hh && hh.parentNode){ 
            hh.addEventListener('click',updSlide);
        }
    }

    var open_slides = document.querySelectorAll('[open-slide]');
    for(let sprt in open_slides){
        let hh = open_slides[sprt];
        if(hh && hh.parentNode){ 
            hh.addEventListener('click',openSlideMenu);
        }
    }

    var data_item_index = document.querySelectorAll('[data-item]');  
    for(let tb in data_item_index){
        let hh = data_item_index[tb];
        if(hh && hh.parentNode){ 
            hh.addEventListener('click',changeIndexTab);
        }
    }

    var logo2top = document.getElementById('2logo2top');
    logo2top.addEventListener('click',scroll2); 

    var changethemebtn = document.getElementById('changetheme');
    changethemebtn.addEventListener('click',changetheme);

    var prevSlidebtn = document.getElementById('prevSlide');
    prevSlidebtn.addEventListener('click',prevSlide);
    
    var nextSlidebtn = document.getElementById('nextSlide');
    nextSlidebtn.addEventListener('click',nextSlide); 

        /********************************** INITIALIZING FUNCTIONS  **********************************************/

    changeIndexTab(indexB)
    tabIndicator(indexB)
    reCalcSection();
    setBodyheight(); 
    IsInViewport(); 
    
}
