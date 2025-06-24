import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react";
import { fetchAllUsersAPI } from '@/services/AllAPIs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';



function AllUsers() {

    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

      const filters = {
                searchName: searchName,
                searchEmail: searchEmail,
                role: selectedRole
            };

    //fetch all users
    const { data, isLoading } = useQuery({
        queryKey: ["userData",filters],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found');
            }

          

            console.log(filters)

            const header = {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
            const response = await fetchAllUsersAPI(filters, header)
            return response.data
        },
        refetchOnWindowFocus: false
    })


    // if (isSuccess) {
    //     console.log(data)
    // }

    function Reset():any{
        setSearchEmail('');
        setSearchName('')
        setSelectedRole('')
    }



    return (
        <div>
            <div className='p-8 border border-gray-200 shadow-md rounded mt-3 flex justify-between gap-3 '>

                <div className="flex flex-col px-10">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Name</label>
                    <Input onChange={e => setSearchName(e.target.value)} className='rounded shadow-md w-48' />
                </div>


                <div className="flex flex-col w-48">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Email</label>
                    <Input onChange={e => setSearchEmail(e.target.value)} className='rounded shadow-md w-48' />
                </div>

                <div className="flex flex-col w-48">
                    <label htmlFor="role" className="mb-2 text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <Select onValueChange={value => setSelectedRole(value)}>
                        <SelectTrigger id="role" className=" focus:ring-2 focus:ring-black rounded shadow-md border-gray-300">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className='rounded shadow-md border-gray-300 bg-white'>


                            <SelectItem
                                value="user"
                            >
                                User
                            </SelectItem>

                            <SelectItem
                                value="admin"
                            >
                                Admin
                            </SelectItem>

                            <SelectItem
                                value="project_manager"
                            >
                                Project manager
                            </SelectItem>

                            <SelectItem
                                value="developer"
                            >
                                Developer
                            </SelectItem>
                            <SelectItem
                                value="tester"
                            >
                                Tester
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col px-10 gap-3">
                    <CreateUser />
                    {
                        (selectedRole || searchEmail || searchName) && (
                            <Button onClick={Reset}>Reset</Button>
                        )
                    }
                </div>



            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <Table className="rounded border border-gray-200">
                    <TableHeader>
                        <TableRow className="border border-gray-300 rounded ">
                            <TableHead className="w-12 px-6 py-4">#</TableHead>
                            <TableHead className="px-6 py-4">Name</TableHead>
                            <TableHead className="px-8 py-4">Email</TableHead>
                            <TableHead className="px-10 py-4">Role</TableHead>
                            <TableHead className="px-8 py-4">Created At</TableHead>
                            <TableHead className="text-right px-14 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="py-10 text-center">
                                    <div className="flex items-center justify-center gap-2 text-gray-500">
                                        <Loader2 className="animate-spin w-7 h-7" />
                                        <span>Loading users...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data?.data?.map((user: any, index: number) => (
                                <TableRow
                                    key={user.id}

                                >
                                    <TableCell className="px-6 py-4 text-center">{index + 1}</TableCell>
                                    <TableCell className="font-medium px-6 py-4">{user.username}</TableCell>
                                    <TableCell className="px-6 py-4">{user.email}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className="inline-block px-4 py-1 text-sm font-medium text-white bg-emerald-500 rounded-full capitalize shadow">
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <UpdateUser user={user} />

                                            <DeleteUser user={user} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                </Table>
            </div>

        </div>
    )
}

export default AllUsers