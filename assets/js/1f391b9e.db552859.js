"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[61],{3550:(e,t,a)=>{a.d(t,{A:()=>m});a(758);var s=a(3526),d=a(8607),n=a(5714),l=a(153),i=a(6070);function r(e){let{className:t}=e;return(0,i.jsx)(l.A,{type:"caution",title:(0,i.jsx)(d.Yh,{}),className:(0,s.A)(t,n.G.common.draftBanner),children:(0,i.jsx)(d.TT,{})})}function c(e){let{className:t}=e;return(0,i.jsx)(l.A,{type:"caution",title:(0,i.jsx)(d.Rc,{}),className:(0,s.A)(t,n.G.common.unlistedBanner),children:(0,i.jsx)(d.Uh,{})})}function o(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(d.AE,{}),(0,i.jsx)(c,{...e})]})}function m(e){let{metadata:t}=e;const{unlisted:a,frontMatter:s}=t;return(0,i.jsxs)(i.Fragment,{children:[(a||s.unlisted)&&(0,i.jsx)(o,{}),s.draft&&(0,i.jsx)(r,{})]})}},1602:(e,t,a)=>{a.d(t,{A:()=>g});a(758);var s=a(3526),d=a(7740),n=a(5714),l=a(1497);const i={iconEdit:"iconEdit__ebg"};var r=a(6070);function c(e){let{className:t,...a}=e;return(0,r.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.A)(i.iconEdit,t),"aria-hidden":"true",...a,children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function o(e){let{editUrl:t}=e;return(0,r.jsxs)(l.default,{to:t,className:n.G.common.editThisPage,children:[(0,r.jsx)(c,{}),(0,r.jsx)(d.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var m=a(9413);function h(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,m.default)(),a=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,m.default)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:a,...e})}function u(e){let{lastUpdatedAt:t}=e;const a=new Date(t),s=h({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(a);return(0,r.jsx)(d.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,r.jsx)("b",{children:(0,r.jsx)("time",{dateTime:a.toISOString(),itemProp:"dateModified",children:s})})},children:" on {date}"})}function p(e){let{lastUpdatedBy:t}=e;return(0,r.jsx)(d.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,r.jsx)("b",{children:t})},children:" by {user}"})}function x(e){let{lastUpdatedAt:t,lastUpdatedBy:a}=e;return(0,r.jsxs)("span",{className:n.G.common.lastUpdated,children:[(0,r.jsx)(d.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,r.jsx)(u,{lastUpdatedAt:t}):"",byUser:a?(0,r.jsx)(p,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const j={lastUpdated:"lastUpdated_H_ck"};function g(e){let{className:t,editUrl:a,lastUpdatedAt:d,lastUpdatedBy:n}=e;return(0,r.jsxs)("div",{className:(0,s.A)("row",t),children:[(0,r.jsx)("div",{className:"col",children:a&&(0,r.jsx)(o,{editUrl:a})}),(0,r.jsx)("div",{className:(0,s.A)("col",j.lastUpdated),children:(d||n)&&(0,r.jsx)(x,{lastUpdatedAt:d,lastUpdatedBy:n})})]})}},404:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});a(758);var s=a(3526),d=a(8186),n=a(5714),l=a(5655),i=a(9725),r=a(8586),c=a(3550),o=a(1602);const m={mdxPageWrapper:"mdxPageWrapper_H35u"};var h=a(6070);function u(e){const{content:t}=e,{metadata:a,assets:u}=t,{title:p,editUrl:x,description:j,frontMatter:g,lastUpdatedBy:U,lastUpdatedAt:f}=a,{keywords:A,wrapperClassName:v,hide_table_of_contents:b}=g,w=u.image??g.image,y=!!(x||f||U);return(0,h.jsx)(d.e3,{className:(0,s.A)(v??n.G.wrapper.mdxPages,n.G.page.mdxPage),children:(0,h.jsxs)(l.A,{children:[(0,h.jsx)(d.be,{title:p,description:j,keywords:A,image:w}),(0,h.jsx)("main",{className:"container container--fluid margin-vert--lg",children:(0,h.jsxs)("div",{className:(0,s.A)("row",m.mdxPageWrapper),children:[(0,h.jsxs)("div",{className:(0,s.A)("col",!b&&"col--8"),children:[(0,h.jsx)(c.A,{metadata:a}),(0,h.jsx)("article",{children:(0,h.jsx)(i.default,{children:(0,h.jsx)(t,{})})}),y&&(0,h.jsx)(o.A,{className:(0,s.A)("margin-top--sm",n.G.pages.pageFooterEditMetaRow),editUrl:x,lastUpdatedAt:f,lastUpdatedBy:U})]}),!b&&t.toc.length>0&&(0,h.jsx)("div",{className:"col col--2",children:(0,h.jsx)(r.default,{toc:t.toc,minHeadingLevel:g.toc_min_heading_level,maxHeadingLevel:g.toc_max_heading_level})})]})})]})})}}}]);