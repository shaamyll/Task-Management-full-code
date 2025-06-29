import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ChevronDownIcon, SquarePen } from "lucide-react"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { useUpdateTask } from "@/hooks/AllTask-Hook"

type TaskForm = {
    title: string,
    description: string,
    status: string
}


const UpdateTask = ({ task }: { task: any }) => {

    const [startOpen, setStartOpen] = React.useState(false)
    const [endOpen, setEndOpen] = React.useState(false)

    const [startDate, setStartDate] = React.useState<Date>(new Date())
    const [endDate, setEndDate] = React.useState<Date | undefined>()
    const [open, setopen] = useState(false)


    const { register, reset, handleSubmit, control } = useForm<TaskForm>({
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status,
        }
    })

    const { mutate, isPending } = useUpdateTask({
        taskId: task.id,
        onSuccess: () => {
            reset()
            setStartDate(new Date())
            setEndDate(undefined)
            setopen(false)
        },
    })


    const onSubmit = (data: TaskForm) => {
        mutate({
            ...data,
            startDate,
            endDate,
        })
    }

    useEffect(() => {
        if (task?.startDate) {
            setStartDate(new Date(task.startDate));
        }
        if (task?.endDate) {
            setEndDate(new Date(task.endDate));
        }
    }, [task]);


    return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setopen}>
                    <DialogTrigger asChild>
                        <Button ><SquarePen /></Button>
                    </DialogTrigger>

                    <DialogContent className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle className="text-lg">Update Task</DialogTitle>
                                <DialogDescription>
                                    Fill in the form to create a new task with optional dates.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div>
                                    <Label htmlFor="username">Title</Label>
                                    <Input defaultValue={task.title} id="username" {...register("title")} required />
                                </div>

                                <div>
                                    <Label htmlFor="email">Description</Label>
                                    <Input defaultValue={task.description} type="text" id="description" {...register("description")} required />
                                </div>



                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="date" className="px-1">
                                            Start Date:
                                        </Label>
                                        <Popover open={startOpen} onOpenChange={setStartOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" id="date">
                                                    {startDate ? startDate.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            setStartDate(date);
                                                            setStartOpen(false);
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                    </div>

                                </div>




                                <div>
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
                                                    {endDate ? endDate.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>

                                            </PopoverTrigger>
                                            <PopoverContent

                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={endDate}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setEndDate(date)
                                                        setEndOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>

                                        </Popover>
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="role" >
                                        Status
                                    </label>
                                    <Controller control={control} name="status" render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="role" >
                                                <SelectValue placeholder="Select role" />
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
                                    )} />

                                </div>


                            </div>

                            <DialogFooter className='gap-3'>
                                <DialogClose asChild><span><Button type='button'>Cancel</Button></span></DialogClose>
                                <Button type="submit" disabled={isPending} className="bg-black text-white rounded">
                                    {
                                        isPending ? "Updating.. " : "Update Task"
                                    }
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default UpdateTask