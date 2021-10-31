<template>
  <BackGround />
  <transition
    name="fade">
    <CheckName
      v-if="!admission"
      v-model="open"
      :user="userName"
      @enroll="signIn" />
    <ToDoView
      v-else-if="open"
      :user="userName" />
  </transition>
</template> 

<script>
import BackGround from '~/components/BackGround'
import CheckName from '~/components/CheckName'
import ToDoView from '~/components/ToDoView'

export default {
  components: {
    BackGround,
    CheckName,
    ToDoView
  },
  data() {
    return {
      userName: null,
      admission: true,
      open: false
    }
  },
  mounted() {
    setTimeout(()=>{this.admission = false},100)
    setTimeout(()=>{this.checkStorage()},2000)
  },
  methods: {
    checkStorage() {
      const user = localStorage.getItem('todo') 
      if (user) {
        this.admission = true
        this.userName = user
      }
    },
    signIn(res) {
      this.admission = res
      this.userName = localStorage.getItem('todo')
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active{
  opacity: 1;
  transition: opacity 2s linear;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 1s linear;
}
.fade-enter-from{
  opacity: 0;
}
</style>
