"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[198],{8677:(e,t,r)=>{r.r(t),r.d(t,{default:()=>f});r(758);var a=r(3526),o=r(2190),n=r(8023),s=r(1772),i=r(3557),l=r(6131),u=r(5186),c=r(6070);function d(e){return(0,c.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,c.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const m={breadcrumbHomeIcon:"breadcrumbHomeIcon_Wd02"};function p(){const e=(0,u.Ay)("/");return(0,c.jsx)("li",{className:"breadcrumbs__item",children:(0,c.jsx)(i.default,{"aria-label":(0,l.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,c.jsx)(d,{className:m.breadcrumbHomeIcon})})})}const g={breadcrumbsContainer:"breadcrumbsContainer_zooi"};function b(e){let{children:t,href:r,isLast:a}=e;const o="breadcrumbs__link";return a?(0,c.jsx)("span",{className:o,itemProp:"name",children:t}):r?(0,c.jsx)(i.default,{className:o,href:r,itemProp:"item",children:(0,c.jsx)("span",{itemProp:"name",children:t})}):(0,c.jsx)("span",{className:o,children:t})}function h(e){let{children:t,active:r,index:o,addMicrodata:n}=e;return(0,c.jsxs)("li",{...n&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,a.A)("breadcrumbs__item",{"breadcrumbs__item--active":r}),children:[t,(0,c.jsx)("meta",{itemProp:"position",content:String(o+1)})]})}function f(){const e=(0,n.OF)(),t=(0,s.Dt)();return e?(0,c.jsx)("nav",{className:(0,a.A)(o.G.docs.docBreadcrumbs,g.breadcrumbsContainer),"aria-label":(0,l.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,c.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,c.jsx)(p,{}),e.map(((t,r)=>{const a=r===e.length-1,o="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,c.jsx)(h,{active:a,index:r,addMicrodata:!!o,children:(0,c.jsx)(b,{href:o,isLast:a,children:t.label})},r)}))]})}):null}},6718:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});r(758);var a=r(6131),o=r(3526),n=r(3557),s=r(6070);function i(e){const{permalink:t,title:r,subLabel:a,isNext:i}=e;return(0,s.jsxs)(n.default,{className:(0,o.A)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[a&&(0,s.jsx)("div",{className:"pagination-nav__sublabel",children:a}),(0,s.jsx)("div",{className:"pagination-nav__label",children:r})]})}function l(e){const{previous:t,next:r}=e;return(0,s.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,a.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,s.jsx)(i,{...t,subLabel:(0,s.jsx)(a.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),r&&(0,s.jsx)(i,{...r,subLabel:(0,s.jsx)(a.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},8426:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});r(758);var a=r(3526),o=r(6131),n=r(2190),s=r(7843),i=r(6070);function l(e){let{className:t}=e;const r=(0,s.r)();return r.badge?(0,i.jsx)("span",{className:(0,a.A)(t,n.G.docs.docVersionBadge,"badge badge--secondary"),children:(0,i.jsx)(o.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:r.label},children:"Version: {versionLabel}"})}):null}},9134:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});r(758);var a=r(3526),o=r(1037),n=r(3112),s=r(6131);const i={tocCollapsibleButton:"tocCollapsibleButton_ltXz",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_TUrW"};var l=r(6070);function u(e){let{collapsed:t,...r}=e;return(0,l.jsx)("button",{type:"button",...r,className:(0,a.A)("clean-btn",i.tocCollapsibleButton,!t&&i.tocCollapsibleButtonExpanded,r.className),children:(0,l.jsx)(s.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const c={tocCollapsible:"tocCollapsible_xOOC",tocCollapsibleContent:"tocCollapsibleContent_qKQj",tocCollapsibleExpanded:"tocCollapsibleExpanded_VnsL"};function d(e){let{toc:t,className:r,minHeadingLevel:s,maxHeadingLevel:i}=e;const{collapsed:d,toggleCollapsed:m}=(0,o.u)({initialState:!0});return(0,l.jsxs)("div",{className:(0,a.A)(c.tocCollapsible,!d&&c.tocCollapsibleExpanded,r),children:[(0,l.jsx)(u,{collapsed:d,onClick:m}),(0,l.jsx)(o.N,{lazy:!0,className:c.tocCollapsibleContent,collapsed:d,children:(0,l.jsx)(n.A,{toc:t,minHeadingLevel:s,maxHeadingLevel:i})})]})}},9306:(e,t,r)=>{r.d(t,{e:()=>l,i:()=>i});var a=r(758),o=r(9367),n=r(6070);const s=a.createContext(null);function i(e){let{children:t,content:r,isBlogPostPage:o=!1}=e;const i=function(e){let{content:t,isBlogPostPage:r}=e;return(0,a.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:r})),[t,r])}({content:r,isBlogPostPage:o});return(0,n.jsx)(s.Provider,{value:i,children:t})}function l(){const e=(0,a.useContext)(s);if(null===e)throw new o.dV("BlogPostProvider");return e}},1016:(e,t,r)=>{r.d(t,{_:()=>i,u:()=>l});var a=r(758),o=r(9367),n=r(6070);const s=a.createContext(null);function i(e){let{children:t,content:r}=e;const o=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(r);return(0,n.jsx)(s.Provider,{value:o,children:t})}function l(){const e=(0,a.useContext)(s);if(null===e)throw new o.dV("DocProvider");return e}},3600:(e,t,r)=>{r.d(t,{A:()=>l,G:()=>u});var a=r(758),o=r(9367),n=r(6070);const s=Symbol("EmptyContext"),i=a.createContext(s);function l(e){let{children:t}=e;const[r,o]=(0,a.useState)(null),s=(0,a.useMemo)((()=>({expandedItem:r,setExpandedItem:o})),[r]);return(0,n.jsx)(i.Provider,{value:s,children:t})}function u(){const e=(0,a.useContext)(i);if(e===s)throw new o.dV("DocSidebarItemsExpandedStateProvider");return e}},5404:(e,t,r)=>{r.d(t,{H:()=>s});var a=r(758),o=r(5053),n=r(4875);function s(e){let{threshold:t}=e;const[r,s]=(0,a.useState)(!1),i=(0,a.useRef)(!1),{startScroll:l,cancelScroll:u}=(0,o.gk)();return(0,o.Mq)(((e,r)=>{let{scrollY:a}=e;const o=r?.scrollY;o&&(i.current?i.current=!1:a>=o?(u(),s(!1)):a<t?s(!1):a+window.innerHeight<document.documentElement.scrollHeight&&s(!0))})),(0,n.$)((e=>{e.location.hash&&(i.current=!0,s(!1))})),{shown:r,scrollToTop:()=>l(0)}}},5632:(e,t,r)=>{r.r(t),r.d(t,{Collapsible:()=>y.N,ErrorBoundaryError:()=>q.bq,ErrorBoundaryErrorMessageFallback:()=>q.MN,ErrorBoundaryTryAgainButton:()=>q.a2,ErrorCauseBoundary:()=>q.k2,HtmlClassNameProvider:()=>T.e3,NavbarSecondaryMenuFiller:()=>B.GX,PageMetadata:()=>T.be,ReactContextError:()=>P.dV,SkipToContentFallbackId:()=>U.j,SkipToContentLink:()=>U.K,ThemeClassNames:()=>S.G,ThemedComponent:()=>o.A,UnlistedBannerMessage:()=>R.Uh,UnlistedBannerTitle:()=>R.Rc,UnlistedMetadata:()=>R.AE,composeProviders:()=>P.fM,createStorageSlot:()=>n.Wf,duplicates:()=>O.X,filterDocCardListItems:()=>i.d1,isMultiColumnFooterLinks:()=>I.C,isRegexpStringMatch:()=>F.G,listStorageKeys:()=>n.Eo,listTagsByLetters:()=>E,prefersReducedMotion:()=>x.O,processAdmonitionProps:()=>H.c,translateTagsPageTitle:()=>k,uniq:()=>O.s,useBlogListPageStructuredData:()=>b,useBlogPostStructuredData:()=>h,useClearQueryString:()=>L.W9,useCollapsible:()=>y.u,useColorMode:()=>j.G,useContextualSearchFilters:()=>s.af,useCurrentSidebarCategory:()=>i.$S,useDocsPreferredVersion:()=>$.g1,useEvent:()=>P._q,useHistorySelector:()=>L.Hl,usePluralForm:()=>C.W,usePrevious:()=>P.ZC,usePrismTheme:()=>_.A,useQueryString:()=>L.l,useQueryStringList:()=>L.fV,useSearchLinkCreator:()=>A,useSearchQueryString:()=>V,useStorageSlot:()=>n.Dv,useThemeConfig:()=>a.p,useWindowSize:()=>M.l});var a=r(8741),o=r(7144),n=r(560),s=r(6610),i=r(8023),l=r(5186),u=r(2465),c=r(1514);var d=r(9306);const m=e=>new Date(e).toISOString();function p(e){const t=e.map(f);return{author:1===t.length?t[0]:t}}function g(e,t,r){return e?{image:v({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${r}`})}:{}}function b(e){const{siteConfig:t}=(0,u.default)(),{withBaseUrl:r}=(0,l.hH)(),{metadata:{blogDescription:a,blogTitle:o,permalink:n}}=e,s=`${t.url}${n}`;return{"@context":"https://schema.org","@type":"Blog","@id":s,mainEntityOfPage:s,headline:o,description:a,blogPost:e.items.map((e=>function(e,t,r){const{assets:a,frontMatter:o,metadata:n}=e,{date:s,title:i,description:l,lastUpdatedAt:u}=n,c=a.image??o.image,d=o.keywords??[],b=`${t.url}${n.permalink}`,h=u?m(u):void 0;return{"@type":"BlogPosting","@id":b,mainEntityOfPage:b,url:b,headline:i,name:i,description:l,datePublished:s,...h?{dateModified:h}:{},...p(n.authors),...g(c,r,i),...d?{keywords:d}:{}}}(e.content,t,r)))}}function h(){const e=function(){const e=(0,c.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:r}=(0,d.e)(),{siteConfig:a}=(0,u.default)(),{withBaseUrl:o}=(0,l.hH)(),{date:n,title:s,description:i,frontMatter:b,lastUpdatedAt:h}=r,f=t.image??b.image,v=b.keywords??[],C=h?m(h):void 0,y=`${a.url}${r.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":y,mainEntityOfPage:y,url:y,headline:s,name:s,description:i,datePublished:n,...C?{dateModified:C}:{},...p(r.authors),...g(f,o,s),...v?{keywords:v}:{},isPartOf:{"@type":"Blog","@id":`${a.url}${e.blogBasePath}`,name:e.blogTitle}}}function f(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function v(e){let{imageUrl:t,caption:r}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:r}}var C=r(8952),y=r(1037),S=r(2190),x=r(2902),P=r(9367),T=r(7001),j=r(2454),B=r(5859),M=r(4352),w=r(6131);const k=()=>(0,w.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function E(e){const t={};return Object.values(e).forEach((e=>{const r=function(e){return e[0].toUpperCase()}(e.label);t[r]??=[],t[r].push(e)})),Object.entries(t).sort(((e,t)=>{let[r]=e,[a]=t;return r.localeCompare(a)})).map((e=>{let[t,r]=e;return{letter:t,tags:r.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}var N=r(758),L=r(854);const D="q";function V(){return(0,L.l)(D)}function A(){const{siteConfig:{baseUrl:e,themeConfig:t}}=(0,u.default)(),{algolia:{searchPagePath:r}}=t;return(0,N.useCallback)((t=>`${e}${r}?${D}=${encodeURIComponent(t)}`),[e,r])}var I=r(2579),F=r(4401),O=r(1223),_=r(911),$=r(2004),H=r(428),U=r(6907),R=r(2476),q=r(9493)},6071:(e,t,r)=>{r.r(t),r.d(t,{AnnouncementBarProvider:()=>c.o,BlogPostProvider:()=>l.i,Collapsible:()=>a.Collapsible,ColorModeProvider:()=>g.a,DEFAULT_SEARCH_TAG:()=>f.Cy,DocProvider:()=>i._,DocSidebarItemsExpandedStateProvider:()=>o.A,DocsPreferredVersionContextProvider:()=>u.VQ,DocsSidebarProvider:()=>s.V,DocsVersionProvider:()=>n.n,ErrorBoundaryError:()=>a.ErrorBoundaryError,ErrorBoundaryErrorMessageFallback:()=>a.ErrorBoundaryErrorMessageFallback,ErrorBoundaryTryAgainButton:()=>a.ErrorBoundaryTryAgainButton,ErrorCauseBoundary:()=>a.ErrorCauseBoundary,HtmlClassNameProvider:()=>a.HtmlClassNameProvider,NavbarProvider:()=>M.G,NavbarSecondaryMenuFiller:()=>a.NavbarSecondaryMenuFiller,PageMetadata:()=>a.PageMetadata,PluginHtmlClassNameProvider:()=>B.Jx,ReactContextError:()=>a.ReactContextError,ScrollControllerProvider:()=>T.Tv,SkipToContentFallbackId:()=>a.SkipToContentFallbackId,SkipToContentLink:()=>a.SkipToContentLink,ThemeClassNames:()=>a.ThemeClassNames,ThemedComponent:()=>a.ThemedComponent,UnlistedBannerMessage:()=>a.UnlistedBannerMessage,UnlistedBannerTitle:()=>a.UnlistedBannerTitle,UnlistedMetadata:()=>a.UnlistedMetadata,composeProviders:()=>a.composeProviders,containsLineNumbers:()=>h._u,createStorageSlot:()=>a.createStorageSlot,docVersionSearchTag:()=>f.tU,duplicates:()=>a.duplicates,filterDocCardListItems:()=>a.filterDocCardListItems,findFirstSidebarItemLink:()=>v.Nr,findSidebarCategory:()=>v._j,getPrismCssVariables:()=>h.M$,isActiveSidebarItem:()=>v.w8,isDocsPluginEnabled:()=>v.C5,isMultiColumnFooterLinks:()=>a.isMultiColumnFooterLinks,isRegexpStringMatch:()=>a.isRegexpStringMatch,isSamePath:()=>j.ys,isVisibleSidebarItem:()=>v.Se,keyboardFocusedClassName:()=>V.w,listStorageKeys:()=>a.listStorageKeys,listTagsByLetters:()=>a.listTagsByLetters,parseCodeBlockTitle:()=>h.wt,parseLanguage:()=>h.Op,parseLines:()=>h.Li,prefersReducedMotion:()=>a.prefersReducedMotion,processAdmonitionProps:()=>a.processAdmonitionProps,sanitizeTabsChildren:()=>d.v,splitNavbarItems:()=>M.D,translateTagsPageTitle:()=>a.translateTagsPageTitle,uniq:()=>a.uniq,useAlternatePageUtils:()=>b.o,useAnnouncementBar:()=>c.M,useBackToTopButton:()=>F.H,useBlogListPageStructuredData:()=>a.useBlogListPageStructuredData,useBlogPost:()=>l.e,useBlogPostStructuredData:()=>a.useBlogPostStructuredData,useClearQueryString:()=>a.useClearQueryString,useCodeWordWrap:()=>I.f,useCollapsible:()=>a.useCollapsible,useColorMode:()=>a.useColorMode,useContextualSearchFilters:()=>a.useContextualSearchFilters,useCurrentSidebarCategory:()=>a.useCurrentSidebarCategory,useDateTimeFormat:()=>L.i,useDoc:()=>i.u,useDocById:()=>v.cC,useDocRootMetadata:()=>v.B5,useDocSidebarItemsExpandedState:()=>o.G,useDocsPreferredVersion:()=>a.useDocsPreferredVersion,useDocsPreferredVersionByPluginId:()=>u.XK,useDocsSidebar:()=>s.t,useDocsVersion:()=>n.r,useDocsVersionCandidates:()=>v.Vd,useEvent:()=>a.useEvent,useFilteredAndTreeifiedTOC:()=>P.h,useHideableNavbar:()=>D.S,useHistoryPopHandler:()=>x.$Z,useHistorySelector:()=>x.Hl,useHomePageRoute:()=>j.Dt,useKeyboardNavigation:()=>V.J,useLayoutDoc:()=>v.QB,useLayoutDocsSidebar:()=>v.fW,useLocalPathname:()=>S.B,useLocationChange:()=>y.$,useLockBodyScroll:()=>A._,useNavbarMobileSidebar:()=>m.M,useNavbarSecondaryMenu:()=>p.T,usePluralForm:()=>a.usePluralForm,usePrevious:()=>a.usePrevious,usePrismTheme:()=>a.usePrismTheme,useQueryString:()=>a.useQueryString,useQueryStringList:()=>a.useQueryStringList,useQueryStringValue:()=>x.aZ,useScrollController:()=>T.n1,useScrollPosition:()=>T.Mq,useScrollPositionBlocker:()=>T.a_,useSearchLinkCreator:()=>a.useSearchLinkCreator,useSearchQueryString:()=>a.useSearchQueryString,useSidebarBreadcrumbs:()=>v.OF,useSmoothScrollTo:()=>T.gk,useStorageSlot:()=>a.useStorageSlot,useTOCHighlight:()=>w.i,useTabs:()=>d.u,useThemeConfig:()=>a.useThemeConfig,useTitleFormatter:()=>C.s,useTreeifiedTOC:()=>P.v,useVisibleBlogSidebarItems:()=>N,useVisibleSidebarItems:()=>v.Y,useWindowSize:()=>a.useWindowSize});var a=r(5632),o=r(3600),n=r(7843),s=r(2779),i=r(1016),l=r(9306),u=r(2004),c=r(106),d=r(970),m=r(8026),p=r(7088),g=r(2454),b=r(7210),h=r(4628),f=r(6610),v=r(8023),C=r(5646),y=r(4875),S=r(3565),x=r(854),P=r(7152),T=r(5053),j=r(1772),B=r(7001),M=r(5372),w=r(1103),k=r(758),E=r(5557);function N(e){const{pathname:t}=(0,E.zy)();return(0,k.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,j.ys)(e.permalink,t))}(e,t)))),[e,t])}var L=r(5407),D=r(5691),V=r(5982),A=r(5183),I=r(2888),F=r(5404)},970:(e,t,r)=>{r.d(t,{u:()=>p,v:()=>u});var a=r(758),o=r(5557),n=r(5552),s=r(854),i=r(1223),l=r(560);function u(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function c(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:r,attributes:a,default:o}}=e;return{value:t,label:r,attributes:a,default:o}}))}(r);return function(e){const t=(0,i.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function d(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:r}=e;const n=(0,o.W6)(),i=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,s.aZ)(i),(0,a.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(n.location.search);t.set(i,e),n.replace({...n.location,search:t.toString()})}),[i,n])]}function p(e){const{defaultValue:t,queryString:r=!1,groupId:o}=e,s=c(e),[i,u]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=r.find((e=>e.default))??r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:s}))),[p,g]=m({queryString:r,groupId:o}),[b,h]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[o,n]=(0,l.Dv)(r);return[o,(0,a.useCallback)((e=>{r&&n.set(e)}),[r,n])]}({groupId:o}),f=(()=>{const e=p??b;return d({value:e,tabValues:s})?e:null})();(0,n.A)((()=>{f&&u(f)}),[f]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);u(e),g(e),h(e)}),[g,h,s]),tabValues:s}}},8952:(e,t,r)=>{r.d(t,{W:()=>u});var a=r(758),o=r(2465);const n=["zero","one","two","few","many","other"];function s(e){return n.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:s(["one","other"]),select:e=>1===e?"one":"other"};function l(){const{i18n:{currentLocale:e}}=(0,o.default)();return(0,a.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:s(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function u(){const e=l();return{selectMessage:(t,r)=>function(e,t,r){const a=e.split("|");if(1===a.length)return a[0];a.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${a.length}: ${e}`);const o=r.select(t),n=r.pluralForms.indexOf(o);return a[Math.min(n,a.length-1)]}(r,t,e)}}},3096:(e,t,r)=>{const a=r(758).createContext({options:{banner:"",breadcrumbs:!0,gitRefName:"master",minimal:!1,pluginId:"default",scopes:[]},reflections:{}});t.ApiDataContext=a},2198:(e,t,r)=>{function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function n(e,t,r){var a;return(t="symbol"==typeof(a=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?a:String(a))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=r(5632),i=r(8677),l=r(6718),u=r(8426),c=r(7574),d=r(4473),m=r(726),p=r(9134),g=r(6162),b=r(3440),h=r(3253),f=r(6070),v=e=>e&&e.__esModule?e:{default:e},C=v(i),y=v(l),S=v(u),x=v(c),P=v(d),T=v(m),j=v(p);e.exports=function(e){let{children:t,heading:r,pageMetadata:a,pagingMetadata:n,toc:i}=e;const l=s.useWindowSize(),u=g.useBreadcrumbs(),c=i.length>0,d=c&&("desktop"===l||"ssr"===l);return f.jsxs(f.Fragment,{children:[a,f.jsxs("div",{className:"row",children:[f.jsxs("div",{className:"col apiItemCol",children:[f.jsx(h.VersionBanner,{}),f.jsxs("div",{className:"apiItemContainer",children:[f.jsxs("article",{children:[u&&f.jsx(C.default,{}),f.jsx(S.default,{}),c&&f.jsx(j.default,{className:`${s.ThemeClassNames.docs.docTocMobile??""} apiTocMobile`,maxHeadingLevel:6,minHeadingLevel:1,toc:i}),f.jsxs("div",{className:`${s.ThemeClassNames.docs.docMarkdown??""} markdown`,children:[f.jsx("header",{children:f.jsx(x.default,{as:"h1",children:r})}),f.jsx(P.default,{children:t})]}),f.jsx(b.Footer,{})]}),n&&f.jsx(y.default,o({},n))]})]}),d&&f.jsx("div",{className:"col col--3",children:f.jsx(T.default,{className:s.ThemeClassNames.docs.docTocDesktop,maxHeadingLevel:6,minHeadingLevel:1,toc:i})})]})]})}},3440:(e,t,r)=>{const a=r(6070);t.Footer=function(){return a.jsxs("footer",{className:"tsd-footer",children:["Powered by"," ",a.jsx("a",{href:"https://github.com/milesj/docusaurus-plugin-typedoc-api",children:"docusaurus-plugin-typedoc-api"})," ","and ",a.jsx("a",{href:"https://typedoc.org/",children:"TypeDoc"})]})}},3253:(e,t,r)=>{const a=r(758),o=r(3557),n=r(9649),s=r(5632),i=r(6071),l=r(6070),u=(e=>e&&e.__esModule?e:{default:e})(o);t.VersionBanner=function(){const e=i.useDocsVersion(),t=e.banner,r=e.docs,o=e.pluginId,c=e.version,d=n.useDocVersionSuggestions(o).latestVersionSuggestion,m=s.useDocsPreferredVersion(o).savePreferredVersionName,p=a.useCallback((()=>{m(d.name)}),[d.name,m]);if(!t||!d)return null;const g=r[d.label];return l.jsx("div",{className:`${s.ThemeClassNames.docs.docVersionBanner} alert alert--warning margin-bottom--md`,role:"alert",children:l.jsxs("div",{children:["unreleased"===t&&l.jsx(l.Fragment,{children:"This is documentation for an unreleased version."}),"unmaintained"===t&&l.jsxs(l.Fragment,{children:["This is documentation for version ",l.jsx("b",{children:c}),"."]})," ","For the latest API, see version"," ",l.jsx("b",{children:l.jsx(u.default,{to:g.id,onClick:p,children:g.title})}),"."]})})}},6162:(e,t,r)=>{const a=r(758),o=r(3096);t.useBreadcrumbs=function(){return a.useContext(o.ApiDataContext).options.breadcrumbs}}}]);