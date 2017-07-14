<template>
    <div class="container">
        <div role="form" class="form-horizontal">
            <div class="form-group">
                <label for="message" class="col-sm-2 control-label">Comments</label>
                <div class="col-sm-8">
                    <textarea rows="4" name="message" v-model="newComment" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                    <button @click="addComments" class="btn btn-primary">Send</button>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2"></div>
            </div>
        </div>
        <!-- Contenedor Principal-->
        <div class="comments-container">
            <h1>방명록</h1>
            <ul id="comments-list" class="comments-list">
                <li v-for="(item, key) in items" :key="item['.key']">
                    <div class="comment-main-level">
                        <!-- Avatar-->
                        <div class="comment-avatar">
                             <img :src="item.writer.photo" alt="" /> 
                        </div>
                        <!-- Contenedor del Comentario-->
                        <div class="comment-box">
                            <div class="comment-head">
                                <h6 class="comment-name">{{item.writer.username}}</h6>
                                <span>{{item.sendtime}}</span>
                                <i v-on:click="removeComments(key)" class="fa fa-times"></i>
                                <i @click="openModifyModal(key, item)" class="fa fa-pencil"></i>
                            </div>
                            <div class="comment-content">{{item.message}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <modal v-if="showModal" @close="showModal = false">
            <!--
            you can use custom content here to overwrite
            default content
            -->
            <h3 slot="header">수정</h3>
            <div slot="body">
                <textarea rows="4" name="message" v-model="selectedItem.message" class="form-control"></textarea>
            </div>
            <div slot="footer">
                <button @click="submitModifyModal()">OK</button>
                <button @click="closeModifyModal()">Cancel</button>
            </div>
        </modal>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Modal from "./Modal.vue";
// import axios, {AxiosResponse} from 'axios';
import { firebaseDB, firebaseAuth } from "../firebase";

@Component({
    components: {
        Modal
    }
})
export default class List extends Vue {
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

    // async add1000Comments() {
    //   for(let i = 0; i < 1000; i ++){
    //     this.addComments(`this is message ${i}`);
    //   }
    // }

    async addComments() {
        let value = this.newComment && this.newComment.trim();
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/**
   * Oscuro: #283035
   * Azul: #03658c
   * Detalle: #c7cacb
   * Fondo: #dee1e3
   ----------------------------------*/

* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

a {
    color: #03658c;
    text-decoration: none;
}

ul {
    list-style-type: none;
}

body {
    font-family: 'Roboto', Arial, Helvetica, Sans-serif, Verdana;
    background: #dee1e3;
}



/** ====================
   * Lista de Comentarios
   =======================*/

.comments-container {
    margin: 60px auto 15px;
    width: 768px;
}

.comments-container h1 {
    font-size: 36px;
    color: #283035;
    font-weight: 400;
}

.comments-container h1 a {
    font-size: 18px;
    font-weight: 700;
}

.comments-list {
    margin-top: 30px;
    position: relative;
}



/**
   * Lineas / Detalles
   -----------------------*/

.comments-list:before {
    content: '';
    width: 2px;
    height: 100%;
    background: #c7cacb;
    position: absolute;
    left: 32px;
    top: 0;
}

.comments-list:after {
    content: '';
    position: absolute;
    background: #c7cacb;
    bottom: 0;
    left: 27px;
    width: 7px;
    height: 7px;
    border: 3px solid #dee1e3;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.reply-list:before,
.reply-list:after {
    display: none;
}

.reply-list li:before {
    content: '';
    width: 60px;
    height: 2px;
    background: #c7cacb;
    position: absolute;
    top: 25px;
    left: -55px;
}

.comments-list li {
    margin-bottom: 15px;
    display: block;
    position: relative;
}

.comments-list li:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    width: 0;
}

.reply-list {
    padding-left: 88px;
    clear: both;
    margin-top: 15px;
}



/**
   * Avatar
   ---------------------------*/

.comments-list .comment-avatar {
    width: 65px;
    height: 65px;
    position: relative;
    z-index: 99;
    float: left;
    border: 3px solid #FFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.comments-list .comment-avatar img {
    width: 100%;
    height: 100%;
}

.reply-list .comment-avatar {
    width: 50px;
    height: 50px;
}

.comment-main-level:after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    clear: both;
}



/**
   * Caja del Comentario
   ---------------------------*/

.comments-list .comment-box {
    width: 680px;
    float: right;
    position: relative;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.comments-list .comment-box:before,
.comments-list .comment-box:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    display: block;
    border-width: 10px 12px 10px 0;
    border-style: solid;
    border-color: transparent #FCFCFC;
    top: 8px;
    left: -11px;
}

.comments-list .comment-box:before {
    border-width: 11px 13px 11px 0;
    border-color: transparent rgba(0, 0, 0, 0.05);
    left: -12px;
}

.reply-list .comment-box {
    width: 610px;
}

.comment-box .comment-head {
    background: #FCFCFC;
    padding: 10px 12px;
    border-bottom: 1px solid #E5E5E5;
    overflow: hidden;
    -webkit-border-radius: 4px 4px 0 0;
    -moz-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
    float: right;
    margin-left: 14px;
    position: relative;
    top: 2px;
    color: #A6A6A6;
    cursor: pointer;
    -webkit-transition: color 0.3s ease;
    -o-transition: color 0.3s ease;
    transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
    color: #03658c;
}

.comment-box .comment-name {
    color: #283035;
    font-size: 14px;
    font-weight: 700;
    float: left;
    margin-right: 10px;
}

.comment-box .comment-name a {
    color: #283035;
}

.comment-box .comment-head span {
    float: left;
    color: #999;
    font-size: 13px;
    position: relative;
    top: 8px;
}

.comment-box .comment-content {
    background: #FFF;
    padding: 12px;
    font-size: 15px;
    color: #595959;
    -webkit-border-radius: 0 0 4px 4px;
    -moz-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px;
}

.comment-box .comment-name.by-author,
.comment-box .comment-name.by-author a {
    color: #03658c;
}

.comment-box .comment-name.by-author:after {
    content: 'autor';
    background: #03658c;
    color: #FFF;
    font-size: 12px;
    padding: 3px 5px;
    font-weight: 700;
    margin-left: 10px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}



/** =====================
   * Responsive
   ========================*/

@media only screen and (max-width: 766px) {
    .comments-container {
        width: 480px;
    }
    .comments-list .comment-box {
        width: 390px;
    }
    .reply-list .comment-box {
        width: 320px;
    }
}
</style>