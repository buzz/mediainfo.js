"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[48,841],{815:(e,t,n)=>{const a=n(6672).createContext({options:{banner:"",breadcrumbs:!0,gitRefName:"master",minimal:!1,pluginId:"default",scopes:[]},reflections:{}});t.ApiDataContext=a},3638:(e,t,n)=>{n.d(t,{A:()=>s});n(6672);var a=n(3526),o=n(3143),i=n(2531),r=n(3420);function s(e){let{className:t}=e;return(0,r.jsx)("main",{className:(0,a.A)("container margin-vert--xl",t),children:(0,r.jsx)("div",{className:"row",children:(0,r.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,r.jsx)(i.default,{as:"h1",className:"hero__title",children:(0,r.jsx)(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,r.jsx)("p",{children:(0,r.jsx)(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,r.jsx)("p",{children:(0,r.jsx)(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}},5951:(e,t,n)=>{n.r(t)},6109:(e,t,n)=>{const a=["options","packages"];function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(5951),n(9483);const s=n(6672),l=n(8688),c=n(815),d=n(3420),u=(e=>e&&e.__esModule?e:{default:e})(l);function b(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function p(e,t,n){return Object.entries(e).forEach((a=>{let[o,i]=a;if("id"===o){const a="type"in e;(!a||a&&"reference"!==e.type)&&(t[Number(i)]=e,n&&(e.parentId=n.id))}else Array.isArray(i)?i.forEach((n=>{b(n)&&p(n,t,e)})):b(i)&&p(i,t,e)})),t}function m(e){const t={};return e.forEach((e=>{e.entryPoints.forEach((e=>{p(e.reflection,t)}))})),t}e.exports=function(e){let t=e.options,n=e.packages,o=function(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n={};for(var a in e)if({}.hasOwnProperty.call(e,a)){if(t.includes(a))continue;n[a]=e[a]}return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.includes(n)||{}.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,a);const r=s.useMemo((()=>({options:t,reflections:m(n)})),[t,n]);return d.jsx(c.ApiDataContext.Provider,{value:r,children:d.jsx("div",{className:"apiPage",children:d.jsx(u.default,i({},o))})})}},8688:(e,t,n)=>{n.r(t),n.d(t,{default:()=>pe});var a=n(6672),o=n(3526),i=n(6846),r=n(2583),s=n(4874),l=n(3511),c=n(3143),d=n(7168),u=n(9542);const b={backToTopButton:"backToTopButton_Q1cl",backToTopButtonShow:"backToTopButtonShow_Lw2H"};var p=n(3420);function m(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[n,o]=(0,a.useState)(!1),i=(0,a.useRef)(!1),{startScroll:r,cancelScroll:s}=(0,d.gk)();return(0,d.Mq)(((e,n)=>{let{scrollY:a}=e;const r=n?.scrollY;r&&(i.current?i.current=!1:a>=r?(s(),o(!1)):a<t?o(!1):a+window.innerHeight<document.documentElement.scrollHeight&&o(!0))})),(0,u.$)((e=>{e.location.hash&&(i.current=!0,o(!1))})),{shown:n,scrollToTop:()=>r(0)}}({threshold:300});return(0,p.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,o.A)("clean-btn",r.G.common.backToTopButton,b.backToTopButton,e&&b.backToTopButtonShow),type:"button",onClick:t})}var h=n(2421),f=n(5291),x=n(6581),j=n(5398),g=n(8724);function v(e){return(0,p.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,p.jsxs)("g",{fill:"#7a7a7a",children:[(0,p.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,p.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const _="collapseSidebarButton_Ba0e",y="collapseSidebarButtonIcon_I7ab";function A(e){let{onClick:t}=e;return(0,p.jsx)("button",{type:"button",title:(0,c.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,o.A)("button button--secondary button--outline",_),onClick:t,children:(0,p.jsx)(v,{className:y})})}var C=n(8369),k=n(172),S=n(5852),N=n(1006),T=n(4641),I=n(344),w=n(9441);function O(e){let{collapsed:t,categoryLabel:n,onClick:a}=e;return(0,p.jsx)("button",{"aria-label":t?(0,c.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:n}):(0,c.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:n}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:a})}function P(e){let{item:t,onItemClick:n,activePath:i,level:l,index:c,...d}=e;const{items:u,label:b,collapsible:m,className:h,href:f}=t,{docs:{sidebar:{autoCollapseCategories:x}}}=(0,j.p)(),g=function(e){const t=(0,w.A)();return(0,a.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,s.Nr)(e):void 0),[e,t])}(t),v=(0,s.w8)(t,i),_=(0,T.ys)(f,i),{collapsed:y,setCollapsed:A}=(0,N.u)({initialState:()=>!!m&&(!v&&t.collapsed)}),{expandedItem:C,setExpandedItem:P}=(0,k.G)(),B=function(e){void 0===e&&(e=!y),P(e?null:c),A(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:o}=e;const i=(0,S.ZC)(t);(0,a.useEffect)((()=>{t&&!i&&n&&o(!1)}),[t,i,n,o])}({isActive:v,collapsed:y,updateCollapsed:B}),(0,a.useEffect)((()=>{m&&null!=C&&C!==c&&x&&A(!0)}),[m,C,c,A,x]),(0,p.jsxs)("li",{className:(0,o.A)(r.G.docs.docSidebarItemCategory,r.G.docs.docSidebarItemCategoryLevel(l),"menu__list-item",{"menu__list-item--collapsed":y},h),children:[(0,p.jsxs)("div",{className:(0,o.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":_}),children:[(0,p.jsx)(I.default,{className:(0,o.A)("menu__link",{"menu__link--sublist":m,"menu__link--sublist-caret":!f&&m,"menu__link--active":v}),onClick:m?e=>{n?.(t),f?B(!1):(e.preventDefault(),B())}:()=>{n?.(t)},"aria-current":_?"page":void 0,role:m&&!f?"button":void 0,"aria-expanded":m&&!f?!y:void 0,href:m?g??"#":g,...d,children:b}),f&&m&&(0,p.jsx)(O,{collapsed:y,categoryLabel:b,onClick:e=>{e.preventDefault(),B()}})]}),(0,p.jsx)(N.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:y,children:(0,p.jsx)(W,{items:u,tabIndex:y?-1:0,onItemClick:n,activePath:i,level:l+1})})]})}var B=n(1584),E=n(2666);const L="menuExternalLink_lgkd";function M(e){let{item:t,onItemClick:n,activePath:a,level:i,index:l,...c}=e;const{href:d,label:u,className:b,autoAddBaseUrl:m}=t,h=(0,s.w8)(t,a),f=(0,B.A)(d);return(0,p.jsx)("li",{className:(0,o.A)(r.G.docs.docSidebarItemLink,r.G.docs.docSidebarItemLinkLevel(i),"menu__list-item",b),children:(0,p.jsxs)(I.default,{className:(0,o.A)("menu__link",!f&&L,{"menu__link--active":h}),autoAddBaseUrl:m,"aria-current":h?"page":void 0,to:d,...f&&{onClick:n?()=>n(t):void 0},...c,children:[u,!f&&(0,p.jsx)(E.A,{})]})},u)}const H="menuHtmlItem_zQXu";function R(e){let{item:t,level:n,index:a}=e;const{value:i,defaultStyle:s,className:l}=t;return(0,p.jsx)("li",{className:(0,o.A)(r.G.docs.docSidebarItemLink,r.G.docs.docSidebarItemLinkLevel(n),s&&[H,"menu__list-item"],l),dangerouslySetInnerHTML:{__html:i}},a)}function D(e){let{item:t,...n}=e;switch(t.type){case"category":return(0,p.jsx)(P,{item:t,...n});case"html":return(0,p.jsx)(R,{item:t,...n});default:return(0,p.jsx)(M,{item:t,...n})}}function G(e){let{items:t,...n}=e;const a=(0,s.Y)(t,n.activePath);return(0,p.jsx)(k.A,{children:a.map(((e,t)=>(0,p.jsx)(D,{item:e,index:t,...n},t)))})}const W=(0,a.memo)(G),z="menu_EOXs",F="menuWithAnnouncementBar_ej2r";function Q(e){let{path:t,sidebar:n,className:i}=e;const s=function(){const{isActive:e}=(0,C.M)(),[t,n]=(0,a.useState)(e);return(0,d.Mq)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return(0,p.jsx)("nav",{"aria-label":(0,c.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,o.A)("menu thin-scrollbar",z,s&&F,i),children:(0,p.jsx)("ul",{className:(0,o.A)(r.G.docs.docSidebarMenu,"menu__list"),children:(0,p.jsx)(W,{items:n,activePath:t,level:1})})})}const V="sidebar_dqzW",X="sidebarWithHideableNavbar_I94J",Y="sidebarHidden_RrOv",U="sidebarLogo_f_pp";function q(e){let{path:t,sidebar:n,onCollapse:a,isHidden:i}=e;const{navbar:{hideOnScroll:r},docs:{sidebar:{hideable:s}}}=(0,j.p)();return(0,p.jsxs)("div",{className:(0,o.A)(V,r&&X,i&&Y),children:[r&&(0,p.jsx)(g.A,{tabIndex:-1,className:U}),(0,p.jsx)(Q,{path:t,sidebar:n}),s&&(0,p.jsx)(A,{onClick:a})]})}const J=a.memo(q);var K=n(2848),Z=n(149);const $=e=>{let{sidebar:t,path:n}=e;const a=(0,Z.M)();return(0,p.jsx)("ul",{className:(0,o.A)(r.G.docs.docSidebarMenu,"menu__list"),children:(0,p.jsx)(W,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function ee(e){return(0,p.jsx)(K.GX,{component:$,props:e})}const te=a.memo(ee);function ne(e){const t=(0,x.l)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,p.jsxs)(p.Fragment,{children:[n&&(0,p.jsx)(J,{...e}),a&&(0,p.jsx)(te,{...e})]})}const ae={expandButton:"expandButton_MhRx",expandButtonIcon:"expandButtonIcon_oce3"};function oe(e){let{toggleSidebar:t}=e;return(0,p.jsx)("div",{className:ae.expandButton,title:(0,c.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,p.jsx)(v,{className:ae.expandButtonIcon})})}const ie={docSidebarContainer:"docSidebarContainer_I2Oi",docSidebarContainerHidden:"docSidebarContainerHidden_Y8tX",sidebarViewport:"sidebarViewport_CQ6P"};function re(e){let{children:t}=e;const n=(0,l.t)();return(0,p.jsx)(a.Fragment,{children:t},n?.name??"noSidebar")}function se(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:i}=e;const{pathname:s}=(0,f.zy)(),[l,c]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{l&&c(!1),!l&&(0,h.O)()&&c(!0),i((e=>!e))}),[i,l]);return(0,p.jsx)("aside",{className:(0,o.A)(r.G.docs.docSidebarContainer,ie.docSidebarContainer,n&&ie.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ie.docSidebarContainer)&&n&&c(!0)},children:(0,p.jsx)(re,{children:(0,p.jsxs)("div",{className:(0,o.A)(ie.sidebarViewport,l&&ie.sidebarViewportHidden),children:[(0,p.jsx)(ne,{sidebar:t,path:s,onCollapse:d,isHidden:l}),l&&(0,p.jsx)(oe,{toggleSidebar:d})]})})})}const le={docMainContainer:"docMainContainer_tniQ",docMainContainerEnhanced:"docMainContainerEnhanced_QC17",docItemWrapperEnhanced:"docItemWrapperEnhanced_Xm34"};function ce(e){let{hiddenSidebarContainer:t,children:n}=e;const a=(0,l.t)();return(0,p.jsx)("main",{className:(0,o.A)(le.docMainContainer,(t||!a)&&le.docMainContainerEnhanced),children:(0,p.jsx)("div",{className:(0,o.A)("container padding-top--md padding-bottom--lg",le.docItemWrapper,t&&le.docItemWrapperEnhanced),children:n})})}const de={docRoot:"docRoot_E_Rv",docsWrapper:"docsWrapper_tdCj"};function ue(e){let{children:t}=e;const n=(0,l.t)(),[o,i]=(0,a.useState)(!1);return(0,p.jsxs)("div",{className:de.docsWrapper,children:[(0,p.jsx)(m,{}),(0,p.jsxs)("div",{className:de.docRoot,children:[n&&(0,p.jsx)(se,{sidebar:n.items,hiddenSidebarContainer:o,setHiddenSidebarContainer:i}),(0,p.jsx)(ce,{hiddenSidebarContainer:o,children:t})]})]})}var be=n(3638);function pe(e){const t=(0,s.B5)(e);if(!t)return(0,p.jsx)(be.A,{});const{docElement:n,sidebarName:a,sidebarItems:c}=t;return(0,p.jsx)(i.e3,{className:(0,o.A)(r.G.page.docsDocPage),children:(0,p.jsx)(l.V,{name:a,items:c,children:(0,p.jsx)(ue,{children:n})})})}},9483:(e,t,n)=>{n.r(t)}}]);