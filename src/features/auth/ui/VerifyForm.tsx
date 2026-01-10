import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { verifyOTP } from "../api/verifyApi"
import { resendOTP } from "../api/resendOtpApi"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { Button } from "@/shared/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator
} from "@/shared/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"


export function VerifyForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState<string>("")
    const [otp, setOtp] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email)
        } else {
            // If accessed directly without state, maybe redirect back to register or show error?
            setError("Email not found. Please register first.")
        }
    }, [location.state])

    useEffect(() => {
        let timer: any
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [countdown])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            setError("Missing email address.")
            return
        }
        setError(null)
        setMessage(null)
        setIsLoading(true)
        try {
            await verifyOTP({ email, otp })
            // Redirect to login on success
            navigate("/auth/login")
        } catch (err: any) {
            console.error("Verification failed:", err)
            if (err.response && err.response.data) {
                const { message } = err.response.data
                setError(message || "Verification failed. Invalid OTP.")
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        if (!email) return
        setError(null)
        setMessage(null)
        try {
            await resendOTP(email)
            setMessage("OTP has been resent to your email.")
            setCountdown(60) // 60s cooldown
        } catch (err: any) {
            console.error("Resend failed:", err)
            setError("Failed to resend OTP. Please try again.")
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Verify OTP</CardTitle>
                <CardDescription>
                    Enter the 6-digit code sent to <strong>{email}</strong>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleVerify} className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {message && (
                        <Alert className="text-green-600 border-green-600">
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-2 justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
                        {isLoading ? "Verifying..." : "Verify Account"}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Didn&apos;t receive a code?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={countdown > 0}
                            className="underline disabled:opacity-50 disabled:cursor-not-allowed hover:text-primary"
                        >
                            {countdown > 0 ? `Resend in ${countdown} s` : "Resend"}
                        </button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
