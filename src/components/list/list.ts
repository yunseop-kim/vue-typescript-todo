import Vue from "vue";
import Component from "vue-class-component";
import { CommentModal } from "../commentModal";
// import axios, {AxiosResponse} from 'axios';
import { firebaseDB, firebaseAuth } from "../../firebase/config";

@Component({
  template: require("./list.html"),
  components: {
    CommentModal
  }
})
export class ListComponent extends Vue {
  items: any[] = [];
  newComment: string = "";
  showModal: boolean = false;
  selectedItem: object = null;
  selectedKey: string = null;

  protected commentsRef = firebaseDB.ref("Comments");
  protected usersRef = firebaseDB.ref("Users");

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

    return (
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    );
  }

  async add1000Comments() {
    for(let i = 0; i < 1000; i ++){
      this.addComments(`this is message ${i}`);
    }
  }

  async addComments(value = this.newComment && this.newComment.trim()) {
    // let value = this.newComment && this.newComment.trim();
    let userInfo = await this.usersRef.child(firebaseAuth.currentUser.uid).once("value");

    if (!value) {
      return;
    }

    this.commentsRef.push({
      writer: userInfo.val(),
      message: value,
      sendtime: this.formatDate(new Date())
    });

    this.newComment = "";
  }

  openModifyModal(key, item) {
    console.log(`Modify item... ${key}`);
    this.showModal = true;
    this.selectedItem = item;
    this.selectedKey = key;
  }

  submitModifyModal() {
    this.commentsRef.child(this.selectedKey).set(this.selectedItem);
    this.closeModifyModal();
  }

  closeModifyModal() {
    this.showModal = false;
    this.selectedItem = null;
    this.selectedKey = null;
  }

  async removeComments(key) {
    let result = await this.commentsRef.child(key).remove();
    console.log(`removeComments > result: ${key}`);
  }

  private loadItems() {
    this.commentsRef.on("value", snapshot => {
      this.items = snapshot.val();
    });

    this.commentsRef.on("child_added", snapshot => {
      let addedPost = snapshot.val();
      console.log(
        "The blog post titled '" + addedPost.message + "' has been added"
      );
    });

    this.commentsRef.on("child_changed", snapshot => {
      let changedPost = snapshot.val();
      console.log(
        "The blog post titled '" + changedPost.message + "' has been changed"
      );
    });

    this.commentsRef.on("child_removed", snapshot => {
      let deletedPost = snapshot.val();
      console.log(
        "The blog post titled '" + deletedPost.message + "' has been deleted"
      );
    });
  }
}
