"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[585],{6585:function(e,r,n){n.r(r),n.d(r,{ChatPage:function(){return a}});var t=n(885),s=n(2791),i=n(8687),u=n(6995),c=n(184),a=function(){return(0,c.jsx)("div",{children:(0,c.jsx)(o,{})})},o=function(){var e=(0,i.I0)(),r=(0,i.v9)((function(e){return e.chat.status}));return(0,s.useEffect)((function(){return e((0,u.WE)()),function(){e((0,u.R7)())}}),[]),(0,c.jsxs)("div",{children:["error"===r&&(0,c.jsx)("div",{children:"Some error occurred. Please refresh the page"}),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l,{}),(0,c.jsx)(d,{})]})]})},l=function(){var e=(0,s.useRef)(null),r=(0,i.v9)((function(e){return e.chat.messages})),n=(0,s.useState)(!1),u=(0,t.Z)(n,2),a=u[0],o=u[1];return(0,s.useEffect)((function(){var r;a&&(null===(r=e.current)||void 0===r||r.scrollIntoView({behavior:"smooth"}))}),[r]),(0,c.jsxs)("div",{style:{height:"400px",overflowY:"auto"},onScroll:function(e){var r=e.currentTarget;Math.abs(r.scrollHeight-r.scrollTop-r.clientHeight)<300?!a&&o(!0):a&&o(!1)},children:[r.map((function(e,r){return(0,c.jsx)(h,{message:e},e.id)})),(0,c.jsx)("div",{ref:e})]})},h=(0,s.memo)((function(e){var r=e.message;return(0,c.jsxs)("div",{children:[(0,c.jsx)("img",{src:r.photo,style:{width:"30px"}})," ",(0,c.jsx)("b",{children:r.userName}),(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:r.message}),(0,c.jsx)("hr",{})]})})),d=function(){var e=(0,s.useState)(""),r=(0,t.Z)(e,2),n=r[0],a=r[1],o=(0,i.I0)(),l=(0,i.v9)((function(e){return e.chat.status}));return(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{children:(0,c.jsx)("textarea",{onChange:function(e){a(e.currentTarget.value)},value:n})}),(0,c.jsx)("div",{children:(0,c.jsx)("button",{disabled:"ready"===l,onClick:function(){n&&(o((0,u.bG)(n)),a(""))},children:"Send"})})]})}}}]);
//# sourceMappingURL=585.355145ed.chunk.js.map