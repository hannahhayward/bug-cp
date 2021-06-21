<template>
  <div class="col-lg-10 m-auto">
    <div class="card my-2 open" v-if="bug.status === false">
      <div class="card-header">
        <router-link :to="{ name: 'Bug', params: {id: bug.id}}" :key="bug.id">
          <h2>{{ bug.title }}</h2>
        </router-link>
        <p> Updated on: {{ bug.createdAt.split('T')[0] }}</p>
        <p class="red">
          Open
        </p>
      </div>
    </div>
    <div class="card my-2" v-if="bug.status === true">
      <div class="card-header">
        <router-link :to="{ name: 'Bug', params: {id: bug.id}}" :key="bug.id">
          <h2>{{ bug.title }}</h2>
        </router-link>
        <p> Updated on: {{ bug.createdAt.split('T')[0] }}</p>
        <p class="green">
          Closed
        </p>
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

<style scoped>
.green{
  color: rgb(7, 136, 7);
  font-weight: bold;
}
.closed{
  background-color: rgba(1, 161, 1, 0.623);
}
.open{
background-color: rgba(219, 25, 25, 0.52);}
.red{
  color: rgb(167, 18, 18);
  font-weight: bold;
}

</style>
