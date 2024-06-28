'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

// add first name
// add last name
// add referal code (jika ada)

const Register: React.FC = () => {
    const { register } = useAuth();
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                password: Yup.string()
                    .required('Password is required')
                    .min(6, 'Password must be at least 6 characters'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
                    .required('Password confirmation is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await register(values.email, values.password);
                    router.push('/login');
                } catch (error) {
                    return toast({
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                      });
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='p-5 flex flex-col gap-5 '>
                    <div className='flex flex-col gap-3'>
                        <label>Email</label>
                        <Field type="email" name="email" className="shadow-eventBox shadow-dspLightGray px-2 py-1 text-tXs border-[1px] border-dspGray rounded-xl text-dspGray" placeholder="Input your active email here" />
                        <ErrorMessage name="email" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Password</label>
                        <Field type="password" name="password" className="shadow-eventBox shadow-dspLightGray px-2 py-1 text-tXs border-[1px] border-dspGray rounded-xl text-dspGray" placeholder="input your password" />
                        <ErrorMessage name="password" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Confirm Password</label>
                        <Field type="password" name="confirmPassword" className="shadow-eventBox shadow-dspLightGray px-2 py-1 text-tXs border-[1px] border-dspGray rounded-xl text-dspGray" placeholder="confirm your password" />
                        <ErrorMessage name="confirmPassword" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <button className='bg-dspPurple hover:bg-dspDarkPurple text-white py-2 px-7 rounded-full hover:scale-105 ease-in-out transition-all duration-500' type="submit" disabled={isSubmitting}>
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
