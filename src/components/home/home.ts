import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

    package: string = 'vue-typescript-todo';
    repo: string = 'https://github.com/yunseop-kim/vue-typescript-todo';
    mode: string = process.env.ENV;

}
