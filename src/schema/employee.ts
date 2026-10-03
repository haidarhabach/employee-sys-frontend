import z from "zod"

export const employeeSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  position: z.string(),
  departmentId: z.string(),
  hireDate: z.string(),
  phoneNumber: z.string(),
  verified: z.boolean(),
})

export const employeeCreateSchema = employeeSchema.omit({
  id: true,
  verified: true,
})
export type EmployeeCreate = z.infer<typeof employeeCreateSchema>

export type Employee = z.infer<typeof employeeSchema>