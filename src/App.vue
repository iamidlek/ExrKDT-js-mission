<template>
  <BackGround />
  <transition name="fade">
    <div v-if="effect"></div>
    <CheckName v-else-if="!user" />
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
      effect: true,
    };
  },
  computed: {
    user() {
      return this.$store.state.todo.user;
    },
  },
  mounted() {
    setTimeout(() => (this.effect = false), 100);
    this.$store.commit("todo/checkUser");
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  opacity: 1;
  transition: 2s linear;
}
.fade-leave-active {
  opacity: 0;
  transition: 1s linear;
}
.fade-enter-from {
  opacity: 0;
}
</style>
