<template>
  <div class="section">
    <ul>
      <li v-for="data in messages">
        <span class="tag is-light is-primary is-size-4">{{data.data}}</span>
      </li>
    </ul>
    <div class="field has-addons is-full">
      <p class="control">
        <input type="text" class="input" v-model="text">
      </p>
      <p class="control">
        <button class="button" @click="send">Send</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.ws = new WebSocket('ws://localhost:8080');
    this.ws.addEventListener('open', this.open);
    this.ws.addEventListener('message', this.message);
  },
  data(){
    return {
      ws: null,
      text: '',
      messages: []
    }
  },
  methods: {
    open(){
      
    },
    message(message){
      console.log(message.data);
      this.messages.push(message);
    },
    send(){
      this.ws.send(this.text);
      this.text = '';
    }
  }
}
</script>

<style scoped>

</style>