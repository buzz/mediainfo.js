"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[450],{8715:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>A,contentTitle:()=>F,default:()=>T,frontMatter:()=>k,metadata:()=>r,toc:()=>w});const r=JSON.parse('{"id":"getting-started/usage","title":"Usage","description":"Learn how to instantiate MediaInfo and analyze files.","source":"@site/docs/getting-started/usage.md","sourceDirName":"getting-started","slug":"/getting-started/usage","permalink":"/docs/getting-started/usage","draft":false,"unlisted":false,"editUrl":"https://github.com/buzz/mediainfo.js/blob/gh-pages-src/docs/getting-started/usage.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"description":"Learn how to instantiate MediaInfo and analyze files."},"sidebar":"docsSidebar","previous":{"title":"Installation","permalink":"/docs/getting-started/installation"},"next":{"title":"Development","permalink":"/docs/development"}}');var i=t(5105),a=t(9621),o=t(8101),s=t(3526),l=t(4685),d=t(5234),c=t(7556),u=t(8086),m=t(455),h=t(1458);function p(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function f(e){const{values:n,children:t}=e;return(0,o.useMemo)((()=>{const e=n??function(e){return p(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:i}}=e;return{value:n,label:t,attributes:r,default:i}}))}(t);return function(e){const n=(0,m.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function b(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const r=(0,d.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,u.aZ)(i),(0,o.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(r.location.search);n.set(i,e),r.replace({...r.location,search:n.toString()})}),[i,r])]}function x(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,i=f(e),[a,s]=(0,o.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!b({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:i}))),[l,d]=g({queryString:t,groupId:r}),[u,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,i]=(0,h.Dv)(t);return[r,(0,o.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:r}),p=(()=>{const e=l??u;return b({value:e,tabValues:i})?e:null})();(0,c.A)((()=>{p&&s(p)}),[p]);return{selectedValue:a,selectValue:(0,o.useCallback)((e=>{if(!b({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);s(e),d(e),m(e)}),[d,m,i]),tabValues:i}}var j=t(4064);const v={tabList:"tabList_o1p8",tabItem:"tabItem_stxo"};function C(e){let{className:n,block:t,selectedValue:r,selectValue:a,tabValues:o}=e;const d=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.a_)(),u=e=>{const n=e.currentTarget,t=d.indexOf(n),i=o[t].value;i!==r&&(c(n),a(i))},m=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=d.indexOf(e.currentTarget)+1;n=d[t]??d[0];break}case"ArrowLeft":{const t=d.indexOf(e.currentTarget)-1;n=d[t]??d[d.length-1];break}}n?.focus()};return(0,i.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,i.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>d.push(e),onKeyDown:m,onClick:u,...a,className:(0,s.A)("tabs__item",v.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,o.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,i.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function _(e){const n=x(e);return(0,i.jsxs)("div",{className:(0,s.A)("tabs-container",v.tabList),children:[(0,i.jsx)(C,{...n,...e}),(0,i.jsx)(y,{...n,...e})]})}function M(e){const n=(0,j.A)();return(0,i.jsx)(_,{...e,children:p(e.children)},String(n))}const S={tabItem:"tabItem_t2gf"};function I(e){let{children:n,hidden:t,className:r}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,s.A)(S.tabItem,r),hidden:t,children:n})}const k={sidebar_position:2,description:"Learn how to instantiate MediaInfo and analyze files."},F="Usage",A={},w=[{value:"Factory function <code>mediaInfoFactory</code>",id:"factory-function-mediainfofactory",level:2},{value:"Options",id:"options",level:3},{value:"<code>MediaInfo</code> object",id:"mediainfo-object",level:2},{value:"Result",id:"result",level:2},{value:"Output as JavaScript object",id:"output-as-javascript-object",level:3},{value:"String output",id:"string-output",level:3}];function P(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"usage",children:"Usage"})}),"\n",(0,i.jsxs)(n.h2,{id:"factory-function-mediainfofactory",children:["Factory function ",(0,i.jsx)(n.code,{children:"mediaInfoFactory"})]}),"\n",(0,i.jsxs)(n.p,{children:["Instantiate ",(0,i.jsx)(n.a,{href:"/api/class/MediaInfo",children:(0,i.jsx)(n.code,{children:"MediaInfo"})})," by utilizing the factory function\n",(0,i.jsx)(n.a,{href:"/api/function/mediaInfoFactory",children:(0,i.jsx)(n.code,{children:"mediaInfoFactory"})}),". This function manages the loading of the WASM file and can\nbe invoked with either a callback or asynchronously. Ensure to close the ",(0,i.jsx)(n.a,{href:"/api/class/MediaInfo",children:(0,i.jsx)(n.code,{children:"MediaInfo"})}),"\ninstance using the ",(0,i.jsx)(n.a,{href:"/api/class/MediaInfo#close",children:(0,i.jsx)(n.code,{children:"close()"})})," method when finished, instead of instantiating and closing it\nrepeatedly. Retain the instance for the duration of its required usage."]}),"\n",(0,i.jsxs)(M,{groupId:"call-method",children:[(0,i.jsx)(I,{value:"async",label:"Async",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import mediaInfoFactory from 'mediainfo.js';\n\nconst mediainfo = await mediaInfoFactory();\nconst result = mediainfo.analyzeFile(...);\nmediainfo.close();\n"})})}),(0,i.jsx)(I,{value:"promise",label:"Promise",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import mediaInfoFactory from 'mediainfo.js';\n\nmediaInfoFactory().then((mediainfo) => {\n  const result = mediainfo.analyzeFile(...);\n  mediainfo.close();\n});\n"})})}),(0,i.jsx)(I,{value:"callback",label:"Callback",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import mediaInfoFactory from 'mediainfo.js';\n\nmediaInfoFactory({}, (mediainfo) => {\n  const result = mediainfo.analyzeFile(...);\n  mediainfo.close();\n});\n"})})})]}),"\n",(0,i.jsx)(n.h3,{id:"options",children:"Options"}),"\n",(0,i.jsxs)(n.p,{children:["You can configure the ",(0,i.jsx)(n.a,{href:"/api/class/MediaInfo",children:(0,i.jsx)(n.code,{children:"MediaInfo"})})," instance using\n",(0,i.jsx)(n.a,{href:"/api/interface/MediaInfoFactoryOptions",children:(0,i.jsx)(n.code,{children:"MediaInfoFactoryOptions"})}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Notable options include:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"format"}),": See ",(0,i.jsx)(n.a,{href:"#result",children:"result output format"})," for details."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"full"}),": Enables the display of all internal tags."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"locateFile"}),": Customizes the path for loading the WASM file."]}),"\n"]}),"\n",(0,i.jsxs)(n.h2,{id:"mediainfo-object",children:[(0,i.jsx)(n.code,{children:"MediaInfo"})," object"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/api/class/MediaInfo#analyzeData",children:(0,i.jsx)(n.code,{children:"analyzeData"})})," is provided as a convenient wrapper around the more low-level methods\nof the ",(0,i.jsx)(n.a,{href:"/api/class/MediaInfo",children:(0,i.jsx)(n.code,{children:"MediaInfo"})})," object. It supports asynchronous invocation or callbacks and\noperates on chunks of ",(0,i.jsx)(n.a,{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array",children:(0,i.jsx)(n.code,{children:"Uint8Array"})}),". Ensure to provide the following arguments:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"size"}),": The file size, which can be either a number or a function returning a number."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"readChunk"}),": Reads a data chunk from the file, returning an ",(0,i.jsx)(n.a,{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array",children:(0,i.jsx)(n.code,{children:"Uint8Array"})}),". This\nfunction can also be asynchronous."]}),"\n"]}),"\n",(0,i.jsxs)(M,{groupId:"call-method",children:[(0,i.jsx)(I,{value:"async",label:"Async",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const someBlob = ...;\n\nconst fileSize = 123456;\n\nasync function readChunk(chunkSize, offset) {\n  const buffer = await someBlob.slice(offset, offset + chunkSize).arrayBuffer();\n  return new Uint8Array(buffer);\n}\n\nconst result = await mediaInfo.analyzeData(fileSize, readChunk);\n"})})}),(0,i.jsx)(I,{value:"promise",label:"Promise",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const someBlob = ...;\n\nconst fileSize = 123456;\n\nfunction readChunk(chunkSize, offset) {\n  return new Promise((resolve) => {\n    someBlob\n      .slice(offset, offset + chunkSize)\n      .arrayBuffer()\n      .then((buffer) => {\n        resolve(new Uint8Array(buffer))\n      });\n  });\n}\n\nmediaInfo.analyzeData(fileSize, readChunk).then((result) => {\n  // ...\n});\n"})})}),(0,i.jsx)(I,{value:"callback",label:"Callback",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const someBlob = ...;\n\nconst fileSize = 123456;\n\nfunction readChunk(chunkSize, offset) {\n  return new Promise((resolve) => {\n    someBlob\n      .slice(offset, offset + chunkSize)\n      .arrayBuffer()\n      .then((buffer) => {\n        resolve(new Uint8Array(buffer))\n      });\n  });\n}\n\nmediaInfo.analyzeData(fileSize, readChunk, (result) => {\n  // ...\n});\n"})})})]}),"\n",(0,i.jsx)(n.h2,{id:"result",children:"Result"}),"\n",(0,i.jsxs)(n.p,{children:["Choose the result output format by using the ",(0,i.jsx)(n.code,{children:"format"})," option on the\n",(0,i.jsx)(n.a,{href:"/api/function/mediaInfoFactory",children:(0,i.jsx)(n.code,{children:"mediaInfoFactory"})})," function."]}),"\n",(0,i.jsxs)(n.p,{children:["Possible values: ",(0,i.jsx)(n.code,{children:"object"})," (default), ",(0,i.jsx)(n.code,{children:"JSON"}),", ",(0,i.jsx)(n.code,{children:"XML"}),", ",(0,i.jsx)(n.code,{children:"HTML"}),", ",(0,i.jsx)(n.code,{children:"text"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Media files may contain multiple ",(0,i.jsx)(n.a,{href:"/api#Track",children:"tracks"})," of types such as ",(0,i.jsx)(n.a,{href:"/api/interface/GeneralTrack",children:(0,i.jsx)(n.code,{children:"General"})}),",\n",(0,i.jsx)(n.a,{href:"/api/interface/VideoTrack",children:(0,i.jsx)(n.code,{children:"Video"})}),", ",(0,i.jsx)(n.a,{href:"/api/interface/AudioTrack",children:(0,i.jsx)(n.code,{children:"Audio"})}),", ",(0,i.jsx)(n.a,{href:"/api/interface/TextTrack",children:(0,i.jsx)(n.code,{children:"Text"})}),", ",(0,i.jsx)(n.a,{href:"/api/interface/ImageTrack",children:(0,i.jsx)(n.code,{children:"Image"})}),",\n",(0,i.jsx)(n.a,{href:"/api/interface/MenuTrack",children:(0,i.jsx)(n.code,{children:"Menu"})}),", or ",(0,i.jsx)(n.a,{href:"/api/interface/OtherTrack",children:(0,i.jsx)(n.code,{children:"Other"})}),"."]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["For a comprehensive list of possible fields, consult the ",(0,i.jsx)(n.a,{href:"/api",children:"API documentation"}),"."]})}),"\n",(0,i.jsx)(n.h3,{id:"output-as-javascript-object",children:"Output as JavaScript object"}),"\n",(0,i.jsxs)(n.p,{children:["The default output format ",(0,i.jsx)(n.code,{children:"object"})," returns the result as a JavaScript object. This is typically the\nmost useful option."]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["The library including the ",(0,i.jsx)(n.a,{href:"/api/interface/MediaInfoResult",children:"result object"})," is fully typed to enhance the developer\nexperience in supported editors."]})}),"\n",(0,i.jsx)(n.h3,{id:"string-output",children:"String output"}),"\n",(0,i.jsx)(n.p,{children:"The remaining output options return the result as a string."}),"\n",(0,i.jsxs)(t,{children:[(0,i.jsx)("summary",{children:"String result formats"}),(0,i.jsx)("div",{children:(0,i.jsxs)(M,{children:[(0,i.jsx)(I,{value:"JSON",label:"JSON",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "creatingLibrary": { "name": "MediaInfoLib", "version": "24.04", "url": "https://mediaarea.net/MediaInfo" },\n  "media": {\n    "@ref": "",\n    "track": [\n      {\n        "@type": "General",\n        "AudioCount": "1",\n        "ImageCount": "1",\n        "Format": "MPEG Audio",\n        "FileSize": "6357777",\n        "Duration": "203.493",\n        "OverallBitRate_Mode": "VBR",\n        "OverallBitRate": "243044",\n        "StreamSize": "175116",\n        "Title": "Povo Que Ca\xeds Descal\xe7o",\n        "Album": "CC Affiliates Mixtape #1",\n        "Album_Performer": "Creative Commons",\n        "Track": "Povo Que Ca\xeds Descal\xe7o",\n        "Track_Position": "1",\n        "Compilation": "Yes",\n        "Performer": "Dead Combo",\n        "Genre": "International",\n        "Recorded_Date": "2017-03-03 15:14:12 UTC",\n        "Encoded_Library": "LAME3.99r",\n        "Copyright": "Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/",\n        "Cover": "Yes",\n        "Cover_Mime": "image/jpeg",\n        "Comment": "URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/"\n      },\n      {\n        "@type": "Audio",\n        "Format": "MPEG Audio",\n        "Format_Version": "1",\n        "Format_Profile": "Layer 3",\n        "Format_Settings_Mode": "Joint stereo",\n        "Duration": "203.494",\n        "BitRate_Mode": "VBR",\n        "BitRate": "243044",\n        "BitRate_Minimum": "32000",\n        "Channels": "2",\n        "SamplesPerFrame": "1152",\n        "SamplingRate": "44100",\n        "SamplingCount": "8974080",\n        "FrameRate": "38.281",\n        "FrameCount": "7790",\n        "Compression_Mode": "Lossy",\n        "StreamSize": "6182244",\n        "Encoded_Library": "LAME3.99r",\n        "Encoded_Library_Settings": "-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32"\n      },\n      {\n        "@type": "Image",\n        "Format": "JPEG",\n        "Width": "800",\n        "Height": "800",\n        "ColorSpace": "YUV",\n        "ChromaSubsampling": "4:4:4",\n        "BitDepth": "8",\n        "Compression_Mode": "Lossy",\n        "StreamSize": "142880"\n      }\n    ]\n  }\n}\n'})})}),(0,i.jsx)(I,{value:"XML",label:"XML",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'<?xml version="1.0" encoding="UTF-8"?>\n<MediaInfo xmlns="https://mediaarea.net/mediainfo"\n  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://mediaarea.net/mediainfo https://mediaarea.net/mediainfo/mediainfo_2_0.xsd" version="2.0">\n  <creatingLibrary version="24.04" url="https://mediaarea.net/MediaInfo">MediaInfoLib</creatingLibrary>\n  <media ref="">\n    <track type="General">\n      <AudioCount>1</AudioCount>\n      <ImageCount>1</ImageCount>\n      <Format>MPEG Audio</Format>\n      <FileSize>6357777</FileSize>\n      <Duration>203.493</Duration>\n      <OverallBitRate_Mode>VBR</OverallBitRate_Mode>\n      <OverallBitRate>243044</OverallBitRate>\n      <StreamSize>175116</StreamSize>\n      <Title>Povo Que Ca\xeds Descal\xe7o</Title>\n      <Album>CC Affiliates Mixtape #1</Album>\n      <Album_Performer>Creative Commons</Album_Performer>\n      <Track>Povo Que Ca\xeds Descal\xe7o</Track>\n      <Track_Position>1</Track_Position>\n      <Compilation>Yes</Compilation>\n      <Performer>Dead Combo</Performer>\n      <Genre>International</Genre>\n      <Recorded_Date>2017-03-03 15:14:12 UTC</Recorded_Date>\n      <Encoded_Library>LAME3.99r</Encoded_Library>\n      <Copyright>Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/</Copyright>\n      <Cover>Yes</Cover>\n      <Cover_Mime>image/jpeg</Cover_Mime>\n      <Comment>URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/</Comment>\n    </track>\n    <track type="Audio">\n      <Format>MPEG Audio</Format>\n      <Format_Version>1</Format_Version>\n      <Format_Profile>Layer 3</Format_Profile>\n      <Format_Settings_Mode>Joint stereo</Format_Settings_Mode>\n      <Duration>203.494</Duration>\n      <BitRate_Mode>VBR</BitRate_Mode>\n      <BitRate>243044</BitRate>\n      <BitRate_Minimum>32000</BitRate_Minimum>\n      <Channels>2</Channels>\n      <SamplesPerFrame>1152</SamplesPerFrame>\n      <SamplingRate>44100</SamplingRate>\n      <SamplingCount>8974080</SamplingCount>\n      <FrameRate>38.281</FrameRate>\n      <FrameCount>7790</FrameCount>\n      <Compression_Mode>Lossy</Compression_Mode>\n      <StreamSize>6182244</StreamSize>\n      <Encoded_Library>LAME3.99r</Encoded_Library>\n      <Encoded_Library_Settings>-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32</Encoded_Library_Settings>\n    </track>\n    <track type="Image">\n      <Format>JPEG</Format>\n      <Width>800</Width>\n      <Height>800</Height>\n      <ColorSpace>YUV</ColorSpace>\n      <ChromaSubsampling>4:4:4</ChromaSubsampling>\n      <BitDepth>8</BitDepth>\n      <Compression_Mode>Lossy</Compression_Mode>\n      <StreamSize>142880</StreamSize>\n    </track>\n  </media>\n</MediaInfo>\n'})})}),(0,i.jsx)(I,{value:"HTML",label:"HTML",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<html>\n  <head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n  </head>\n  <body>\n    <table width="100%" border="0" cellpadding="1" cellspacing="2" style="border: 1px solid Navy">\n      <tr>\n        <td width="150"><h2>General</h2></td>\n      </tr>\n      <tr>\n        <td><i>Format :</i></td>\n        <td colspan="3">MPEG Audio</td>\n      </tr>\n      <tr>\n        <td><i>File size :</i></td>\n        <td colspan="3">6.06 MiB</td>\n      </tr>\n      <tr>\n        <td><i>Duration :</i></td>\n        <td colspan="3">3 min 23 s</td>\n      </tr>\n      <tr>\n        <td><i>Overall bit rate mode :</i></td>\n        <td colspan="3">Variable</td>\n      </tr>\n      <tr>\n        <td><i>Overall bit rate :</i></td>\n        <td colspan="3">243 kb/s</td>\n      </tr>\n      <tr>\n        <td><i>Album :</i></td>\n        <td colspan="3">CC Affiliates Mixtape #1</td>\n      </tr>\n      <tr>\n        <td><i>Album/Performer :</i></td>\n        <td colspan="3">Creative Commons</td>\n      </tr>\n      <tr>\n        <td><i>Track name :</i></td>\n        <td colspan="3">Povo Que Ca\xeds Descal\xe7o</td>\n      </tr>\n      <tr>\n        <td><i>Track name/Position :</i></td>\n        <td colspan="3">1</td>\n      </tr>\n      <tr>\n        <td><i>Compilation :</i></td>\n        <td colspan="3">Yes</td>\n      </tr>\n      <tr>\n        <td><i>Performer :</i></td>\n        <td colspan="3">Dead Combo</td>\n      </tr>\n      <tr>\n        <td><i>Genre :</i></td>\n        <td colspan="3">International</td>\n      </tr>\n      <tr>\n        <td><i>Recorded date :</i></td>\n        <td colspan="3">2017-03-03 15:14:12 UTC</td>\n      </tr>\n      <tr>\n        <td><i>Writing library :</i></td>\n        <td colspan="3">LAME3.99r</td>\n      </tr>\n      <tr>\n        <td><i>Copyright :</i></td>\n        <td colspan="3">Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/</td>\n      </tr>\n      <tr>\n        <td><i>Cover :</i></td>\n        <td colspan="3">Yes</td>\n      </tr>\n      <tr>\n        <td><i>Cover MIME :</i></td>\n        <td colspan="3">image/jpeg</td>\n      </tr>\n      <tr>\n        <td><i>Comment :</i></td>\n        <td colspan="3">\n          URL:\n          http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco\n          / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial\n          3.0 International: http://creativecommons.org/licenses/by-nc/3.0/\n        </td>\n      </tr>\n    </table>\n    <br />\n    <table width="100%" border="0" cellpadding="1" cellspacing="2" style="border: 1px solid Navy">\n      <tr>\n        <td width="150"><h2>Audio</h2></td>\n      </tr>\n      <tr>\n        <td><i>Format :</i></td>\n        <td colspan="3">MPEG Audio</td>\n      </tr>\n      <tr>\n        <td><i>Format version :</i></td>\n        <td colspan="3">Version 1</td>\n      </tr>\n      <tr>\n        <td><i>Format profile :</i></td>\n        <td colspan="3">Layer 3</td>\n      </tr>\n      <tr>\n        <td><i>Format settings :</i></td>\n        <td colspan="3">Joint stereo</td>\n      </tr>\n      <tr>\n        <td><i>Duration :</i></td>\n        <td colspan="3">3 min 23 s</td>\n      </tr>\n      <tr>\n        <td><i>Bit rate mode :</i></td>\n        <td colspan="3">Variable</td>\n      </tr>\n      <tr>\n        <td><i>Bit rate :</i></td>\n        <td colspan="3">243 kb/s</td>\n      </tr>\n      <tr>\n        <td><i>Minimum bit rate :</i></td>\n        <td colspan="3">32.0 kb/s</td>\n      </tr>\n      <tr>\n        <td><i>Channel(s) :</i></td>\n        <td colspan="3">2 channels</td>\n      </tr>\n      <tr>\n        <td><i>Sampling rate :</i></td>\n        <td colspan="3">44.1 kHz</td>\n      </tr>\n      <tr>\n        <td><i>Frame rate :</i></td>\n        <td colspan="3">38.281 FPS (1152 SPF)</td>\n      </tr>\n      <tr>\n        <td><i>Compression mode :</i></td>\n        <td colspan="3">Lossy</td>\n      </tr>\n      <tr>\n        <td><i>Stream size :</i></td>\n        <td colspan="3">5.90 MiB (97%)</td>\n      </tr>\n      <tr>\n        <td><i>Writing library :</i></td>\n        <td colspan="3">LAME3.99r</td>\n      </tr>\n      <tr>\n        <td><i>Encoding settings :</i></td>\n        <td colspan="3">-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32</td>\n      </tr>\n    </table>\n    <br />\n    <table width="100%" border="0" cellpadding="1" cellspacing="2" style="border: 1px solid Navy">\n      <tr>\n        <td width="150"><h2>Image</h2></td>\n      </tr>\n      <tr>\n        <td><i>Format :</i></td>\n        <td colspan="3">JPEG</td>\n      </tr>\n      <tr>\n        <td><i>Width :</i></td>\n        <td colspan="3">800 pixels</td>\n      </tr>\n      <tr>\n        <td><i>Height :</i></td>\n        <td colspan="3">800 pixels</td>\n      </tr>\n      <tr>\n        <td><i>Color space :</i></td>\n        <td colspan="3">YUV</td>\n      </tr>\n      <tr>\n        <td><i>Chroma subsampling :</i></td>\n        <td colspan="3">4:4:4</td>\n      </tr>\n      <tr>\n        <td><i>Bit depth :</i></td>\n        <td colspan="3">8 bits</td>\n      </tr>\n      <tr>\n        <td><i>Compression mode :</i></td>\n        <td colspan="3">Lossy</td>\n      </tr>\n      <tr>\n        <td><i>Stream size :</i></td>\n        <td colspan="3">140 KiB (100%) / 140 KiB (2%) / 140 KiB (2%) / 140 KiB (2%)</td>\n      </tr>\n    </table>\n    <br />\n  </body>\n</html>\n'})})}),(0,i.jsx)(I,{value:"text",label:"text",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"General\nFormat                                   : MPEG Audio\nFile size                                : 6.06 MiB\nDuration                                 : 3 min 23 s\nOverall bit rate mode                    : Variable\nOverall bit rate                         : 243 kb/s\nAlbum                                    : CC Affiliates Mixtape #1\nAlbum/Performer                          : Creative Commons\nTrack name                               : Povo Que Ca\xeds Descal\xe7o\nTrack name/Position                      : 1\nCompilation                              : Yes\nPerformer                                : Dead Combo\nGenre                                    : International\nRecorded date                            : 2017-03-03 15:14:12 UTC\nWriting library                          : LAME3.99r\nCopyright                                : Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/\nCover                                    : Yes\nCover MIME                               : image/jpeg\nComment                                  : URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/\n\nAudio\nFormat                                   : MPEG Audio\nFormat version                           : Version 1\nFormat profile                           : Layer 3\nFormat settings                          : Joint stereo\nDuration                                 : 3 min 23 s\nBit rate mode                            : Variable\nBit rate                                 : 243 kb/s\nMinimum bit rate                         : 32.0 kb/s\nChannel(s)                               : 2 channels\nSampling rate                            : 44.1 kHz\nFrame rate                               : 38.281 FPS (1152 SPF)\nCompression mode                         : Lossy\nStream size                              : 5.90 MiB (97%)\nWriting library                          : LAME3.99r\nEncoding settings                        : -m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32\n\nImage\nFormat                                   : JPEG\nWidth                                    : 800 pixels\nHeight                                   : 800 pixels\nColor space                              : YUV\nChroma subsampling                       : 4:4:4\nBit depth                                : 8 bits\nCompression mode                         : Lossy\nStream size                              : 140 KiB (100%) / 140 KiB (2%) / 140 KiB (2%) / 140 KiB (2%)\n"})})})]})})]})]})}function T(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(P,{...e})}):P(e)}},9621:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>s});var r=t(8101);const i={},a=r.createContext(i);function o(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);