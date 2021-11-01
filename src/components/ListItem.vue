<template>
  <li class="todo">
    <transition name="icon">
      <label v-if="!change" :for="item.id">
        <input :id="item.id" type="checkbox" @click="done" />
        <span>
          <i></i>
        </span>
      </label>
      <div v-else class="del" @click="del">
        <div class="cross1"></div>
        <div class="cross2"></div>
      </div>
    </transition>
    <div class="title" @click="viewTools">
      <div>{{ item.title.split("__@dateSet-expire__Info:")[0] }}</div>
    </div>
    <transition name="icon">
      <p v-if="!change" class="due" :class="{ expire: calcDate }">
        {{ item.title.split("__@dateSet-expire__Info:")[1].slice(-5) }}
      </p>
      <div v-else class="fix" @click="upCurrLiData">
        <span></span>
      </div>
    </transition>
  </li>
</template>

<script>
import axios from "axios";

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    user: {
      type: String,
      default: "",
    },
    donelen: {
      type: Number,
      default: 0,
    },
  },
  emits: ["reGetList", "fixInfo", "moveToDone"],
  data() {
    return {
      change: false,
    };
  },
  computed: {
    calcDate() {
      const date = new Date();
      const setted = new Date(
        this.item.title.split("__@dateSet-expire__Info:")[1]
      );
      if (date > setted) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async deleteTodo() {
      await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${this.item.id}`,
        method: "delete",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: this.user,
        },
      });
    },
    async del() {
      await this.deleteTodo();
      this.$emit("reGetList");
    },
    upCurrLiData() {
      const liData = {
        id: this.item.id,
        order: this.item.order,
        title: this.item.title,
        modiDate: this.item.updatedAt,
      };
      this.$emit("fixInfo", liData);
    },
    viewTools() {
      if (this.change !== true) {
        this.change = !this.change;
        setTimeout(() => (this.change = !this.change), 3000);
      }
    },
    async doneTodo() {
      await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${this.item.id}`,
        method: "put",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: this.user,
        },
        data: {
          order: 3000 + this.donelen,
          title: this.item.title,
          done: true,
        },
      });
    },
    async done(e) {
      if (e.target.checked) {
        await this.doneTodo();
        this.$emit("moveToDone");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 54px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    .title > div {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14px;
    }
  }
  .title {
    flex: 1;
    text-align: center;
    margin: 0;
    font-size: 1.1em;
    padding-left: 32px;
    transition: 0.6s ease-in-out;
    cursor: pointer;
    & > div {
      width: 157px;
      line-height: 1.8;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .due {
    position: absolute;
    right: 2px;
    bottom: 0;
    font-size: 1.1em;
    pointer-events: none;
    &.expire {
      color: #d80808;
    }
  }
  .fix {
    position: absolute;
    right: 14px;
    top: 32%;
    font-size: 1.1em;
    width: 14px;
    height: 14px;
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    &::before {
      content: "";
      position: absolute;
      border-bottom: 2px solid rgba(255, 255, 255, 0.4);
      border-left: 2px solid rgba(255, 255, 255, 0.4);
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 50%,
        transparent 100%
      );
      width: 3px;
      height: 3px;
      top: 4px;
      right: 3px;
    }
    &::after {
      content: "";
      position: absolute;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-left-color: transparent;
      width: 10px;
      height: 2px;
      top: -2px;
      right: -7px;
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(-42deg);
    }
    &:hover {
      border-color: rgba(255, 255, 255, 0.7);
      &::before {
        border-color: rgba(255, 255, 255, 0.7);
      }
      &::after {
        border-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  .del {
    width: 28px;
    height: 28px;
    position: absolute;
    cursor: pointer;
    margin-right: 10px;
    background: transparent;
    cursor: pointer;
    .cross1 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, 0.5);
      transform: rotate(45deg) translateX(-2px);
    }
    .cross2 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, 0.5);
      transform: rotate(-45deg) translateX(4px) translateY(-6px);
    }
    &:hover {
      .cross1,
      .cross2 {
        border-color: rgba(#efefef, 0.9);
      }
    }
  }
  label {
    width: 28px;
    height: 28px;
    position: absolute;
    cursor: pointer;
    margin-right: 10px;
    input {
      position: relative;
      z-index: 1;
      appearance: none;
      pointer-events: none;
      &:checked {
        & ~ span {
          background-color: #05be05;
          box-shadow: 0 5px 5px #05be0566;
          i::after {
            content: "";
            bottom: 12px;
            height: 8px;
            border-radius: 0;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
          }
        }
      }
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #d80808;
      border-radius: 80px;
      transition: 0.5s;
      box-shadow: 0 5px 5px #fe000044;
      pointer-events: none;
      i {
        position: absolute;
        top: -16px;
        left: -6px;
        width: 57px;
        height: 52px;
        &::before {
          content: "";
          position: absolute;
          top: 24px;
          left: 12px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #efefefce;
          /* 오른쪽 눈 */
          box-shadow: 10px 0 0 #efefefce;
        }
        &::after {
          content: "";
          position: absolute;
          bottom: 16px;
          left: calc(50% - 15px);
          width: 14px;
          height: 2px;
          border-radius: 6px;
          background-color: #efefefce;
          transition: 0.5s;
        }
      }
    }
    &:hover {
      span {
        background-color: #05be05;
        box-shadow: 0 5px 5px #05be0566;
      }
      i::after {
        content: "";
        bottom: 12px;
        height: 8px;
        border-radius: 0;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
  }
}
.icon-enter-active {
  opacity: 1;
  transition: opacity 0.25s linear;
}
.icon-leave-active {
  opacity: 0;
  transition: opacity 0.25s linear;
}
.icon-enter-from {
  opacity: 0;
}
</style>
