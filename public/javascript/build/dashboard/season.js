var e=require("axios");function t(e){return e&&e.__esModule?e.default:e}function a(e,t,a,r){Object.defineProperty(e,t,{get:a,set:r,enumerable:!0,configurable:!0})}var r=globalThis,n={},i={},s=r.parcelRequiree8ef;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){i[e]=t},r.parcelRequiree8ef=s);var o=s.register;o("8oD3Q",function(r,n){a(r.exports,"getFull",()=>o),a(r.exports,"postSimple",()=>l),a(r.exports,"postFull",()=>d),a(r.exports,"patchFull",()=>c),a(r.exports,"deleteRequest",()=>u);var i=s("4kZWU");async function o(a,r="api"){try{return a="api"===r?`${i.api_url}${a}`:r,(await t(e)({method:"GET",withCredentials:!0,url:a})).data}catch(e){throw e.response?e.response.data:e}}async function l(a,r,n="api"){try{return a="api"===n?`${i.api_url}${a}`:n,(await t(e)({method:"POST",url:a,data:r,withCredentials:!0})).data.data}catch(e){throw e.response?e.response.data:e}}async function d(a,r,n="api"){try{return a="api"===n?`${i.api_url}${a}`:n,(await t(e)({method:"POST",url:a,data:r,withCredentials:!0})).data}catch(e){throw e.response?e.response.data:e}}async function c(a,r,n="api"){try{return a="api"===n?`${i.api_url}${a}`:n,(await t(e)({method:"PATCH",url:a,data:r,withCredentials:!0})).data}catch(e){throw e.response?e.response.data:e}}async function u(a,r="api"){try{return a="api"===r?`${i.api_url}${a}`:r,(await t(e)({method:"DELETE",url:a,withCredentials:!0})).data}catch(e){throw e.response?e.response.data:e}}}),o("4kZWU",function(e,t){a(e.exports,"api_url",()=>r),a(e.exports,"client_url",()=>n);let r="https://www.api.eyeclient.com/v1",n="https://www.eyeclient.com"}),o("huFZ7",function(e,t){a(e.exports,"initialLoad",()=>l),a(e.exports,"pageLoad",()=>d),a(e.exports,"search",()=>c),a(e.exports,"filter",()=>u),a(e.exports,"softUpdate",()=>m);var r=s("8oD3Q"),n=s("hXBCr"),i=s("0RIFc");async function o({url:e,containerid:t,card:a,args:s,aftercall:o,toMetaMain:l=!1,scroll:d=!1}){try{let c=document.getElementById(t),{data:u,meta:m}=await (0,r.getFull)(e);if((0,i.querMeta)(m),l&&(0,i.querMetaMain)(m),!m.length)return(0,i.noSearchContent)(t,"No results found"),o&&o({data:u,meta:m,card:a,args:s,containerid:t});c.innerHTML="",u.forEach(e=>c.insertAdjacentHTML("beforeend",n[a](e,...s))),function(e,t="meta"){let{total:a,limit:r,page:n,available:s}=(0,i.querMeta)(void 0,t),o=`
  <div class="center-element-2 form-7 np-buttons" style='margin: 4rem 0;'>
    <span class="tag tag-primary tag-button np-button ${n>1?"":"display-off"}" data-direction="prev"><i class="fas fa-angle-left np-button"></i>prev</span>
    <span class="tag">${n}/${Math.ceil(a/r)}</span>
    <span class="tag tag-primary tag-button np-button ${s?"":"display-off"}" data-direction="next">next <i class="fas fa-angle-right np-button"></i></span>
  </div>`,l=document.getElementById(e).parentElement,d=l.querySelector(".np-buttons");d&&l.removeChild(d),l.insertAdjacentHTML("beforeend",o)}(t),d&&c.parentElement.scrollTo({top:0,behavior:"smooth"}),o&&o({data:u,meta:m,card:a,args:s,containerid:t})}catch(e){(0,i.displayError)(e)}}function l({containerid:e,url:t,card:a,args:r=[]}){(0,i.loadingContent)(e),o({url:t,containerid:e,card:a,args:r,toMetaMain:!0})}function d({containerid:e,url:t,card:a,args:r=[],aftercall:n}){document.querySelector("body").addEventListener("click",s=>{if(!s.target.classList.contains("np-button"))return;let{direction:l}=s.target.closest("span").dataset,d=(0,i.querMeta)();d.page="next"===l?d.page+1:d.page-1,o({url:t+(0,i.stringifyQuery)(d),containerid:e,card:a,args:r,scroll:!0,aftercall:n})})}function c({containerid:e,url:t,card:a,formid:r,args:n=[],tagsid:s,tagclass:l,aftercall:d}){let c=document.getElementById(r),[u,m]=t.split("?"),p=m?(0,i.parseQuery)("?"+m):void 0;c.addEventListener("submit",t=>{t.preventDefault();let{value:r}=c.querySelector("input"),m=(0,i.querMetaMain)(),f=p?(0,i.stringifyQuery)({...p,search:r}):(0,i.stringifyQuery)({search:r});r||(f=p?{...p,...m}:m),r.startsWith("??")&&(f=(0,i.stringifyQuery)((0,i.parseQuery)(r.slice(1)))),m.fields&&(f.fields=m.fields);let g=d;s&&l&&(g=e=>{document.getElementById(s).querySelectorAll(`.${l}`).forEach(e=>e.classList.remove("tag-primary")),d&&d(e)}),o({url:u+f,containerid:e,card:a,args:n,aftercall:g})})}function u({containerid:e,url:t,card:a,selectid:r,tagsid:n,args:s=[],aftercall:l,tagclass:d}){let c=document.getElementById(r),u=document.getElementById(n),[m,p]=t.split("?"),f=p?(0,i.parseQuery)("?"+p):void 0;c&&c.addEventListener("change",()=>{if("reset"===c.value){(0,i.querMetaMain)(),o({url:m+(0,i.stringifyQuery)((0,i.querMetaMain)()),containerid:e,card:a,args:s,aftercall:l});return}let r=(0,i.mergeQueries)((0,i.querMeta)(),(0,i.parseQuery)(c.value),["order"]);r=p?{...f,...r}:r,o({url:t+(r=(0,i.stringifyQuery)(r)),containerid:e,card:a,args:s,aftercall:l})}),u&&d&&u.addEventListener("click",t=>{let r=t.target;if(!r.classList.contains(d))return;let n=(0,i.querMeta)(),c=r.classList.contains("tag-primary");if("reset"===r.dataset.filter){function p(e){u.querySelectorAll(`.${d}`).forEach(e=>e.classList.remove("tag-primary")),l&&l(e)}(0,i.querMetaMain)(),o({url:m+(0,i.stringifyQuery)((0,i.querMetaMain)()),containerid:e,card:a,args:s,aftercall:p});return}let f=(0,i.parseQuery)(r.dataset.filter),g=Object.keys(f)[0],y={};function p(e){r.classList.toggle("tag-primary"),l&&l(e)}c?(n[g]=n[g].split(",").filter(e=>e!==f[g]).join(","),n[g]||delete n[g],y=n):y=(0,i.mergeQueries)(n,f,[g]),o({url:m+(y=(0,i.stringifyQuery)(y)),containerid:e,card:a,args:s,aftercall:p})})}function m(e,t="media"){let a=document.getElementById(e);if(!a)return;let n={media:"/media/soft",episode:"/media/episode/soft"};a.addEventListener("click",async()=>{(0,i.rotateBtn)(e);let{id:a}=(0,i.parseQuery)(window.location.search);try{let s=await (0,r.patchFull)(n[t],{id:a});(0,i.alertResponse)(s.message),(0,i.stopRotateBtn)(e),window.setTimeout(()=>window.location.reload(),3e3)}catch(t){console.log(t),(0,i.displayError)(t,e)}})}}),o("hXBCr",function(e,t){a(e.exports,"userCard",()=>n),a(e.exports,"dmediaCard",()=>i),a(e.exports,"dlinkCard",()=>o),a(e.exports,"mediaCard",()=>l);var r=s("gHFA8");function n(e){let t=e.active?"pause":"play";return`
  <div class="user-card" data-user-id="${e.id}">
    <div class="user-card__details">
      <strong>${e.name} &nbsp; (${e.accessLevel})</strong>
      <span>${e.email}</span>
    </div>
    <div class="user-card__buttons">
      <i class="fas fa-${t} i-secondary change-user-status" data-user-status="${e.active}"></i>
      <i class="fas fa-trash-alt i-primary delete-user"></i>
    </div>
  </div>`}function i(e,t=""){let a=`
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
  `}function o(e,t="",a="",r=!1){let n='<i class="fas fa-edit i-secondary edit-link"></i>';return r&&(n=`<a href='${r}'><i class="fas fa-edit i-secondary"></i></a>`),`
  <div class="link-item" data-link-id='${e.id}' data-link='${JSON.stringify(e)}'>
    <span>${t}${e.name||e.episode||e.season}${a}</span>
    <span>${n}<i class="fas fa-trash-alt i-primary delete-link"></i></span>
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
  `}}),o("gHFA8",function(e,t){function r(e){let t=Error(e);return t.isOperational=!0,t}function n(e){let t={};return e.slice(1).split("&").forEach(e=>{let[a,r]=e.split("=");if(a.includes("[")){let[e,n]=a.split("["),i=n.slice(0,n.length-1),s={};s[i]=r,t[e]?t[e][i]=r:t[e]=s}else t[a]=r}),t}function i(e){let t=Object.entries(e);return t=(t=t.map(([e,t])=>(function(e,t){if("object"!=typeof t)return`${e}=${t}`;let a=Object.entries(t);return(a=a.map(([t,a])=>`${e}[${t}]=${a}`)).join("&")})(e,t))).join("&"),t=`?${t}`}function s(e,t){if(e&&t)return new Date(`${e} ${t}`).toISOString()}function o(e){let t=new Date(e),a=`${t.getFullYear()}`.padStart(2,"0"),r=`${t.getMonth()+1}`.padStart(2,"0"),n=`${t.getDate()}`.padStart(2,"0"),i=`${t.getHours()}`.padStart(2,"0"),s=`${t.getMinutes()}`.padStart(2,"0");return{date:`${a}-${r}-${n}`,time:`${i}:${s}`}}function l(e,t=60){if(e.length>t){let a=e.slice(0,t-3);return" "===a.charAt(a.length-1)?`${a.slice(0,a.length-1)}...`:`${a}...`}return e}function d(e){let t=new Date(e),a=t.toLocaleTimeString(void 0,{hour:"numeric",minute:"numeric"}),r=t.toDateString(),n=t.toLocaleDateString(),i=t.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}),s=t.toLocaleDateString(void 0,{weekday:"short",month:"long",day:"numeric",year:"numeric"}),o=`${n}   ${a}`,l=new Intl.DateTimeFormat(void 0,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"}).format(t),d=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}).format(t);return{time:a,date:r,simpleDate:new Intl.DateTimeFormat(void 0,{year:"2-digit",month:"short",day:"numeric"}).format(t),localDate:n,lateralDate:s,fullDate:l,fullLocalDate:o,timeZone:t.toLocaleTimeString(void 0,{timeZoneName:"short"}).split(" ").at(-1).slice(0,3),simple:i,complete:d}}function c(e={},t={},a=[]){for(let r in t){if(a.includes(r)){e[r]?e[r]=`${t[r]},${e[r]}`:e[r]=t[r];continue}e[r]=t[r]}return e}a(e.exports,"appError",()=>r),a(e.exports,"parseQuery",()=>n),a(e.exports,"stringifyQuery",()=>i),a(e.exports,"mergeDate",()=>s),a(e.exports,"unmergeDate",()=>o),a(e.exports,"cutString",()=>l),a(e.exports,"getTime",()=>d),a(e.exports,"mergeQueries",()=>c)}),o("0RIFc",function(e,t){a(e.exports,"rotateBtn",()=>l),a(e.exports,"stopRotateBtn",()=>d),a(e.exports,"alertResponse",()=>c),a(e.exports,"displayError",()=>u),a(e.exports,"querMeta",()=>m),a(e.exports,"querMetaMain",()=>p),a(e.exports,"loadingContent",()=>f),a(e.exports,"clickOtherBtn",()=>g),a(e.exports,"noSearchContent",()=>y),a(e.exports,"expandSearchBar",()=>v),a(e.exports,"controlSidebar",()=>h),a(e.exports,"fullOpenPopup",()=>E),a(e.exports,"openPopup",()=>b),a(e.exports,"closePopup",()=>$),a(e.exports,"parseQuery",()=>x),a(e.exports,"stringifyQuery",()=>B),a(e.exports,"unmergeDate",()=>S),a(e.exports,"mergeQueries",()=>w),a(e.exports,"userCard",()=>I),a(e.exports,"dmediaCard",()=>L),a(e.exports,"dlinkCard",()=>M);var r=s("d2GFg"),n=s("4kZWU"),i=s("gHFA8"),o=s("hXBCr");let l=r.rotateBtn,d=r.stopRotateBtn,c=r.alertResponse,u=r.displayError,m=r.querMeta,p=r.querMetaMain,f=r.loadingContent,g=r.clickOtherBtn,y=r.noSearchContent,v=r.expandSearchBar,h=r.controlSidebar,E=r.fullOpenPopup,b=r.openPopup,$=r.closePopup;n.api_url,n.client_url,i.appError;let x=i.parseQuery,B=i.stringifyQuery;i.mergeDate;let S=i.unmergeDate;i.cutString,i.getTime;let w=i.mergeQueries,I=o.userCard;o.mediaCard;let L=o.dmediaCard,M=o.dlinkCard}),o("d2GFg",function(e,t){let r,n,i,s;function o(e){let t=document.getElementById(e);t&&t.insertAdjacentHTML("beforeend",' <i class="fas fa-spinner"></i>')}function l(e){let t=document.getElementById(e);if(!t)return console.log("No button found",e);let a=t.querySelector(".fa-spinner");a&&t.removeChild(a)}function d(e,t="",a=4){let o=document.querySelector("body"),l=document.querySelector(".alert-message"),d=0;l&&(clearTimeout(r),clearTimeout(n),clearTimeout(i),clearTimeout(s),d=1010,l.classList.remove("am-in"),setTimeout(()=>{o.removeChild(l)},d)),a=(a+.2)*1e3+d;let c=`<div class="alert-message alert-message--${t}">${e}<i class="fas fa-times close-alert-message"></i></div>`;r=setTimeout(()=>{o.insertAdjacentHTML("afterbegin",c)},d+10),n=setTimeout(()=>{o.querySelector(".alert-message").classList.add("am-in")},d+200),i=setTimeout(()=>{o.querySelector(".alert-message").classList.remove("am-in")},a+30),s=setTimeout(()=>{let e=o.querySelector(".alert-message");o.removeChild(e)},a+1500)}function c(e,t,a="failed",r=10){e.isOperational?d(e.message||e._message,a,r):(console.error("\uD83C\uDF7Feyeclient: ",e),d("Sorry something went wrong from our side",a,r)),t&&l(t)}function u(e,t="meta"){let a=document.querySelector("body");if(!e)return JSON.parse(a.dataset[t]||JSON.stringify({}));a.dataset[t]=JSON.stringify(e)}function m(e,t="meta"){t+="Main";let a=document.querySelector("body");if(!e)return JSON.parse(a.dataset[t]||JSON.stringify({}));a.dataset[t]=JSON.stringify(e)}function p(e){let t=document.getElementById(e);t.innerHTML="";let a=`
      <div class="center-element">
        <i class='fa-solid fa-spinner'></i>
      </div>
    `;t.insertAdjacentHTML("beforeend",a)}function f(e,t){let a=document.getElementById(e);a.innerHTML="";let r=`
      <div class="center-element" style='font-size: 1.6rem'>
        <h3>${t}</h3>
      </div>
    `;a.insertAdjacentHTML("beforeend",r)}function g(e,t){let a=document.getElementById(e);if(!a)return console.warn("⚠️eyeclient: NO VISIBLE BUTTION FOUND");let r=document.getElementById(t);a.addEventListener("click",()=>r.click())}function y(e){let t=document.getElementById(e),a=t.querySelector("input");a.addEventListener("focus",()=>{!(window.innerWidth>600)&&(t.previousElementSibling&&(t.previousElementSibling.style.display="none"),t.nextElementSibling&&(t.nextElementSibling.style.display="none"))}),a.addEventListener("blur",()=>{!(window.innerWidth>600)&&(t.previousElementSibling&&(t.previousElementSibling.style.display="initial"),t.nextElementSibling&&(t.nextElementSibling.style.display="initial"))})}function v(){let e=document.getElementById("sidebar"),t=document.getElementById("open-sidebar"),a=document.getElementById("close-sidebar");t.addEventListener("click",()=>e.style.left="0"),a.addEventListener("click",()=>e.style.left="-100%")}function h(e,t,a,r,n=[],i=[]){let s=document.getElementById(e);if(!s)return console.warn(`\u{26A0}\u{FE0F}eyeclient: NO ELEMENT FOUND WITH ID -> ${e}`);let o=document.getElementById(t);s.addEventListener("click",e=>{r&&r(...i),o.classList.toggle("display-off")}),o.addEventListener("click",e=>{e.target.classList.contains("close-popup")&&(o.classList.toggle("display-off"),a&&a(...n))})}function E(e,t,a=[]){document.getElementById(e).classList.toggle("display-off"),t&&t(...a)}function b(e,t,a=[]){let r=document.getElementById(e);t&&t(...a),r.classList.toggle("display-off")}a(e.exports,"rotateBtn",()=>o),a(e.exports,"stopRotateBtn",()=>l),a(e.exports,"alertResponse",()=>d),a(e.exports,"displayError",()=>c),a(e.exports,"querMeta",()=>u),a(e.exports,"querMetaMain",()=>m),a(e.exports,"loadingContent",()=>p),a(e.exports,"noSearchContent",()=>f),a(e.exports,"clickOtherBtn",()=>g),a(e.exports,"expandSearchBar",()=>y),a(e.exports,"controlSidebar",()=>v),a(e.exports,"fullOpenPopup",()=>h),a(e.exports,"closePopup",()=>E),a(e.exports,"openPopup",()=>b),function(){let e=document.querySelector("body");e.addEventListener("click",t=>{if(!t.target.classList.contains("close-alert-message"))return;clearTimeout(r),clearTimeout(n),clearTimeout(i),clearTimeout(s);let a=document.querySelector(".alert-message");a.classList.remove("am-in"),setTimeout(()=>{e.removeChild(a)},400)})}()});var l=s("8oD3Q");s("huFZ7");var d=s("0RIFc");const c=document.getElementById("cards-container");function u(e="soft"){document.getElementById("imdb-id").value="","soft"!==e&&(document.getElementById("poster").value="",document.getElementById("released").value="",document.getElementById("imdb-id-hard").value="",document.getElementById("imdb-series").value="",document.getElementById("rated").value="",document.getElementById("episode").value=document.querySelector("body").dataset.next,document.getElementById("title").value="",document.getElementById("plot").value="",document.getElementById("runtime").value="",document.getElementById("imdb-rating").value="")}async function m(e){var t;let a={season:document.getElementById("season").value,released:document.getElementById("released").value,poster:document.getElementById("poster").value};t=await (0,l.patchFull)(`/media/season/${e}`,a),(0,d.alertResponse)(t.message),window.setTimeout(()=>window.location.reload(),3e3)}async function p(e="soft"){let t=function(e){let{id:t,series:a}=(0,d.parseQuery)(window.location.search),r=document.getElementById("imdb-id").value;if("soft"===e)return{season:t,series:a,imdbId:r};r=document.getElementById("imdb-id-hard").value;let n=document.getElementById("imdb-series").value,i=document.getElementById("rated").value,s=document.getElementById("episode").value,o=document.getElementById("title").value,l=document.getElementById("plot").value,c=document.getElementById("poster").value;return{season:t,series:a,imdbId:r,imdbSeries:n,rated:i,episode:s,title:o,plot:l,poster:c,runtime:document.getElementById("runtime").value,imdbRating:document.getElementById("imdb-rating").value,released:document.getElementById("released").value}}(e);!function(e){let{message:t,data:a}=e,r=`/executive/episode?id=${a.id}&season=${document.querySelector("body").dataset.season}`;(0,d.alertResponse)(t);let n=document.querySelector(`[data-link-id='${a.id}']`),i=n?.nextElementSibling,s=n?.previousElementSibling;n&&c.removeChild(n),i?i.insertAdjacentHTML("beforebegin",(0,d.dlinkCard)(a,"Episode ",void 0,r)):s?s.insertAdjacentHTML("afterend",(0,d.dlinkCard)(a,"Episode ",void 0,r)):c.insertAdjacentHTML("afterbegin",(0,d.dlinkCard)(a,"Episode ",void 0,r)),document.querySelector("body").dataset.next=+a.episode+1,document.getElementById("episode").value=+a.episode+1}(await (0,l.postFull)("hard"===e?"/media/episode/hard":"/media/episode/soft",t))}async function f(e){await (0,l.deleteRequest)(`/media/episode/${e}`),function(e){let t=document.querySelector(`[data-link-id='${e}']`);c.removeChild(t)}(e)}!async function(){(0,d.fullOpenPopup)("soft-add","soft-add-popup",u,void 0,["soft"]),(0,d.fullOpenPopup)("hard-add","hard-add-popup",u,void 0,["hard"]),(0,d.clickOtherBtn)("btn-soft-add-alt","btn-soft-add"),(0,d.clickOtherBtn)("btn-hard-add-alt","btn-hard-add"),function(e){let{id:t}=(0,d.parseQuery)(window.location.search),a=document.getElementById("form-season"),r="btn-update";a.addEventListener("submit",async a=>{a.preventDefault(),(0,d.rotateBtn)(r);try{await e(t),(0,d.stopRotateBtn)(r)}catch(e){(0,d.displayError)(e,r)}})}(m),function(e){let t=document.getElementById("form-soft-add");async function a(t){t.preventDefault();let a=t.target.querySelector("button").getAttribute("id"),r=a+"-alt",n=a.slice(4)+"-popup",i=a.split("-")[1];(0,d.rotateBtn)(r);try{await e(i),(0,d.stopRotateBtn)(r),(0,d.closePopup)(n,u,[i])}catch(e){(0,d.displayError)(e,r)}}document.getElementById("form-hard-add").addEventListener("submit",a),t.addEventListener("submit",a)}(p),c&&c.addEventListener("click",async e=>{if(!e.target.classList.contains("delete-link"))return;let t=JSON.parse(e.target.closest(".link-item").dataset.link);if(window.confirm(`Are you sure you want to delete 
Episode ${t.episode}`))try{await f(t.id)}catch(e){(0,d.displayError)(e)}})}();