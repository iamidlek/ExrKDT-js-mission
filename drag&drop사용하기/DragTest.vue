<template>
  <div class="row">

      <h3>Transition</h3>
      <draggable
        class="list-group"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <DragTest2 :element="element" />
        </template>
      </draggable>

        <!-- <template #item="{ element }">
          <li class="list-group-item">
            {{ 'abc' }}
          </li> 
        </template>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DragTest2 from "~/components/DragTest2"

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];
export default {
  components: {
    draggable,
    DragTest2
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, id: index + 1 };
      }),
      drag: false,
      data: [{ id: 'sfsfsfsf', value: 's'},{ id: 'sfsfsfsf', value: 's'},{ id: 'sfsfsfsf', value: 's'}]
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style>
.button {
  margin-top: 35px;
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
