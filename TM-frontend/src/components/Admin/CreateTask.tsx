import React, { useState } from 'react'
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
import { useForm } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useCreateTask } from '@/hooks/use-Task-Hook'

type taskForm = {
    title: string,
    description: string,
    status: string
}


const CreateTask = () => {
    const [status, setStatus] = useState('planning')
    const [startOpen, setStartOpen] = React.useState(false)
    const [endOpen, setEndOpen] = React.useState(false)
    const [startDate, setStartDate] = React.useState<Date>(new Date())
    const [endDate, setEndDate] = React.useState<Date | undefined>()
    const [open, setopen] = useState(false)

    const { register, reset, handleSubmit } = useForm<taskForm>()

    const { mutate, isPending } = useCreateTask()

   const onSubmit = (data: taskForm) => {
  const payload = {
    ...data,
    startDate,
    endDate,
    status,
  };
  
  mutate(payload, {
    onSuccess: () => {  
        reset();
      setStartDate(new Date());
      setEndDate(undefined);
      setStatus('planning');
      setopen(false);
    }
  })
}


    return (
        <div>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                    <Button >+ Create Task</Button>
                </DialogTrigger>

                <DialogContent className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="text-lg">Create Task</DialogTitle>
                            <DialogDescription>
                                Fill in the form to create a new task with optional dates.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="username">Title</Label>
                                <Input id="username" {...register("title")} required />
                            </div>

                            <div>
                                <Label htmlFor="email">Description</Label>
                                <Input type="text" id="description" {...register("description")} required />
                            </div>



                            <div className="flex flex-col">
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
                                                {startDate ? startDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>

                                        </PopoverTrigger>
                                        <PopoverContent
                                            align="start"
                                        >
                                            <div className="rounded-md overflow-hidden">
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    captionLayout="dropdown"
                                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            setStartDate(date)
                                                            setStartOpen(false)
                                                        }
                                                    }}
                                                />
                                            </div>
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
                                                    setEndDate(date);
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
                                <Select value={status} onValueChange={(value) => setStatus(value)}>
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
                            </div>


                        </div>

                        <DialogFooter className='gap-3'>
                            <DialogClose asChild><span><Button type='button'>Cancel</Button></span></DialogClose>
                            <Button type="submit" disabled={isPending} className="bg-black text-white rounded">
                                {
                                    isPending ? "Creating.. " : "Create Task"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateTask