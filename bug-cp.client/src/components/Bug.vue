<template>
  <div class="col-lg-10 m-auto">
    <div class="card closed my-2" v-if="bug.closed === true">
      <div class="card-header">
        <router-link :to="{ name: 'Bug', params: {id: bug.id}}" :key="bug.id" style="text-decoration: none">
          <h2 class="text-dark">
            {{ bug.title }}
          </h2>
        </router-link>
        <p> Updated on: {{ bug.updatedAt.split('T')[0] }}</p>
        <p class="green">
          Closed
        </p>
      </div>
    </div>
    <div class="card my-2 open" v-if="bug.closed === false">
      <div class="card-header">
        <router-link :to="{ name: 'Bug', params: {id: bug.id}}" :key="bug.id" style="text-decoration: none">
          <h2 class="text-dark">
            {{ bug.title }}
          </h2>
        </router-link>
        <p> Updated on: {{ bug.createdAt.split('T')[0] }}</p>
        <p class="red">
          Open
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
  color: rgb(4, 41, 4);
  font-weight: bold;
}
.closed{
  background-color: rgba(1, 161, 1, 0.623);
}
.open{
background-color: rgba(219, 25, 25, 0.52);}
.red{
  color: rgb(54, 6, 6);
  font-weight: bold;
}

</style>
