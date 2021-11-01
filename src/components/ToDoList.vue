<template>
  <div class="book">
    <i class="leaf">
      <h3><span>T</span>o Do List</h3>
    </i>
    <div
      class="add"
      @click="open">
      +
    </div>
    <ul class="list">
      <div v-if="!toDoList.length">
        ToDo를 추가하세요
      </div>
      <ListItem
        v-for="item in toDoList"
        :key="item.id"
        :item="item"
        :user="user"
        v-bind="$attrs"
        @re-get-list="async () => await getTodo()"
        @fix-info="sendToModal" />
    </ul>
  </div>
  <div
    v-show="addTF"
    class="focback">
    <AddToDo
      v-model="addTF"
      v-bind="$attrs"
      :user="user"
      :order="orderNum"
      class="infobox"
      @re-get-list="async () => await getTodo()" />
  </div>
  <div
    v-if="modiModal"
    class="modify">
    <FixToDo 
      v-model="modiModal"
      class="infobox"
      :data="toModalData"
      :user="user"
      @refresh-list="async () => await getTodo()" />
  </div>
</template>

<script>
import axios from 'axios'
import ListItem from '~/components/ListItem'
import AddToDo from '~/components/AddToDo'
import FixToDo from '~/components/FixToDo'

export default {
  components: {
    ListItem,
    AddToDo,
    FixToDo
  },
  props: {
    user: { 
      type: String,
      default: ''
    },
  },
  data() {
    return {
      orderNum: 0,
      addTF: false,
      modiModal: false,
      toModalData: {},
      toDoList: [],
      doneList: [],
    }
  },
  beforeMount() {
    (async () => {
      await this.getTodo()
      // console.log('추가 작업은 여기에')
      // console.log(this.toDoList)
    })()
  },
  methods: {
    async getTodo() {
      const {data} = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        method: 'get',
        headers: {
        'content-type': 'application/json',
        'apikey': 'FcKdtJs202110',
        'username': `${this.user}`
        }
      })
      // done false true 여기서 처리해 줘야됨?
      const tempList = []
      const tempDone = []
      data.forEach( item => {
        if (item.done === false) {
          tempList.unshift(item)
        } else {
          tempDone.push(item)
        }
      })
      this.orderNum = tempList.length
      this.toDoList = tempList
      this.doneList = tempDone
    },
    open() {
      this.addTF = true
    },
    sendToModal(data) {
      this.toModalData = data
      this.modiModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
.book {
  width: 340px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 20px 20px 50px rgba(0,0,0,0.7);
  border-radius: 20px;
  background: rgba(240,250,240,0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.8px);
  user-select: none;
  .leaf {
    position: absolute;
    top: 32px;
    left: -16px;
    width: 280px;
    height: 46px;
    background: linear-gradient(to right,#af43f1 50%, rgba(255, 255, 255, 0.5));
    border-radius: 20px;
    &::before {
      content: '';
      position: absolute;
      top: 46px;
      width: 15px;
      height: 30px;
      background: #7035a6;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      z-index: 2;
    }
    &::after {
      content: '';
      position: absolute;
      top: 20px;
      width: 15px;
      height: 40px;
      background: #af43f1;
      z-index: 1;
    }
    h3 {
      text-align: center;
      margin: 0.6em;
      padding-right: 6.6em;
      span {
        font-size: 1.1em;
      }
    }
  }
  .add {
    position: absolute;
    top: 1.61em;
    right: 1em;
    width: 26px;
    height: 26px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    font-size: 1.6em;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    line-height: 1.05;
    padding-right: 0.5px;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
      border-color: rgba(255, 255, 255, 0.8);
    }
  }
  .list {
    list-style: none;
    margin-top: 6.8em;
    padding: 0;
    height: 360px;
    width: 70%;
    overflow: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    position: relative;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    & > div {
      position: absolute;
      height: 10px;
      width: 100%;
      top: 40%;
      text-align: center;
      font-size: 1.3em;
    }
  }
}
.focback {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(2px);
}
.modify {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(2px);
}
.infobox {
  position: absolute;
  width: 320px;
  height: 256px;
  top: 32%;
}
</style>
