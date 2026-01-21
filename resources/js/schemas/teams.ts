import { Schema } from '@/lib/tsv/schema'
import { name } from '@/schemas/misc'

export const createTeamSchema = new Schema({
  name
})

export const updateTeamSchema = new Schema({
  name
})
