import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
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
      logger.log('reached the service to delete note')
      await api.delete('api/notes/' + noteId)
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const notesService = new NotesService()
