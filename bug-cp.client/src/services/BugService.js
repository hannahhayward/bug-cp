import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    const res = await api.get('/api/bugs/')
    AppState.bugs = res.data
    logger.log(AppState.bugs, 'appstate after get in service')
  }

  async getActiveBug(bugId) {
    const res = await api.get('/api/bugs/' + bugId)
    AppState.activeBug = res.data
    logger.log(AppState.activeBug, 'active bug from the service')
  }

  async createBug(newBugData) {
    const res = await api.post('/api/bugs', newBugData)
    AppState.bugs = res.data
  }

  async deleteBug(bugId) {
    const res = await api.delete('/api/bugs/' + bugId)
    AppState.bugs = res.data
  }
}
export const bugService = new BugService()
