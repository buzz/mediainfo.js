"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[924],{3248:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"getting-started/installation","title":"Installation","description":"Use a CDN or install via npm.","source":"@site/docs/getting-started/installation.md","sourceDirName":"getting-started","slug":"/getting-started/installation","permalink":"/docs/getting-started/installation","draft":false,"unlisted":false,"editUrl":"https://github.com/buzz/mediainfo.js/blob/gh-pages-src/docs/getting-started/installation.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"description":"Use a CDN or install via npm."},"sidebar":"docsSidebar","previous":{"title":"Getting Started","permalink":"/docs/category/getting-started"},"next":{"title":"Usage","permalink":"/docs/getting-started/usage"}}');var s=t(5105),o=t(9621);const a={sidebar_position:1,description:"Use a CDN or install via npm."},r="Installation",l={},d=[{value:"Bundler",id:"bundler",level:2},{value:"WASM file loading",id:"wasm-file-loading",level:3},{value:"CDN",id:"cdn",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"installation",children:"Installation"})}),"\n",(0,s.jsx)(n.h2,{id:"bundler",children:"Bundler"}),"\n",(0,s.jsx)(n.p,{children:"Install mediainfo.js using a package manager of your choice."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"$ npm install mediainfo.js\n"})}),"\n",(0,s.jsx)(n.h3,{id:"wasm-file-loading",children:"WASM file loading"}),"\n",(0,s.jsxs)(n.p,{children:["When calling ",(0,s.jsx)(n.a,{href:"/api/function/mediaInfoFactory",children:(0,s.jsx)(n.code,{children:"mediaInfoFactory()"})}),", the WASM file is automatically\nloaded. By default, it is searched for in the parent directory relative to the script file, aligning\nwith the package distribution structure. This setup works out-of-the-box for the CDN version."]}),"\n",(0,s.jsx)(n.p,{children:"When using a bundler:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Ensure the file ",(0,s.jsx)(n.code,{children:"node_modules/mediainfo.js/dist/MediaInfoModule.wasm"})," is accessible by the web\nserver. The steps to achieve this depend on your framework and project setup. The simplest method\nis to copy the file to your ",(0,s.jsx)(n.code,{children:"static"})," files folder."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"/api/interface/MediaInfoFactoryOptions#locateFile",children:(0,s.jsx)(n.code,{children:"locateFile"})})," option allows you to adjust\nthe location from which the WASM file is loaded."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["Refer to the ",(0,s.jsx)(n.a,{href:"/docs/category/examples",children:"examples page"})," for instructions on using different\nframeworks."]})}),"\n",(0,s.jsx)(n.h2,{id:"cdn",children:"CDN"}),"\n",(0,s.jsxs)(n.p,{children:["For simple projects you might want to use the CDN version of mediainfo.js. Just add the ",(0,s.jsx)(n.code,{children:"script"})," tag\nto your website."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<script type="text/javascript" src="https://unpkg.com/mediainfo.js"><\/script>\n'})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"Users of the CDN version do not need to manage WASM file loading, as it is preconfigured to load\nfrom the CDN server."})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},9621:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var i=t(8101);const s={},o=i.createContext(s);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);