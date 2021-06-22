<template>
  <div class="card open" v-if="state.bug.closed === false">
    <div class="card-header">
      <div class="text-right" v-if="state.bug.creatorId === state.account.id">
        <i class="far fa-times-circle mx-1 fa-lg" @click="deleteBug(state.bug.id)"></i>
        <i class="fas fa-edit mx-1 fa-lg" @click="toggleForm()"></i>
      </div>
      <h3>{{ state.bug.title }}</h3>
      <p v-if="state.bug.closed === false" class="red">
        Open
      </p>
      <p v-if="state.bug.creator && state.bug.creator.picture">
        <img :src="state.bug.creator.picture" alt="profile-pic" class="rounded-pill sizing">
        {{ state.bug.creator.name }}
      </p>
      <p> Updated on: {{ state.bug.updatedAt.split('T')[0] }}</p>
    </div>
    <div class="card-body">
      <p>{{ state.bug.description }}</p>
      <form id="bug-form" class="d-none" @submit.prevent="editBug(bug)">
        <div class="input-group">
          <label for="title" class="sr-only">title</label>
          <input type="text" class="form-control" v-model="state.editData.title" :placeholder="state.bug.title">
        </div>
        <div class="input-group">
          <label for="description" class="sr-only">description</label>
          <input type="text" class="form-control" v-model="state.editData.description" :placeholder="state.bug.description">
        </div>
        <button class="btn btn-primary" type="submit" @click="toggleForm">
          save
        </button>
      </form>
    </div>
    <div class="card-footer">
      <form id="note-form" @submit.prevent="createNote(state.newComment)">
        <div class="input group">
          <label name="body" class="sr-only">Comment Body</label>
          <input type="text"
                 class="form-control"
                 name="comment-body"
                 id="comment-body"
                 placeholder="Comment"
                 required
                 v-model="state.newComment.body"
          >
        </div>
        <button class="btn btn-dark btn-block">
          Add a Comment
        </button>
      </form>
      <Note v-for="note in state.notes" :key="note.id" :note="note" />
    </div>
  </div>
  <div class="card closed" v-if="state.bug.closed === true">
    <div class="card-header">
      <h3>{{ state.bug.title }}</h3>
      <p v-if="state.bug.closed === true" class="green">
        Closed
      </p>
      <p>Created by: {{ state.bug.creator.name }}</p>
    </div>
    <div class="card-body">
      <p>{{ state.bug.description }}</p>
    </div>
    <div class="card-footer">
      <Note v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { bugService } from '../services/BugService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      newComment: {
        bug: route.params.id
      },
      editData: {}
    })
    onMounted(() => {
      notesService.getNotes(route.params.id)
    })
    return {
      state,
      deleteBug(id) {
        if (confirm('Do you really want to delete this bug ??')) {
          bugService.deleteBug(id)
        }
      },
      createNote(newComment) {
        notesService.createNote(newComment)
      },
      toggleForm() {
        document.getElementById('bug-form').classList.toggle('d-none')
      },
      editBug(editData) {
        bugService.editBug(route.params.id, state.editData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.green{
  color: #045604;
  font-weight: bold;
}
.closed{
    outline: solid 2px rgba(6, 126, 16, 0.637);

}
.open{
  outline: solid 2px rgba(194, 4, 4, 0.637);
}
.sizing{
  height: 5vh;
  width: 5vh
}
.red{
  color: rgb(167, 18, 18);
  font-weight: bold;
}
</style>
