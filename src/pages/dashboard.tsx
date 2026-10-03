import { useState } from "react"

import { BriefcaseIcon, LockIcon, PlusIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SideBar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { EmployeesContent } from "@/components/employees-content"
import { DepartmentsContent } from "@/components/departments-content"
import { UserAccountsContent } from "@/components/user-accounts-content"
import { useFindAllEmployee } from "../features/employee"
import { CreateEventForm } from "../components/create-employee-form"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"

// Mock data for departments
const departments = [
  { id: "d1", name: "Engineering", employee_count: 12 },
  { id: "d2", name: "Product", employee_count: 8 },
  { id: "d3", name: "Design", employee_count: 6 },
  { id: "d4", name: "Marketing", employee_count: 5 },
  { id: "d5", name: "Human Resources", employee_count: 4 },
  { id: "d6", name: "Finance", employee_count: 3 },
]

// Mock data for user accounts
const userAccounts = [
  {
    id: "u1",
    username: "john.doe",
    role: "Employee",
    employee_name: "John Doe",
    status: "Active",
  },
  {
    id: "u2",
    username: "jane.smith",
    role: "Manager",
    employee_name: "Jane Smith",
    status: "Active",
  },
  {
    id: "u3",
    username: "michael.j",
    role: "Employee",
    employee_name: "Michael Johnson",
    status: "Inactive",
  },
  {
    id: "u4",
    username: "emily.w",
    role: "Employee",
    employee_name: "Emily Williams",
    status: "Active",
  },
  {
    id: "u5",
    username: "david.b",
    role: "Manager",
    employee_name: "David Brown",
    status: "Active",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("employees")
  const [searchTerm, setSearchTerm] = useState("")
  const { data: employees } = useFindAllEmployee()

  // Filter employees based on search term
  const filteredEmployees = employees?.data.content.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex h-screen'>
      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className='flex-1 overflow-auto p-4 lg:p-6'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <div className='flex items-center justify-between'>
              <TabsList>
                <TabsTrigger value='employees' className='relative'>
                  Employees
                  <UserIcon className='ml-2 h-4 w-4 text-yellow-500' />
                </TabsTrigger>
                <TabsTrigger value='departments'>
                  Departments
                  <BriefcaseIcon className='ml-2 h-4 w-4 text-blue-500' />
                </TabsTrigger>
                <TabsTrigger value='accounts'>
                  User Accounts
                  <LockIcon className='ml-2 h-4 w-4 text-red-500' />
                </TabsTrigger>
              </TabsList>
              <div className='flex items-center gap-2'>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by department' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>
                      <PlusIcon className='mr-2 h-4 w-4' />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>Create new employee</DialogTitle>
                    </DialogHeader>
                    <CreateEventForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <TabsContent value='employees' className='border-none p-0 pt-4'>
              <EmployeesContent employees={filteredEmployees || []} />
            </TabsContent>

            <TabsContent value='departments' className='border-none p-0 pt-4'>
              <DepartmentsContent departments={departments} />
            </TabsContent>

            <TabsContent value='accounts' className='border-none p-0 pt-4'>
              <UserAccountsContent userAccounts={userAccounts} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}