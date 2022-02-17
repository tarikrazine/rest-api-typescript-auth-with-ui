import { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Spacer, Button, Loading, Link as LinkComponent } from '@nextui-org/react'

import { LoginUserInput, loginUserSchema } from '../../../utils/loginSchema'
import sending from '../../../utils/sending'
import getGoogleUrl from '../../../utils/getGoogleUrl'

interface LoginResponse {
    response?: any
    status?: number
    message?: string
}

const Login: NextPage = () => {

    const route = useRouter()

    const [errorsBack, setErrorsBack] = useState<string | null | undefined>(null)

    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsSuccess(false)
            setErrorsBack(null)
        }, 1000)

        return () => clearTimeout(timer)
    }, [isSuccess])


    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema)
    })

    const onFromSubmitHandler = async (values: LoginUserInput) => {

        // Get response from api
        const data = await sending<LoginResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
            values,
            { withCredentials: true }
        )

        // Success and error 
        if (data?.status === 200) {
            setIsSuccess(true)
            reset()
            route.push('/')
        } else if (data?.response?.status === 400) {
            const { issues } = data?.response?.data;

            issues?.map((issue: any) => setErrorsBack(issue?.message));
        } else if (data?.response?.status === 409 && data?.response?.statusText === 'Conflict') {
            setErrorsBack(data?.response?.statusText);
        } else {
            setErrorsBack(data?.response?.data);
        }

    }

    return (
        <>
            <Spacer y={2.5} />
            <Link href="/" passHref>
                <LinkComponent block color="secondary">Go Back</LinkComponent>
            </Link>
            <Spacer y={1.5} />
            {errorsBack ? <p>{errorsBack}</p> : ''}
            <form onSubmit={handleSubmit(onFromSubmitHandler)}>
                <Spacer y={2.5} />
                <Input
                    size='xl'
                    id='email'
                    fullWidth
                    clearable
                    underlined
                    type="email"
                    labelLeft="Email"
                    status={errors?.email && 'error'}
                    helperText={errors?.email && errors?.email?.message}
                    placeholder="janedoe@example.com"
                    aria-label='email'
                    {...register('email')}
                />
                <Spacer y={2.5} />
                <Input.Password
                    id='password'
                    size='xl'
                    fullWidth
                    clearable
                    underlined
                    status={errors?.password && 'error'}
                    helperText={errors?.password && errors?.password?.message}
                    labelLeft="Password"
                    placeholder="********"
                    aria-label='password'
                    {...register('password')} />
                <Spacer y={2.5} />
                <Button
                    size="xl"
                    shadow
                    color={isSuccess ? "success" : errorsBack ? "error" : "primary"}
                    css={{ display: 'block' }}
                >
                    {isSubmitting ? <Loading color="white" size="lg" /> : isSuccess ? 'Success' : 'Login'
                    }
                </Button>
            </form>
            <Spacer y={2.5} />
            <Button
                size="xl"
                shadow
                color='primary'
                onClick={() => route.push(getGoogleUrl())}
            >
                Login using Google
            </Button>
        </>
    )
}

export default Login