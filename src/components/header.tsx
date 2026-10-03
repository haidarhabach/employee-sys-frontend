import { BellIcon, MenuIcon, SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"

export function Header({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: (key: string) => void
}) {
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6'>
      <Button variant='outline' size='icon' className='md:hidden'>
        <MenuIcon className='h-5 w-5' />
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full pl-8 md:w-2/3 lg:w-1/3'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
      <Button variant='ghost' size='icon'>
        <BellIcon className='h-5 w-5' />
        <span className='sr-only'>Notifications</span>
      </Button>
    </header>
  )
}