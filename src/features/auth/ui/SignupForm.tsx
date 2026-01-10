import { Button } from "@/shared/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Link } from "react-router"

import { useState } from "react"
import { useNavigate } from "react-router"
import { register } from "../api/registerApi"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await register(formData)
            navigate("/auth/verify", { state: { email: formData.email } })
        } catch (err: any) {
            console.error("Registration failed:", err)
            if (err.response && err.response.data) {
                const { message } = err.response.data
                setError(message || "Registration failed. Please check your inputs.")
            } else {
                setError("An unexpected error occurred. Please try again.")
            }
        }
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister}>
                    <FieldGroup>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Field>
                            <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="Your Full Name"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit" className="w-full">Create Account</Button>
                                {/* Google Sign up removed/kept per need - adhering to existing layout */}
                                <div className="relative text-center text-sm py-2 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <Button variant="outline" type="button" className="w-full">
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="px-6 text-center mt-4">
                                    Already have an account? <Link to="/auth/login" className="underline underline-offset-4 text-primary">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
