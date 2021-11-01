<template>
  <form @submit.prevent="fixing">
    <label
      for="fix-title"
      class="t">Fix Title</label>
    <input
      id="fix-title"
      ref="ftitle"
      type="text"
      name="title"
      autocomplete="off"
      :placeholder="placeHolder"
      onfocus="placeholder = ''"
      :onblur="`prescheholder = '${placeHolder}'`"
      maxlength="20"
      contenteditable="true" />
    <label for="resche">Reschedule</label>
    <input
      id="resche"
      type="date"
      :value="today"
      name="__@dateSet-expire__Info:" />
    <button
      type="submit"
      class="fix">
      F i x
    </button>
    <div
      class="close"
      @click="closing">
      <div class="cross1"></div>
      <div class="cross2"></div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    modelValue: { 
      type: Boolean
    },
    user: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue','refreshList'],
  data() {
    return {
      placeHolder: this.data.title.split('__@dateSet-expire__Info:')[0]
    }
  },
  computed: {
    today() {
      const date = new Date()
      const month = (date.getMonth()+1) >= 10 ? (date.getMonth()+1) : '0' + (date.getMonth()+1)
      const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      return date.getFullYear()+'-'+ month +'-'+ day
    },
  },
  methods: {
    async fixing(e) {
      const { target } = e
      if (!target[0].value) {
        e.target[0].placeholder ='입력이 필요합니다'
        return
      }
      const obj = { title:`${target[0].value}${target[1].name}${target[1].value}` }

      await this.fixTodo(this.data.id,this.data.order, obj)
      this.$emit('refreshList')
      this.$emit('update:modelValue',false)
      e.target[0].value = ''
    },
    async fixTodo(id, order, title) {
      await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        method: 'put',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': this.user
        },
        data: {
          ...title,
          'done': false,
          'order': order
        }
      })
    },
    closing () {
      this.$refs.ftitle.value = ''
      this.$emit('update:modelValue',false)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  height: 50%;
  background-image: linear-gradient(to left bottom, #af43f1, #af43f1, #aa6eed, #ac8de3, #c0c0c0);
  border-radius: 20px;
  opacity: 0.92;
  box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
  box-sizing: border-box;
  padding-left: 1.7em;
  padding-top: 1.4em;
  label {
    display: block;
    font-size: 1.4em;
    font-weight: 700;
    color: rgba(#efefef, 0.8);
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    color: #efefef;
    &#fix-title {
      caret-color: transparent;
      width: 90%;
      margin: 10px -6px;
      padding-left: 10px;
      font-size: 1.5em;
      border-radius: 15px;
      background: rgba(240,250,240,0.5);
      color: #af43f1;
      &:focus {
        background: rgba(240,250,240,0.3)
      }
      &::placeholder {
        color: #aa6eed99;
      }
    }
    &#resche {
      width: 90%;
      font-size: 1.1em;
      margin: 10px 0px;
    }
  }
  .fix {
    margin-top: 0.5em;
    border-radius: 0.7em;
    width: 90%;
    font-size: 1.1em;
    line-height: 2em;
    background-color: transparent;
    color: rgba(#efefef, .9);
    box-sizing: border-box;
    border: 2px solid rgba(#efefef, .9);
    cursor: pointer;
  }
  .close {
    position: absolute;
    top: 28px;
    right: 26px;
    width: 18px;
    height: 18px;
    background: transparent;
    cursor: pointer;
    .cross1 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, .9);
      transform: rotate(45deg) translateX(-10px);
    }
    .cross2 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, .9);
      transform: rotate(-45deg) translateX(4px) translateY(-14px);
    }
  }
}
</style>
