<template>
  <div class="view-box">
    <h1
      class="title"
      placeholder="제목을 입력하여 주세요."
      contenteditable
      @blur="setTitle">
      {{ details.title }}
    </h1>
    <div
      class="content"
      placeholder="내용을 입력하여 주세요."
      contenteditable
      @blur="setContent">
      {{ details.content }}
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    details () {
      return this.$store.state.workspace.workSpaceDetail
    }
  },
  watch: {
    '$route'(to) {
      this.$store.dispatch('workspace/getWorkspaceDetail',to.params.id)
    }
  },
  created() {
    this.$store.dispatch('workspace/getWorkspaceDetail',this.$route.params.id)
  },
  methods: {
    setTitle(e) {
      const obj = {
        id: this.$route.params.id,
        data: {
          title : e.target.innerText,
          content: e.target.nextSibling.innerText
          }
      }
      this.$store.dispatch('workspace/editWorkspace',obj)
    },
    setContent(e){
      const obj = {
        id: this.$route.params.id,
        data: {
          title : e.target.previousSibling.innerText,
          content: e.target.innerText
          }
      }
      this.$store.dispatch('workspace/editWorkspace',obj)
    }
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
