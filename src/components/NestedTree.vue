<template>
  <div
    :data-path="`${workspace.title}`"
    :data-id="`${workspace.id}`"
    class="list">
    <RouterLink
      :to="`/${workspace.id}`"
      active-class="active"
      class="title"
      @click="takePath">
      <span
        class="toggle-btn"
        @click="viewChild">></span>
      {{ workspace.title }}
      <div class="tools">
        <div @click="deleteWS">
          x
        </div>
        <div
          v-if="depth !== 4"
          @click="addChild">
          +
        </div>
      </div>
    </RouterLink>
    <template v-if="workspace.children && depth < 4">
      <div
        ref="child"
        class="depth">
        <NestedTree
          v-for="ws in workspace.children"
          :key="ws.id"
          :data-path="`${ws.title}`"
          :data-id="`${ws.id}`"
          :workspace="ws"
          :depth="depth + 1" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    depth: {
      type: Number,
      default: 0,
    },
    workspace: {
      required: true,
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    viewChild() {
      if (!this.$refs.child) return
      if (this.$refs.child.classList.contains('closed')) {
        this.$refs.child.classList.remove('closed')
      } else {
        this.$refs.child.classList.add('closed')
      }
    },
    takePath(e) {
      const pathInfo = []
      let node = e.target.parentElement
      for (let i = 0 ; i <= this.depth; i++) {
        const obj = {
          id: node.dataset.id,
          title: node.dataset.path
        }
        pathInfo.unshift(obj)
        node = node.parentElement.parentElement
      }
      this.$store.dispatch('workspace/setPath',pathInfo)
    },
    async deleteWS() {
      await this.$store.dispatch('workspace/deleteWorkspace',this.workspace.id)
      this.$router.push('/')
    },
    async addChild() {
      if (this.depth === 4 ) return
      const info = await this.$store.dispatch('workspace/createWorkspace',this.workspace.id)
      await this.$router.push(`/${info}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.depth {
  padding-left: 1rem;
  &.closed {
    overflow: hidden;
    height: 0px;
  }
}
.title {
  display: block;
  width: auto;
  padding-bottom: 1rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  &.active {
    background: #4b5053;
  }
  .tools{
    position: absolute;
    top: -0.4rem;
    right: 0.4rem;
    font-size: 1.2rem;
    width: 2rem;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    div:first-child {
      width: 1rem;
      height: 1rem;
      text-align: center;
    }
    div:last-child {
      margin-left: 10px;
    }
  }
  &:hover .tools {
    opacity: 1;
  }
}
.toggle-btn {
  padding-right: 0.4rem;
}
</style>
