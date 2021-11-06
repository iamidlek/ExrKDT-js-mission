<template>
  <div class="load">
    <div class="loading"></div>
    <p>불러오는 중...</p>
  </div>
</template>

<script>
export default {
  emits: ["loaded"],
  mounted() {
    setTimeout(() => this.$emit("loaded"), 2000);
  },
};
</script>

<style lang="scss" scoped>
.load {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  pointer-events: none;
  .loading {
    border: 15px solid #30bfa5;
    border-top: 15px solid transparent;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    animation: loading 0.8s infinite linear;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
