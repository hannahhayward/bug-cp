import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'
export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getBugs)
      .get('/:id', this.getActiveBug)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs()
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getActiveBug(req, res, next) {
    try {
      const activeBug = await bugsService.getActiveBug(req.id)
      return res.send(activeBug)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.editBug(req.params.id, req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const bug = await bugsService.deleteBug(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
