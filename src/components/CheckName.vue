<template>
  <div class="wrapper">
    <h1>TooD</h1>
    <form class="form">
      <p>이름을 입력해 주세요</p>
      <input
        v-model="userName"
        type="text"
        autocomplete="off"
        placeholder="YooHyungChul"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'YooHyungChul'" />
      <button
        type="submit"
        class="enter"
        @click.prevent="recive">
        Enter
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    recive() {
      console.log(this.userName)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 3.2em;
    padding-left: 0.1em;
    letter-spacing: 0.1em;
    line-height: 1.2;
    margin-left: 0.06em;
    margin-bottom: 0.4em;
    text-shadow: 1px 5px 5px #1B0705;
    animation: updown 5s linear infinite;
  }
  form {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 20px 20px 50px rgba(0,0,0,0.7);
    border-radius: 20px;
    background: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(0.8px);
    p {
      padding-top: 1.8em;
      font-size: 1.1em;
    }
    input {
      margin-top: 1.2em;
      text-align: center;
      border: none;
      outline: none;
      border-radius: 0.7em;
      width: 80%;
      font-size: 1.1em;
      line-height: 2em;
      background-color:rgba(#efefef, .9);
      color: #efefef;
      caret-color: rgba(#efefef, .5);
      &::placeholder {
        color: rgba(#0f0f0f, .9);
      }
    }
    button {
      margin-top: 1.3em;
      border-radius: 0.7em;
      width: 80%;
      font-size: 1.1em;
      line-height: 2em;
      background-color: transparent;
      color: #efefef;
      border: 2px solid rgba(#efefef, .9);
      cursor: pointer;
    }
  }
}
@keyframes updown {
  0%,100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
