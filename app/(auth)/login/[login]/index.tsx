"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await login(values.email, values.password);
          router.push("/");
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
        <Form className="p-5 flex flex-col gap-5 ">
          <div className="flex flex-col gap-3">
            <label>Email</label>
            <Field
              type="email"
              placeholder="ex: johndoe@email.com.."
              name="email"
              className="shadow-eventBox shadow-dspLightGray px-2 py-1 text-tXs border-[1px] border-dspGray rounded-xl text-dspGray"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-[12px] w-fit rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Password</label>
            <Field
              type="password"
              placeholder="type your password here..."
              name="password"
              className="shadow-eventBox shadow-dspLightGray px-2 py-1 text-tXs border-[1px] border-dspGray rounded-xl text-dspGray"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-[12px] w-fit rounded-xl"
            />
          </div>
          <button
            className="bg-dspPurple hover:bg-dspDarkPurple text-white py-2 px-7 rounded-full hover:scale-105 ease-in-out transition-all duration-500"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
