<template>
  <div>
    list 
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      
    } 
  },
  computed: {
  },
  async created() {
    await this.$store.dispatch('workspace/getWorkspaceTree')
    console.log(this.$store.state.workspace.workspaceTree)
  },
  mounted() {
  }
}
</script>
