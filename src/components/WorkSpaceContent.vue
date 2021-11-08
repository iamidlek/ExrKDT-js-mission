<template>
  <div class="box">
    <div
      class="path-tab">
      <div
        v-for="path in pathInfo"
        :key="path.id"
        class="paths">
        <RouterLink
          :to="`/${path.id}`"
          class="path">
          {{ path.title }}
        </RouterLink>
        <div>&#x2001;/&#x2001;</div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script>
export default {
  computed: {
    pathInfo() {
      return this.$store.state.workspace.workSpacePath
    },
  },
}
</script>

<style lang="scss" scoped>
  .path-tab {
    height: 3rem;
    font-size: 1rem;
    padding-left: 1.4rem;
    line-height: 3;
    overflow: hidden;
    margin-bottom: 4.6rem;
    display: flex;
    div:last-child {
      div:last-child{
        display: none;
      }
    }
    .paths {
      display: flex;
      .path {
        text-decoration: none;
        color: rgba(255,255,255,0.8);
        &:hover {
          background: rgba(255,255,255,0.2);
        }
      }
    }
  }
</style>
