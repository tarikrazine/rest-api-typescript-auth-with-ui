import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Spacer, Button, Loading, Link as LinkComponent } from '@nextui-org/react'

import { RegisterUserInput, registerUserSchema } from '../../../utils/registerSchema'
import sending from '../../../utils/sending'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RegisterResponse {
    data: {
        _id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    }
    response?: any
    status?: number
    message?: string
}

const Register: NextPage = () => {

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


    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<RegisterUserInput>({
        resolver: zodResolver(registerUserSchema)
    })

    const onFromSubmitHandler = async (values: RegisterUserInput) => {

        // Get response from api
        const data = await sending<RegisterResponse>(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
            values
        )

        // Success and error 
        if (data?.status === 201) {
            setIsSuccess(true)
            reset()
            route.push('/')
        } else if (data?.response?.status === 400) {
            const { issues } = data?.response?.data;

            issues?.map((issue: any) => setErrorsBack(issue?.message));
        } else if (data?.response?.status === 409 && data?.response?.statusText === 'Conflict') {
            setErrorsBack(data?.response?.statusText);
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
                <Input
                    size='xl'
                    id='name'
                    fullWidth
                    clearable
                    underlined
                    labelLeft="Name"
                    status={errors?.name && 'error'}
                    helperText={errors?.name && errors?.name?.message}
                    placeholder="Jane Doe"
                    aria-label='name'
                    {...register('name')}
                />
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
                <Input.Password
                    id='passwordConfirmation'
                    size='xl'
                    fullWidth
                    clearable
                    underlined
                    labelLeft="Password" placeholder="********"
                    aria-label='passwordConfirmation'
                    status={errors?.passwordConfirmation && 'error'}
                    helperText={errors?.passwordConfirmation && errors?.passwordConfirmation?.message}
                    {...register('passwordConfirmation')}
                />
                <Spacer y={2.5} />
                <Button
                    size="xl"
                    shadow
                    color={isSuccess ? "success" : errorsBack ? "error" : "primary"}
                    css={{ display: 'block' }}
                >
                    {isSubmitting ? <Loading color="white" size="lg" /> : isSuccess ? 'Success' : 'Register'
                    }
                </Button>
            </form>
        </>
    )
}

export default Register