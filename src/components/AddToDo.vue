<template>
  <form @submit.prevent="save">
    <label
      for="title"
      class="t">Title</label>
    <input
      id="title"
      type="text"
      name="title"
      maxlength="20"
      contenteditable="true" />
    <label for="goal">Due Date</label>
    <input
      id="goal"
      type="date"
      name="__@dateSet-expire__Info:" />
    <button type="submit">
      Add
    </button>
  </form>
</template>

<script>
// const words = str.split('__@dateSet-expire__Info:');
export default {
  methods: {
    save(e) {
      console.log(e.target)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  height: 100%;
  background-image: linear-gradient(to right top, #af43f1, #af43f1, #aa6eed, #ac8de3, #c0c0c0);
  border-radius: 20px;
  opacity: 0.98;
  box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
  box-sizing: border-box;
  padding-left: 1.7em;
  padding-top: 1.4em;
  label {
    display: block;
    font-size: 1.4em;
    font-weight: 700;
    color: rgba(#efefef, 0.8);
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    color: #efefef;
    &#title {
      caret-color: transparent;
      width: 90%;
      margin: 10px -6px;
      padding-left: 10px;
      font-size: 1.5em;
      border-radius: 15px;
      background: rgba(240,250,240,0.5);
      &:focus {
        background: rgba(240,250,240,0.3)
      }
    }
    &#goal {
      width: 90%;
      font-size: 1.1em;
      margin: 10px 0px;
    }
  }
  button {
    margin-top: 0.5em;
    border-radius: 0.7em;
    width: 90%;
    font-size: 1.1em;
    line-height: 2em;
    background-color: transparent;
    color: rgba(#efefef, .9);
    box-sizing: border-box;
    border: 2px solid rgba(#efefef, .9);
    cursor: pointer;
  }
}

</style>
