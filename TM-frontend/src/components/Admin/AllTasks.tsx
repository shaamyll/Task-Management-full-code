import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { ChevronDownIcon, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "../ui/calendar"
import { Label } from "../ui/label"
import React, { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import DeleteTask from "./DeleteTask"
import UpdateTask from "./UpdateTask"
import { allTaskHook } from "@/hooks/AllTask-Hook"

const AllTasks = () => {

    const [startOpen, setStartOpen] = React.useState(false)
    const [endOpen, setEndOpen] = React.useState(false)
    const [startDateFilter, setStartDateFilter] = React.useState<Date | undefined>()
    const [endDateFilter, setEndDateFilter] = React.useState<Date | undefined>()

    const [searchTitle, setSearchTitle] = useState('');
    const [statusFilter, setStatusFilter] = useState('');



    const filters = {
        searchTitle: searchTitle,
        filterStatus: statusFilter,
        filterStartDate: startDateFilter ? startDateFilter.toISOString() : null,
        filterEndDate: endDateFilter ? endDateFilter.toISOString() : null
    }


    //Function fetchAllTask Hook
    const {data,isLoading} = allTaskHook(filters)

    function Reset(): any {
        setSearchTitle('');
        setStatusFilter('')
        setStartDateFilter(undefined)
        setEndDateFilter(undefined)

    }

    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        const currentUserRole = localStorage.getItem('role')
        if (currentUserRole) setUserRole(currentUserRole)
    }, [])

    return (
        <div>
            <div className='p-8 border border-gray-200 shadow-md rounded mt-3 flex justify-between gap-3 '>

                <div className="flex flex-col w-48">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Title</label>
                    <Input onChange={(e) => setSearchTitle(e.target.value)} />
                </div>

                <div className="flex flex-col w-48">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Status</label>
                    <Select onValueChange={setStatusFilter}>
                        <SelectTrigger id="role" >
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent >

                            <SelectItem
                                value="planning"

                            >
                                Planning
                            </SelectItem>

                            <SelectItem
                                value="in_progress"
                            >
                                In Progress
                            </SelectItem>

                            <SelectItem
                                value="completed"
                            >
                                Completed
                            </SelectItem>
                            <SelectItem
                                value="cancelled"
                            >
                                Cancelled
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>



                <div className="flex flex-col w-48">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                            Start Date:
                        </Label>
                        <Popover open={startOpen} onOpenChange={setStartOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                >
                                    {startDateFilter ? startDateFilter.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>

                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                            >
                                <div className="rounded-md overflow-hidden">
                                    <Calendar
                                        mode="single"
                                        selected={startDateFilter}
                                        captionLayout="dropdown"
                                        className="w-full bg-white"
                                        onSelect={(date) => {
                                            setStartDateFilter(date)
                                            setStartOpen(false)
                                        }}
                                    />
                                </div>
                            </PopoverContent>

                        </Popover>
                    </div>

                </div>

                <div className="flex flex-col w-48">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                            End Date:
                        </Label>
                        <Popover open={endOpen} onOpenChange={setEndOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                >
                                    {endDateFilter ? endDateFilter.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>

                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={endDateFilter}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setEndDateFilter(date)
                                        setEndOpen(false)
                                    }}
                                />
                            </PopoverContent>

                        </Popover>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <CreateTask />
                    {
                        (searchTitle || statusFilter || startDateFilter || endDateFilter) &&
                        (<Button className="w-sm" onClick={Reset}>Reset</Button>)
                    }
                </div>



            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-6 p-4 border border-gray-200 rounded-md shadow">
                <Table className="rounded  ">
                    <TableHeader>
                        <TableRow className=" rounded ">
                            <TableHead className="w-12 px-6 py-4">#</TableHead>
                            <TableHead className="px-6 py-4">Title</TableHead>
                            <TableHead className="px-6 py-4">Description</TableHead>
                            <TableHead className="px-12 py-4">Status</TableHead>
                            <TableHead className="px-7 py-4">Created At</TableHead>
                            <TableHead className="px-7 py-4">Start Date</TableHead>
                            <TableHead className="px-6 py-4">End Date</TableHead>
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
                            data?.data?.map((task: any, index: number) => (
                                <TableRow
                                    key={task.id}

                                >
                                    <TableCell className="px-6 py-4 text-center">{index + 1}</TableCell>
                                    <TableCell className="font-medium px-6 py-4">{task.title}</TableCell>
                                    <TableCell className="px-6 py-4 w-68">{task.description}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span
                                            className={`inline-block px-4 py-1 text-sm font-medium text-white rounded-full capitalize shadow ${task.status === "planning"
                                                ? "bg-yellow-500"
                                                : task.status === "in_progress"
                                                    ? "bg-blue-400"
                                                    : task.status === "completed"
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                }`}
                                        >
                                            {task.status.replace("_", " ")}
                                        </span>
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        {new Date(task.startDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        {task.endDate
                                            ? new Date(task.endDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : "—"}
                                    </TableCell>
                                
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <UpdateTask task={task} />

                                            <DeleteTask task={task} />
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


export default AllTasks