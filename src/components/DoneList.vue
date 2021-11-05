<template>
  <div class="donebox">
    <i class="leaf">
      <h3><span>D</span>one List</h3>
    </i>
    <button type="button" class="removall" @click="clear"><div></div></button>
    <ul class="list">
      <div class="nolist" v-if="!doneList.length">계획을 실행하세요 !</div>
      <li v-else v-for="item in doneList" :key="item.id" class="contentbox">
        <div class="content">
          <span>{{ item.updatedAt.substr(5, 5) }}</span>
          <span>{{ item.title.split("__@dateSet-expire__Info:")[0] }}</span>
        </div>
        <div class="del" @click.capture="donebox" :data-id="item.id">
          <div class="cross1"></div>
          <div class="cross2"></div>
        </div>
        <label :for="item.id">
          <input
            :id="item.id"
            type="checkbox"
            @click="backTodo"
            :data-title="item.title"
          />
          <span>
            <i></i>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    doneList() {
      return this.$store.getters["todo/doneList"];
    },
  },
  methods: {
    donebox(e) {
      this.$store.dispatch("todo/deleteTodo", e.target.dataset.id);
    },
    backTodo(e) {
      if (e.target.checked) {
        const item = { id: e.target.id, title: e.target.dataset.title };
        this.$store.dispatch("todo/returnTodo", item);
      }
    },
    clear() {
      const allDones = this.doneList.map((item) => item.id);
      allDones.forEach((id) => {
        this.$store.dispatch("todo/deleteTodo", id);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.donebox {
  width: 340px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  background: rgba(240, 250, 240, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.8px);
  user-select: none;
  transition: 1s;
  .leaf {
    position: absolute;
    top: 32px;
    right: -16px;
    width: 280px;
    height: 46px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.5) 50%,
      #af43f1
    );
    border-radius: 20px;
    &::before {
      content: "";
      position: absolute;
      top: 46px;
      right: 1px;
      width: 15px;
      height: 30px;
      background: #7035a6;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      z-index: 2;
    }
    &::after {
      content: "";
      position: absolute;
      top: 20px;
      right: 0px;
      width: 15px;
      height: 40px;
      background: #af43f1;
      z-index: 1;
    }
    h3 {
      text-align: right;
      margin: 0.6em;
      padding-right: 1.8em;
      span {
        font-size: 1.1em;
      }
    }
  }
  .removall {
    position: absolute;
    top: 1.66em;
    left: 1.2em;
    width: 24px;
    height: 28px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    font-size: 1.6em;
    color: rgba(255, 255, 255, 0.5);
    background: transparent;
    text-align: center;
    line-height: 1.05;
    padding-right: 0.5px;
    transition: 0.7s;
    &::before {
      content: "";
      position: absolute;
      width: 12px;
      height: 2px;
      top: 6px;
      left: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 2px;
      top: 12px;
      left: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
    & > div {
      position: absolute;
      width: 50px;
      height: 2px;
      top: 12px;
      right: -16px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 20px;
      opacity: 0;
      transform: rotate(-54deg);
      transition: 0.7s;
    }
    &:hover {
      color: rgba(255, 255, 255, 0.8);
      border-color: rgba(255, 255, 255, 0.8);
      div {
        opacity: 1;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .list {
    list-style: none;
    margin-top: 6.8em;
    padding: 0;
    height: 360px;
    width: 80%;
    overflow: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    position: relative;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .contentbox {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 54px;
      box-sizing: border-box;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 10px;
        width: 100%;
        height: 36px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
      }
      .content {
        width: 100%;
        display: flex;
        span {
          padding-left: 10px;
          &:last-child {
            display: inline-block;
            width: 142px;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
      .del {
        width: 28px;
        height: 28px;
        position: absolute;
        right: 34px;
        top: 14px;
        cursor: pointer;
        margin-right: 10px;
        background: transparent;
        cursor: pointer;
        .cross1 {
          width: 18px;
          height: 18px;
          border-right: 2px solid rgba(#efefef, 0.5);
          transform: rotate(45deg) translateX(-2px);
          pointer-events: none;
        }
        .cross2 {
          width: 18px;
          height: 18px;
          border-right: 2px solid rgba(#efefef, 0.5);
          transform: rotate(-45deg) translateX(4px) translateY(-6px);
          pointer-events: none;
        }
        &:hover {
          .cross1,
          .cross2 {
            border-color: rgba(#efefef, 0.9);
          }
        }
      }
      label {
        width: 28px;
        height: 28px;
        position: absolute;
        cursor: pointer;
        margin-right: 10px;
        right: 0;
        input {
          position: relative;
          z-index: 1;
          appearance: none;
          pointer-events: none;
          &:checked {
            & ~ span {
              background-color: #d80808;
              box-shadow: 0 5px 5px #fe000044;
              i::after {
                position: absolute;
                bottom: 16px;
                left: calc(50% - 15px);
                width: 14px;
                height: 2px;
                border-radius: 6px;
                background-color: #efefefce;
                transition: 0.5s;
              }
            }
          }
        }
        span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #05be05;
          border-radius: 80px;
          transition: 0.5s;
          box-shadow: 0 5px 5px #05be0566;
          pointer-events: none;
          i {
            position: absolute;
            top: -16px;
            left: -6px;
            width: 57px;
            height: 52px;
            &::before {
              content: "";
              position: absolute;
              top: 24px;
              left: 12px;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: #efefefce;
              /* 오른쪽 눈 */
              box-shadow: 10px 0 0 #efefefce;
            }
            &::after {
              content: "";
              position: absolute;
              bottom: 16px;
              left: calc(50% - 15px);
              width: 14px;
              bottom: 12px;
              height: 8px;
              border-radius: 6px;
              border-bottom-left-radius: 15px;
              border-bottom-right-radius: 15px;
              background-color: #efefefce;
              transition: 0.5s;
            }
          }
        }
        &:hover {
          span {
            background-color: #d80808;
            box-shadow: 0 5px 5px #fe000044;
          }
          i::after {
            content: "";
            bottom: 16px;
            height: 2px;
            border-radius: 6px;
            background-color: #efefefce;
          }
        }
      }
    }
  }
  .nolist {
    position: absolute;
    height: 10px;
    width: 100%;
    top: 50%;
    text-align: center;
    font-size: 1.3em;
  }
}
</style>
