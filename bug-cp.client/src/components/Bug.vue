<template>
  <div class="col-lg-10 m-auto">
    <div class="card my-2">
      <div class="card-header">
        <router-link :to="{ name: 'Bug', params: {id: bug.id}}" :key="bug.id">
          <h2>{{ bug.title }}</h2>
        </router-link>
        <p>{{ bug.status }}</p>
      </div>
      <div class="card-body">
        <p>{{ bug.description }}</p>
      </div>
      <div class="card-footer">
        {{ bug.creator.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Bug',
  props: { bug: { type: Object, required: true } },
  setup(props) {
    return {
      bugs: computed(() => AppState.bugs)
    }
  }

}
</script>

<style>

</style>
