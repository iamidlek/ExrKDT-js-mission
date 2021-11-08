<template>
  <div class="account">
    <img
      src="https://avatars.githubusercontent.com/u/75520260?v=4"
      alt="logo" />
    <h1>YooHyungChul</h1>
  </div>
  <div class="tree">
    <NestedTree
      v-for="workspace in workspaceTree"
      :key="workspace.id"
      :workspace="workspace" />
  </div>
  <div
    class="create"
    @click="createWS">
    New workspace
  </div>
</template>

<script>
import NestedTree from './NestedTree'

export default {
  components: {
    NestedTree
  },
  computed: {
    workspaceTree () {
      return this.$store.state.workspace.workspaceTree
    }
  },
  methods: {
    async createWS() {
      const info = await this.$store.dispatch('workspace/createWorkspace')
      this.$router.push(`/${info}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  height: 45px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  img {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }
  h1 {
    font-size: 1rem;
  }
}
.tree {
  flex: 1;
  margin: 0;
  overflow-y: auto;
}
.create {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  line-height: 2.4;
  border-top: 2px solid rgba(255,255,255,0.2);
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: rgba(255,255,255,0.2);
  }
}
</style>
