import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { UsersRound, LayoutDashboard, FilePen, NotebookTabs } from 'lucide-react';
import { useEffect, useState } from "react";

function SideBar() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")


  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) setEmail(storedEmail)
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) setUsername(storedUsername)
    const storedRole = localStorage.getItem('role')
    if (storedRole) setRole(storedRole)
  }, [])
  return (
    <div >
      <Sidebar className="w-64 pt-12 border border-gray-300">
        <SidebarContent>
          <SidebarGroup>
            <div className=" px-4 py-10">
              <h2 className="font-bold text-2xl my-2">{role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}</h2>
              <p className="text-sm text-gray-600 font-medium">{username} ({email})</p>
            </div>
            <SidebarGroupContent>

              <a
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-4 text-gray-700 text-base font-medium rounded transition hover:bg-gray-200 "
              >
                <LayoutDashboard />
                Dashboard
              </a>
              {
                (role === 'admin') &&
                (<a
                  href="/admin/usersPage"
                  className="flex items-center gap-3 px-4 py-4 text-gray-700 text-base font-medium rounded transition hover:bg-gray-200 "
                >
                  <UsersRound />
                  Manage Users
                </a>)
              }

              <a
                href={
                  role === "admin"
                    ? "/admin/taskPage"
                    : role === "project_manager"
                      ? "/pm/taskPage"
                      : "#"
                }
                className="flex items-center gap-3 px-4 py-4 text-gray-700 text-base font-medium rounded transition hover:bg-gray-200 "
              >
                <FilePen />
                Tasks
              </a>

              {
                (role === 'project_manager') &&
                (<a
                  href="/PM/assignments"
                  className="flex items-center gap-3 px-4 py-4 text-gray-700 text-base font-medium rounded transition hover:bg-gray-200 "
                >
                  <NotebookTabs />
                  Assignments
                </a>)
              }

            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default SideBar;
