import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes() {
    const res = await api.get('/api/notes/')
    logger.log(res.data, 'notes res')
    AppState.notes = res.data
  }
}
export const notesService = new NotesService()
