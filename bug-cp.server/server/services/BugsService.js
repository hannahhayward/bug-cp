import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getBugs(query) {
    const bugs = await dbContext.Bug.find(query).populate('creator', 'name picture')
    return bugs
  }

  async getActiveBug(id) {
    const activeBug = await dbContext.Bug.findById(id).populate('creator', 'name picture')
    if (!activeBug) {
      throw new BadRequest('Cannot Locate Bug With That Id')
    }
    return activeBug
  }

  async createBug(newBugData) {
    const bug = await dbContext.Bug.create(newBugData)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async editBug(id, newBugData) {
    const closedBug = await dbContext.Bug.findOne({ _id: id })
    if (closedBug.closed === true) {
      throw new BadRequest('this bug is closed')
    } else {
      const bug = await dbContext.Bug.findByIdAndUpdate({ _id: id }, newBugData, { new: true, runValidators: true })
      if (!bug) {
        throw new BadRequest('Cannot Locate Bug With That Id')
      } return bug
    }
  }

  async deleteBug(id, newData) {
    const bug = await dbContext.Bug.findByIdAndUpdate({ _id: id }, { closed: true }, { new: true, runValidators: true })
    if (!bug) {
      throw new BadRequest('Cannot Locate Bug With That Id')
    }
    return bug
  }
}
export const bugsService = new BugsService()
