import Vue from "vue";
import Component from "vue-class-component";
import NavbarComponent from "./typescripts/navbar";

@Component({
  name: "App",
  components: {
    navbar: NavbarComponent
  }
})
export default class App extends Vue {
}
