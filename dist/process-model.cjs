function t(){return t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},t.apply(this,arguments)}var e,n=(e=Object.create(null),function(t){var n=toString.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())}),r=function(t){return function(e){return typeof e===t}},i=Object.getPrototypeOf,o=r("string"),a=r("undefined");function u(t){return null==t||""===t}var c=[].concat(["info","average-hue","imageslim"],["detectface","tagimage"],[]),f=[].concat(["resize","crop","circle","indexcrop","rounded-corners","rotate","auto-orient","bright","contrast","sharpen","blur","watermark","quality","format","interlace","imageslim","info","average-hue"],[],[]),s={withoutParamsCommand:c,multipleArgCommand:[].concat(["blur","resize","crop","circle","indexcrop","rounded-corners","watermark","quality"],[],["snapshot"]),commandSort:f,PIPE_SEPARATOR:"/",PARAMETER_SEPARATOR:"_",COMMAND_SEPARATOR:","},l=/*#__PURE__*/function(){function e(e,n){void 0===n&&(n={}),this.VERSION="0.0.1-alpha.1",this._model=[],this._config=function(t){var e=new WeakMap;function n(t){return"object"==typeof t&&t||"function"==typeof t}return function t(r){if(!n(r))return r;if([Date,RegExp].includes(r.constructor))return new r.constructor(r);if("function"==typeof r)return new Function("return "+r.toString())();var i=e.get(r);if(i)return i;if(r instanceof Map){var o=new Map;return r.forEach(function(e,r){n(r)?o.set(e,t(r)):o.set(e,r)}),e.set(r,o),o}if(r instanceof Set){var a=new Set;return r.forEach(function(e){n(e)?a.add(t(e)):a.add(e)}),e.set(r,a),a}if(Array.isArray(r)){var u=[];return r.forEach(function(e){n(e)?u.push(t(e)):u.push(e)}),e.set(r,u),u}var c=Reflect.ownKeys(r),f=Object.getOwnPropertyDescriptors(r),s=Object.create(Object.getPrototypeOf(r,f));return c.forEach(function(e){var i=r[e];s[e]=n(i)?t(i):i}),e.set(r,s),s}(t)}(t({},s,n)),Array.isArray(e)?this._arrayModelFormat(e):o(e)&&this._stringModelFormat(e)}var r=e.prototype;return r._createModelItem=function(t,e){var n;if(t){var r,i=this._config.withoutParamsCommand.includes(t),o=this._config.multipleArgCommand.includes(t);return r=i?"without":o?"multi":"single",(n={name:t}).value=this._commandValueFormat(t,e),n.type=r,n}},r._commandValueFormat=function(t,e){if(t){var n=this._config;if(!n.withoutParamsCommand.includes(t)){var r=n.multipleArgCommand.includes(t),i=a(e);if(r){if(i)return{};var o=typeof e;return"object"===o?e:"string"===o?e.split(n.COMMAND_SEPARATOR).reduce(function(t,e){if(e){var r=e.split(n.PARAMETER_SEPARATOR),i=r[0];i&&(r.shift(),t[i]=r.join(n.PARAMETER_SEPARATOR))}return t},{}):{}}return e}}},r._arrayModelFormat=function(t){var e=this;t.forEach(function(t){e.append(t.name,t.value)})},r._stringModelFormat=function(t){var e=this,n=t.split(this._config.PIPE_SEPARATOR),r=this._config.COMMAND_SEPARATOR;n.forEach(function(t){if(t){var n=t.split(r),i=n[0];n.shift();var o=n.join(r);e.append(i,o)}})},r.append=function(t,e){this._modelHandle(t,e,"append")},r.set=function(t,e){this._modelHandle(t,e,"set")},r.delete=function(t){if(t){var e=this._model.findIndex(function(e){return e.name===t});e>-1&&this._model.splice(e,1)}},r.has=function(t){return this._model.some(function(e){return e.name===t})},r.sort=function(){var t=this._model,e=this._config.commandSort;t.sort(function(t,n){return e.indexOf(t.name)-e.indexOf(n.name)}),this._model=t},r._modelHandle=function(e,n,r){if(e){var i=this._model,o=this._createModelItem(e,n);if(o){var a=i.length;if(0===a)i.push(o);else{for(var u=!0,c=a-1,f=0;f<a;f++){var s=i[f];if(s.name===e){var l=s.type;"single"===l?s.value=o.value:"multi"===l&&(s.value="set"===r?o.value:t({},s.value,o.value));break}f===c&&(u=!1)}u||i.push(o)}this._model=i,this.sort()}}},r.toString=function(){var t=this._config;return this._model.reduce(function(e,r){var o="",a=r.value,c=r.type;if("without"!==c){if("multi"===c){if(function(t){return function(t){if("object"!==n(t))return!1;var e=i(t);return!(null!==e&&e!==Object.prototype&&null!==Object.getPrototypeOf(e)||Symbol.toStringTag in t||Symbol.iterator in t)}(t)&&0!==Object.getOwnPropertyNames(t).length}(a)){var f="";Object.keys(a).forEach(function(e){u(a[e])||(f+=""+t.COMMAND_SEPARATOR+e+t.PARAMETER_SEPARATOR+a[e])}),o=f}}else u(a)||(o=""+t.COMMAND_SEPARATOR+a);o&&(e+=""+t.PIPE_SEPARATOR+r.name+o)}else e+=""+t.PIPE_SEPARATOR+r.name;return e},"")},e}();module.exports=l;
//# sourceMappingURL=process-model.cjs.map
