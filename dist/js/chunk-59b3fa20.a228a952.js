(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59b3fa20"],{"21a6":function(e,t,n){(function(n){var a,o,i;(function(n,r){o=[],a=r,i="function"===typeof a?a.apply(t,o):a,void 0===i||(e.exports=i)})(0,function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function a(e,t,n){var a=new XMLHttpRequest;a.open("GET",e),a.responseType="blob",a.onload=function(){s(a.response,t,n)},a.onerror=function(){console.error("could not download file")},a.send()}function o(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function i(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(a){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,s=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype?function(e,t,n){var s=r.URL||r.webkitURL,l=document.createElement("a");t=t||e.name||"download",l.download=t,l.rel="noopener","string"==typeof e?(l.href=e,l.origin===location.origin?i(l):o(l.href)?a(e,t,n):i(l,l.target="_blank")):(l.href=s.createObjectURL(e),setTimeout(function(){s.revokeObjectURL(l.href)},4e4),setTimeout(function(){i(l)},0))}:"msSaveOrOpenBlob"in navigator?function(e,n,r){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,r),n);else if(o(e))a(e,n,r);else{var s=document.createElement("a");s.href=e,s.target="_blank",setTimeout(function(){i(s)})}}:function(e,t,n,o){if(o=o||open("","_blank"),o&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof e)return a(e,t,n);var i="application/octet-stream"===e.type,s=/constructor/i.test(r.HTMLElement)||r.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||i&&s)&&"object"==typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=l?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=e:location=e,o=null},c.readAsDataURL(e)}else{var u=r.URL||r.webkitURL,d=u.createObjectURL(e);o?o.location=d:location.href=d,o=null,setTimeout(function(){u.revokeObjectURL(d)},4e4)}});r.saveAs=s.saveAs=s,e.exports=s})}).call(this,n("c8ba"))},3846:function(e,t,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"6b54":function(e,t,n){"use strict";n("3846");var a=n("cb7c"),o=n("0bfb"),i=n("9e1e"),r="toString",s=/./[r],l=function(e){n("2aba")(RegExp.prototype,r,e,!0)};n("79e5")(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?l(function(){var e=a(this);return"/".concat(e.source,"/","flags"in e?e.flags:!i&&e instanceof RegExp?o.call(e):void 0)}):s.name!=r&&l(function(){return s.call(this)})},"73cf":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[n("FlashMessage"),n("v-layout",{attrs:{"justify-center":"",wrap:""}},[n("v-flex",{attrs:{xs12:"",md8:""}},[n("material-card",{attrs:{color:"green",title:"Регистрация в системе",text:"Заполните указанный поля"}},[e.emailSent?e._e():n("v-form",{on:{submit:e.formSubmit},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-container",{attrs:{"py-0":""}},[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{xs12:"",md4:""}},[n("v-text-field",{staticClass:"purple-input",attrs:{rules:e.nameRules,counter:50,label:"Name",required:"",clearable:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),n("v-flex",{attrs:{xs12:"",md4:""}},[n("v-text-field",{staticClass:"purple-input",attrs:{rules:e.emailRules,label:"Email Address",required:"",clearable:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),n("v-flex",{attrs:{xs12:"",md4:""}},[n("v-text-field",{staticClass:"purple-input",attrs:{rules:e.phoneRules,counter:11,required:"",clearable:"",label:"Mobile Phone",type:"number"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("v-flex",{attrs:{xs12:"","text-xs-right":""}},[n("v-btn",{staticClass:"mx-0 font-weight-light",attrs:{type:"submit",disabled:0==e.valid,color:"success"}},[e._v("Зарегистрироваться")])],1)],1)],1)],1),e.emailSent?n("v-container",{attrs:{"py-0":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("p",{staticClass:"text-info"},[e._v("На указанный почтовый ящик отправлен код подтверждения. Введите его в форму ниже.")]),n("v-text-field",{staticClass:"purple-input",attrs:{id:"codeField",rules:e.codeRules,required:"",clearable:"",label:"Confrm Code"},on:{input:e.onCodeChange},model:{value:e.enteredCode,callback:function(t){e.enteredCode=t},expression:"enteredCode"}})],1)],1)],1):e._e()],1)],1)],1)],1)},o=[],i=(n("6b54"),n("7f7f"),n("21a6")),r=n("adc1"),s=n.n(r),l=n("bc3a"),c=n.n(l),u={name:"Register",data:function(){var e=this;return{customMessage:"",enteredCode:"",emailSent:!1,code:"",valid:!1,name:"",nameRules:[function(e){return!!e||"Name is required"},function(e){return e.length<=50||"Name must be less than 50 characters"}],email:"",emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+/.test(e)||"E-mail must be valid"}],phone:"",phoneRules:[function(e){return!!e||"Phone is required"},function(e){return/^\d{11}$/.test(e)||"Phone must be 11 digits"}],codeRules:[function(t){return(!!t&&t)===e.code||"Wrong code"}]}},methods:{onCodeChange:function(){var e=this;this.code==this.enteredCode&&c.a.post("http://".concat(s.a.HOST,"/myroutes/register"),{mobilePhone:this.phone,email:this.email,fio:this.name}).then(function(t){if(t.data.hasOwnProperty("msg"))e.flashMessage.error({title:"Что-то пошло не так",message:t.data.msg}),e.emailSent=!1;else{localStorage.publicKey=t.data.publicKey;var n=t.data.privateKey+"~12345~"+t.data.publicKey,a="key.pem",o=new Blob([n],{type:"text/plain;charset=utf-8"});Object(i["saveAs"])(o,a),e.emailSent=!1,e.email="",e.phone="",e.name="",e.flashMessage.success({title:"Регистрация прошла успешно",message:"Скачивание файла ключей начнется в течение нескольких секунд"})}}).catch(function(e){return console.log(e)})},formSubmit:function(e){var t=this;e.preventDefault(),this.code=Math.random().toString(36).substring(2),c.a.post("http://".concat(s.a.HOST,"/myroutes/sendcode"),{code:this.code,recipient:this.email}).then(function(){t.emailSent=!0}).catch(function(e){return console.log(e)})}}},d=u,f=n("2877"),p=Object(f["a"])(d,a,o,!1,null,null,null);t["default"]=p.exports},adc1:function(e,t){e.exports={HOST:"165.22.121.115"}}}]);
//# sourceMappingURL=chunk-59b3fa20.a228a952.js.map