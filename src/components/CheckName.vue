<template>
  <div class="wrapper">
    <h1>TooD</h1>
    <div v-if="user" class="greet">
      <p>반갑습니다</p>
      <p>{{ user }} 님</p>
    </div>
    <form v-else class="form" @submit.prevent="receive">
      <p>이름을 입력해 주세요</p>
      <input
        id="userName"
        type="text"
        v-model="inputVal"
        autocomplete="off"
        :placeholder="placeHolder"
        onfocus="placeholder = ''"
        :onblur="`placeholder = '${placeHolder}'`"
      />
      <button type="submit" class="enter">Enter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeHolder: "YooHyungChul",
      inputVal: "",
    };
  },
  emits: ["signIn"],
  mounted() {
    if (this.user) {
      setTimeout(() => this.$emit("signIn"), 700);
    }
  },
  computed: {
    user() {
      return this.$store.state.todo.user;
    },
  },
  methods: {
    receive(e) {
      const user = this.inputVal.trim();
      if (user === "") {
        this.placeHolder = "영문 이름을 입력하세요";
        return;
      }
      if (!/[a-zA-Z]/g.test(user)) {
        this.placeHolder = "영문 입력만 가능합니다";
        return;
      }
      if (/\s/g.test(user)) {
        this.placeHolder = "공백을 제거해 주세요";
        return;
      }

      localStorage.setItem("todoUser", user);
      this.$store.commit("todo/checkUser");
      this.$emit("signIn");

      this.inputVal = "";
    },
  },
};
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
    text-shadow: 1px 5px 5px #1b0705;
    animation: updown 5s linear infinite;
    user-select: none;
  }
  form {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.7);
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
      background-color: rgba(#efefef, 0.9);
      color: #0f0f0f;
      caret-color: transparent;
      &::placeholder {
        color: rgba(#0f0f0f, 0.9);
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
      border: 2px solid rgba(#efefef, 0.9);
      cursor: pointer;
    }
  }
  .greet {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
    box-sizing: border-box;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    background: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(0.8px);
    user-select: none;
    p {
      margin: 0;
      font-size: 1.1em;
      color: #efefef;
    }
    p:first-child {
      margin-bottom: 32px;
    }
  }
}
@keyframes updown {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
