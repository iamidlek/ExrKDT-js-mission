<template>
  <div>
    init
  </div>
</template>
<script>
// import axios from 'axios'
// import { createItem } from '~/api/axiosPost'
import { getTree } from '~/api/axiosGet'

export default {
  components: {
  },
  data() {
    return {
    } 
  },
  async created() {
    console.log(await getTree())
    // await createItem('3FoGSg1ZXwdcX2XhERDW', '자식 1뎁스', '내용도 그냥저냥')
  },
  mounted() {
  //   setTimeout(()=>{console.log(data)},2000)
  }
}
</script>
