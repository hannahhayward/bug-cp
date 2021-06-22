import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('/api/bugs/')
      AppState.bugs = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get('/api/bugs/' + bugId)
      AppState.activeBug = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }

  async createBug(newBugData) {
    try {
      const res = await api.post('/api/bugs', newBugData)
      AppState.bugs = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }

  async deleteBug(bugId) {
    try {
      const res = await api.delete('/api/bugs/' + bugId)
      AppState.bugs = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }

  async editBug(bugId, editedBugData) {
    try {
      const res = await api.put('/api/bugs/' + bugId, editedBugData)
      AppState.activeBug = res.data
      AppState.bugs = res.data
    } catch (error) {
      Notification.toast(error, error)
    }
  }
}
export const bugService = new BugService()
