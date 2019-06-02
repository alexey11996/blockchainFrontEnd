/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

export default [
  {
    path: "/signdoc",
    name: "SignDoc",
    view: "SignDoc"
  },
  {
    path: "/register",
    name: "Register",
    view: "Register"
  },
  {
    path: "/getmypublic",
    name: "GetMyPublic",
    view: "GetMyPublic"
  },
  {
    path: "/changekeys",
    name: "ChangeKeys",
    view: "ChangeKeys"
  },
  {
    path: "/isdoctrue",
    name: "IsDocTrue",
    view: "IsDocTrue"
  },
  {
    path: "/getdate",
    name: "GetDate",
    view: "GetDate"
  },
  {
    path: "/checksignatures",
    name: "CheckSignatures",
    view: "CheckSignatures"
  },
  {
    path: "/checksign",
    name: "CheckSign",
    view: "CheckSign"
  }
];
