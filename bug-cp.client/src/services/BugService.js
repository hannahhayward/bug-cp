import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('/api/bugs/')
    AppState.bugs = res.data
  }

  async getActiveBug(bugId) {
    const res = await api.get('/api/bugs/' + bugId)
    AppState.activeBug = res.data
  }

  async createBug(newBugData) {
    const res = await api.post('/api/bugs', newBugData)
    AppState.bugs = res.data
  }

  async deleteBug(bugId) {
    const res = await api.delete('/api/bugs/' + bugId)
    AppState.bugs = res.data
  }

  async editBug(bugId, editedBugData) {
    const res = await api.put('/api/bugs/' + bugId, editedBugData)
    logger.log(res.data, 'edit bug in the service')
    AppState.activeBug = res.data
    logger.log(AppState.activeBug, 'active bug appstate now')
    AppState.bugs = res.data
  }
}
export const bugService = new BugService()
