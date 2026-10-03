import { KeyIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function UserAccountsContent({ userAccounts }: any) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>User Account Management</CardTitle>
        <CardDescription>
          Manage user accounts, roles, and permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className='font-medium'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback className='bg-red-100 text-red-800'>
                        {account.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {account.username}
                  </div>
                </TableCell>
                <TableCell>{account.employee_name}</TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className={
                      account.role === "Manager"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-gray-50 text-gray-700"
                    }
                  >
                    {account.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      account.status === "Active" ? "success" : "secondary"
                    }
                    className={
                      account.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <KeyIcon className='h-4 w-4' />
                      <span className='sr-only'>Reset Password</span>
                    </Button>
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