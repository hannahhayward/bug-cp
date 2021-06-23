import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class NotesService {
  async getNotes(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}/notes`)
      AppState.notes = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }

  async createNote(newNoteData) {
    try {
      const res = await api.post('api/notes', newNoteData)
      AppState.notes = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }

  async deleteNote(noteId) {
    try {
      await api.delete('api/notes/' + noteId)
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const notesService = new NotesService()
