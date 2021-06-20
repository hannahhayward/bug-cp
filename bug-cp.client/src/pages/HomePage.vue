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
          <button class="btn btn-block btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <Bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { bugService } from '../services/BugService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import Bug from '../components/Bug.vue'
export default {
  components: { Bug },
  name: 'Home',
  setup() {
    const state = reactive({
      newBugData: {}
    })
    // onMounted(async() => {
    //   try {
    //     bugService.getBugs()
    //   } catch (error) {

    //   }
    // })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      createBug(newBugData) {
        try {
          bugService.createBug(newBugData)
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
