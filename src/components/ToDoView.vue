<template>
  <div class="wrapper">
    <transition name="trans">
      <div class="todo" v-if="fb">
        <ToDoList :user="user" @upcompo="recive" v-bind="$attrs" />
      </div>
      <div class="todo" v-else>
        <DoneList :user="user" :data="doneItems" v-bind="$attrs" />
      </div>
    </transition>
    <div class="overturn">
      <a class="arrowBox">
        <span class="arrow"></span>
      </a>
      <button @click="transfb">{{ content }}</button>
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
  props: {
    user: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fb: true,
      content: "Done",
      doneItems: [],
    };
  },
  methods: {
    transfb() {
      if (this.fb) {
        this.content = "ToDo";
      } else {
        this.content = "Done";
      }
      this.fb = !this.fb;
    },
    recive(doneList) {
      this.doneItems = doneList;
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
.trans-enter-active {
  opacity: 1;
  transform: rotateY(0deg);
  transition: 0.7s ease-in-out;
}
.trans-leave-active {
  opacity: 0;
  transform: rotateY(180deg);
  transition: 0.7s ease-in-out;
}
.trans-enter-from {
  opacity: 0;
  transform: rotateY(-180deg);
}
</style>
