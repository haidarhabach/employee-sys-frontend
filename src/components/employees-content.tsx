import { PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/schema/employee"

export function EmployeesContent({ employees }: {employees: Employee[]}) {
  console.log("employees:", employees)
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>Employee Management</CardTitle>
        <CardDescription>
          Manage your employees, view details, and update information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className='font-medium'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback className='bg-yellow-100 text-yellow-800'>
                        {employee.firstName[0]}
                        {employee.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {employee.firstName} {employee.lastName}
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className='bg-blue-50 text-blue-700 hover:bg-blue-50'
                  >
                    Department
                  </Badge>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  {new Date(employee.hireDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <PencilIcon className='h-4 w-4' />
                      <span className='sr-only'>Edit</span>
                    </Button>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <TrashIcon className='h-4 w-4' />
                      <span className='sr-only'>Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}