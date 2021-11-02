<template>
  <BackGround />
  <transition name="fade">
    <div v-if="effect === 'init'"></div>
    <CheckName v-else-if="effect === 'check'" @sign-in="effect = 'signed'" />
    <ToDoView v-else />
  </transition>
</template> 

<script>
import BackGround from "~/components/BackGround";
import CheckName from "~/components/CheckName";
import ToDoView from "~/components/ToDoView";

export default {
  components: {
    BackGround,
    CheckName,
    ToDoView,
  },
  data() {
    return {
      effect: "init",
    };
  },
  computed: {
    user() {
      return this.$store.state.todo.user;
    },
  },
  mounted() {
    setTimeout(() => (this.effect = "check"), 700);
    this.$store.commit("todo/checkUser");
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  opacity: 1;
  transition: 1.5s ease-in-out;
}
.fade-leave-active {
  opacity: 0;
  transition: 0.7s ease-in-out;
}
.fade-enter-from {
  opacity: 0;
}
</style>
