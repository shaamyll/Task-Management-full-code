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
import { Pencil } from "lucide-react"
import { Loader2 } from "lucide-react";
import { fetchAllUsersAPI } from '@/services/AllAPIs';
import {  useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';



function AllUsers() {

    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');


    //fetch all users
    const { data, isLoading } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found');
            }

            const header = {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
            const response = await fetchAllUsersAPI(header)
            return response.data
        },
        refetchOnWindowFocus: false
    })


    // if (isSuccess) {
    //     console.log(data)
    // }



    return (
        <div>
            <div className='p-8 border border-gray-200 shadow-md rounded mt-3 flex justify-between gap-3 '>

                <div className="flex flex-col w-48">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Name</label>
                    <Input onChange={e => setSearchName(e.target.value)} className='rounded shadow-md w-48 border-gray-300 focus:border-black' />
                </div>


                <div className="flex flex-col w-48">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Email</label>
                    <Input onChange={e => setSearchEmail(e.target.value)} className='rounded shadow-md w-48 border-gray-300 focus:border-black' />
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
                                value="admin"
                                className="cursor-pointer data-[highlighted]:bg-gray-200 transition-colors"
                            >
                                Admin
                            </SelectItem>

                            <SelectItem
                                value="Project_Manager"
                                className="cursor-pointer data-[highlighted]:bg-gray-200 transition-colors"
                            >
                                Project manager
                            </SelectItem>

                            <SelectItem
                                value="developer"
                                className="cursor-pointer data-[highlighted]:bg-gray-200 transition-colors"
                            >
                                Developer
                            </SelectItem>
                            <SelectItem
                                value="tester"
                                className="cursor-pointer data-[highlighted]:bg-gray-200 transition-colors"
                            >
                                Tester
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col w-48 gap-3">
                    <CreateUser/>
                    <Button className='rounded bg-black text-white shadow-md'>Reset</Button>
                </div>



            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <Table className="rounded border border-gray-200">
                    <TableHeader>
                        <TableRow className="border border-gray-300 rounded ">
                            <TableHead className="w-12 px-6 py-4">#</TableHead>
                            <TableHead className="px-6 py-4">Name</TableHead>
                            <TableHead className="px-6 py-4">Email</TableHead>
                            <TableHead className="px-6 py-4">Role</TableHead>
                            <TableHead className="px-6 py-4">Created At</TableHead>
                            <TableHead className="text-right px-12 py-4">Actions</TableHead>
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
                                    className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                    <TableCell className="px-6 py-4 text-center">{index + 1}</TableCell>
                                    <TableCell className="font-medium px-6 py-4">{user.username}</TableCell>
                                    <TableCell className="px-6 py-4">{user.email}</TableCell>
                                    <TableCell className="px-6 py-4">{user.role}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <Button variant="outline" size="sm" className="rounded bg-black text-white">
                                                <Pencil />
                                            </Button>

                                            <DeleteUser user={user}/>
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