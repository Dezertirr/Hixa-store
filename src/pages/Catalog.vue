<template>
  <div>
    <ListProducts :catalog="activeCatalog"></ListProducts>
  </div>
</template>

<script>
import ListProducts from '@/components/ListProducts.vue'

export default {
  components: {
    ListProducts
  },
  data() {
    return {
      activeCatalog: ''
    }
  }
}
</script>

<style></style>
