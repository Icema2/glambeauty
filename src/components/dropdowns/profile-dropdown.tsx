import LogoutDialog from '@/components/dialogs/logout-dialog';
import ProfileDialog from '@/components/dialogs/profile-dialog';
import { useProfile } from '@/queries/use-profile';
import { ProgressButton } from '@jodd/next-top-loading-bar';
import { Bell, BookText, LayoutGrid, LogOut, NotebookPen, User } from 'lucide-react';
import React from 'react';
import SelectAppointmentDialog from '../dialogs/select-appointment-dialog';
import AppointmentsDrawer from '../drawers/appointments-drawer';
import NotificationsDrawer from '../drawers/notifications-drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

type Props = { children: React.ReactNode };
export default function ProfileDropdown({ children }: Props) {
  const { data: profile } = useProfile();
  if (!profile) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <ProfileDialog>
              <button className="flex w-full items-center px-2 py-1.5">
                <User className="mr-2 size-4" />
                <span>Profile</span>
              </button>
            </ProfileDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <NotificationsDrawer>
              <button className="flex w-full items-center px-2 py-1.5">
                <Bell className="mr-2 size-4" />
                <span>Notifications</span>
              </button>
            </NotificationsDrawer>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <AppointmentsDrawer>
              <button className="flex w-full items-center px-2 py-1.5">
                <BookText className="mr-2 size-4" />
                <span>Appointments</span>
              </button>
            </AppointmentsDrawer>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        {profile?.role === 'user' && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="sm:hidden">
              <SelectAppointmentDialog>
                <button className="flex w-full items-center px-2 py-1.5">
                  <NotebookPen className="mr-2 size-4" />
                  <span>Book an appointment</span>
                </button>
              </SelectAppointmentDialog>
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>
        )}

        {profile?.role === 'admin' && (
          <DropdownMenuItem>
            <ProgressButton href="/dashboard" className="flex items-center space-x-2">
              <LayoutGrid className="size-4" />
              <span>Dashboard</span>
            </ProgressButton>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <LogoutDialog>
              <button className="flex w-full items-center px-2 py-1.5">
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </button>
            </LogoutDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
