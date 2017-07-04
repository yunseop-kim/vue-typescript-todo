import Vue from "vue";
// import Component from "vue-class-component";

// @Component({
//   template: require("./modal.pug")
// })
export class Modal extends Vue {
    created(){
        console.log("This is modal: ", this.$route.path);
    }
}
