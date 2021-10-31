<template>
  <div class="wrapper">
    <h1>TooD</h1>
    <form
      class="form"
      @submit.prevent="recive">
      <p>{{ info }}</p>
      <input
        v-show="need"
        v-model="userName"
        type="text"
        autocomplete="off"
        :placeholder="placeHolder"
        onfocus="placeholder = ''"
        :onblur="`placeholder = '${placeHolder}'`" />
      <button
        v-show="need"
        type="submit"
        class="enter">
        Enter
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { 
      type: Boolean
    },
    // user: {
    //   type: String,
    //   default: ''
    // }
  },
  emits: ['enroll','update:modelValue'],
  data() {
    return {
      userName: '',
      info: '이름을 입력해 주세요',
      placeHolder: 'YooHyungChul',
      need: true,
    }
  },
  mounted() {
    const user = localStorage.getItem('todo')
    if (user) {
      this.placeHolder = user
      this.info = `안녕하세요 ${user}님`
      this.need = false
    }
  },
  unmounted() {
    setTimeout(()=>{
      this.$emit('update:modelValue', true)
      },1000)
  },
  methods: {
    recive() {
      if (this.userName === '') return 
      if (/\s/g.test(this.userName)){
        this.placeHolder = '공백을 제거해 주세요'
        this.userName = ''
      } else if (!/[a-zA-Z]/g.test(this.userName)){
        this.placeHolder = '영문 입력만 가능합니다'
        this.userName = ''
      } else {
        localStorage.setItem('todo',this.userName)
        this.$emit('enroll', true)
      }
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
    user-select: none;
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
    user-select: none;
    p {
      width: 90%;
      text-align: center;
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
      color: #0f0f0f;
      caret-color: transparent;
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
