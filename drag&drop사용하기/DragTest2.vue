<template>
  <li>
    <div>{{ element.name }}</div>
    <div>{{ element.id }}</div>
  </li>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
