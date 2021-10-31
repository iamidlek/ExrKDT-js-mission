<template>
  <li class="todo">
    <transition name="icon">
      <label
        v-if="!change"
        :for="item.id">
        <input
          :id="item.id"
          type="checkbox" />
        <span>
          <i></i>
        </span>
      </label>
      <div
        v-else
        class="del"
        @click="del">
        <div class="cross1"></div>
        <div class="cross2"></div>
      </div>
    </transition>
    <p
      class="title"
      @click="change = !change">
      {{ item.title.split('__@dateSet-expire__Info:')[0] }}
    </p>
    <p
      class="due"
      :class="{expire : calcDate}">
      {{ item.title.split('__@dateSet-expire__Info:')[1].slice(-5) }}
    </p>
  </li>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    user: {
      type: String,
      default: ''
    },
  },
  emits: ['reGetList'],
  data() {
    return {
      change: false
    }
  },
  computed: {
    calcDate() {
      const date = new Date()
      const setted = new Date(this.item.title.split('__@dateSet-expire__Info:')[1])
      if (date > setted) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async deleteTodo() {
      await axios({
      url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${this.item.id}`,
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'apikey': 'FcKdtJs202110',
        'username': this.user
        }
      })
      // console.log(data)
    },
    async del() {
      await this.deleteTodo()
      this.$emit('reGetList')
    }
  }
}
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 54px;
  box-sizing: border-box;
  &:hover {
    .title {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .title {
    flex: 1;
    text-align: center;
    margin: 0;
    font-size: 1.1em;
    padding-bottom: 2px;
    padding-left: 30px;
    line-height: 1.8;
    border-radius: 20px;
    transition: .6s ease-in-out;
    cursor: pointer;
  }
  .due {
    font-size: 1.1em;
    padding-left: 10px;
    pointer-events: none;
    &.expire {
    color: #d80808;
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
      border-right: 2px solid rgba(#efefef, .9);
      transform: rotate(45deg) translateX(-2px);
    }
    .cross2 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, .9);
      transform: rotate(-45deg) translateX(4px) translateY(-6px);
    }
  }
  label{
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
          background-color: #05BE05;
          box-shadow: 0 5px 5px #05BE0566;
          i::after{
            content: '';
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
      box-shadow: 0 5px 5px #FE000044;
      pointer-events: none; 
      i{
        position: absolute;
        top: -16px;
        left: -6px;
        width: 57px;
        height: 52px;
        &::before {
          content: '';
          position: absolute;
          top: 22px;
          left: 12px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #efefefce;
          /* 오른쪽 눈 */
          box-shadow: 10px 0 0 #efefefce;
        }
        &::after{
          content: '';
          position: absolute;
          bottom: 18px;
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
        background-color: #05BE05;
        box-shadow: 0 5px 5px #05BE0566;
      }
      i::after{
        content: '';
        bottom: 12px;
        height: 8px;
        border-radius: 0;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
  }
}
.icon-enter-active{
  opacity: 1;
  transition: opacity .25s linear;
}
.icon-leave-active {
  opacity: 0;
  transition: opacity .25s linear;
}
.icon-enter-from{
  opacity: 0;
}
</style>
