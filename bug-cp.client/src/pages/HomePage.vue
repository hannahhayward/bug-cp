<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-lg-10 m-auto">
        <h6 class="text-center">
          Report a Bug
        </h6>
        <form id="bug-form" @submit.prevent="createBug(state.newBugData)">
          <div class="input-group my-1">
            <label for="title" class="sr-only">Title</label>
            <input type="text" placeholder="Title" required class="form-control" v-model="state.newBugData.title">
          </div>
          <div class="input-group my-1">
            <label for="description" class="sr-only">description</label>
            <input type="text" placeholder="Description" required class="form-control" v-model="state.newBugData.description">
          </div>

          <button class="btn btn-block btn-outline-dark" type="submit">
            Create
          </button>
        </form>
        <div>
          <div class="btn-group btn-group-toggle my-3" data-toggle="buttons">
            <!-- <label class="btn btn-info all">
              <input type="radio" name="options" id="option1" checked @click="all"> All
            </label> -->
            <label class="btn btn-info">
              <input type="radio" name="options" id="option2" checked @click="sort"> Open
            </label>
            <label class="btn btn-info">
              <input type="radio" name="options" id="option3" @click="sort"> Closed
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { bugService } from '../services/BugService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import Bug from '../components/Bug.vue'
import { useRouter } from 'vue-router'
export default {
  components: { Bug },
  name: 'Home',
  setup() {
    const route = useRouter()
    const state = reactive({
      newBugData: {},
      bugs: computed(() => AppState.bugs)
    })
    return {
      state,
      sort() {
        if (AppState.bugs[0].closed) {
          AppState.bugs.sort((a, b) => { if (a.closed < b.closed) { return -1 } if (a.closed > b.closed) { return 1 } return 0 })
        } else {
          AppState.bugs.sort((a, b) => { if (a.closed < b.closed) { return 1 } if (a.closed > b.closed) { return -1 } return 0 })
        }
      },
      async createBug(newBugData) {
        try {
          await bugService.createBug(newBugData)
          route.push({ name: 'Bug', params: { id: AppState.activeBug.id } })
        } catch (error) {
          Notification.toast(error)
        }
        console.log(AppState.activeBug.id, 'id before service')
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
