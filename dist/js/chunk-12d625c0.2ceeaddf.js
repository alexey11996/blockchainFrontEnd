(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12d625c0"],{adc1:function(t,e){t.exports={HOST:"139.59.135.176"}},f01a:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("FlashMessage"),a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{xs12:"",md8:""}},[a("material-card",{attrs:{color:"green",title:"Получение даты подписи документа заявленным пользователем",text:"Заполните указанные поля"}},[a("v-form",{on:{submit:t.formSubmit},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-container",{attrs:{"py-0":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("p",{staticClass:"text-info"},[t._v("Введите email пользователя, который подписывал интересующий вас документ.")]),a("v-text-field",{staticClass:"purple-input",attrs:{rules:t.emailRules,label:"Email Address",required:"",clearable:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),a("v-flex",{attrs:{xs12:""}},[a("p",{staticClass:"text-info"},[t._v("Выберите документ")]),a("input",{attrs:{type:"file",name:"document",id:"document"},on:{change:t.updateDocument}})]),a("v-flex",{attrs:{xs12:"","text-xs-right":""}},[a("v-btn",{staticClass:"mx-0 font-weight-light",attrs:{type:"submit",disabled:0==t.valid||0==t.validDocFile,color:"success"}},[t._v("Получить дату подписи")])],1)],1)],1)],1)],1)],1)],1)],1)},l=[],s=a("bc3a"),n=a.n(s),r=a("adc1"),o=a.n(r),c={name:"GetDate",data:function(){return{validDocFile:!1,docFile:{},valid:!1,email:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}]}},methods:{updateDocument:function(t){t.target.files[0]?(this.docFile=t.target.files[0],this.validDocFile=!0):this.validDocFile=!1},formSubmit:function(t){var e=this;t.preventDefault();var a=new FormData;a.set("email",this.email),a.append("document",this.docFile),n.a.post("http://".concat(o.a.HOST,"/myroutes/getdate"),a,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){t.data.hasOwnProperty("msg")?(e.flashMessage.error({title:"Что-то пошло не так",message:t.data.msg}),e.email="",document.getElementById("document").value=""):(e.flashMessage.success({title:"Проверка завершена",message:e.convertTimeStampToDate(t.data.date)}),e.email="",document.getElementById("document").value="")})},convertTimeStampToDate:function(t){var e=new Date(parseInt(t));return e.toLocaleString()}}},u=c,d=a("2877"),m=Object(d["a"])(u,i,l,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-12d625c0.2ceeaddf.js.map