<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-lg-10 m-auto">
        <ActiveBug />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      bugService.getActiveBug(route.params.id)
    })
  }
}
</script>

<style>

</style>
