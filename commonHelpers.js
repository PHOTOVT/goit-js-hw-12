import{a as w,S as L,i as f}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();async function p(e,r){const s="https://pixabay.com/api/",i={key:"44576070-519b0fb3235ae96b7cd44aad7",q:e,per_page:15,page:r,image_type:"photo",orientation:"horizontal",safesearch:!0};try{const{data:t}=await w.get(s,{params:i});return t}catch(t){console.error("Error:",t)}}function g(e){return e.map(C).join("")}function C(e){return`<li class="gallery-item">
    <a href="${e.largeImageURL}" class="gallery-item-link"
      ><img
        class="gallery-item-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
        width="360"
    /></a>
    <ul class="photo-info-list">
      <li class="photo-info-item">
        <p class="photo-data-name">Likes</p>
        <p class="photo-data">${e.likes}</p>
      </li>
      <li class="photo-info-item">
        <p class="photo-data-name">Views</p>
        <p class="photo-data">${e.views}</p>
      </li>
      <li class="photo-info-item">
        <p class="photo-data-name">Comments</p>
        <p class="photo-data">${e.comments}</p>
      </li>
      <li class="photo-info-item">
        <p class="photo-data-name">Downloads</p>
        <p class="photo-data">${e.downloads}</p>
      </li>
    </ul>
  </li>`}const o={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreButton:document.querySelector(".load-more-button")},y=new L(".gallery a",{captionsData:"alt",captionDelay:250});let c="",n=1,d=0;const M=15;o.searchForm.addEventListener("submit",x);o.loadMoreButton.addEventListener("click",P);async function x(e){if(e.preventDefault(),l(o.loadMoreButton),o.gallery.innerHTML="",c=e.target.elements.searchField.value.trim(),n=1,d=0,c===""){f.show({message:"Please enter a query",position:"bottomCenter",backgroundColor:"#ffbd59",messageColor:"#ffffff",theme:"dark",maxWidth:"350px"});return}h(o.loader);try{const{totalHits:r,hits:s}=await p(c,n);v(r,s)}catch(r){b(r)}finally{m(),l(o.loader)}}async function P(){l(o.loadMoreButton),h(o.loader),n++;try{const{hits:e}=await p(c,n),r=g(e);o.gallery.insertAdjacentHTML("beforeend",r),y.refresh(),k()}catch(e){b(e)}finally{m(),l(o.loader)}}function m(){if(d!==0){if(d!==n){h(o.loadMoreButton);return}else f.show({message:"We are re sorry, but you have reached the end of search results.",position:"bottomCenter",backgroundColor:"#5271ff",messageColor:"#ffffff",theme:"dark",maxWidth:"350px"}),l(o.loadMoreButton);o.searchForm.reset()}}function l(e){e.classList.add("visually-hidden")}function h(e){e.classList.remove("visually-hidden")}function b(e){console.log(e),f.show({message:"An error occurred while fetching photos. Please, try again later.",position:"bottomCenter",backgroundColor:"#ff5757",messageColor:"#ffffff",theme:"dark",maxWidth:"350px"})}function k(){const s=o.gallery.children[0].getBoundingClientRect().height*2;scrollBy({top:s,behavior:"smooth"})}function v(e,r){if(e===0){f.show({message:"No images matching your search query. Please try again!",position:"bottomCenter",backgroundColor:"#ff66c4",messageColor:"#ffffff",theme:"dark",maxWidth:"350px"}),l(o.loader),l(o.loadMoreButton),o.searchForm.reset();return}d=Math.ceil(e/M);const s=g(r);o.gallery.insertAdjacentHTML("beforeend",s),y.refresh(),m()}
//# sourceMappingURL=commonHelpers.js.map
