import Vue from 'vue';
import Component from 'vue-class-component';
// import axios, {AxiosResponse} from 'axios';
import { firebaseDB, firebaseAuth } from '../../firebase/config';

@Component({
    template: require('./list.html')
})
export class ListComponent extends Vue {

    items: any[] = [];
    newComment: string = '';
    private url = 'https://jsonplaceholder.typicode.com/users';
    protected commentsRef = firebaseDB.ref('Comments');

    constructor() {
        super();
    }

    mounted() {
        this.$nextTick(() => {
            this.loadItems();
        });
    }

    formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    addComments() {
        let value = this.newComment && this.newComment.trim();
        if (!value) {
            return;
        }

        this.commentsRef.push({
            uid: firebaseAuth.currentUser.uid,
            message: value,
            sendtime: this.formatDate(new Date())
        });

        this.newComment = '';
    }

    private loadItems() {
        this.commentsRef.on('value', (snapshot) => {
            this.items = snapshot.val();
        });
    }
}
