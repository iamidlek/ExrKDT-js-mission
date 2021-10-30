<template>
  <div class="book">
    <i class="leaf">
      <h3><span>T</span>o Do List</h3>
    </i>
    <div class="add">
      +
    </div>
    <!-- + 버튼 누르면 book 위에 선언된 블러처리 가능하면 해주기 -->
    <AddToDo class="infobox" />
    <ul class="for list items">
      <ListItem />
    </ul>
  </div>
</template>

<script>
import ListItem from '~/components/ListItem'
import AddToDo from '~/components/AddToDo'

export default {
  components: {
    ListItem,
    AddToDo
  }
}
</script>

<style lang="scss" scoped>
.book {
  width: 340px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 20px 20px 50px rgba(0,0,0,0.7);
  border-radius: 20px;
  background: rgba(240,250,240,0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.8px);
  user-select: none;
  .infobox {
    position: absolute;
    width: 80%;
    height: 50%;
    top: 20%;
  }
  .leaf {
    position: absolute;
    top: 32px;
    left: -16px;
    width: 280px;
    height: 46px;
    background: linear-gradient(to right,#af43f1 50%, rgba(255, 255, 255, 0.5));
    border-radius: 20px;
    &::before {
      content: '';
      position: absolute;
      top: 46px;
      width: 15px;
      height: 30px;
      background: #7035a6;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      z-index: 2;
    }
    &::after {
      content: '';
      position: absolute;
      top: 20px;
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
  .add {
    position: absolute;
    top: 1.61em;
    right: 1em;
    width: 26px;
    height: 26px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    font-size: 1.6em;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    line-height: 1.05;
    padding-right: 0.5px;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
      border-color: rgba(255, 255, 255, 0.8);
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
  }
}
</style>
