import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotes(id) {
    const note = await dbContext.Note.find({ bug: id }).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('cannot find bug with that id ')
    }
    return note
  }

  async createNote(newNoteData) {
    const note = await dbContext.Note.create(newNoteData)
    await note.populate('creator', 'name picture').execPopulate()
    return note
  }

  async editNote(id, newNoteData) {
    const note = await dbContext.Note.findByIdAndUpdate(id, newNoteData, { new: true, runValidators: true })
    if (!note) {
      throw new BadRequest('cannot find note with that id ')
    }
    return note
  }

  async deleteNote(id) {
    const note = await dbContext.Note.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('cannot find note with that id ')
    }
    return note
  }
}
export const notesService = new NotesService()
