import Vue from "vue";
import { Component, watch } from "vue-property-decorator";
import { Link } from "./link";
import { firebaseAuth } from "../firebase";
@Component({
  template: require("../pugs/navbar.pug"),
  name: "navbar"
})
export default class NavbarComponent extends Vue {
  inverted: boolean = true; // default value

  object: { default: string } = { default: "Default object property!" }; // objects as default values don't need to be wrapped into functions

  links: Link[] = [
    new Link("Home", "/"),
    new Link("List", "/list"),
    new Link("Login", "/login"),
  ];

  @watch("$route.path")
  pathChanged() {
    console.log("Changed current path to: " + this.$route.path);
  }

  mounted() {
    this.$nextTick(() => console.log(this.object.default));
  }
}
