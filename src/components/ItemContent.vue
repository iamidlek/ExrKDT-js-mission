<template>
  <div class="view-box">
    <h1
      class="title"
      placeholder="제목을 입력하여 주세요."
      contenteditable>
      {{ details.title }}
    </h1>
    <div
      class="content"
      placeholder="내용을 입력하여 주세요."
      contenteditable>
      {{ details.content }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    details () {
      return this.$store.state.workspace.workSpaceDetail
    }
  },
  async created() {
    await this.$store.dispatch('workspace/getWorkspaceDetail',this.id)
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.view-box {
  padding-left: 5rem;
  .title {
    outline: none;
    &:empty:before {
      content: attr(placeholder);
      color: rgba(#FFF, 0.2);
    }
  }
  .content {
    outline: none;
    &:empty:before {
      content: attr(placeholder);
      color: rgba(#FFF, 0.3);
    }
  }
}
</style>
