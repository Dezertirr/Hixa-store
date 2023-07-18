<template>
  <p>{{ course }}</p>
</template>

<script>
import { ref, onMounted } from 'vue'
import exchangeCourse from '../services/exchangeCourse'

export default {
  setup() {
    const course = ref(0)

    onMounted(async () => {
      try {
        const data = await exchangeCourse()
        course.value = data
      } catch (error) {
        console.error(error)
      }
    })

    return {
      course
    }
  }
}
</script>

<style></style>
