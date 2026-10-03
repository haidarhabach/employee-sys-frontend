import api from "."

import { type SuccessResponse } from "../types"
import { type Department } from "../schema/department"

export default {
  findAll: async (): Promise<SuccessResponse<Department[]>> => {
    const res = await api.get("/departments")
    return res.data
  },
}