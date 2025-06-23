import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { UsersRound,LayoutDashboard } from 'lucide-react';

function AdminSideBar() {
  return (
    <div >
      <Sidebar className="w-64 pt-12 border border-gray-200">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-10">
              <h2 className="font-bold text-2xl ">Admin</h2>
            </div>
            <SidebarGroupContent>

              <a
                href="/admin/dashboard"
               className="flex items-center gap-3 px-4 py-4 text-gray-700 text-base font-medium rounded transition hover:bg-gray-200 "
              >
                <LayoutDashboard/>
                Dashboard
              </a>
              <a
                href="/allUsersAdmin"
                className="flex items-center gap-3 px-4 py-4 text-gray-700 text-base font-medium rounded transition hover:bg-gray-200 "
              >
                <UsersRound />
                Manage Users
              </a>

            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default AdminSideBar;
