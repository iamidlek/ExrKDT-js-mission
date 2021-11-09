<template>
  <div class="wrapper">
    <div class="bar">
      <WorkSpaceBar v-if="isLoad" />
      <LoadingBox
        v-else
        @loaded="isLoad =true" />
      <div class="handle"></div>
    </div>
    <div class="size-controler"></div>
    <div class="main-content">
      <WorkSpaceContent />
    </div>
  </div>
</template>

<script>
import WorkSpaceBar from '~/components/WorkSpaceBar'
import WorkSpaceContent from '~/components/WorkSpaceContent'
import LoadingBox from '~/components/LoadingBox'


export default {
  components: {
    WorkSpaceBar,
    WorkSpaceContent,
    LoadingBox
  },
  data() {
    return {
      isLoad: false
    }
  },
  async created() {
    await this.$store.dispatch('workspace/getWorkspaceTree')
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100vh;
  color: #e8e7e4;
  .bar {
    position: relative;
    box-sizing: border-box;
    background-color: #373c3f;
    max-width: 480px;
    width: 320px;
    // min-width: 190px;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    .handle {
      position: absolute;
      top: 0;
      right: -2px;
      width: 6px;
      height: 100%;
      opacity: .7;
      // &:hover {
        // background-color: yellowgreen;
      // }
    }
  }
  .main-content {
    flex: 1;
    background-color: #2f3437;
  }
}
</style>
