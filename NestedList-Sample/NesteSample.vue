<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable</h3>
      <NestedDraggable :tasks="list" />
    </div>

    <div
      class="col-3"
      title="List">
      {{ list }}
    </div>
  </div>
</template>

<script>
import NestedDraggable from './Nested'
export default {
  components: {
    NestedDraggable
  },
  data() {
    return {
      list: [
        {
          name: 'task 1',
          tasks: [
            {
              name: 'task 2',
              tasks: []
            }
          ]
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: []
            }
          ]
        },
        {
          name: 'task 5',
          tasks: []
        }
      ]
    }
  }
}
</script>
<style scoped></style>
