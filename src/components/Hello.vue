<template>
  <div>
    <h2 class="hello">Hello {{name}}</h2>
  </div>
</template>



<script lang="ts">
// export default {
//   props: {
//     name: {
//       type: String,
//       default: 'Vue!'
//     }
//   }
// }
import Vue from 'vue'
import {
  Component,
  Prop
} from 'vue-property-decorator'

@Component
export default class Hello extends Vue {
  @Prop({type: String , default: "Vue!"})
  name: string
  // msg: string = 'Welcome to Your Vue.js App'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
};

ul{
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a{
  color: #42b983;
}
</style>
