<template>
  <form @submit.prevent="fixed">
    <label for="title">Fix Title</label>
    <input
      id="title"
      ref="fixtitle"
      type="text"
      name="title"
      autocomplete="off"
      :placeholder="placeHolder"
      onfocus="placeholder = ''"
      :onblur="`prescheholder = '${placeHolder}'`"
      maxlength="20"
    />
    <p class="modi-info">{{ recentModify }}</p>
    <label for="resche">Reschedule</label>
    <input
      id="resche"
      type="date"
      :value="beforeDue"
      name="__@dateSet-expire__Info:"
    />
    <button type="submit" class="fix">Fix</button>
    <div class="close" @click="closing">
      <div class="cross1"></div>
      <div class="cross2"></div>
    </div>
  </form>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    modelValue: {
      type: Boolean,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  computed: {
    beforeDue() {
      const before = dayjs(
        this.data.title.split("__@dateSet-expire__Info:")[1]
      ).format("YYYY-MM-DD");
      return before;
    },
    recentModify() {
      const updatted = this.data.updatedAt;
      return updatted.substr(0, 10) + " 갱신됨";
    },
    placeHolder() {
      return this.data.title.split("__@dateSet-expire__Info:")[0];
    },
  },
  methods: {
    fixed(e) {
      const title = e.target.title;
      const dueDate = e.target.resche;
      if (!title.value) {
        title.placeholder = "입력이 필요합니다";
        return;
      }
      if (title.value.length > 20) {
        return;
      }
      const fixedContent = {
        id: this.data.id,
        title: `${title.value}${dueDate.name}${dueDate.value}`,
        order: this.data.order,
      };
      this.$store.dispatch("todo/fixTodo", fixedContent);
      title.value = "";
      this.$emit("update:modelValue", false);
    },
    closing() {
      this.$refs.fixtitle.value = "";
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  height: 50%;
  background-image: linear-gradient(
    to left bottom,
    #af43f1,
    #af43f1,
    #aa6eed,
    #ac8de3,
    #c0c0c0
  );
  border-radius: 20px;
  opacity: 0.92;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
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
      background: rgba(240, 250, 240, 0.5);
      color: #af43f1;
      &:focus {
        background: rgba(240, 250, 240, 0.3);
      }
      &::placeholder {
        color: #aa6eed99;
      }
    }
    &#resche {
      width: 90%;
      font-size: 1.1em;
      margin: 10px 0px;
    }
  }
  .fix {
    margin-top: 0.5em;
    border-radius: 0.7em;
    width: 90%;
    font-size: 1.1em;
    line-height: 2em;
    background-color: transparent;
    color: rgba(#efefef, 0.9);
    box-sizing: border-box;
    border: 2px solid rgba(#efefef, 0.9);
    cursor: pointer;
    letter-spacing: 0.6rem;
  }
  .modi-info {
    position: absolute;
    width: 100%;
    top: 1.4em;
    left: 9em;
    font-size: 0.8em;
    color: rgba(#efefef, 0.9);
  }
  .close {
    position: absolute;
    top: 28px;
    right: 26px;
    width: 18px;
    height: 18px;
    background: transparent;
    cursor: pointer;
    .cross1 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, 0.9);
      transform: rotate(45deg) translateX(-10px);
    }
    .cross2 {
      width: 18px;
      height: 18px;
      border-right: 2px solid rgba(#efefef, 0.9);
      transform: rotate(-45deg) translateX(4px) translateY(-14px);
    }
  }
}
</style>
