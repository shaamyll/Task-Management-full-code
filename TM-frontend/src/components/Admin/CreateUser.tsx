import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useCreateUser } from "@/hooks/use-Users-Hook"

type UserForm = {
    username?: string
    email: string
    password: string,
    role?: string
}

const CreateUser = () => {

    const [open, setopen] = useState(false)

    const { register, reset, handleSubmit, control } = useForm<UserForm>()


    const { mutate, isPending } = useCreateUser(()=>{
        reset()
         setopen(false)
    })
    const onSubmit = (data: UserForm) => {
        mutate(data)
       
    }


    return (
        <div>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-500 text-white rounded shadow  hover:bg-green-600">+ Add User</Button>
                </DialogTrigger>

                <DialogContent className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className=" text-lg">Add New User</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" {...register("username")} className="bg-gray-100 text-black border-gray-300 rounded focus:border-black" required />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" {...register("email")} className="bg-gray-100 text-black border-gray-300 rounded focus:border-black" required />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" {...register("password")} className="bg-gray-100 text-black border-gray-300 rounded focus:border-black" required />
                            </div>

                            <div>
                                <label htmlFor="role" className="mb-2 text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="role" className="focus:ring-2 focus:ring-black rounded shadow-md border-gray-300">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded shadow-md border-gray-300 bg-white">
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="project_manager">Project Manager</SelectItem>
                                                <SelectItem value="developer">Developer</SelectItem>
                                                <SelectItem value="tester">Tester</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>


                        </div>

                        <DialogFooter className='gap-3'>
                            <DialogClose><Button>Cancel</Button></DialogClose>
                            <Button type="submit" disabled={isPending} className="bg-black text-white rounded">
                                {isPending ? "Creating..." : "Create User"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateUser