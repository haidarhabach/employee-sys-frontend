import { Button } from "@/components/ui/button"
import {
  BriefcaseIcon,
  ChevronDownIcon,
  HomeIcon,
  LockIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SideBar({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (key: string) => void
  activeTab: string
}) {
  return (
    <div className='hidden md:flex w-64 flex-col bg-background border-r'>
      <div className='flex h-14 items-center border-b px-4'>
        <h1 className='text-lg font-semibold'>EMS Dashboard</h1>
      </div>
      <div className='flex-1 overflow-auto py-2'>
        <nav className='grid items-start px-2 text-sm font-medium'>
          <Button
            variant='ghost'
            className='justify-start gap-2 h-9'
            onClick={() => setActiveTab("dashboard")}
          >
            <HomeIcon className='h-4 w-4' />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "employees" ? "secondary" : "ghost"}
            className='justify-start gap-2 h-9'
            onClick={() => setActiveTab("employees")}
          >
            <UsersIcon className='h-4 w-4 text-yellow-500' />
            Employees
          </Button>
          <Button
            variant={activeTab === "departments" ? "secondary" : "ghost"}
            className='justify-start gap-2 h-9'
            onClick={() => setActiveTab("departments")}
          >
            <BriefcaseIcon className='h-4 w-4 text-blue-500' />
            Departments
          </Button>
          <Button
            variant={activeTab === "accounts" ? "secondary" : "ghost"}
            className='justify-start gap-2 h-9'
            onClick={() => setActiveTab("accounts")}
          >
            <LockIcon className='h-4 w-4 text-red-500' />
            User Accounts
          </Button>
          <Button
            variant='ghost'
            className='justify-start gap-2 h-9'
            onClick={() => setActiveTab("settings")}
          >
            <SettingsIcon className='h-4 w-4' />
            Settings
          </Button>
        </nav>
      </div>
      <div className='border-t p-4'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage
              src='/placeholder.svg?height=32&width=32'
              alt='Avatar'
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>Admin User</p>
            <p className='text-xs text-gray-500'>admin@example.com</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='ml-auto h-8 w-8'>
                <ChevronDownIcon className='h-4 w-4' />
                <span className='sr-only'>Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className='mr-2 h-4 w-4' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className='mr-2 h-4 w-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className='mr-2 h-4 w-4' />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}