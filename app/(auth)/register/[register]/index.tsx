
"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
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
        referralCode: '',
        role: 'USER',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation is required'),
        referralCode: Yup.string().notRequired(),
        role: Yup.string().oneOf(['USER', 'ORGANIZER'], 'Invalid role').required('Role is required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await register(values.email, values.firstName, values.lastName, values.password, values.role, values.referralCode);
          router.push('/login');
        } catch (error) {
          console.error('Registration error:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="p-5 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <Field type="text" name="firstName" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray max-w-[150px]" placeholder="First Name" />
              <ErrorMessage name="firstName" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <Field type="text" name="lastName" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray max-w-[150px]" placeholder="Last Name" />
              <ErrorMessage name="lastName" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Field type="email" name="email" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Input your active email here" />
            <ErrorMessage name="email" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Field type="password" name="password" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Input your password" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Field type="password" name="confirmPassword" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Confirm your password" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <Field type="text" name="referralCode" className="shadow-tightBoxed p-2 text-tXs rounded-xl text-dspGray" placeholder="Referral Code (optional)" />
            <ErrorMessage name="referralCode" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
          </div>
          <div role="group" aria-labelledby="role-group" className="flex flex-col gap-2">
            <label className="text-dspGray">Role:</label>
            <div className="flex gap-3">
              <label>
                <Field type="radio" name="role" value="USER" className="mr-2" />
                User
              </label>
              <label>
                <Field type="radio" name="role" value="ORGANIZER" className="mr-2" />
                Organizer
              </label>
            </div>
            <ErrorMessage name="role" component="div" className="text-red-600 text-[12px] w-fit rounded-xl" />
          </div>
          <button
            className="bg-dspPurple hover:bg-dspDarkPurple self-center text-white py-2 px-7 rounded-full w-fit hover:scale-105 ease-in-out transition-all duration-500"
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
