window.tocas = {
    config: {
        strict_responsive: false,
    },
}

window.tocas_modules = []

//
;(function () {
    /* ==========================================================================
       Floating UI
       ========================================================================== */

    // 1.2.2

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).TocasFloatingUICore={})}(this,(function(t){"use strict";function e(t){return t.split("-")[1]}function n(t){return"y"===t?"height":"width"}function i(t){return t.split("-")[0]}function o(t){return["top","bottom"].includes(i(t))?"x":"y"}function r(t,r,a){let{reference:l,floating:s}=t;const f=l.x+l.width/2-s.width/2,c=l.y+l.height/2-s.height/2,u=o(r),m=n(u),d=l[m]/2-s[m]/2,g="x"===u;let p;switch(i(r)){case"top":p={x:f,y:l.y-s.height};break;case"bottom":p={x:f,y:l.y+l.height};break;case"right":p={x:l.x+l.width,y:c};break;case"left":p={x:l.x-s.width,y:c};break;default:p={x:l.x,y:l.y}}switch(e(r)){case"start":p[u]-=d*(a&&g?-1:1);break;case"end":p[u]+=d*(a&&g?-1:1)}return p}function a(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function l(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function s(t,e){var n;void 0===e&&(e={});const{x:i,y:o,platform:r,rects:s,elements:f,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:g=!1,padding:p=0}=e,h=a(p),y=f[g?"floating"===d?"reference":"floating":d],x=l(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(y)))||n?y:y.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(f.floating)),boundary:u,rootBoundary:m,strategy:c})),w="floating"===d?{...s.floating,x:i,y:o}:s.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(f.floating)),b=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},R=l(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:v,strategy:c}):w);return{top:(x.top-R.top+h.top)/b.y,bottom:(R.bottom-x.bottom+h.bottom)/b.y,left:(x.left-R.left+h.left)/b.x,right:(R.right-x.right+h.right)/b.x}}const f=Math.min,c=Math.max;function u(t,e,n){return c(t,f(e,n))}const m=["top","right","bottom","left"],d=m.reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]),g={left:"right",right:"left",bottom:"top",top:"bottom"};function p(t){return t.replace(/left|right|bottom|top/g,(t=>g[t]))}function h(t,i,r){void 0===r&&(r=!1);const a=e(t),l=o(t),s=n(l);let f="x"===l?a===(r?"end":"start")?"right":"left":"start"===a?"bottom":"top";return i.reference[s]>i.floating[s]&&(f=p(f)),{main:f,cross:p(f)}}const y={start:"end",end:"start"};function x(t){return t.replace(/start|end/g,(t=>y[t]))}function w(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function v(t){return m.some((e=>t[e]>=0))}function b(t){return"x"===t?"y":"x"}t.arrow=t=>({name:"arrow",options:t,async fn(i){const{element:r,padding:l=0}=t||{},{x:s,y:f,placement:c,rects:m,platform:d,elements:g}=i;if(null==r)return{};const p=a(l),h={x:s,y:f},y=o(c),x=n(y),w=await d.getDimensions(r),v="y"===y,b=v?"top":"left",R=v?"bottom":"right",A=v?"clientHeight":"clientWidth",P=m.reference[x]+m.reference[y]-h[y]-m.floating[x],T=h[y]-m.reference[y],O=await(null==d.getOffsetParent?void 0:d.getOffsetParent(r));let E=O?O[A]:0;E&&await(null==d.isElement?void 0:d.isElement(O))||(E=g.floating[A]||m.floating[x]);const D=P/2-T/2,L=p[b],k=E-w[x]-p[R],C=E/2-w[x]/2+D,B=u(L,C,k),H=null!=e(c)&&C!=B&&m.reference[x]/2-(C<L?p[b]:p[R])-w[x]/2<0;return{[y]:h[y]-(H?C<L?L-C:k-C:0),data:{[y]:B,centerOffset:C-B}}}}),t.autoPlacement=function(t){return void 0===t&&(t={}),{name:"autoPlacement",options:t,async fn(n){var o,r,a;const{rects:l,middlewareData:f,placement:c,platform:u,elements:m}=n,{crossAxis:g=!1,alignment:p,allowedPlacements:y=d,autoAlignment:w=!0,...v}=t,b=void 0!==p||y===d?function(t,n,o){return(t?[...o.filter((n=>e(n)===t)),...o.filter((n=>e(n)!==t))]:o.filter((t=>i(t)===t))).filter((i=>!t||e(i)===t||!!n&&x(i)!==i))}(p||null,w,y):y,R=await s(n,v),A=(null==(o=f.autoPlacement)?void 0:o.index)||0,P=b[A];if(null==P)return{};const{main:T,cross:O}=h(P,l,await(null==u.isRTL?void 0:u.isRTL(m.floating)));if(c!==P)return{reset:{placement:b[0]}};const E=[R[i(P)],R[T],R[O]],D=[...(null==(r=f.autoPlacement)?void 0:r.overflows)||[],{placement:P,overflows:E}],L=b[A+1];if(L)return{data:{index:A+1,overflows:D},reset:{placement:L}};const k=D.map((t=>{const n=e(t.placement);return[t.placement,n&&g?t.overflows.slice(0,2).reduce(((t,e)=>t+e),0):t.overflows[0],t.overflows]})).sort(((t,e)=>t[1]-e[1])),C=(null==(a=k.filter((t=>t[2].slice(0,e(t[0])?2:3).every((t=>t<=0))))[0])?void 0:a[0])||k[0][0];return C!==c?{data:{index:A+1,overflows:D},reset:{placement:C}}:{}}}},t.computePosition=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:a=[],platform:l}=n,s=a.filter(Boolean),f=await(null==l.isRTL?void 0:l.isRTL(e));let c=await l.getElementRects({reference:t,floating:e,strategy:o}),{x:u,y:m}=r(c,i,f),d=i,g={},p=0;for(let n=0;n<s.length;n++){const{name:a,fn:h}=s[n],{x:y,y:x,data:w,reset:v}=await h({x:u,y:m,initialPlacement:i,placement:d,strategy:o,middlewareData:g,rects:c,platform:l,elements:{reference:t,floating:e}});u=null!=y?y:u,m=null!=x?x:m,g={...g,[a]:{...g[a],...w}},v&&p<=50&&(p++,"object"==typeof v&&(v.placement&&(d=v.placement),v.rects&&(c=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:o}):v.rects),({x:u,y:m}=r(c,d,f))),n=-1)}return{x:u,y:m,placement:d,strategy:o,middlewareData:g}},t.detectOverflow=s,t.flip=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(n){var o;const{placement:r,middlewareData:a,rects:l,initialPlacement:f,platform:c,elements:u}=n,{mainAxis:m=!0,crossAxis:d=!0,fallbackPlacements:g,fallbackStrategy:y="bestFit",fallbackAxisSideDirection:w="none",flipAlignment:v=!0,...b}=t,R=i(r),A=i(f)===f,P=await(null==c.isRTL?void 0:c.isRTL(u.floating)),T=g||(A||!v?[p(f)]:function(t){const e=p(t);return[x(t),e,x(e)]}(f));g||"none"===w||T.push(...function(t,n,o,r){const a=e(t);let l=function(t,e,n){const i=["left","right"],o=["right","left"],r=["top","bottom"],a=["bottom","top"];switch(t){case"top":case"bottom":return n?e?o:i:e?i:o;case"left":case"right":return e?r:a;default:return[]}}(i(t),"start"===o,r);return a&&(l=l.map((t=>t+"-"+a)),n&&(l=l.concat(l.map(x)))),l}(f,v,w,P));const O=[f,...T],E=await s(n,b),D=[];let L=(null==(o=a.flip)?void 0:o.overflows)||[];if(m&&D.push(E[R]),d){const{main:t,cross:e}=h(r,l,P);D.push(E[t],E[e])}if(L=[...L,{placement:r,overflows:D}],!D.every((t=>t<=0))){var k,C;const t=((null==(k=a.flip)?void 0:k.index)||0)+1,e=O[t];if(e)return{data:{index:t,overflows:L},reset:{placement:e}};let n=null==(C=L.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:C.placement;if(!n)switch(y){case"bestFit":{var B;const t=null==(B=L.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:B[0];t&&(n=t);break}case"initialPlacement":n=f}if(r!==n)return{reset:{placement:n}}}return{}}}},t.hide=function(t){return void 0===t&&(t={}),{name:"hide",options:t,async fn(e){const{strategy:n="referenceHidden",...i}=t,{rects:o}=e;switch(n){case"referenceHidden":{const t=w(await s(e,{...i,elementContext:"reference"}),o.reference);return{data:{referenceHiddenOffsets:t,referenceHidden:v(t)}}}case"escaped":{const t=w(await s(e,{...i,altBoundary:!0}),o.floating);return{data:{escapedOffsets:t,escaped:v(t)}}}default:return{}}}}},t.inline=function(t){return void 0===t&&(t={}),{name:"inline",options:t,async fn(e){const{placement:n,elements:r,rects:s,platform:u,strategy:m}=e,{padding:d=2,x:g,y:p}=t,h=l(u.convertOffsetParentRelativeRectToViewportRelativeRect?await u.convertOffsetParentRelativeRectToViewportRelativeRect({rect:s.reference,offsetParent:await(null==u.getOffsetParent?void 0:u.getOffsetParent(r.floating)),strategy:m}):s.reference),y=await(null==u.getClientRects?void 0:u.getClientRects(r.reference))||[],x=a(d);const w=await u.getElementRects({reference:{getBoundingClientRect:function(){if(2===y.length&&y[0].left>y[1].right&&null!=g&&null!=p)return y.find((t=>g>t.left-x.left&&g<t.right+x.right&&p>t.top-x.top&&p<t.bottom+x.bottom))||h;if(y.length>=2){if("x"===o(n)){const t=y[0],e=y[y.length-1],o="top"===i(n),r=t.top,a=e.bottom,l=o?t.left:e.left,s=o?t.right:e.right;return{top:r,bottom:a,left:l,right:s,width:s-l,height:a-r,x:l,y:r}}const t="left"===i(n),e=c(...y.map((t=>t.right))),r=f(...y.map((t=>t.left))),a=y.filter((n=>t?n.left===r:n.right===e)),l=a[0].top,s=a[a.length-1].bottom;return{top:l,bottom:s,left:r,right:e,width:e-r,height:s-l,x:r,y:l}}return h}},floating:r.floating,strategy:m});return s.reference.x!==w.reference.x||s.reference.y!==w.reference.y||s.reference.width!==w.reference.width||s.reference.height!==w.reference.height?{reset:{rects:w}}:{}}}},t.limitShift=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:n,y:r,placement:a,rects:l,middlewareData:s}=e,{offset:f=0,mainAxis:c=!0,crossAxis:u=!0}=t,m={x:n,y:r},d=o(a),g=b(d);let p=m[d],h=m[g];const y="function"==typeof f?f(e):f,x="number"==typeof y?{mainAxis:y,crossAxis:0}:{mainAxis:0,crossAxis:0,...y};if(c){const t="y"===d?"height":"width",e=l.reference[d]-l.floating[t]+x.mainAxis,n=l.reference[d]+l.reference[t]-x.mainAxis;p<e?p=e:p>n&&(p=n)}if(u){var w,v;const t="y"===d?"width":"height",e=["top","left"].includes(i(a)),n=l.reference[g]-l.floating[t]+(e&&(null==(w=s.offset)?void 0:w[g])||0)+(e?0:x.crossAxis),o=l.reference[g]+l.reference[t]+(e?0:(null==(v=s.offset)?void 0:v[g])||0)-(e?x.crossAxis:0);h<n?h=n:h>o&&(h=o)}return{[d]:p,[g]:h}}}},t.offset=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(n){const{x:r,y:a}=n,l=await async function(t,n){const{placement:r,platform:a,elements:l}=t,s=await(null==a.isRTL?void 0:a.isRTL(l.floating)),f=i(r),c=e(r),u="x"===o(r),m=["left","top"].includes(f)?-1:1,d=s&&u?-1:1,g="function"==typeof n?n(t):n;let{mainAxis:p,crossAxis:h,alignmentAxis:y}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...g};return c&&"number"==typeof y&&(h="end"===c?-1*y:y),u?{x:h*d,y:p*m}:{x:p*m,y:h*d}}(n,t);return{x:r+l.x,y:a+l.y,data:l}}}},t.rectToClientRect=l,t.shift=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:a}=e,{mainAxis:l=!0,crossAxis:f=!1,limiter:c={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...m}=t,d={x:n,y:r},g=await s(e,m),p=o(i(a)),h=b(p);let y=d[p],x=d[h];if(l){const t="y"===p?"bottom":"right";y=u(y+g["y"===p?"top":"left"],y,y-g[t])}if(f){const t="y"===h?"bottom":"right";x=u(x+g["y"===h?"top":"left"],x,x-g[t])}const w=c.fn({...e,[p]:y,[h]:x});return{...w,data:{x:w.x-n,y:w.y-r}}}}},t.size=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(n){const{placement:r,rects:a,platform:l,elements:u}=n,{apply:m=(()=>{}),...d}=t,g=await s(n,d),p=i(r),h=e(r),y="x"===o(r),{width:x,height:w}=a.floating;let v,b;"top"===p||"bottom"===p?(v=p,b=h===(await(null==l.isRTL?void 0:l.isRTL(u.floating))?"start":"end")?"left":"right"):(b=p,v="end"===h?"top":"bottom");const R=w-g[v],A=x-g[b];let P=R,T=A;if(y?T=f(x-g.right-g.left,A):P=f(w-g.bottom-g.top,R),!n.middlewareData.shift&&!h){const t=c(g.left,0),e=c(g.right,0),n=c(g.top,0),i=c(g.bottom,0);y?T=x-2*(0!==t||0!==e?t+e:c(g.left,g.right)):P=w-2*(0!==n||0!==i?n+i:c(g.top,g.bottom))}await m({...n,availableWidth:T,availableHeight:P});const O=await l.getDimensions(u.floating);return x!==O.width||w!==O.height?{reset:{rects:!0}}:{}}}},Object.defineProperty(t,"__esModule",{value:!0})}));

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@floating-ui/core")):"function"==typeof define&&define.amd?define(["exports","@floating-ui/core"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).TocasFloatingUIDOM={},t.TocasFloatingUICore)}(this,(function(t,e){"use strict";function n(t){var e;return(null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function o(t){return n(t).getComputedStyle(t)}const i=Math.min,r=Math.max,l=Math.round;function c(t){const e=o(t);let n=parseFloat(e.width),i=parseFloat(e.height);const r=t.offsetWidth,c=t.offsetHeight,f=l(n)!==r||l(i)!==c;return f&&(n=r,i=c),{width:n,height:i,fallback:f}}function f(t){return h(t)?(t.nodeName||"").toLowerCase():""}let s;function u(){if(s)return s;const t=navigator.userAgentData;return t&&Array.isArray(t.brands)?(s=t.brands.map((t=>t.brand+"/"+t.version)).join(" "),s):navigator.userAgent}function a(t){return t instanceof n(t).HTMLElement}function d(t){return t instanceof n(t).Element}function h(t){return t instanceof n(t).Node}function p(t){if("undefined"==typeof ShadowRoot)return!1;return t instanceof n(t).ShadowRoot||t instanceof ShadowRoot}function g(t){const{overflow:e,overflowX:n,overflowY:i,display:r}=o(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!["inline","contents"].includes(r)}function m(t){return["table","td","th"].includes(f(t))}function y(t){const e=/firefox/i.test(u()),n=o(t),i=n.backdropFilter||n.WebkitBackdropFilter;return"none"!==n.transform||"none"!==n.perspective||!!i&&"none"!==i||e&&"filter"===n.willChange||e&&!!n.filter&&"none"!==n.filter||["transform","perspective"].some((t=>n.willChange.includes(t)))||["paint","layout","strict","content"].some((t=>{const e=n.contain;return null!=e&&e.includes(t)}))}function w(){return/^((?!chrome|android).)*safari/i.test(u())}function x(t){return["html","body","#document"].includes(f(t))}function b(t){return d(t)?t:t.contextElement}const v={x:1,y:1};function L(t){const e=b(t);if(!a(e))return v;const n=e.getBoundingClientRect(),{width:o,height:i,fallback:r}=c(e);let f=(r?l(n.width):n.width)/o,s=(r?l(n.height):n.height)/i;return f&&Number.isFinite(f)||(f=1),s&&Number.isFinite(s)||(s=1),{x:f,y:s}}function T(t,o,i,r){var l,c;void 0===o&&(o=!1),void 0===i&&(i=!1);const f=t.getBoundingClientRect(),s=b(t);let u=v;o&&(r?d(r)&&(u=L(r)):u=L(t));const a=s?n(s):window,h=w()&&i;let p=(f.left+(h&&(null==(l=a.visualViewport)?void 0:l.offsetLeft)||0))/u.x,g=(f.top+(h&&(null==(c=a.visualViewport)?void 0:c.offsetTop)||0))/u.y,m=f.width/u.x,y=f.height/u.y;if(s){const t=n(s),e=r&&d(r)?n(r):r;let o=t.frameElement;for(;o&&r&&e!==t;){const t=L(o),e=o.getBoundingClientRect(),i=getComputedStyle(o);e.x+=(o.clientLeft+parseFloat(i.paddingLeft))*t.x,e.y+=(o.clientTop+parseFloat(i.paddingTop))*t.y,p*=t.x,g*=t.y,m*=t.x,y*=t.y,p+=e.x,g+=e.y,o=n(o).frameElement}}return e.rectToClientRect({width:m,height:y,x:p,y:g})}function O(t){return((h(t)?t.ownerDocument:t.document)||window.document).documentElement}function R(t){return d(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function P(t){return T(O(t)).left+R(t).scrollLeft}function E(t){if("html"===f(t))return t;const e=t.assignedSlot||t.parentNode||p(t)&&t.host||O(t);return p(e)?e.host:e}function C(t){const e=E(t);return x(e)?e.ownerDocument.body:a(e)&&g(e)?e:C(e)}function j(t,e){var o;void 0===e&&(e=[]);const i=C(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=n(i);return r?e.concat(l,l.visualViewport||[],g(i)?i:[]):e.concat(i,j(i))}function F(t,i,l){let c;if("viewport"===i)c=function(t,e){const o=n(t),i=O(t),r=o.visualViewport;let l=i.clientWidth,c=i.clientHeight,f=0,s=0;if(r){l=r.width,c=r.height;const t=w();(!t||t&&"fixed"===e)&&(f=r.offsetLeft,s=r.offsetTop)}return{width:l,height:c,x:f,y:s}}(t,l);else if("document"===i)c=function(t){const e=O(t),n=R(t),i=t.ownerDocument.body,l=r(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=r(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let f=-n.scrollLeft+P(t);const s=-n.scrollTop;return"rtl"===o(i).direction&&(f+=r(e.clientWidth,i.clientWidth)-l),{width:l,height:c,x:f,y:s}}(O(t));else if(d(i))c=function(t,e){const n=T(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=a(t)?L(t):{x:1,y:1};return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(i,l);else{const e={...i};if(w()){var f,s;const o=n(t);e.x-=(null==(f=o.visualViewport)?void 0:f.offsetLeft)||0,e.y-=(null==(s=o.visualViewport)?void 0:s.offsetTop)||0}c=e}return e.rectToClientRect(c)}function D(t,e){return a(t)&&"fixed"!==o(t).position?e?e(t):t.offsetParent:null}function S(t,e){const i=n(t);let r=D(t,e);for(;r&&m(r)&&"static"===o(r).position;)r=D(r,e);return r&&("html"===f(r)||"body"===f(r)&&"static"===o(r).position&&!y(r))?i:r||function(t){let e=E(t);for(;a(e)&&!x(e);){if(y(e))return e;e=E(e)}return null}(t)||i}function W(t,e,n){const o=a(e),i=O(e),r=T(t,!0,"fixed"===n,e);let l={scrollLeft:0,scrollTop:0};const c={x:0,y:0};if(o||!o&&"fixed"!==n)if(("body"!==f(e)||g(i))&&(l=R(e)),a(e)){const t=T(e,!0);c.x=t.x+e.clientLeft,c.y=t.y+e.clientTop}else i&&(c.x=P(i));return{x:r.left+l.scrollLeft-c.x,y:r.top+l.scrollTop-c.y,width:r.width,height:r.height}}const A={getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:l,strategy:c}=t;const s="clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let i=j(t).filter((t=>d(t)&&"body"!==f(t))),r=null;const l="fixed"===o(t).position;let c=l?E(t):t;for(;d(c)&&!x(c);){const t=o(c),e=y(c);"fixed"===t.position?r=null:(l?e||r:e||"static"!==t.position||!r||!["absolute","fixed"].includes(r.position))?r=t:i=i.filter((t=>t!==c)),c=E(c)}return e.set(t,i),i}(e,this._c):[].concat(n),u=[...s,l],a=u[0],h=u.reduce(((t,n)=>{const o=F(e,n,c);return t.top=r(o.top,t.top),t.right=i(o.right,t.right),t.bottom=i(o.bottom,t.bottom),t.left=r(o.left,t.left),t}),F(e,a,c));return{width:h.right-h.left,height:h.bottom-h.top,x:h.left,y:h.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=a(n),r=O(n);if(n===r)return e;let l={scrollLeft:0,scrollTop:0},c={x:1,y:1};const s={x:0,y:0};if((i||!i&&"fixed"!==o)&&(("body"!==f(n)||g(r))&&(l=R(n)),a(n))){const t=T(n);c=L(n),s.x=t.x+n.clientLeft,s.y=t.y+n.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-l.scrollLeft*c.x+s.x,y:e.y*c.y-l.scrollTop*c.y+s.y}},isElement:d,getDimensions:function(t){return a(t)?c(t):t.getBoundingClientRect()},getOffsetParent:S,getDocumentElement:O,getScale:L,async getElementRects(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||S,r=this.getDimensions;return{reference:W(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===o(t).direction};Object.defineProperty(t,"arrow",{enumerable:!0,get:function(){return e.arrow}}),Object.defineProperty(t,"autoPlacement",{enumerable:!0,get:function(){return e.autoPlacement}}),Object.defineProperty(t,"detectOverflow",{enumerable:!0,get:function(){return e.detectOverflow}}),Object.defineProperty(t,"flip",{enumerable:!0,get:function(){return e.flip}}),Object.defineProperty(t,"hide",{enumerable:!0,get:function(){return e.hide}}),Object.defineProperty(t,"inline",{enumerable:!0,get:function(){return e.inline}}),Object.defineProperty(t,"limitShift",{enumerable:!0,get:function(){return e.limitShift}}),Object.defineProperty(t,"offset",{enumerable:!0,get:function(){return e.offset}}),Object.defineProperty(t,"shift",{enumerable:!0,get:function(){return e.shift}}),Object.defineProperty(t,"size",{enumerable:!0,get:function(){return e.size}}),t.autoUpdate=function(t,e,n,o){void 0===o&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:l=!0,animationFrame:c=!1}=o,f=i&&!c,s=f||r?[...d(t)?j(t):t.contextElement?j(t.contextElement):[],...j(e)]:[];s.forEach((t=>{f&&t.addEventListener("scroll",n,{passive:!0}),r&&t.addEventListener("resize",n)}));let u,a=null;if(l){let o=!0;a=new ResizeObserver((()=>{o||n(),o=!1})),d(t)&&!c&&a.observe(t),d(t)||!t.contextElement||c||a.observe(t.contextElement),a.observe(e)}let h=c?T(t):null;return c&&function e(){const o=T(t);!h||o.x===h.x&&o.y===h.y&&o.width===h.width&&o.height===h.height||n();h=o,u=requestAnimationFrame(e)}(),n(),()=>{var t;s.forEach((t=>{f&&t.removeEventListener("scroll",n),r&&t.removeEventListener("resize",n)})),null==(t=a)||t.disconnect(),a=null,c&&cancelAnimationFrame(u)}},t.computePosition=(t,n,o)=>{const i=new Map,r={platform:A,...o},l={...r.platform,_c:i};return e.computePosition(t,n,{...r,platform:l})},t.getOverflowAncestors=j,t.platform=A,Object.defineProperty(t,"__esModule",{value:!0})}));


    /* ==========================================================================
       Responsive
       ========================================================================== */

    class Responsive {
    constructor() {
        // 這個 ResizeObserver 會監聽所有 Container 的尺寸異動，
        // 如果有異動就檢查裡面的所有響應式元素是否需要變動樣式。
        this.resize_observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.getAllContaineredElements(entry.target).forEach(element => {
                    this.check(element)
                })
            })
        })
    }

    // attributeMutation
    attributeMutation = mutation => {
        // 如果有任何樣式異動，就馬上檢查這個元素的響應式渲染。
        // NOTE: 他目前會造成無限迴圈 :(
        // this.check(mutation.target);

        // 如果這個元素被追加 Container 樣式，就把他視為容器來監聽尺寸異動，
        // 但如果不再是 Container 的話，就從監聽裡移除。
        if (this.isContainer(mutation.target)) {
            this.resize_observer.observe(mutation.target)
        } else {
            this.resize_observer.unobserve(mutation.target)
        }
    }

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個追加的新元素帶有響應式樣式，就立即檢查響應式渲染。
        if (this.isResponsiveElement(added_node)) {
            this.check(added_node)
        }

        // 如果這個追加的新元素是一個 Container，就納入容器的尺寸監聽裡。
        if (this.isContainer(added_node)) {
            this.resize_observer.observe(added_node)
        }
    }

    // getAllContaineredElements
    getAllContaineredElements = container => {
        return container.querySelectorAll(
            tocas.config.strict_responsive ? `[class^="@"]:is([class*=":is-"],[class*=":has-"])` : `[class^="@"][class*=":"]`
        )
    }

    // getAllResponsiveElements
    getAllResponsiveElements = container => {
        return container.querySelectorAll(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":has-"]` : `[class*=":"]`)
    }

    // isContainer
    isContainer = element => {
        return element.matches(`[class~="@container"]`)
    }

    // isResponsiveElement
    isResponsiveElement = element => {
        return element.matches(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":has-"]` : `[class*=":"]`)
    }

    // hasResponsiveClass
    hasResponsiveClass = class_name => {
        return tocas.config.strict_responsive ? class_name.includes(":is-") || class_name.includes(":has-") : class_name.includes(":")
    }

    // windowResize
    windowResize = () => {
        this.getAllResponsiveElements(document).forEach(element => {
            this.check(element)
        })
    }

    // unit
    unit = value => {
        return parseInt(value, 10) || 0
    }

    // breakpointSize
    breakpointSize = (breakpoint, element) => {
        var style = window.getComputedStyle(element)

        return {
            min: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-min`)),
            max: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-max`)),
        }
    }

    // rule
    rule = (rule, element) => {
        // 判斷規則有沒有 @ 開頭來看是不是一個 Container Query。
        // @breakpoint
        var is_container_query = rule.startsWith("@")

        // 判斷規則的結尾有沒有 + 來看是不是要求大於或等於這個中斷點。
        // breakpoint+, [size]+
        var is_equal_or_greater = rule.endsWith("+")

        // 判斷規則的結尾有沒有 - 來看是不是要求小於或等於這個中斷點。
        // breakpoint-, [size]-
        var is_equal_or_lesser = rule.endsWith("-")

        // 判斷這個規則有沒有包含 [ 來看是不是一個自訂尺寸，不判斷開頭是因為開頭可能是 @ 一個 Container Query。
        // [size]
        var is_custom_size = rule.includes("[")

        // 移除首要的 @ 符號。
        if (is_container_query) {
            rule = rule.substring(1)
        }

        // 移除結尾的 +, - 符號。
        if (is_equal_or_greater || is_equal_or_lesser) {
            rule = rule.substring(0, rule.length - 1)
        }

        // 移除首要跟結尾的 [ 跟 ] 符號。
        if (is_custom_size) {
            rule = rule.substring(1).substring(0, rule.length - 1)
        }

        // 從 breakpoint-breakpoint 結構中拆出 min, max 值，如果有的話。
        var [min_breakpoint, max_breakpoint] = rule.split("-")

        // 如果是自訂尺寸的話，就直接把規則當作 Unit 去解析，不去讀元素的中斷點定義。
        if (is_custom_size) {
            // 如果是大於或等於的定義，就從 Unit 裡面解析最小起始點，然後最大值設為 99999。
            // [size] +
            if (is_equal_or_greater) {
                return [this.unit(min_breakpoint), 99999]
            }

            // 如果是小於或等於的定義，最小值設為 0，然後 Unit 裡面的最小起始點就是目標最大值。
            // [size] -
            if (is_equal_or_lesser) {
                return [0, this.unit(min_breakpoint)]
            }

            // [minSize-maxSize]
            return [this.unit(min_breakpoint), this.unit(max_breakpoint)]
        }

        // 從目前這個元素繼承的中斷點來搜尋最小的定義。
        var from = this.breakpointSize(min_breakpoint, element)

        // 如果這個規則有找到最大中斷點，那麼他就是 breakpoint-breakpoint 規則
        // 所以我們取得最大中斷點的像素定義，然後同時回傳最小跟最大的定義。
        if (max_breakpoint !== undefined) {
            return [from.min, this.breakpointSize(max_breakpoint, element).max]
        }

        // 如果是大於或等於的定義，就從繼承的定義裡取得最小起始點，然後最大值設為 99999。
        // breakpoint+
        if (is_equal_or_greater) {
            return [from.min, 99999]
        }

        // 如果是小於或等於的定義，最小值設為 0，然後繼承的定義裡，最小起始點就是目標最大值。
        // breakpoint-
        if (is_equal_or_lesser) {
            return [0, from.max]
        }

        // 如果這個定義不是大於也不是小於，就取得這個中斷點的最小與最大值定義，
        // 這個規則只會在這個中斷點生效。
        // breakpoint
        return [from.min, from.max]
    }

    // compile
    compile = element => {
        return Array.from(element.classList)
            .filter(class_name => this.hasResponsiveClass(class_name))
            .map(class_name => {
                // 透過 `:` 來切分規則跟想要切換的樣式名稱。
                var [rule, target_class] = class_name.split(":")

                // 從規則解析這個樣式的中斷點起始與結束定義。
                var [min, max] = this.rule(rule, element)

                // 如果這個規則開頭有個 @ 符號，就尋找最近的 Container 容器來作為寬度判斷，
                // 但如果沒有，就以視窗的 innerWidth 為主。
                // @breakpoint
                var width = rule.startsWith("@")
                    ? Math.round(element.closest(`[class~="@container"]`).getBoundingClientRect().width)
                    : Math.round(window.innerWidth)

                return {
                    min,
                    max,
                    width,
                    target_class,
                }
            })
    }

    // check
    check = element => {
        // 這個陣列會用來記得我們在目前中斷點有哪些樣式是生效的，
        // 這樣遇到不相符的中斷點，就不會因為起衝突然後又把他們移除掉。
        var applieds = []

        // 篩選這個元素所有不含響應規則的樣式並且先把需要的樣式計算出相關中繼點來做整理。
        var compiled_list = this.compile(element)

        // 先跑一輪符合目前中斷點的樣式。
        compiled_list.forEach(({ width, min, max, target_class }) => {
            // 如果寬度符合這個中斷點，就套用對應的樣式。
            if (width >= min && width <= max) {
                element.classList.add(target_class)

                // 把這個樣式儲存到記憶陣列裡，這樣等一下就不會又移除他。
                applieds = [...applieds, target_class]
            }
        })

        // 另外跑一輪不相符的中斷點，檢查有哪些不對的樣式應該移除掉。
        compiled_list.forEach(({ width, min, max, target_class }) => {
            // 如果寬度不符合這個中斷點，而且這個樣式也不是剛才追加的，就移除這個不符合條件的樣式。
            if ((width < min || width > max) && !applieds.includes(target_class)) {
                element.classList.remove(target_class)
            }
        })
    }
}

window.tocas_modules = [...window.tocas_modules, new Responsive()]



    /* ==========================================================================
       Tab
       ========================================================================== */

    class Tab {
    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Tab 模組，就監聽其點擊事件。
        if (this.isTab(added_node)) {
            // 監聽其點擊事件。
            this.bindEventListener(added_node)

            // 如果這個項目沒有被啟用，就預設隱藏對應的內容，這樣使用者就不用額外手動隱藏該內容。
            this.initialTab(added_node)
        }
    }

    // isTab
    isTab = element => {
        return element.matches("[data-tab]")
    }

    // isActiveTab
    isActiveTab = element => {
        return element.classList.contains("is-active")
    }

    // initialTab
    initialTab = element => {
        if (!this.isActiveTab(element)) {
            document.getElementById(element.dataset.tab).classList.add("has-hidden")
        }
    }

    // toggle
    toggle = event => {
        // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的分頁模組。
        var element = event.target.closest("[data-tab]")

        // 取得這個分頁模組要切換的目標內容名稱。
        var tab_name = element.dataset.tab

        // 取得這個 `.ts-tab` 的分頁群組元素。
        var tab_group_element = element.closest(".ts-tab")

        // 建立一個陣列用來收集等一下所有不相關的分頁，這樣就可以一次關閉。
        var should_close = []

        // 在同個分頁群組裡，透過掃描每個分頁項目來找出有哪些關聯的分頁內容名稱。
        tab_group_element.querySelectorAll("[data-tab]").forEach(v => {
            // 如果這個項目就是我們要啟用的分頁，那就啟用這個項目。
            if (v.dataset.tab === tab_name) {
                v.classList.add("is-active")
            }

            // 但如果這個項目不是我們要啟用的分頁。
            else {
                // 收集這個項目的目標分頁名稱，等一下就能一次隱藏這些非目標內容。
                should_close = [...should_close, v.dataset.tab]

                // 移除這個項目的啟用狀態，因為這個項目本來就不是我們要啟用的。
                v.classList.remove("is-active")
            }
        })

        // 隱藏那些該關閉的分頁。
        should_close.forEach(id => {
            document.getElementById(id).classList.add("has-hidden")
        })

        // 顯示目標分頁。
        document.getElementById(tab_name).classList.remove("has-hidden")
    }

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.toggle)
        element.addEventListener("click", this.toggle)
    }
}

window.tocas_modules = [...window.tocas_modules, new Tab()]



    /* ==========================================================================
       Dropdown
       ========================================================================== */

    class Dropdown {
    // #dropdowns 用以隨時更新頁面上有哪些存在的彈出式選單 ID，
    // 這個清單資料來自於有被指定在 [data-dropdown] 裡的名稱。
    #dropdowns = new Set()

    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個追加的 DOM 元素是一個會觸發彈出式選單的元素，就監聽其點擊事件。
        if (this.isDropdownTrigger(added_node)) {
            this.bindEventListener(added_node)
            this.recordDropdowns(added_node)
            this.refreshTrigger(added_node)
        }

        // 如果這個追加的 DOM 元素是一個彈出式選單容器，就監聽其選項點擊事件。
        if (this.isDropdown(added_node)) {
            this.bindItemEventListener(added_node)

            // 應該不需要，因為 Dropdown 預設都一定是關的。
            //this.refreshRelatedTriggers(added_node)
        }
    }

    // removedNodeMutation
    removedNodeMutation = removed_node => {
        if (this.isDropdownTrigger(removed_node)) {
            this.unrecordDropdowns(removed_node)
        }
    }

    // isDropdownTrigger
    isDropdownTrigger = element => {
        return element.matches("[data-dropdown]")
    }

    // isDropdown
    isDropdown = element => {
        // 必須要有 .ts-dropdown 且 ID 有出現在其他元素的 data-dropdown 屬性裡面。
        return element.matches(`.ts-dropdown`) && this.#dropdowns.has(element.id)
    }

    // recordDropdowns
    recordDropdowns = trigger => {
        this.#dropdowns.add(trigger.dataset.dropdown)
    }

    // unrecordDropdowns
    unrecordDropdowns = trigger => {
        this.#dropdowns.delete(trigger.dataset.dropdown)
    }

    // refreshTrigger
    refreshTrigger = element => {
        var target = document.getElementById(element.dataset.dropdown)
        if (target === null) {
            return
        }

        var inactive_classes = element.dataset.inactive ? element.dataset.inactive.split(" ") : []
        var active_classes = element.dataset.active ? element.dataset.active.split(" ") : []

        if (target.classList.contains("is-visible")) {
            element.classList.add(...active_classes)
            element.classList.remove(...inactive_classes)
        } else {
            element.classList.add(...inactive_classes)
            element.classList.remove(...active_classes)
        }
    }

    // refreshRelatedTriggers
    refreshRelatedTriggers = target => {
        document.querySelectorAll(`[data-dropdown="${target.id}"]`).forEach(trigger => {
            this.refreshTrigger(trigger)
        })
    }

    // position
    position = element => {
        return element.dataset.position || "bottom-start"
    }

    // windowMousedown
    windowMousedown = event => {
        // 取得這個視窗點擊最鄰近的 Dropdown 模組觸發元素。
        var closest_trigger = event.target.closest("[data-dropdown]")

        // 取得這個視窗點擊最鄰近的 Dropdown 容器本身。
        var closest_dropdown = event.target.closest(".ts-dropdown")

        // 如果這個點擊事件既沒有關聯任何觸發元素，也沒有在點擊任何 Dropdown 容器，
        // 那使用者應該就是在點擊其他東西，所以關閉所有頁面上可見的彈出式選單。
        if (closest_trigger === null && closest_dropdown === null) {
            document.querySelectorAll(".ts-dropdown").forEach(dropdown => {
                this.closeDropdown(dropdown)
            })
        }

        // 如果這個點擊事件是在點擊一個會開關 Dropdown 的觸發元素。
        if (closest_trigger !== null) {
            // 取得這個觸發元素原本會打開的 Dropdown 名稱。
            var name = closest_trigger.dataset.dropdown

            // 透過該名稱搜尋對應的 Dropdown。
            var dropdown = document.getElementById(name)

            // 除了找到的這個對應 Dropdown 以外，關掉其他所有 Dropdown。
            this.closeDropdownsExcept(dropdown)
        }

        // 如果這個點擊事件是在點擊某個 Dropdown 容器或內部的項目。
        if (closest_dropdown !== null) {
            // 關閉這個 Dropdown 以外的其他所有 Dropdown。
            this.closeDropdownsExcept(closest_dropdown)
        }
    }

    // closeDropdownsExcept
    closeDropdownsExcept = excluded_dropdown => {
        document.querySelectorAll(".ts-dropdown").forEach(dropdown => {
            if (dropdown !== excluded_dropdown) {
                this.closeDropdown(dropdown)
            }
        })
    }

    // bindEventListener
    bindEventListener = element => {
        element.removeEventListener("click", this.clickEventListener)
        element.addEventListener("click", this.clickEventListener)
    }

    // bindItemEventListener
    bindItemEventListener = element => {
        element.removeEventListener("click", this.itemClickEventListener)
        element.addEventListener("click", this.itemClickEventListener)
    }

    // closeDropdown
    closeDropdown = dropdown => {
        // 如果這個元素不包含 `ts-dropdown` 或者也不是可見狀態，就忽略不計。
        if (!dropdown.classList.contains(".ts-dropdown") && !dropdown.classList.contains("is-visible")) {
            return
        }

        // 如果這個選單不在清單裡，就不要在乎是否該關閉這個選單，
        // 因為這很有可能是 .ts-dropdown 但由使用者自行控制可見狀態。
        if (!this.#dropdowns.has(dropdown.id)) {
            return
        }

        // 移除這個彈出式選單的可見狀態。
        dropdown.classList.remove("is-visible")

        // 如果這個彈出式選單有 FLoating UI 的清除函式，就呼叫該清除函式，
        // 然後重設對應的 CSS 變數。
        if (dropdown.tocas_dropdown !== undefined) {
            dropdown.tocas_dropdown()
            dropdown.tocas_dropdown = undefined
            dropdown.style.removeProperty("--ts-dropdown-min-width")
            dropdown.style.removeProperty("--ts-dropdown-position")
        }

        this.refreshRelatedTriggers(dropdown)
    }

    // itemClickEventListener
    itemClickEventListener = event => {
        // 取得這個點擊事件最鄰近的彈出式選單。
        var dropdown = event.target.closest(".ts-dropdown")

        // 如果找不到點擊事件最鄰近的選單項目，
        // 那可能點擊的不是項目而是其他容器裡的東西，那就忽略這個動作。
        if (event.target.closest(".item") === null) {
            return
        }

        // 項目點擊成功，關閉這個彈出式選單。
        this.closeDropdown(dropdown)
    }

    // clickEventListener
    clickEventListener = event => {
        var element = event.target.closest("[data-dropdown]")

        // 取得這個觸發元素會切換的彈出式選單名稱。
        var name = element.dataset.dropdown

        // 透過命名空間搜尋對應的彈出式選單。
        var target = document.getElementById(name)

        // 取得目標選單的偏好位置設定。
        var position = this.position(target)

        // 如果那個選單有 Floating UI 清除函式，就先清除並且重設相關位置設定。
        if (target.tocas_dropdown !== undefined) {
            target.tocas_dropdown()
            target.tocas_dropdown = undefined
            target.style.removeProperty("--ts-dropdown-min-width")
            target.style.removeProperty("--ts-dropdown-position")
        }

        // 切換目標彈出式選單的可見度。
        target.classList.toggle("is-visible")

        this.refreshRelatedTriggers(target)

        // 如果目標選單現在不再可見，就是被隱藏了，那就不需要執行接下來的行為。
        if (!target.classList.contains("is-visible")) {
            return
        }

        // 設定選單的最小寬度和絕對位置，至少要跟切換觸發元素一樣寬。
        target.style.setProperty("--ts-dropdown-min-width", `${element.getBoundingClientRect().width}px`)
        target.style.setProperty("--ts-dropdown-position", "fixed")

        // 透過 Floating UI 來觸發浮動顯示。
        target.tocas_dropdown = TocasFloatingUIDOM.autoUpdate(element, target, () => {
            TocasFloatingUIDOM.computePosition(element, target, {
                strategy: "fixed",
                placement: position,
                middleware: [
                    // 偏移選單的上下垂直留點空隙。
                    TocasFloatingUIDOM.offset(8),

                    // 選單某面如果沒有空間就被擠兌到另一邊。
                    TocasFloatingUIDOM.flip({
                        crossAxis: false,
                    }),

                    // 選單會被螢幕左右推移，避免超出畫面空間。
                    TocasFloatingUIDOM.shift(),

                    // 選單的寬高不會超過可用空間。
                    TocasFloatingUIDOM.size({
                        apply({ availableWidth, availableHeight, elements }) {
                            Object.assign(elements.floating.style, {
                                maxWidth: `${availableWidth}px`,
                                maxHeight: `${availableHeight}px`,
                            })
                        },
                    }),
                ],
            }).then(({ x, y }) => {
                // 賦予彈出式選單絕對位置。
                Object.assign(target.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                })
            })
        })
    }
}

window.tocas_modules = [...window.tocas_modules, new Dropdown()]



    /* ==========================================================================
       Popover
       ========================================================================== */

    class Popover {
    #touch_start_y = 0
    #touch_start_x = 0

    // #last_clicked_element 是用來紀錄最後一次點擊的元素，
    // 以此來取得若有 Popover 被打開，應該要附著在哪個觸發元素。
    #last_clicked_element = null

    // TODO: 在 Trigger 初始化的時候檢查自己的 data-inactive 樣式
    #popovers = new Set()

    // attributeMutation
    attributeMutation = mutation => {}

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個追加的 DOM 元素是一個彈出內容，就監聽其開關事件。
        if (this.isPopover(added_node)) {
            this.bindEventListener(added_node)
        }
    }

    // isPopover
    isPopover = element => {
        return element.matches(`.ts-popover[popover]`)
    }

    // position
    position = element => {
        return element.dataset.position || "bottom"
    }

    windowClick = event => {
        this.#last_clicked_element = event.target
    }

    // bindEventListener
    bindEventListener = element => {
        // 在顯示之前先隱藏，這樣出現時就不會因為重新定位而閃爍。
        element.removeEventListener("beforetoggle", this.beforetoggleEventListener)
        element.addEventListener("beforetoggle", this.beforetoggleEventListener)

        element.removeEventListener("toggle", this.toggleEventListener)
        element.addEventListener("toggle", this.toggleEventListener)

        element.removeEventListener("wheel", this.wheelEventListener)
        element.removeEventListener("touchstart", this.touchstartEventListener)
        element.removeEventListener("touchmove", this.touchmoveEventListener)

        // 監聽捲軸滾動，讓捲軸可以滾穿 Top-Layer，
        // 這樣使用者就不會被 Popover 卡住不好捲動底層頁面。
        element.addEventListener("wheel", this.wheelEventListener)
        element.addEventListener("touchstart", this.touchstartEventListener)
        element.addEventListener("touchmove", this.touchmoveEventListener)
    }

    // wheelEventListener
    wheelEventListener = event => {
        this.universalWheelHandler(event.deltaX, event.deltaY, event)
    }

    // touchstartEventListener
    touchstartEventListener = event => {
        this.#touch_start_x = event.touches[0].clientX
        this.#touch_start_y = event.touches[0].clientY
    }

    // touchmoveEventListener
    touchmoveEventListener = event => {
        var touch_end_x = event.touches[0].clientX
        var touch_end_y = event.touches[0].clientY

        var delta_x = this.#touch_start_x - touch_end_x
        var delta_y = this.#touch_start_y - touch_end_y

        // 更新起始位置為目前的觸控點位置
        this.#touch_start_x = touch_end_x
        this.#touch_start_y = touch_end_y

        this.universalWheelHandler(delta_x, delta_y, event)
    }

    // universalWheelHandler
    universalWheelHandler = (delta_x, delta_y, event) => {
        var is_scrollable = event.target.scrollHeight > event.target.clientHeight || event.target.scrollWidth > event.target.clientWidth
        // 沒有內容的 Textarea 雖然 Overflow 是 Auto，但多數瀏覽器都允許滾動下層。
        // getComputedStyle(event.target).overflow === 'auto'    ||
        // getComputedStyle(event.target).overflow === 'scroll'

        // 如果 Popover 本身就可以捲動，那就不要干涉。
        if (is_scrollable) {
            return
        }

        // 找尋可捲動的父元素，沒有的話預設就捲動整個網頁。
        // 多數瀏覽器都是往上搜尋父元素，而不是搜尋這個元素肉眼底下可捲動的容器。
        var scrolling_element = this.findScrollableParent(event.target) || document.documentElement

        // NOTE: 如果 Textarea 已經滑到底，使用者此時按住 Textarea 往下滑，並不會讓網頁捲動。
        // 主要是 Input 不會將事件冒泡給 Popover 的 ontouchmove 監聽器，這暫時不重要，先不解決。
        scrolling_element.scrollTop += delta_y
        scrolling_element.scrollLeft += delta_x
    }

    // findScrollableParent
    findScrollableParent = element => {
        var parent = element.parentElement

        while (parent) {
            const is_scrollable =
                parent.scrollHeight > parent.clientHeight ||
                parent.scrollWidth > parent.clientWidth ||
                getComputedStyle(parent).overflow === "auto" ||
                getComputedStyle(parent).overflow === "scroll"
            if (is_scrollable) {
                return parent
            }
            parent = parent.parentElement
        }
        return null
    }

    // refreshRelatedTriggers
    refreshRelatedTriggers = target => {
        document.querySelectorAll(`[popovertarget="${target.id}"]`).forEach(trigger => {
            this.refreshTrigger(trigger)
        })
    }

    // refreshTrigger
    refreshTrigger = element => {
        var target = element.popoverTargetElement
        if (!target) {
            return
        }

        var inactive_classes = element.dataset.inactive ? element.dataset.inactive.split(" ") : []
        var active_classes = element.dataset.active ? element.dataset.active.split(" ") : []

        if (target.matches(":popover-open")) {
            element.classList.add(...active_classes)
            element.classList.remove(...inactive_classes)
        } else {
            element.classList.add(...inactive_classes)
            element.classList.remove(...active_classes)
        }
    }

    // beforetoggleEventListener
    beforetoggleEventListener = event => {
        // 在顯示之前先隱藏，這樣出現時就不會因為重新定位而閃爍。
        if (event.newState === "open") {
            event.target.style.visibility = "hidden"
        }
    }

    // toggleEventListener
    toggleEventListener = event => {
        var popover = event.target

        this.refreshRelatedTriggers(popover)

        if (event.newState === "closed") {
            if (popover.tocas_popover !== undefined) {
                popover.tocas_popover()
                popover.tocas_popover = undefined
                // NOTE: 以後再來考慮 A11y。
                // target.removeAttribute("aria-expanded")
            }
            return
        }

        // 找出這個 Popover 相關的附著目標。
        var target =
            document.getElementById(popover.dataset.anchor) || // 先找這個 Popover 指定的 [data-anchor]
            this.#last_clicked_element?.closest(`[popovertarget="${event.target.id}]`) || // 再找最後一次點擊的 [popovertarget]
            document.querySelector(`[popovertarget="${event.target.id}"]`) // 再找整個網頁第一個符合跟此 Popover 有關的 [popovertarget]

        // 如果完全沒有可附著的目標就離開。
        if (!target) {
            return
        }

        // NOTE: 以後再來考慮 A11y。
        // target.setAttribute("aria-expanded", "true")

        // 取得目標選單的偏好位置設定。
        var position = this.position(popover)

        // 設定彈出內容的絕對位置。
        popover.style.setProperty("--ts-popover-position", `fixed`)

        // 現在才顯示彈出內容，這樣就不會閃爍。
        popover.style.visibility = "visible"

        // 透過 Floating UI 來觸發浮動顯示。
        popover.tocas_popover = TocasFloatingUIDOM.autoUpdate(target, popover, () => {
            TocasFloatingUIDOM.computePosition(target, popover, {
                strategy: "fixed",
                placement: position,
                middleware: [
                    // 選單某面如果沒有空間就被擠兌到另一邊。
                    TocasFloatingUIDOM.flip({
                        crossAxis: false,
                    }),

                    // 偏移彈出內容的上下垂直留點空隙。
                    TocasFloatingUIDOM.offset(8),

                    // 選單會被螢幕左右推移，避免超出畫面空間。
                    TocasFloatingUIDOM.shift(),
                ],
            }).then(({ x, y }) => {
                // 賦予彈出式選單絕對位置。
                Object.assign(popover.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                })
            })
        })
    }
}

window.tocas_modules = [...window.tocas_modules, new Popover()]



    /* ==========================================================================
       Tooltip
       ========================================================================== */

    class Tooltip {
    // attributeMutation
    attributeMutation = mutation => {
        // 如果追加的屬性包含 Tooltip 模組相關字樣，就監聽其互動事件。
        if (this.isTooltip(mutation.target)) {
            this.bindEventListener(mutation.target)
        }
    }

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果追加的 DOM 節點是一個 Tooltip 模組就監聽其互動事件。
        if (this.isTooltip(added_node)) {
            this.bindEventListener(added_node)
        }
    }

    // isTooltip
    isTooltip = element => {
        return element.matches("[data-tooltip]")
    }

    // bindEventListener
    bindEventListener = element => {
        // 重設這個元素的彈出提示計時器。
        element.tocas_tooltip_timer = null

        // 無論怎樣都先移除所有監聽事件，也不要取決於 [data-trigger]，
        // 因為新的跟舊的可能不一樣，到時候會有遺漏忘記的監聽器。
        element.removeEventListener("mouseover", this.enterEventListener)
        element.removeEventListener("mouseleave", this.leaveEventListener)
        element.removeEventListener("focusin", this.enterEventListener)
        element.removeEventListener("focusout", this.leaveEventListener)

        element.addEventListener("mouseover", this.enterEventListener)
        element.addEventListener("mouseleave", this.leaveEventListener)
        element.addEventListener("focusin", this.enterEventListener)
        element.addEventListener("focusout", this.leaveEventListener)
    }

    // delay
    delay = element => {
        // 從元素的屬性裡取得延遲的定義，如果是 0 就回傳 0。
        // 不直接丟給 parseInt 是因為可能會被當 false 值而回傳預設的 200ms。
        var delay = element.dataset.delay
        if (delay === "0") {
            return 0
        }
        return parseInt(delay, 10) || 200
    }

    // position
    position = element => {
        return element.dataset.position || "bottom"
    }

    // triggers
    triggers = element => {
        return element.dataset.trigger?.split(" ").filter(i => i) || ["hover"]
    }

    // hasTrigger
    hasTrigger = (element, trigger) => {
        return this.triggers(element).includes(trigger)
    }

    //
    enterEventListener = event => {
        var type = event.type
        var element = event.target.closest("[data-tooltip]")

        // 如果目前的裝置是觸控裝置就忽略工具提示的觸發行為。
        if (type === "mouseover" && window.matchMedia("(pointer: coarse)").matches) {
            return
        }

        // 如果滑鼠移入但是又沒有 Hover 觸發條件，就忽略滑鼠移入事件。
        // 如果是 Focus 也是一樣的道理。
        if ((type === "mouseover" && !this.hasTrigger(element, "hover")) || (type === "focusin" && !this.hasTrigger(element, "focus"))) {
            return
        }

        // 如果上一個工具提示的觸發計時器還存在或浮動元素還在的話，就忽略本次觸發行為，
        // 避免二次觸發而造成不可預期的錯誤。
        if (element.tocas_tooltip_timer !== null || element.tocas_tooltip !== undefined) {
            return
        }

        // 初始化一個會顯示工具提示的計時器，這樣滑鼠移入的數秒後就會顯示。
        element.tocas_tooltip_timer = setTimeout(() => {
            this.showTooltip(element)
        }, this.delay(element) + 1)
    }

    //
    leaveEventListener = event => {
        var type = event.type
        var element = event.target.closest("[data-tooltip]")

        // 如果滑鼠移開的元素不是主元素就忽略，
        // 因為移開事件會向上冒泡，所以可能是滑鼠移開了裡面的圖示元素，但滑鼠其實還在主元素裡。
        if (type === "mouseleave" && event.target !== element) {
            return
        }

        // 如果滑鼠移開這個元素，但這個元素有 Focus 觸發條件，且又還是在聚焦狀態，就忽略滑鼠移出事件
        // 因為使用者可能是 Hover In 又 Hover Out，但是 Focus 更重要。
        var has_focus_trigger = this.hasTrigger(element, "focus")
        var focused_element = document.activeElement.closest("[data-tooltip]")

        if (type === "mouseleave" && has_focus_trigger && focused_element === element) {
            return
        }

        // 如果浮動元素存在的話，就呼叫浮動元素的解除函式，然後歸零這個變數。
        if (element.tocas_tooltip !== undefined) {
            element.tocas_tooltip()
            element.tocas_tooltip = undefined
        }

        // 如果原先的計時器存在的話，就先重設，避免重複觸發。
        if (element.tocas_tooltip_timer !== null) {
            clearTimeout(element.tocas_tooltip_timer)
            element.tocas_tooltip_timer = null
        }

        // 取得這個工具提示的 ID。
        var tooltip_id = element.getAttribute("aria-describedby")

        // 從頁面上移除這個工具提示。
        document.getElementById(tooltip_id)?.remove()

        // 同時移除觸發元素聲明對應工具提示 ID 的輔助屬性。
        element.removeAttribute("aria-describedby")
    }

    // createTooltip
    createTooltip = (element, arrow) => {
        var tooltip = document.createElement("div")

        // 如果 [data-html] 是 "true" 的話就允許使用者在工具提示裡使用 HTML。
        if (element.dataset.html === "true") {
            tooltip.innerHTML = element.dataset.tooltip
        } else {
            tooltip.innerText = element.dataset.tooltip
        }

        // 標記這個工具提示被觸發的方式。
        tooltip.id = getID()
        tooltip.classList.add("ts-tooltip", "is-visible")
        tooltip.setAttribute("popover", "manual")
        tooltip.append(arrow)
        return tooltip
    }

    // createArrow
    createArrow = () => {
        var arrow = document.createElement("div")
        arrow.classList.add("arrow")
        return arrow
    }

    // showTooltip
    showTooltip = element => {
        // 取得這個工具提示的位置設定。
        var position = this.position(element)

        // 初始化工具提示的箭頭 DOM 元素。
        var arrow = this.createArrow()

        // 使用剛才建立的箭頭元素來初始化工具提示本身的 DOM 元素。
        var tooltip = this.createTooltip(element, arrow)

        // 將工具提示插入到網頁中。
        document.body.append(tooltip)

        // 使用 Popover API 才能在 Modal 或 Dialog, Popup 顯示，
        // 不然會被蓋在 Top-Layer 下面。
        tooltip.showPopover()

        // 將工具提示插入到 element 的旁邊，這樣就不會被其他元素擋住。
        // 例如：有些 element 在 Top-Layer。
        // NOTE: 可能要注意這會不會害使用者的一些 :last-child 選擇器被破壞。
        //element.parentNode.insertBefore(tooltip, element.nextSibling);

        // 幫目前元素加上 aria-describedby 屬性，這樣螢幕閱讀器就會知道這個元素有工具提示。
        element.setAttribute("aria-describedby", tooltip.id)

        // 使用 FloatingUI 來初始化工具提示的浮動元素。
        element.tocas_tooltip = TocasFloatingUIDOM.autoUpdate(element, tooltip, () => {
            TocasFloatingUIDOM.computePosition(element, tooltip, {
                strategy: "fixed",
                placement: position,
                middleware: [
                    // 下面過窄時會擠兌到上面。
                    TocasFloatingUIDOM.flip({
                        crossAxis: false,
                    }),

                    // 因為有箭頭所以上下軸要偏移 10px，
                    // 而容器有外距（詳見 CSS）所以左右要偏移 15px。
                    TocasFloatingUIDOM.offset({
                        //crossAxis: -15,
                        mainAxis: 10,
                    }),

                    // 會被螢幕左右推移。
                    TocasFloatingUIDOM.shift({
                        padding: 20, // 0 by default
                    }),

                    // 有箭頭。
                    TocasFloatingUIDOM.arrow({
                        element: arrow,
                    }),
                ],
            }).then(({ middlewareData, x, y, placement }) => {
                // 賦予工具提示絕對座標。
                Object.assign(tooltip.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                })

                // 設置箭頭的水平座標，因為箭頭只會出現在上面或下面，所以不需要 y 座標。
                if (middlewareData.arrow) {
                    const { x } = middlewareData.arrow
                    arrow.style.setProperty("--ts-tooltip-x", x != null ? `${x}px` : "0")
                }

                // 先移除先前的所有位置設定，再套用新的位置設定。
                if (placement) {
                    tooltip.classList.remove("is-top", "is-top-start", "is-top-end", "is-bottom", "is-bottom-start", "is-bottom-end")
                    tooltip.classList.add(`is-${placement}`)
                }
            })
        })
    }
}

window.tocas_modules = [...window.tocas_modules, new Tooltip()]



    /* ==========================================================================
       Select
       ========================================================================== */

    // @/import "tocas.select.js";

    /* ==========================================================================
       Dialog
       ========================================================================== */

    class Dialog {
    // attributeMutation
    attributeMutation = mutation => {
        // use this!
    }

    // addedNodeMutation
    addedNodeMutation = added_node => {
        // 如果這個新追加的 DOM 節點是一個 Dialog 模組，就監聽其點擊事件。
        if (this.isDialog(added_node)) {
            this.bindDialogEventListener(added_node)
        }

        // 如果這個新追加的 DOM 節點是一個 Dialog 模組，就監聽其點擊事件。
        if (this.isTrigger(added_node)) {
            // 監聽其點擊事件。
            this.bindTriggerEventListener(added_node)
        }
    }

    // isTrigger
    isTrigger = element => {
        return element.matches("[data-dialog]")
    }

    // isDialog
    isDialog = element => {
        return element.matches("dialog.ts-modal, dialog.ts-app-drawer")
    }

    // isModal
    isModal = element => {
        return element.matches(":modal")
    }

    // isDismissible
    isDismissible = element => {
        var dismissible = element.dataset.dismissible || "true"
        return dismissible === "true"
    }

    // bindDialogEventListener
    bindDialogEventListener = element => {
        // 不使用 click 是避免使用者在內部選取文字，但是在外部放開，這會被當作 click 而關閉。
        element.removeEventListener("mousedown", this.onClickBackdrop)
        element.addEventListener("mousedown", this.onClickBackdrop)

        element.removeEventListener("cancel", this.onCancel)
        element.addEventListener("cancel", this.onCancel)
    }

    // bindTriggerEventListener
    bindTriggerEventListener = element => {
        element.removeEventListener("click", this.onClickTrigger)
        element.addEventListener("click", this.onClickTrigger)
    }

    // onClickBackdrop
    onClickBackdrop = event => {
        var dialog = event.target.closest("dialog")

        if (!this.isDismissible(dialog)) {
            return
        }
        if (dialog === event.target && this.isModal(dialog)) {
            event.target.dispatchEvent(new Event("cancel", { bubbles: true }))
            event.target.close()
        }
    }

    // onCancel
    onCancel = event => {
        var dialog = event.target.closest("dialog")

        if (!this.isDismissible(dialog)) {
            event.preventDefault()
        }
    }

    // onClickTrigger
    onClickTrigger = event => {
        // 取得對應的 Invoke 元素。
        var dialog_id = event.target.closest(`[data-dialog]`).dataset.dialog
        var dialog_element = document.getElementById(dialog_id)

        // 如果這個對話框是開啟的，就關閉它。
        if (!dialog_element.open) {
            dialog_element.showModal()
        } else {
            dialog_element.close()
        }
    }
}

window.tocas_modules = [...window.tocas_modules, new Dialog()]



    /* ==========================================================================
       Base
       ========================================================================== */

    // getID
    getID = () => {
        return (Math.random().toString(36) + "00000000000000000").slice(2, 10 + 2)
    }

    // createElement
    createElement = html => {
        var template = document.createElement("template")
        template.innerHTML = html.trim()
        return template.content.firstChild
    }

    //
    addedNodeMutation = node => {
        window.tocas_modules.forEach(v => {
            if (typeof v.addedNodeMutation === "function") {
                v.addedNodeMutation(node)
            }
        })
    }

    //
    removedNodeMutation = node => {
        window.tocas_modules.forEach(v => {
            if (typeof v.removedNodeMutation === "function") {
                v.removedNodeMutation(node)
            }
        })
    }

    //
    attributeMutation = mutation => {
        window.tocas_modules.forEach(v => {
            if (typeof v.attributeMutation === "function") {
                v.attributeMutation(mutation)
            }
        })
    }

    // mutation_observered 用來儲存正在監聽的元素以避免重複加入到 MutationObserver 裡。
    var mutation_observered = new Set([])

    // MutationObserver 是真正會監聽每個元素異動的函式。
    var mutation_observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // 如果是屬性的異動就交給屬性函式處理。
            if (mutation.type === "attributes") {
                attributeMutation(mutation)
            }

            // 如果是節點的新增就交給節點函式處理。
            else if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(added_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (added_node.nodeType !== Node.ELEMENT_NODE || !(added_node instanceof HTMLElement)) {
                        return
                    }

                    // 建立一個 TreeWalker 來加強 MutationObserver 的 childList 跟 subtree，
                    // 因為 MutationObserver 可能會忽略 Vue.js 那樣透過 innerHTML 修改節點的時候。
                    var tree_walker = document.createTreeWalker(added_node, NodeFilter.SHOW_ELEMENT)

                    // 收集需要監聽的 HTML 節點元素。
                    var nodes = []

                    // 會使用遞迴，所以先將自己視為其中一個節點。
                    var current_node = tree_walker.currentNode

                    // 不斷地爬到沒有下個節點為止。
                    while (current_node) {
                        nodes.push(current_node)
                        current_node = tree_walker.nextNode()
                    }

                    // 將使用 TreeWalker 爬到的每個節點收錄進 MutationObserver 裡面，監聽更詳細的節點。
                    nodes.forEach(node => {
                        // 如果這個節點已經被監聽過了則忽略。
                        if (mutation_observered.has(node)) {
                            return
                        } else {
                            mutation_observered.add(node)
                        }

                        mutation_observer.observe(node, {
                            childList: true,
                            subtree: true,
                            attributes: true,
                            attributeOldValue: true,
                            attributeFilter: ["class"],
                        })

                        // 替這些節點呼叫對應的函式。
                        addedNodeMutation(node)
                    })
                })
            }

            // 如果是節點的移除就做一些清除的函式。
            else if (mutation.removedNodes && mutation.removedNodes.length) {
                mutation.removedNodes.forEach(removed_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (removed_node.nodeType !== Node.ELEMENT_NODE || !(removed_node instanceof HTMLElement)) {
                        return
                    }

                    // 替這些節點呼叫對應的函式。
                    removedNodeMutation(removed_node)

                    // 從已監聽的清單中移除來節省部份資源。
                    mutation_observered.delete(removed_node)
                })
            }
        })
    })

    // 監聽網頁元素異動的 MutationObserver。
    mutation_observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
    })

    /**
     * Window Resize
     */

    window.addEventListener("resize", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowResize === "function") {
                v.windowResize(event)
            }
        })
    })

    /**
     * Window Click
     */

    window.addEventListener("click", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowClick === "function") {
                v.windowClick(event)
            }
        })
    })

    window.addEventListener("mousedown", event => {
        window.tocas_modules.forEach(v => {
            if (typeof v.windowMousedown === "function") {
                v.windowMousedown(event)
            }
        })
    })
})()
