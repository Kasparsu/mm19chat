<template>
  <div class="section">
      <canvas tabindex="0" width="600" height="600" ref="canvas"
              @keydown.left="left"
              @keydown.right="right"
      ></canvas>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.ws = new WebSocket('ws://localhost:8080');
    this.ws.addEventListener('open', this.open);
    this.ws.addEventListener('message', this.message);
    this.context = this.$refs['canvas'].getContext('2d');
    setInterval(this.draw, 16);
  },
  data(){
    return {
      ws: null,
      text: '',
      messages: [],
      x: 95,
      y: 50,
      context: null
    }
  },
  methods: {
    left(){
      this.x-=5;
      this.send(JSON.stringify({x: this.x, y: this.y}))
    },
    right(){
      this.x+=5;
      this.send(JSON.stringify({x: this.x, y: this.y}))
    },
    open(){

    },
    message(message){
      console.log(message.data);
      let data = JSON.parse(message.data);
      this.x=data.x;
      this.y=data.y;
    },
    send(data){
      this.ws.send(data);
    },
    draw(){
      this.context.clearRect(0, 0, 600, 600);
      this.context.beginPath();
      this.context.arc(this.x, this.y, 40,0, 2*Math.PI);
      this.context.stroke();
    }
  }
}
</script>

<style scoped>

</style>