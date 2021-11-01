<template>
  <div class="book">
    <i class="leaf">
      <h3><span>D</span>one List</h3>
    </i>
    <div class="removall"><div></div></div>
    <div class="nolist">계획을 실행하세요 !</div>
    <!-- <draggable
      class="list"
      tag="transition-group"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      v-model="toDoList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="dropList"
      item-key="id"
    >
      <template #item="{ element }">
        <ListItem
          :key="element.id"
          :item="element"
          :user="user"
          :donelen="doneLen"
          @re-get-list="async () => await getTodo()"
          @move-to-done="async () => await getTodo()"
          @fix-info="sendToModal"
        />
      </template>
    </draggable> -->
  </div>
  <!-- <div v-show="addTF" class="focback">
    <AddToDo
      v-model="addTF"
      v-bind="$attrs"
      :user="user"
      :order="orderNum"
      class="infobox"
      @re-get-list="async () => await getTodo()"
    />
  </div>
  <div v-if="modiModal" class="modify">
    <FixToDo
      v-model="modiModal"
      class="infobox"
      :data="toModalData"
      :user="user"
      @refresh-list="async () => await getTodo()"
    />
  </div> -->
</template>

<style lang="scss" scoped>
.book {
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
      text-align: center;
      margin: 0.6em;
      padding-right: 6.6em;
      span {
        font-size: 1.1em;
      }
    }
  }
  .removall {
    position: absolute;
    top: 1.66em;
    left: 1.2em;
    width: 18px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    font-size: 1.6em;
    color: rgba(255, 255, 255, 0.5);
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
      border-radius: 16px;
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
    width: 70%;
    overflow: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    position: relative;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
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
.focback {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(2px);
}
.modify {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(2px);
}
.infobox {
  position: absolute;
  width: 320px;
  height: 256px;
  top: 32%;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
