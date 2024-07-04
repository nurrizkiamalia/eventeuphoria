'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const Register: React.FC = () => {
    const { register } = useAuth();
    const router = useRouter();

    return (
        <Formik
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                referalCode: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                firstName: Yup.string()
                    .required('First name is required'),
                lastName: Yup.string()
                    .required('Last name is required'),
                password: Yup.string()
                    .required('Password is required')
                    .min(6, 'Password must be at least 6 characters'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
                    .required('Password confirmation is required'),
                referalCode: Yup.string()
                    .notRequired()
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await register(values.email, values.firstName, values.lastName, values.password, values.referalCode);
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
                <Form className='p-5 flex flex-col gap-3'>
                    <div className="flex gap-3">
                        <div className='flex flex-col gap-2'>
                            <Field type="text" name="firstName" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="First Name" />
                            <ErrorMessage name="firstName" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Field type="text" name="lastName" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Last Name" />
                            <ErrorMessage name="lastName" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Field type="email" name="email" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Input your active email here" />
                        <ErrorMessage name="email" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Field type="password" name="password" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Input your password" />
                        <ErrorMessage name="password" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Field type="password" name="confirmPassword" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Confirm your password" />
                        <ErrorMessage name="confirmPassword" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Field type="text" name="referalCode" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Referal Code (optional)" />
                        <ErrorMessage name="referalCode" component="div" className='text-red-600 text-[12px] w-fit rounded-xl' />
                    </div>
                    <button className='bg-dspPurple hover:bg-dspDarkPurple self-center text-white py-2 px-7 rounded-full w-fit hover:scale-105 ease-in-out transition-all duration-500' type="submit" disabled={isSubmitting}>
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
