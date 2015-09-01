﻿/**
 * @preserve Slimmage 0.4.1, use with ImageResizer. MIT/Apache2 dual licensed by Imazen 
 */
(function(n){"use strict";var t=window.slimmage||{},i;window.slimmage=t;t.verbose===undefined&&(t.verbose=!1);t.tryWebP===undefined&&(t.tryWebP=!1);t.maxWidth===undefined&&(t.maxWidth=2048);t.widthStep===undefined&&(t.widthStep=160);t.jpegQuality===undefined&&(t.jpegQuality=90);t.jpegRetinaQuality===undefined&&(t.jpegRetinaQuality=80);t.webpTimeout===undefined&&(t.webpTimeout=0);t.changed=[];i=function(){if(t.verbose&&n.console&&n.console.log)try{n.console.log.apply(n.console,arguments)}catch(i){}};t.beginWebPTest=function(){if(t.tryWebP&&!t._testingWebP){t._testingWebP=!0;var n=new Image;n.onload=n.onerror=function(){t.webp=n.height==2;t._testingWebP=!1;t.cr&&t.cr()};n.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"}};t.beginWebPTest();t.setAttr=function(n,t,i){t=t.toLowerCase();t=="class"?n.className=i:t=="tabindex"?n.tabIndex=i:t=="usemap"?n.useMap=i:n.setAttribute(t,i)};t.setAttribute=t.setAttr;t.is_blank=function(n){return n==="none"||n===null||n===undefined||n===""||n===!1};t.getCssValue=function(n,i){var r=typeof getComputedStyle!="undefined"&&window.getComputedStyle(n,null).getPropertyValue(i);return t.is_blank(r)?(n.currentStyle&&(r=n.currentStyle[i.replace(/([a-z])\-([a-z])/,function(n,t,i){return t+i.toUpperCase()})]||n.currentStyle[i]),t.is_blank(r)?null:r):r};t.getCssPixels=function(n,i){var u=t.getCssValue(n,i),r,f;return u===null||u==="0"||u===0?u:u.slice(-2)=="px"?parseFloat(u.slice(0,-2)):(r=document.createElement("div"),r.style.overflow=r.style.visibility="hidden",r.style.cssFloat="none",n.parentNode.appendChild(r),r.style.width=u,f=r.offsetWidth,n.parentNode.removeChild(r),f)};t.nodesToArray=function(n){for(var i=[],t=n.length>>>0;t--;)i[t]=n[t];return i};t.mutateUrl=function(n,t,i,r){var u=/^([^?#]*)?(\?([^#]*))?(#.*)?/.exec(n),f=u[3]||"",e=/(^&*|&+)([^&=]*)=?([^&]*)/g,o;return f.replace(e,t),o="?"+f.replace(e,i).replace(/(?:^\?*&*)|(?:[?&]+$)/g,"").replace(/&&+/g,"&"),(u[1]||"")+r(o)+(u[4]||"")};t.getImageInfo=function(n,i,r,u){var e={webp:t.webp,width:n,dpr:window.devicePixelRatio||1,src:i,element:u},l=t.webp?65:t.jpegRetinaQuality,a=t.webp?78:t.jpegQuality,c,h,s;if(e.quality=e.dpr>1.49?l:a,c=n*e.dpr,e.requestedWidth=Math.min(t.maxWidth,Math.round(Math.ceil(c/t.widthStep)*t.widthStep)),h=t.adjustImageParameters,h&&typeof h=="function"&&h(e),s=e.requestedWidth,s>r){var o={},f={},v=t.mutateUrl(i,function(n,t,i,r){o[i.toLowerCase()]=r},function(n,t,i){if(f.zoom===undefined&&(f.zoom=parseFloat(o.zoom||1),isNaN(f.zoom)&&(f.zoom=1),f.w=(s/f.zoom).toFixed()),f.ratio===undefined){var r=parseFloat(o.width||o.w||o.maxwidth),u=parseFloat(o.height||o.h||o.maxheight);!isNaN(r)&&!isNaN(u)&&r>0&&u>0?(f.ratio=r/u,f.h=(s/f.zoom/r*u).toFixed()):f.ratio="noclue"}return i.match(/^format$/i)&&e.webp?t+"format=webp":i.match(/^quality/i)?t+"quality="+e.quality:i.match(/^(w|width|maxwidth)$/i)?t+i+"="+f.w:i.match(/^(h|height|maxheight)$/i)?t+i+"="+f.h:n},function(n){return n});return{src:v,"data-pixel-width":s}}return null};t.adjustImageSrc=function(n,r){var f=t.getCssPixels(n,"max-width"),u=t.getImageInfo(f,r,n.getAttribute("data-pixel-width")|0,n),e;u?(n.src=u.src,t.setAttr(n,"data-pixel-width",u["data-pixel-width"]),t.enforceCss&&(f<u["data-pixel-width"]?(n.style.width=t.getCssValue(n,"max-width"),t.setAttr(n,"data-width-enforced",!0)):n.style.width="auto"),t.changed.push(n),i("Slimming: updating "+u.src)):t.enforceCss&&n.getAttribute("data-width-enforced")&&(e=parseFloat(n.getAttribute("data-pixel-width")),!isNaN(e)&&f>=e&&(n.style.width="auto",n.removeAttribute("data-width-enforced")))};t.cr=function(r){var h,k,c,d,e,g,u,l,a,p,v,o,w,f,b,s,it,y;if(t.timeoutid>0&&n.clearTimeout(t.timeoutid),t.timeoutid=0,t._testingWebP&&t.webpTimeout>0&&!t.webp_waiting&&(t.webp_waiting=!0,r=t.webpTimeout),r&&r>0){t.timeoutid=n.setTimeout(t.cr,r);return}var rt=(new Date).getTime(),nt=0,tt=t.nodesToArray(n.document.getElementsByTagName("noscript"));for(h=0,k=tt.length;h<k;h++)if(u=tt[h],u.getAttribute("data-slimmage")!==null){if(l=n.document.createElement("div"),a=u.textContent||u.innerHTML,a&&a.replace(/[\s\t\r\n]+/,"").length!==0)l.innerHTML=a.replace(/\s+src\s*=\s*(['"])/i," data-src=$1").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");else{for(p=new Image,v=0;v<u.attributes.length;v++)o=u.attributes[v],o&&o.specified&&o.name.indexOf("data-img-")===0&&t.setAttr(p,o.name.slice(9-o.name.length),o.value);l.appendChild(p)}for(w=l.getElementsByTagName("img"),c=0,d=w.length;c<d;c++)f=w[c],f.src!==null&&f.src.length>0&&(t.setAttr(f,"data-src",f.src),f.src=""),t.setAttr(f,"data-slimmage",!0),u.parentNode.insertBefore(f,u),nt++;u.parentNode.removeChild(u)}for("function"==typeof t.beforeAdjustSrc&&t.beforeAdjustSrc(),b=0,s=t.nodesToArray(n.document.getElementsByTagName("img")),e=0,g=s.length;e<g;e++)s[e].getAttribute("data-slimmage")!==null&&(it=s[e].getAttribute("data-src")||s[e].src,t.adjustImageSrc(s[e],it),b++);y=t.changed.slice();t.changed.length=0;(y.length>0||!t.readyCalled)&&"function"==typeof t.readyCallback&&(t.readyCallback(y),t.readyCalled=!0);i("Slimmage: restored "+nt+" images from noscript tags, checked "+b+" images, changed "+y.length+". "+((new Date).getTime()-rt)+"ms")};t.checkResponsiveImages=t.cr;n.addEventListener?(n.addEventListener("resize",function(){t.cr(500)},!1),n.addEventListener("DOMContentLoaded",function(){t.cr();n.removeEventListener("load",t.cr,!1)},!1),n.addEventListener("load",t.cr,!1)):n.attachEvent&&(n.attachEvent("onload",t.cr),n.attachEvent("onresize",function(){t.cr(500)}))})(this);
//# sourceMappingURL=slimmage.min.js.map
