import { type ChangeEvent, type FormEvent, useState } from "react"
import { format } from "date-fns"

import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { type EmployeeCreate, employeeCreateSchema } from "../schema/employee"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useFindAllDepartments } from "../features/department"
import { useCreateEmployeeMutation } from "../features/employee"

export function CreateEventForm() {
  const { data: departments } = useFindAllDepartments()
  const handleCreateEmployee = useCreateEmployeeMutation()

  const [date, setDate] = useState<Date>()
  const [departmentId, setDepartmentId] = useState<string>()
  const [state, setState] = useState<EmployeeCreate>({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    departmentId: "",
    hireDate: "",
    phoneNumber: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSelectDate = (date: Date | undefined) => {
    console.log("date:", date)
    const formattedDate = date ? format(date as Date, "yyyy-MM-dd") : ""
    setDate(date)
    setState({
      ...state,
      hireDate: formattedDate,
    })
  }

  const handleSelectDepId = (depId: string | null) => {
    setDepartmentId(depId ?? undefined)
    setState({
      ...state,
      departmentId: depId ?? "",
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validatedState = employeeCreateSchema.safeParse(state)
    if (validatedState.success) {
      const res = await handleCreateEmployee.mutateAsync(validatedState.data)
      console.log("res:", res)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              id='firstName'
              name='firstName'
              placeholder='Enter their first name'
              defaultValue={state.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id='lastName'
              name='lastName'
              placeholder='Enter their last name'
              defaultValue={state.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='Enter their email'
              defaultValue={state.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='position'>Position</Label>
            <Input
              id='position'
              name='position'
              placeholder='Enter their position'
              defaultValue={state.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Enter their Phone Number'
              defaultValue={state.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <Select value={departmentId} onValueChange={handleSelectDepId}>
            <SelectTrigger>
              <SelectValue placeholder='Select Department' />
            </SelectTrigger>
            <SelectContent>
              {departments.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className='space-y-2'>
            <Label>Hire date</Label>
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <Calendar className='mr-2 h-4 w-4' />
                  {date ? format(date, "dd.MM.yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={date}
                  onSelect={handleSelectDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='mt-10 w-full'>
            Create Employee
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}