<template>
  <div class="wrapper">
    <transition name="reverse">
      <div class="todo" v-if="turn">
        <ToDoList />
      </div>
      <div class="todo" v-else>
        <DoneList />
      </div>
    </transition>
    <div class="overturn">
      <a class="arrowBox">
        <span class="arrow"></span>
      </a>
      <button @click="turnning">{{ content }}</button>
    </div>
  </div>
</template>

<script>
import ToDoList from "~/components/ToDoList";
import DoneList from "~/components/DoneList";

export default {
  components: {
    ToDoList,
    DoneList,
  },
  data() {
    return {
      turn: false,
      throttling: true,
      content: "Done",
    };
  },
  async created() {
    await this.$store.dispatch("todo/getTodos");
    setTimeout(() => {
      this.turn = true;
    }, 300);
    setTimeout(() => {
      console.log("loading 표시를 기본으로 하고 1초뒤 없어지게");
    }, 1000);
  },
  methods: {
    turnning() {
      if (this.throttling) {
        this.throttling = false;
        this.turn ? (this.content = "ToDo") : (this.content = "Done");
        this.turn = !this.turn;
        setTimeout(() => (this.throttling = true), 800);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  perspective: 800px;
  .todo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100vh;
    width: 100%;
  }
  .overturn {
    position: relative;
    top: 83%;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    .arrowBox {
      position: absolute;
      top: -10px;
      left: 50%;
      padding-top: 70px;
      .arrow {
        position: absolute;
        top: 0;
        left: 50%;
        width: 16px;
        height: 16px;
        margin-left: -10px;
        border-left: 1px solid rgba(255, 255, 255, 0.7);
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        -webkit-transform: rotateZ(-45deg);
        transform: rotateZ(-45deg);
        -webkit-animation: sdb 2s infinite;
        animation: fall 2s infinite;
        box-sizing: border-box;
      }
    }
    & > button {
      position: absolute;
      bottom: -2.4em;
      margin-right: 4px;
      background-color: transparent;
      box-sizing: border-box;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 15px;
      font-size: 1em;
      color: rgba(255, 255, 255, 0.4);
      transition: 0.6s ease-in-out;
      &:hover {
        color: rgba(255, 255, 255, 0.8);
        border-color: rgba(255, 255, 255, 0.6);
        transform: scale(1.1);
      }
    }
  }
  @keyframes fall {
    0% {
      transform: rotateY(0) rotateZ(-45deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotateY(720deg) rotateZ(-45deg) translate(-20px, 20px);
      opacity: 0;
    }
  }
}
.reverse-enter-active {
  opacity: 1;
  transform: rotateY(0deg);
  transition: 0.7s ease-in-out;
}
.reverse-leave-active {
  opacity: 0;
  transform: rotateY(180deg);
  transition: 0.7s ease-in-out;
}
.reverse-enter-from {
  opacity: 0;
  transform: rotateY(-180deg);
}
</style>
