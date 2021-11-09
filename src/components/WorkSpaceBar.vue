<template>
  <div class="account">
    <img
      src="https://avatars.githubusercontent.com/u/75520260?v=4"
      alt="logo" />
    <h1>YooHyungChul</h1>
    <div
      ref="auth"
      class="auth"
      @click="check">
      Auth
    </div>
    <div
      v-if="modal"
      class="sign-modal">
      <form @submit.prevent="receive">
        <p>ID</p>
        <input
          id="id"
          type="text"
          autocomplete="off" />
        <p>PW</p>
        <input
          id="pass"
          type="password"
          autocomplete="off" />
        <button type="submit">
          Enter
        </button>
      </form>
    </div>
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
  data() {
    return {
      modal: false
    }
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
    },
    check(e) {
      if (e.target.classList.contains('checked')) return
      this.modal = !this.modal
    },
    receive(e) {
      const idVal = e.target.id.value
      const pwVal = e.target.pass.value
      const { id } = process.env
      const { pass } = process.env

      if (idVal === id && pwVal === pass) {
        this.$refs.auth.classList.add('checked')
        this.modal = false
        this.$store.commit('workspace/authCheck')
      } else {
        e.target.id.value = ''
        e.target.pass.value = ''
      }
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
  position: relative;
  img {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }
  h1 {
    font-size: 1rem;
  }
  .auth {
    font-size: 0.8rem;
    border: 2px solid rgb(218, 54, 32);
    width: 40px;
    height: 1.2rem;
    text-align: center;
    border-radius: 20px;
    padding-right: 1px;
    position: absolute;
    top: 0.8rem;
    right: 1.4rem;
    cursor: pointer;
    &:hover {
      background: rgba(218, 54, 32, 0.2);
    }
    &.checked {
      border: 2px solid rgb(32, 218, 57);
      background: rgba(32, 218, 57, 0.1);
    }
  }
  .sign-modal {
    position: absolute;
    top: 0.4rem;
    left: 19.2rem;
    background: #373c3f;
    border-radius: 10px;
    text-align: center;
    width: 10rem;
    p {
      position: absolute;
      margin: 0;
    }
    input {
      display: block;
      margin: 7px auto;
      width: 6rem;
      background: rgba(255,255,255,0.8);
      outline: none;
      border: none;
    }
    button {
      border-radius: 10px;
      background: transparent;
      border: 2px solid rgb(32, 218, 57);
      color: rgba(255,255,255,0.8);;
    }
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
