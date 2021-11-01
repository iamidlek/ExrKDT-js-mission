<template>
  <div 
    class="wrapper">
    <ToDoList
      class="todolist"
      :user="user" 
      v-bind="$attrs" />
    <div>여기는 Done으로 전환할 버튼 추가 공간입니다</div>
    <!-- <DragTest/> -->
  </div>
</template>

<script>
import ToDoList from '~/components/ToDoList'
// import DragTest from '~/components/DragTest'

export default {
  components: {
    ToDoList,
    // DragTest
  },
  props: {
    user: { 
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // .todolist {
  //   transition: 1s ease-in-out;
  //   // &:hover{
  //   //   transform: rotateY(180deg);
  //   //   backface-visibility: hidden;
  //   // }
  // }
}
</style>
