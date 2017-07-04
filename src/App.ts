import Vue from "vue";
import Component from "vue-class-component";
import NavbarComponent from "./components/navbar.vue";

@Component({
  name: "App",
  components: {
    navbar: NavbarComponent
  }
})
export default class App extends Vue {
}
