<template>
  <draggable
    class="dragArea"
    tag="div"
    :list="workspaceTree"
    :group="{ name: 'g1' }"
    item-key="title">
    <template #item="{ element }">
      <li>
        <div>{{ element.title }}</div>
        <NestedDraggable
          v-if="element.children"
          :list="element.children" />
      </li>
    </template>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  computed: {
    workspaceTree: {
      get() {
        return this.$store.state.workspace.workspaceTree
      }
    }
  },
  // props: {
  //   tree: {
  //     required: true,
  //     type: Array,
  //     default: () => ([])
  //   }
  // },
  mounted() {
    
  }
}
</script>
<style scoped>
.dragArea {
  padding-left: 1rem;
  list-style: none;
  min-height: 0px;
  /* height: 21px; */
  outline: 1px dashed;
}
</style>
