import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { BugSchema } from '../models/Bug'
import { CommentSchema } from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bug = mongoose.model('Bug', BugSchema);
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
