"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[48],{3638:(e,t,a)=>{a.d(t,{A:()=>l});a(6672);var n=a(3526),i=a(3143),o=a(2531),s=a(3420);function l(e){let{className:t}=e;return(0,s.jsx)("main",{className:(0,n.A)("container margin-vert--xl",t),children:(0,s.jsx)("div",{className:"row",children:(0,s.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,s.jsx)(o.default,{as:"h1",className:"hero__title",children:(0,s.jsx)(i.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,s.jsx)("p",{children:(0,s.jsx)(i.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,s.jsx)("p",{children:(0,s.jsx)(i.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}},8688:(e,t,a)=>{a.r(t),a.d(t,{default:()=>be});var n=a(6672),i=a(3526),o=a(6846),s=a(2583),l=a(4874),c=a(3511),r=a(3143),d=a(7168),u=a(9542);const m={backToTopButton:"backToTopButton_Q1cl",backToTopButtonShow:"backToTopButtonShow_Lw2H"};var b=a(3420);function h(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[a,i]=(0,n.useState)(!1),o=(0,n.useRef)(!1),{startScroll:s,cancelScroll:l}=(0,d.gk)();return(0,d.Mq)(((e,a)=>{let{scrollY:n}=e;const s=a?.scrollY;s&&(o.current?o.current=!1:n>=s?(l(),i(!1)):n<t?i(!1):n+window.innerHeight<document.documentElement.scrollHeight&&i(!0))})),(0,u.$)((e=>{e.location.hash&&(o.current=!0,i(!1))})),{shown:a,scrollToTop:()=>s(0)}}({threshold:300});return(0,b.jsx)("button",{"aria-label":(0,r.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,i.A)("clean-btn",s.G.common.backToTopButton,m.backToTopButton,e&&m.backToTopButtonShow),type:"button",onClick:t})}var p=a(2421),x=a(5291),f=a(6581),j=a(5398),_=a(8724);function g(e){return(0,b.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,b.jsxs)("g",{fill:"#7a7a7a",children:[(0,b.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,b.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const v="collapseSidebarButton_Ba0e",C="collapseSidebarButtonIcon_I7ab";function A(e){let{onClick:t}=e;return(0,b.jsx)("button",{type:"button",title:(0,r.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,r.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,i.A)("button button--secondary button--outline",v),onClick:t,children:(0,b.jsx)(g,{className:C})})}var k=a(8369),T=a(172),S=a(5852),N=a(1006),I=a(4641),y=a(344),w=a(9441);function B(e){let{collapsed:t,categoryLabel:a,onClick:n}=e;return(0,b.jsx)("button",{"aria-label":t?(0,r.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:a}):(0,r.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:a}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:n})}function L(e){let{item:t,onItemClick:a,activePath:o,level:c,index:r,...d}=e;const{items:u,label:m,collapsible:h,className:p,href:x}=t,{docs:{sidebar:{autoCollapseCategories:f}}}=(0,j.p)(),_=function(e){const t=(0,w.A)();return(0,n.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,l.Nr)(e):void 0),[e,t])}(t),g=(0,l.w8)(t,o),v=(0,I.ys)(x,o),{collapsed:C,setCollapsed:A}=(0,N.u)({initialState:()=>!!h&&(!g&&t.collapsed)}),{expandedItem:k,setExpandedItem:L}=(0,T.G)(),E=function(e){void 0===e&&(e=!C),L(e?null:r),A(e)};return function(e){let{isActive:t,collapsed:a,updateCollapsed:i}=e;const o=(0,S.ZC)(t);(0,n.useEffect)((()=>{t&&!o&&a&&i(!1)}),[t,o,a,i])}({isActive:g,collapsed:C,updateCollapsed:E}),(0,n.useEffect)((()=>{h&&null!=k&&k!==r&&f&&A(!0)}),[h,k,r,A,f]),(0,b.jsxs)("li",{className:(0,i.A)(s.G.docs.docSidebarItemCategory,s.G.docs.docSidebarItemCategoryLevel(c),"menu__list-item",{"menu__list-item--collapsed":C},p),children:[(0,b.jsxs)("div",{className:(0,i.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":v}),children:[(0,b.jsx)(y.default,{className:(0,i.A)("menu__link",{"menu__link--sublist":h,"menu__link--sublist-caret":!x&&h,"menu__link--active":g}),onClick:h?e=>{a?.(t),x?E(!1):(e.preventDefault(),E())}:()=>{a?.(t)},"aria-current":v?"page":void 0,role:h&&!x?"button":void 0,"aria-expanded":h&&!x?!C:void 0,href:h?_??"#":_,...d,children:m}),x&&h&&(0,b.jsx)(B,{collapsed:C,categoryLabel:m,onClick:e=>{e.preventDefault(),E()}})]}),(0,b.jsx)(N.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:C,children:(0,b.jsx)(z,{items:u,tabIndex:C?-1:0,onItemClick:a,activePath:o,level:c+1})})]})}var E=a(1584),M=a(2666);const H="menuExternalLink_lgkd";function R(e){let{item:t,onItemClick:a,activePath:n,level:o,index:c,...r}=e;const{href:d,label:u,className:m,autoAddBaseUrl:h}=t,p=(0,l.w8)(t,n),x=(0,E.A)(d);return(0,b.jsx)("li",{className:(0,i.A)(s.G.docs.docSidebarItemLink,s.G.docs.docSidebarItemLinkLevel(o),"menu__list-item",m),children:(0,b.jsxs)(y.default,{className:(0,i.A)("menu__link",!x&&H,{"menu__link--active":p}),autoAddBaseUrl:h,"aria-current":p?"page":void 0,to:d,...x&&{onClick:a?()=>a(t):void 0},...r,children:[u,!x&&(0,b.jsx)(M.A,{})]})},u)}const G="menuHtmlItem_zQXu";function W(e){let{item:t,level:a,index:n}=e;const{value:o,defaultStyle:l,className:c}=t;return(0,b.jsx)("li",{className:(0,i.A)(s.G.docs.docSidebarItemLink,s.G.docs.docSidebarItemLinkLevel(a),l&&[G,"menu__list-item"],c),dangerouslySetInnerHTML:{__html:o}},n)}function P(e){let{item:t,...a}=e;switch(t.type){case"category":return(0,b.jsx)(L,{item:t,...a});case"html":return(0,b.jsx)(W,{item:t,...a});default:return(0,b.jsx)(R,{item:t,...a})}}function D(e){let{items:t,...a}=e;const n=(0,l.Y)(t,a.activePath);return(0,b.jsx)(T.A,{children:n.map(((e,t)=>(0,b.jsx)(P,{item:e,index:t,...a},t)))})}const z=(0,n.memo)(D),F="menu_EOXs",O="menuWithAnnouncementBar_ej2r";function Q(e){let{path:t,sidebar:a,className:o}=e;const l=function(){const{isActive:e}=(0,k.M)(),[t,a]=(0,n.useState)(e);return(0,d.Mq)((t=>{let{scrollY:n}=t;e&&a(0===n)}),[e]),e&&t}();return(0,b.jsx)("nav",{"aria-label":(0,r.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,i.A)("menu thin-scrollbar",F,l&&O,o),children:(0,b.jsx)("ul",{className:(0,i.A)(s.G.docs.docSidebarMenu,"menu__list"),children:(0,b.jsx)(z,{items:a,activePath:t,level:1})})})}const V="sidebar_dqzW",X="sidebarWithHideableNavbar_I94J",Y="sidebarHidden_RrOv",U="sidebarLogo_f_pp";function q(e){let{path:t,sidebar:a,onCollapse:n,isHidden:o}=e;const{navbar:{hideOnScroll:s},docs:{sidebar:{hideable:l}}}=(0,j.p)();return(0,b.jsxs)("div",{className:(0,i.A)(V,s&&X,o&&Y),children:[s&&(0,b.jsx)(_.A,{tabIndex:-1,className:U}),(0,b.jsx)(Q,{path:t,sidebar:a}),l&&(0,b.jsx)(A,{onClick:n})]})}const J=n.memo(q);var K=a(2848),Z=a(149);const $=e=>{let{sidebar:t,path:a}=e;const n=(0,Z.M)();return(0,b.jsx)("ul",{className:(0,i.A)(s.G.docs.docSidebarMenu,"menu__list"),children:(0,b.jsx)(z,{items:t,activePath:a,onItemClick:e=>{"category"===e.type&&e.href&&n.toggle(),"link"===e.type&&n.toggle()},level:1})})};function ee(e){return(0,b.jsx)(K.GX,{component:$,props:e})}const te=n.memo(ee);function ae(e){const t=(0,f.l)(),a="desktop"===t||"ssr"===t,n="mobile"===t;return(0,b.jsxs)(b.Fragment,{children:[a&&(0,b.jsx)(J,{...e}),n&&(0,b.jsx)(te,{...e})]})}const ne={expandButton:"expandButton_MhRx",expandButtonIcon:"expandButtonIcon_oce3"};function ie(e){let{toggleSidebar:t}=e;return(0,b.jsx)("div",{className:ne.expandButton,title:(0,r.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,r.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,b.jsx)(g,{className:ne.expandButtonIcon})})}const oe={docSidebarContainer:"docSidebarContainer_I2Oi",docSidebarContainerHidden:"docSidebarContainerHidden_Y8tX",sidebarViewport:"sidebarViewport_CQ6P"};function se(e){let{children:t}=e;const a=(0,c.t)();return(0,b.jsx)(n.Fragment,{children:t},a?.name??"noSidebar")}function le(e){let{sidebar:t,hiddenSidebarContainer:a,setHiddenSidebarContainer:o}=e;const{pathname:l}=(0,x.zy)(),[c,r]=(0,n.useState)(!1),d=(0,n.useCallback)((()=>{c&&r(!1),!c&&(0,p.O)()&&r(!0),o((e=>!e))}),[o,c]);return(0,b.jsx)("aside",{className:(0,i.A)(s.G.docs.docSidebarContainer,oe.docSidebarContainer,a&&oe.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(oe.docSidebarContainer)&&a&&r(!0)},children:(0,b.jsx)(se,{children:(0,b.jsxs)("div",{className:(0,i.A)(oe.sidebarViewport,c&&oe.sidebarViewportHidden),children:[(0,b.jsx)(ae,{sidebar:t,path:l,onCollapse:d,isHidden:c}),c&&(0,b.jsx)(ie,{toggleSidebar:d})]})})})}const ce={docMainContainer:"docMainContainer_tniQ",docMainContainerEnhanced:"docMainContainerEnhanced_QC17",docItemWrapperEnhanced:"docItemWrapperEnhanced_Xm34"};function re(e){let{hiddenSidebarContainer:t,children:a}=e;const n=(0,c.t)();return(0,b.jsx)("main",{className:(0,i.A)(ce.docMainContainer,(t||!n)&&ce.docMainContainerEnhanced),children:(0,b.jsx)("div",{className:(0,i.A)("container padding-top--md padding-bottom--lg",ce.docItemWrapper,t&&ce.docItemWrapperEnhanced),children:a})})}const de={docRoot:"docRoot_E_Rv",docsWrapper:"docsWrapper_tdCj"};function ue(e){let{children:t}=e;const a=(0,c.t)(),[i,o]=(0,n.useState)(!1);return(0,b.jsxs)("div",{className:de.docsWrapper,children:[(0,b.jsx)(h,{}),(0,b.jsxs)("div",{className:de.docRoot,children:[a&&(0,b.jsx)(le,{sidebar:a.items,hiddenSidebarContainer:i,setHiddenSidebarContainer:o}),(0,b.jsx)(re,{hiddenSidebarContainer:i,children:t})]})]})}var me=a(3638);function be(e){const t=(0,l.B5)(e);if(!t)return(0,b.jsx)(me.A,{});const{docElement:a,sidebarName:n,sidebarItems:r}=t;return(0,b.jsx)(o.e3,{className:(0,i.A)(s.G.page.docsDocPage),children:(0,b.jsx)(c.V,{name:n,items:r,children:(0,b.jsx)(ue,{children:a})})})}}}]);