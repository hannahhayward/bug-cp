<template>
  <div class="separate my-3 shadow">
    <div>
      <img :src="note.creator.picture" alt="profile-pic" class="rounded-pill sizing mt-1 mx-1">
      <b class=" align-self-center">{{ note.creator.name }}</b>
    </div>
    <div class="margin">
      {{ note.body }}
      <div class="text-right" v-if="note.creator.id === state.account.id">
        <i class="far fa-times-circle mx-1" @click="deleteNote(note.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      note: computed(() => AppState.notes.filter(n => route.params.id === n.bug)),
      account: computed(() => AppState.account)
    })
    return {
      state,
      deleteNote(id) {
        if (window.confirm('are you sure?')) { notesService.deleteNote(id) }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.separate{
  background-color: #e4dbdb;
  outline: 1px solid #dfd3d3;
}
.sizing{
  height: 5vh;
  width: 5vh
}
.margin{
  margin-left: 6vh;
}

</style>
