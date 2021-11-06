<template>
  <BackGround />
  <transition name="fade">
    <div v-if="effect === 'init'"></div>
    <CheckName v-else-if="effect === 'check'" @sign-in="checkDone" />
    <ToDoView v-else />
  </transition>
  <transition name="fade">
    <Loading v-if="effect === 'signed'" @loaded="effect = 'active'" />
  </transition>
</template> 

<script>
import BackGround from "~/components/BackGround";
import CheckName from "~/components/CheckName";
import Loading from "~/components/Loading";
import ToDoView from "~/components/ToDoView";

export default {
  components: {
    BackGround,
    CheckName,
    Loading,
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
  methods: {
    checkDone() {
      setTimeout(() => {
        this.effect = "signed";
      }, 1000);
    },
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
