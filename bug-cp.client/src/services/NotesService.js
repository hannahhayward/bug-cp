import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    logger.log(res.data, 'notes res')
    AppState.notes = res.data
  }

  async createNote(newNoteData) {
    const res = await api.post('api/notes', newNoteData)
    logger.log(res.data, 'your new note data sir')
    AppState.notes = res.data
  }

  async deleteNote(noteId) {
    logger.log('reached the service to delete note')
    await api.delete('api/notes/' + noteId)
  }
}
export const notesService = new NotesService()
