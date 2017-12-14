webpackJsonp([0],{"./src/components/App.js":function(e,t,n){"use strict";t.a=function(e){return o.a.createElement(i.a,null)};var r=n("./node_modules/react/index.js"),o=n.n(r),i=n("./src/components/organisms/Home.js")},"./src/components/atoms/Cell.js":function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n("./node_modules/react/index.js"),l=(n.n(a),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={editing:!1,editingValue:null},n}return i(t,a["Component"]),u(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.onSet,r=t.gridName,o=this.state,i=o.editing,u=o.editingValue,s={gridArea:r,outline:"1px solid black"};return a.createElement("div",{style:s},i?a.createElement("input",{value:u,onChange:function(t){var n=t.target.value;e.setState({editingValue:n})},onBlur:function(t){n(u),e.setState({editingValue:null,editing:!1})},onKeyDown:function(t){13===t.keyCode&&(n(u),e.setState({editingValue:null,editing:!1}))}}):a.createElement("span",{onDoubleClick:function(){e.setState(function(e){return l({},e,{editing:!0,editingValue:r})})}},r))}}]),t}();t.a=s},"./src/components/organisms/Home.js":function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n("./node_modules/react/index.js"),u=n.n(l),s=n("./node_modules/uuid/index.js"),c=n.n(s),d=n("./node_modules/lodash.range/index.js"),m=n.n(d),f=n("./node_modules/lodash.uniq/index.js"),p=n.n(f),g=n("./node_modules/lodash.flatten/index.js"),h=n.n(g),y=n("./node_modules/lodash.chunk/index.js"),b=n.n(y),v=n("./src/components/atoms/Cell.js"),w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},j=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),C=1,E=function(e,t,n){var r=t*n-e.length,o=m()(r).map(function(e){return{name:"g"+(++C).toString(),id:c()()}});return e.concat(o)},_=function(e,t,n){return e.slice(0,(t-1)*n)},x=function(e,t,n){return h()(b()(e,n).map(function(e){return e.slice(0,e.length-1)}))},O=function(e,t){return b()(e,t).map(function(e){return e.map(function(e){return e.name}).join(" ")}).map(function(e){return"'"+e+"'"}).join(" ")},S=function(e){function t(){var e,n,r,a;o(this,t);for(var l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.state={columns:["1fr"],rows:["1fr"],rowCount:1,columnCount:1,cells:[{name:"g0",id:c()()}]},a=n,i(r,a)}return a(t,u.a.Component),j(t,[{key:"updateCellName",value:function(e,t){this.setState(function(n){return w({},n,{cells:n.cells.map(function(n,r){return n.id===e?(console.log("update",r,r),w({},n,{name:t})):n})})})}},{key:"addRow",value:function(){this.setState(function(e){return w({},e,{rowCount:e.rowCount+1,rows:e.rows.concat(["1fr"]),cells:E(e.cells,e.rowCount+1,e.columnCount)})})}},{key:"deleteRow",value:function(){var e=this.state,t=e.rows,n=e.rowCount,r=e.columnCount,o=e.cells;this.setState(function(e){return w({},e,{rowCount:n-1,rows:t.slice(0,t.length-1),cells:_(o,n,r)})})}},{key:"addColumn",value:function(){this.setState(function(e){return w({},e,{columnCount:e.columnCount+1,columns:e.columns.concat(["1fr"]),cells:E(e.cells,e.rowCount,e.columnCount+1)})})}},{key:"deleteColumn",value:function(){var e=this.state,t=e.columns,n=e.columnCount,r=(e.rowCount,e.cells);this.setState(function(e){return w({},e,{columnCount:n-1,columns:t.slice(0,t.length-1),cells:x(r,0,n)})})}},{key:"componentDidUpdate",value:function(){console.log(this.state.cells)}},{key:"render",value:function(){var e=this,t={width:"100%",height:"100%",display:"grid",gridTemplateColumns:this.state.columns.join(" "),gridTemplateRows:this.state.rows.join(" "),gridTemplateAreas:O(this.state.cells,this.state.columnCount)},n=this.state,o=n.cells,i=n.columns,a=n.rows,s=p()(o.map(function(e){return e.name})),c=Object.assign;return u.a.createElement(l.Fragment,null,u.a.createElement("div",{style:{width:"800px",height:"600px"}},u.a.createElement("div",{style:{width:"100%",height:"100%",display:"grid",gridTemplateColumns:"\n                60px 1fr 60px\n              ",gridTemplateRows:"\n                30px\n                1fr\n                30px\n              ",gridTemplateAreas:'\n              "_0   columns addc menu"\n              "rows table   _3   menu"\n              "addr _2      _4   menu"\n\n            '}},u.a.createElement("div",{style:{gridArea:"columns"}},u.a.createElement("div",{style:{display:"grid",gridTemplateColumns:i.join(" "),gridTemplateAreas:'"'+m()(i.length).map(function(e){return"g"+e.toString()}).join(" ")+'"'}},i.map(function(t,n){return u.a.createElement("div",{key:n,style:{gridArea:"g"+n.toString()}},u.a.createElement("input",{style:{width:"100%",boxSizing:"border-box"},value:t,onChange:function(t){return e.setState(w({},e.state,{columns:c([],i,r({},n,t.target.value))}))}}))}))),u.a.createElement("div",{style:{gridArea:"addr"}},u.a.createElement("button",{onClick:this.addRow.bind(this)},"+"),"/",u.a.createElement("button",{onClick:this.deleteRow.bind(this)},"-")),u.a.createElement("div",{style:{gridArea:"addc"}},u.a.createElement("button",{onClick:this.addColumn.bind(this)},"+"),"/",u.a.createElement("button",{onClick:this.deleteColumn.bind(this)},"-")),u.a.createElement("div",{style:{gridArea:"rows"}},u.a.createElement("div",{style:{display:"grid",height:"100%",gridTemplateRows:a.join(" "),gridTemplateAreas:m()(a.length).map(function(e){return'"g'+e+'"'}).join("\n")}},a.map(function(t,n){return u.a.createElement("div",{key:n,style:{gridArea:"g"+n.toString()}},u.a.createElement("input",{style:{width:"100%",boxSizing:"border-box"},value:t,onChange:function(t){return e.setState(w({},e.state,{rows:c([],a,r({},n,t.target.value))}))}}))}))),u.a.createElement("div",{style:{gridArea:"menu"}},"menu"),u.a.createElement("div",{style:{gridArea:"table"}},u.a.createElement("div",{style:t},s.map(function(t,n){var r=o.find(function(e){return e.name===t});return r&&u.a.createElement(v.a,{key:n,gridName:t,cell:r,onSet:function(t){return e.updateCellName(r.id,t)}})}))))),u.a.createElement("pre",null,"style: ",JSON.stringify(t,null,2)))}}]),t}();t.a=S},"./src/index.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("./node_modules/babel-polyfill/lib/index.js"),o=(n.n(r),n("./node_modules/react/index.js")),i=(n.n(o),n("./node_modules/react-dom/index.js")),a=n.n(i),l=n("./src/components/App.js"),u=document.querySelector("main");u&&a.a.render(o.createElement(l.a,null),u)},1:function(e,t,n){e.exports=n("./src/index.js")}},[1]);