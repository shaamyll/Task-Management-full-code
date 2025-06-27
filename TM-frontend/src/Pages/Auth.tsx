import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { loginAPI, registerAPI } from '@/services/AllAPIs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


type AuthProps = {
  register?: boolean
}

type AuthFormData = {
  username?: string
  email: string
  password: string
}



export const Auth: React.FC<AuthProps> = ({ register }) => {

  const navigate = useNavigate()

  const { register: formRegister, handleSubmit, reset } = useForm<AuthFormData>()

  const mutationFn = register ?
    (data: AuthFormData) => registerAPI(data) :
    (data: AuthFormData) => loginAPI(data)

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: async (res: any) => {

      console.log(res.data);
      toast.success(res.data.message)
      const email: any = res?.data?.data?.user?.email;
      const token: any = res?.data?.data?.token;
      const username: any = res?.data?.data?.user?.username;
      const userId: any = res?.data?.data?.user?.id;
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('username', username);
      const role: any = res?.data?.data?.user?.role;
      localStorage.setItem('role', role);
      console.log(role)

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (register) {
        navigate('/');
      } else {
        if (role === 'user') {
          navigate('/userDashboard');
        } else if (role === 'admin') {
          navigate('/admin/usersPage')
        } else if(role === "project_manager"){
          navigate('/pm/taskPage')
        }  else if(role === "developer"){
          navigate('/dev/dashboard')
        }else {
          reset()
        }
      }

    },
    onError: (error: any) => {
      console.error("Registration failed", error)
    }
  })

  const onSubmit = (data: AuthFormData) => {
    mutate(data)
  }


  return (
    <div className="min-h-screen w-full bg-gray-50 text-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white text-black border border-gray-200 shadow-md rounded">
        <center>
          <CardHeader>
            <CardTitle className="text-xl">

              {register ? "Sign Up " : "Login "}

              into to your account</CardTitle>
            <CardDescription className="text-gray-500">
              Enter your email below to {
                register ? "sign up" : "login"
              }
            </CardDescription>
          </CardHeader>
        </center>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {
              register && (
                <div className="space-y-2">
                  <Label htmlFor="name">username</Label>
                  <Input
                    id="name"
                    type="text"
                    {...formRegister("username")}
                    placeholder="John Doe"
                    required

                  />
                </div>
              )
            }

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...formRegister("email")}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {
                  register !== true && (
                    <a
                      href="#"
                      className="text-sm text-gray-700 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )
                }
              </div>
              <Input
                id="password"
                type="password"
                {...formRegister("password")}
                placeholder="********"
                required
                className="bg-gray-100 text-black placeholder-gray-400 border-gray-300 rounded focus:border-black"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  
                  {register ? "Registering" : "Logging in"}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                register ? "Sign Up" : "Login"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">

          <CardDescription>

            {register ? (
              <>Already have an account? <a href="/" className="text-blue-800">Login</a></>
            ) : (
              <>Don't have an account? <a href="/register" className="text-blue-800">Sign Up</a></>
            )}

          </CardDescription>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Auth



