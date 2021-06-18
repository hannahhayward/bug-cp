import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getBugs() {
    const bugs = await dbContext.Bug.find({ }).populate('creator', 'name picture')
    return bugs
  }

  async getActiveBug(id) {
    const activeBug = await dbContext.Bug.findById(id)
    if (!activeBug) {
      throw new BadRequest('Cannot Locate Bug With That Id')
    }
  }

  async createBug(newBugData) {
    const bug = await dbContext.Bug.create(newBugData)
    await bug.populate('crator', 'name picture').execPopulate()
    return bug
  }

  async editBug(id, newBugData) {
    const bug = await dbContext.Bug.findByIdAndUpdate(id, newBugData, { new: true, runValidators: true })
    if (!bug) {
      throw new BadRequest('Cannot Locate Bug With That Id')
    }
    return bug
  }

  async deleteBug(id) {
    const bug = await dbContext.Bug.findById(id)
    bug.closed = true
    if (!bug) {
      throw new BadRequest('Cannot Locate Bug With That Id')
    }
    return bug
  }
}
export const bugsService = new BugsService()
