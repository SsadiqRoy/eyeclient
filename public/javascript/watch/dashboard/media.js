var e=require("axios");function t(e,t,a,r){Object.defineProperty(e,t,{get:a,set:r,enumerable:!0,configurable:!0})}function a(e){return e&&e.__esModule?e.default:e}var r=globalThis,i={},n={},s=r.parcelRequiree8ef;null==s&&((s=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return i[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},r.parcelRequiree8ef=s);var o=s.register;o("huFZ7",function(e,a){t(e.exports,"initialLoad",()=>l),t(e.exports,"pageLoad",()=>d),t(e.exports,"search",()=>c),t(e.exports,"filter",()=>u),t(e.exports,"softUpdate",()=>p);var r=s("8oD3Q"),i=s("hXBCr"),n=s("0RIFc");async function o({url:e,containerid:t,card:a,args:s,aftercall:o,toMetaMain:l=!1,scroll:d=!1}){try{let c=document.getElementById(t),{data:u,meta:p}=await (0,r.getFull)(e);if((0,n.querMeta)(p),l&&(0,n.querMetaMain)(p),!p.length)return(0,n.noSearchContent)(t,"No results found"),o&&o({data:u,meta:p,card:a,args:s,containerid:t});c.innerHTML="",u.forEach(e=>c.insertAdjacentHTML("beforeend",i[a](e,...s))),function(e,t="meta"){let{total:a,limit:r,page:i,available:s}=(0,n.querMeta)(void 0,t),o=`
  <div class="center-element-2 form-7 np-buttons" style='margin: 4rem 0;'>
    <span class="tag tag-primary tag-button np-button ${i>1?"":"display-off"}" data-direction="prev"><i class="fas fa-angle-left np-button"></i>prev</span>
    <span class="tag">${i}/${Math.ceil(a/r)}</span>
    <span class="tag tag-primary tag-button np-button ${s?"":"display-off"}" data-direction="next">next <i class="fas fa-angle-right np-button"></i></span>
  </div>`,l=document.getElementById(e).parentElement,d=l.querySelector(".np-buttons");d&&l.removeChild(d),l.insertAdjacentHTML("beforeend",o)}(t),d&&c.parentElement.scrollTo({top:0,behavior:"smooth"}),o&&o({data:u,meta:p,card:a,args:s,containerid:t})}catch(e){(0,n.displayError)(e)}}function l({containerid:e,url:t,card:a,args:r=[]}){(0,n.loadingContent)(e),o({url:t,containerid:e,card:a,args:r,toMetaMain:!0})}function d({containerid:e,url:t,card:a,args:r=[],aftercall:i}){document.querySelector("body").addEventListener("click",s=>{if(!s.target.classList.contains("np-button"))return;let{direction:l}=s.target.closest("span").dataset,d=(0,n.querMeta)();d.page="next"===l?d.page+1:d.page-1,o({url:t+(0,n.stringifyQuery)(d),containerid:e,card:a,args:r,scroll:!0,aftercall:i})})}function c({containerid:e,url:t,card:a,formid:r,args:i=[],tagsid:s,tagclass:l,aftercall:d}){let c=document.getElementById(r),[u,p]=t.split("?"),m=p?(0,n.parseQuery)("?"+p):void 0;c.addEventListener("submit",t=>{t.preventDefault();let{value:r}=c.querySelector("input"),p=(0,n.querMetaMain)(),f=m?(0,n.stringifyQuery)({...m,search:r}):(0,n.stringifyQuery)({search:r});r||(f=m?{...m,...p}:p),r.startsWith("??")&&(f=(0,n.stringifyQuery)((0,n.parseQuery)(r.slice(1)))),p.fields&&(f.fields=p.fields);let g=d;s&&l&&(g=e=>{document.getElementById(s).querySelectorAll(`.${l}`).forEach(e=>e.classList.remove("tag-primary")),d&&d(e)}),o({url:u+f,containerid:e,card:a,args:i,aftercall:g})})}function u({containerid:e,url:t,card:a,selectid:r,tagsid:i,args:s=[],aftercall:l,tagclass:d}){let c=document.getElementById(r),u=document.getElementById(i),[p,m]=t.split("?"),f=m?(0,n.parseQuery)("?"+m):void 0;c&&c.addEventListener("change",()=>{if("reset"===c.value){(0,n.querMetaMain)(),o({url:p+(0,n.stringifyQuery)((0,n.querMetaMain)()),containerid:e,card:a,args:s,aftercall:l});return}let r=(0,n.mergeQueries)((0,n.querMeta)(),(0,n.parseQuery)(c.value),["order"]);r=m?{...f,...r}:r,o({url:t+(r=(0,n.stringifyQuery)(r)),containerid:e,card:a,args:s,aftercall:l})}),u&&d&&u.addEventListener("click",t=>{let r=t.target;if(!r.classList.contains(d))return;let i=(0,n.querMeta)(),c=r.classList.contains("tag-primary");if("reset"===r.dataset.filter){function m(e){u.querySelectorAll(`.${d}`).forEach(e=>e.classList.remove("tag-primary")),l&&l(e)}(0,n.querMetaMain)(),o({url:p+(0,n.stringifyQuery)((0,n.querMetaMain)()),containerid:e,card:a,args:s,aftercall:m});return}let f=(0,n.parseQuery)(r.dataset.filter),g=Object.keys(f)[0],y={};function m(e){r.classList.toggle("tag-primary"),l&&l(e)}c?(i[g]=i[g].split(",").filter(e=>e!==f[g]).join(","),i[g]||delete i[g],y=i):y=(0,n.mergeQueries)(i,f,[g]),o({url:p+(y=(0,n.stringifyQuery)(y)),containerid:e,card:a,args:s,aftercall:m})})}function p(e,t="media"){let a=document.getElementById(e);if(!a)return;let i={media:"/media/soft",episode:"/media/episode/soft"};a.addEventListener("click",async()=>{(0,n.rotateBtn)(e);let{id:a}=(0,n.parseQuery)(window.location.search);try{let s=await (0,r.patchFull)(i[t],{id:a});(0,n.alertResponse)(s.message),(0,n.stopRotateBtn)(e),window.setTimeout(()=>window.location.reload(),3e3)}catch(t){console.log(t),(0,n.displayError)(t,e)}})}}),o("8oD3Q",function(r,i){t(r.exports,"getFull",()=>o),t(r.exports,"postSimple",()=>l),t(r.exports,"postFull",()=>d),t(r.exports,"patchFull",()=>c),t(r.exports,"deleteRequest",()=>u);var n=s("4kZWU");async function o(t,r="api"){try{return t="api"===r?`${n.api_url}${t}`:r,(await a(e)({method:"GET",withCredentials:!0,url:t})).data}catch(e){throw e.response?e.response.data:e}}async function l(t,r,i="api"){try{return t="api"===i?`${n.api_url}${t}`:i,(await a(e)({method:"POST",url:t,data:r,withCredentials:!0})).data.data}catch(e){throw e.response?e.response.data:e}}async function d(t,r,i="api"){try{return t="api"===i?`${n.api_url}${t}`:i,(await a(e)({method:"POST",url:t,data:r,withCredentials:!0})).data}catch(e){throw e.response?e.response.data:e}}async function c(t,r,i="api"){try{return t="api"===i?`${n.api_url}${t}`:i,(await a(e)({method:"PATCH",url:t,data:r,withCredentials:!0})).data}catch(e){throw e.response?e.response.data:e}}async function u(t,r="api"){try{return t="api"===r?`${n.api_url}${t}`:r,(await a(e)({method:"DELETE",url:t,withCredentials:!0})).data}catch(e){throw e.response?e.response.data:e}}}),o("4kZWU",function(e,a){t(e.exports,"api_url",()=>r),t(e.exports,"client_url",()=>i);let r="https://www.api.eyelcient.com/v1",i="https://www.eyeclient.com"}),o("hXBCr",function(e,a){t(e.exports,"userCard",()=>i),t(e.exports,"dmediaCard",()=>n),t(e.exports,"dlinkCard",()=>o),t(e.exports,"mediaCard",()=>l);var r=s("gHFA8");function i(e){let t=e.active?"pause":"play";return`
  <div class="user-card" data-user-id="${e.id}">
    <div class="user-card__details">
      <strong>${e.name} &nbsp; (${e.accessLevel})</strong>
      <span>${e.email}</span>
    </div>
    <div class="user-card__buttons">
      <i class="fas fa-${t} i-secondary change-user-status" data-user-status="${e.active}"></i>
      <i class="fas fa-trash-alt i-primary delete-user"></i>
    </div>
  </div>`}function n(e,t=""){let a=`
    <a href="/executive/${e.type}?id=${e.id}"><i class="fas fa-edit i-secondary"></i></a>
    <i class="fas fa-trash-alt i-primary delete-media"></i>
  `;return"positive"===t&&(a='<button class="btn btn-secondary-dark add-to-collection">add to collection</button>'),"negative"===t&&(a='<button class="btn btn-primary remove-from-collection">remove</button>'),`
    <div class="dmedia-card" data-media-id="${e.id}" data-action='${"positive"===t?"add":"negative"===t?"remove":""}'>
      <div class="dmedia-card__image"><img src="${e.poster}" alt="${e.title}" /></div>
      <div class="dmedia-card__details">
        <h4 class="dmedia-card__details-title">${e.title}</h4>
        <ul>
          <li>${e.type}</li>
          <li>${e.imdbRating} <i class="fas fa-star i-primary"></i></li>
          <li>${(0,r.getTime)(e.released).date}</li>
        </ul>

        <div class="dmedia-card__details-button">
          <span>${a}</span>
        </div>
      </div>
    </div>
  `}function o(e,t="",a="",r=!1){let i='<i class="fas fa-edit i-secondary edit-link"></i>';return r&&(i=`<a href='${r}'><i class="fas fa-edit i-secondary"></i></a>`),`
  <div class="link-item" data-link-id='${e.id}' data-link='${JSON.stringify(e)}'>
    <span>${t}${e.name||e.episode||e.season}${a}</span>
    <span>${i}<i class="fas fa-trash-alt i-primary delete-link"></i></span>
  </div>
  `}function l(e){let t="collection"===e.type?`/media?collection=${e.id}`:`/detail/${e.id}`;return`
  <div class="media-card" data-media-id='${e.id}'>
    <div class="media-card__image">
      <img src="${e.poster}" />
    </div>
    <div class="media-card__details">
      <a href="${t}" class="media-card__details__title" title='${e.year}'>${e.title}</a>
      <span class="media-card__details__rate-type">${e.imdbRating||"N/A"} <i class="fas fa-star"></i> &nbsp; <span>${e.type}</span></span>
    </div>
  </div>
  `}}),o("gHFA8",function(e,a){function r(e){let t=Error(e);return t.isOperational=!0,t}function i(e){let t={};return e.slice(1).split("&").forEach(e=>{let[a,r]=e.split("=");if(a.includes("[")){let[e,i]=a.split("["),n=i.slice(0,i.length-1),s={};s[n]=r,t[e]?t[e][n]=r:t[e]=s}else t[a]=r}),t}function n(e){let t=Object.entries(e);return t=(t=t.map(([e,t])=>(function(e,t){if("object"!=typeof t)return`${e}=${t}`;let a=Object.entries(t);return(a=a.map(([t,a])=>`${e}[${t}]=${a}`)).join("&")})(e,t))).join("&"),t=`?${t}`}function s(e,t){if(e&&t)return new Date(`${e} ${t}`).toISOString()}function o(e){let t=new Date(e),a=`${t.getFullYear()}`.padStart(2,"0"),r=`${t.getMonth()+1}`.padStart(2,"0"),i=`${t.getDate()}`.padStart(2,"0"),n=`${t.getHours()}`.padStart(2,"0"),s=`${t.getMinutes()}`.padStart(2,"0");return{date:`${a}-${r}-${i}`,time:`${n}:${s}`}}function l(e,t=60){if(e.length>t){let a=e.slice(0,t-3);return" "===a.charAt(a.length-1)?`${a.slice(0,a.length-1)}...`:`${a}...`}return e}function d(e){let t=new Date(e),a=t.toLocaleTimeString(void 0,{hour:"numeric",minute:"numeric"}),r=t.toDateString(),i=t.toLocaleDateString(),n=t.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),s=t.toLocaleDateString(void 0,{weekday:"short",month:"long",day:"numeric",year:"numeric"}),o=`${i}   ${a}`,l=new Intl.DateTimeFormat(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"}).format(t),d=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}).format(t);return{time:a,date:r,simpleDate:new Intl.DateTimeFormat(void 0,{year:"2-digit",month:"short",day:"numeric"}).format(t),localDate:i,lateralDate:s,fullDate:l,fullLocalDate:o,timeZone:t.toLocaleTimeString(void 0,{timeZoneName:"short"}).split(" ").at(-1).slice(0,3),simple:n,complete:d}}function c(e={},t={},a=[]){for(let r in t){if(a.includes(r)){e[r]?e[r]=`${t[r]},${e[r]}`:e[r]=t[r];continue}e[r]=t[r]}return e}t(e.exports,"appError",()=>r),t(e.exports,"parseQuery",()=>i),t(e.exports,"stringifyQuery",()=>n),t(e.exports,"mergeDate",()=>s),t(e.exports,"unmergeDate",()=>o),t(e.exports,"cutString",()=>l),t(e.exports,"getTime",()=>d),t(e.exports,"mergeQueries",()=>c)}),o("0RIFc",function(e,a){t(e.exports,"rotateBtn",()=>l),t(e.exports,"stopRotateBtn",()=>d),t(e.exports,"alertResponse",()=>c),t(e.exports,"displayError",()=>u),t(e.exports,"querMeta",()=>p),t(e.exports,"querMetaMain",()=>m),t(e.exports,"loadingContent",()=>f),t(e.exports,"clickOtherBtn",()=>g),t(e.exports,"noSearchContent",()=>y),t(e.exports,"expandSearchBar",()=>h),t(e.exports,"controlSidebar",()=>v),t(e.exports,"fullOpenPopup",()=>$),t(e.exports,"openPopup",()=>E),t(e.exports,"closePopup",()=>x),t(e.exports,"parseQuery",()=>b),t(e.exports,"stringifyQuery",()=>S),t(e.exports,"unmergeDate",()=>L),t(e.exports,"mergeQueries",()=>w),t(e.exports,"userCard",()=>B),t(e.exports,"dmediaCard",()=>M),t(e.exports,"dlinkCard",()=>T);var r=s("d2GFg"),i=s("4kZWU"),n=s("gHFA8"),o=s("hXBCr");let l=r.rotateBtn,d=r.stopRotateBtn,c=r.alertResponse,u=r.displayError,p=r.querMeta,m=r.querMetaMain,f=r.loadingContent,g=r.clickOtherBtn,y=r.noSearchContent,h=r.expandSearchBar,v=r.controlSidebar,$=r.fullOpenPopup,E=r.openPopup,x=r.closePopup;i.api_url,i.client_url,n.appError;let b=n.parseQuery,S=n.stringifyQuery;n.mergeDate;let L=n.unmergeDate;n.cutString,n.getTime;let w=n.mergeQueries,B=o.userCard;o.mediaCard;let M=o.dmediaCard,T=o.dlinkCard}),o("d2GFg",function(e,a){let r,i,n,s;function o(e){let t=document.getElementById(e);t&&t.insertAdjacentHTML("beforeend",' <i class="fas fa-spinner"></i>')}function l(e){let t=document.getElementById(e);if(!t)return console.log("No button found",e);let a=t.querySelector(".fa-spinner");a&&t.removeChild(a)}function d(e,t="",a=4){let o=document.querySelector("body"),l=document.querySelector(".alert-message"),d=0;l&&(clearTimeout(r),clearTimeout(i),clearTimeout(n),clearTimeout(s),d=1010,l.classList.remove("am-in"),setTimeout(()=>{o.removeChild(l)},d)),a=(a+.2)*1e3+d;let c=`<div class="alert-message alert-message--${t}">${e}<i class="fas fa-times close-alert-message"></i></div>`;r=setTimeout(()=>{o.insertAdjacentHTML("afterbegin",c)},d+10),i=setTimeout(()=>{o.querySelector(".alert-message").classList.add("am-in")},d+200),n=setTimeout(()=>{o.querySelector(".alert-message").classList.remove("am-in")},a+30),s=setTimeout(()=>{let e=o.querySelector(".alert-message");o.removeChild(e)},a+1500)}function c(e,t,a="failed",r=10){e.isOperational?d(e.message||e._message,a,r):(console.error("\uD83C\uDF7Feyeclient: ",e),d("Sorry something went wrong from our side",a,r)),t&&l(t)}function u(e,t="meta"){let a=document.querySelector("body");if(!e)return JSON.parse(a.dataset[t]||JSON.stringify({}));a.dataset[t]=JSON.stringify(e)}function p(e,t="meta"){t+="Main";let a=document.querySelector("body");if(!e)return JSON.parse(a.dataset[t]||JSON.stringify({}));a.dataset[t]=JSON.stringify(e)}function m(e){let t=document.getElementById(e);t.innerHTML="";let a=`
      <div class="center-element">
        <i class='fa-solid fa-spinner'></i>
      </div>
    `;t.insertAdjacentHTML("beforeend",a)}function f(e,t){let a=document.getElementById(e);a.innerHTML="";let r=`
      <div class="center-element" style='font-size: 1.6rem'>
        <h3>${t}</h3>
      </div>
    `;a.insertAdjacentHTML("beforeend",r)}function g(e,t){let a=document.getElementById(e);if(!a)return console.warn("⚠️eyeclient: NO VISIBLE BUTTION FOUND");let r=document.getElementById(t);a.addEventListener("click",()=>r.click())}function y(e){let t=document.getElementById(e),a=t.querySelector("input");a.addEventListener("focus",()=>{!(window.innerWidth>600)&&(t.previousElementSibling&&(t.previousElementSibling.style.display="none"),t.nextElementSibling&&(t.nextElementSibling.style.display="none"))}),a.addEventListener("blur",()=>{!(window.innerWidth>600)&&(t.previousElementSibling&&(t.previousElementSibling.style.display="initial"),t.nextElementSibling&&(t.nextElementSibling.style.display="initial"))})}function h(){let e=document.getElementById("sidebar"),t=document.getElementById("open-sidebar"),a=document.getElementById("close-sidebar");t.addEventListener("click",()=>e.style.left="0"),a.addEventListener("click",()=>e.style.left="-100%")}function v(e,t,a,r,i=[],n=[]){let s=document.getElementById(e);if(!s)return console.warn(`\u{26A0}\u{FE0F}eyeclient: NO ELEMENT FOUND WITH ID -> ${e}`);let o=document.getElementById(t);s.addEventListener("click",e=>{r&&r(...n),o.classList.toggle("display-off")}),o.addEventListener("click",e=>{e.target.classList.contains("close-popup")&&(o.classList.toggle("display-off"),a&&a(...i))})}function $(e,t,a=[]){document.getElementById(e).classList.toggle("display-off"),t&&t(...a)}function E(e,t,a=[]){let r=document.getElementById(e);t&&t(...a),r.classList.toggle("display-off")}t(e.exports,"rotateBtn",()=>o),t(e.exports,"stopRotateBtn",()=>l),t(e.exports,"alertResponse",()=>d),t(e.exports,"displayError",()=>c),t(e.exports,"querMeta",()=>u),t(e.exports,"querMetaMain",()=>p),t(e.exports,"loadingContent",()=>m),t(e.exports,"noSearchContent",()=>f),t(e.exports,"clickOtherBtn",()=>g),t(e.exports,"expandSearchBar",()=>y),t(e.exports,"controlSidebar",()=>h),t(e.exports,"fullOpenPopup",()=>v),t(e.exports,"closePopup",()=>$),t(e.exports,"openPopup",()=>E),function(){let e=document.querySelector("body");e.addEventListener("click",t=>{if(!t.target.classList.contains("close-alert-message"))return;clearTimeout(r),clearTimeout(i),clearTimeout(n),clearTimeout(s);let a=document.querySelector(".alert-message");a.classList.remove("am-in"),setTimeout(()=>{e.removeChild(a)},400)})}()});var l=s("huFZ7"),d=s("0RIFc");const c=document.getElementById("cards-container");var u=s("8oD3Q");async function p(e){!function(e){let{data:t,message:a}=e;(0,d.alertResponse)(a);let r=document.querySelector(`[data-media-id='${t.id}']`);c.removeChild(r)}(await (0,u.deleteRequest)(`/media/single/${e}`))}async function m(e){!function(e){let{data:t,message:a}=e;(0,d.alertResponse)(a),c.insertAdjacentHTML("afterbegin",(0,d.dmediaCard)(t))}(await (0,u.postFull)("/media/soft",e))}(0,d.expandSearchBar)("form-search"),(0,d.controlSidebar)(),(0,d.fullOpenPopup)("open-soft-add-popup","soft-add-popup"),(0,d.clickOtherBtn)("btn-soft-add-alt","btn-soft-add"),window.addEventListener("DOMContentLoaded",()=>{(0,l.initialLoad)({containerid:"cards-container",url:"/media?fields=title,type,imdbRating,released,poster,id&order=-createdAt",card:"dmediaCard"}),(0,l.pageLoad)({containerid:"cards-container",url:"/media",card:"dmediaCard"}),(0,l.search)({containerid:"cards-container",url:"/media",card:"dmediaCard",formid:"form-search"}),(0,l.filter)({containerid:"cards-container",url:"/media",card:"dmediaCard",selectid:"filter"})}),c.addEventListener("click",async e=>{if(!e.target.classList.contains("delete-media"))return;let t=e.target.closest(".dmedia-card"),a=t.querySelector("h4").textContent.trim();if(!window.confirm(`Are you sure you want to DELETE 
${a}`))return;let r=t.dataset.mediaId;try{await p(r)}catch(e){(0,d.displayError)(e)}}),function(e){let t=document.getElementById("form-soft-add"),a="btn-soft-add-alt";t.addEventListener("submit",async t=>{t.preventDefault(),(0,d.rotateBtn)(a);let r=document.getElementById("imdb-id").value;try{await e({imdbId:r}),(0,d.stopRotateBtn)(a),(0,d.closePopup)("soft-add-popup",()=>document.getElementById("imdb-id").value="")}catch(e){(0,d.displayError)(e,a)}})}(m);