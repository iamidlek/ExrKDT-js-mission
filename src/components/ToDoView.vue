<template>
  <div 
    class="wrapper">
    <ToDoList
      class="todolist"
      v-bind="$attrs" />
    <div>여기는 Done으로 전환할 버튼 추가 공간입니다</div>
  </div>
</template>

<script>
import ToDoList from '~/components/ToDoList'

export default {
  components: {
    ToDoList
  },
  // inheritAttrs:false
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
