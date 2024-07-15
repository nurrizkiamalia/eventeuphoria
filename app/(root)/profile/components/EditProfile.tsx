"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import api from '@/services/api';

const EditProfile: React.FC = () => {
  const { currentUser, getToken } = useAuth();
  const router = useRouter();

  const profileFormik = useFormik({
    initialValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      quotes: currentUser?.quotes || '',
      avatar: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      quotes: Yup.string(),
      avatar: Yup.mixed()
        .nullable()
        .test(
          'fileFormat',
          'Invalid image format. Allowed formats: jpg, jpeg, png, webp',
          (value: any) =>
            !value ||
            (value &&
              ['image/jpeg', 'image/png', 'image/webp','image/jpg'].includes(value.type || ''))
        )
        .test(
          'fileSize',
          'File size too large. Maximum size is 5MB',
          (value: any) =>
            !value || (value && value.size <= 5 * 1024 * 1024)
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('quotes', values.quotes);
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      try {
        const response = await api.updateProfile(getToken()!, formData);
        console.log('Profile update response:', response);
        alert('Profile updated successfully');
        router.push('/profile');
        window.location.reload();
      } catch (error: any) {
        console.error('Profile update failed', error.response ? error.response.data : error.message);
        alert(`Profile update failed: ${error.response?.data.message || error.message}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string().required('New password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.changePassword(getToken()!, values.currentPassword, values.newPassword);
        console.log('Password change response:', response);
        alert('Password changed successfully');
        router.push('/profile');
      } catch (error: any) {
        console.error('Password change failed', error.response ? error.response.data : error.message);
        alert(`Password change failed: ${error.response?.data.message || error.message}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputContainer = "flex flex-col gap-1";
  const labelStyle = "font-bold text-tLg";
  const inputStyle = "p-2 rounded-xl shadow-tightBoxed border border-black";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-fit py-1 px-3 rounded-md text-dspLightGray border border-dspLightGray hover:bg-dspLightGray hover:text-white">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="flex flex-col gap-5">
            <form onSubmit={profileFormik.handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
                <div className={inputContainer}>
                  <label htmlFor="firstName" className={labelStyle}>First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    value={profileFormik.values.firstName}
                    className={inputStyle}
                    placeholder="Input your first name"
                  />
                  {profileFormik.touched.firstName && profileFormik.errors.firstName ? (
                    <div className="text-red-500">{profileFormik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className={inputContainer}>
                  <label htmlFor="lastName" className={labelStyle}>Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    value={profileFormik.values.lastName}
                    className={inputStyle}
                    placeholder="Input your last name"
                  />
                  {profileFormik.touched.lastName && profileFormik.errors.lastName ? (
                    <div className="text-red-500">{profileFormik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className={inputContainer}>
                <label htmlFor="quotes" className={labelStyle}>Quotes</label>
                <input
                  id="quotes"
                  name="quotes"
                  type="text"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.quotes}
                  placeholder="Quotes of the day"
                  className={inputStyle}
                />
                {profileFormik.touched.quotes && profileFormik.errors.quotes ? (
                  <div className="text-red-500">{profileFormik.errors.quotes}</div>
                ) : null}
              </div>
              <div className={inputContainer}>
                <label htmlFor="avatar" className={labelStyle}>Avatar</label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(event) =>
                    profileFormik.setFieldValue(
                      'avatar',
                      event.currentTarget.files && event.currentTarget.files[0]
                    )
                  }
                  className={inputStyle}
                />
                {profileFormik.touched.avatar && profileFormik.errors.avatar ? (
                  <div className="text-red-500">{profileFormik.errors.avatar}</div>
                ) : null}
              </div>
              <button type="submit" disabled={profileFormik.isSubmitting} className="bg-dspDarkPurple text-white rounded-xl p-2 w-fit self-center border-4 border-dspPurple hover:scale-105 transition-all">
                Save changes
              </button>
            </form>
          </TabsContent>
          <TabsContent value="password" className="flex flex-col gap-5">
            <form onSubmit={passwordFormik.handleSubmit} className="flex flex-col gap-5">
              <div className={inputContainer}>
                <label htmlFor="currentPassword" className={labelStyle}>Current password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.currentPassword}
                  className={inputStyle}
                  placeholder="Input your old password"
                />
                {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? (
                  <div className="text-red-500">{passwordFormik.errors.currentPassword}</div>
                ) : null}
              </div>
              <div className={inputContainer}>
                <label htmlFor="newPassword" className={labelStyle}>New password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.newPassword}
                  className={inputStyle}
                  placeholder="Input your new password"
                />
                {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? (
                  <div className="text-red-500">{passwordFormik.errors.newPassword}</div>
                ) : null}
              </div>
              <button type="submit" disabled={passwordFormik.isSubmitting} className="bg-dspDarkPurple text-white rounded-xl p-2 w-fit self-center border-4 border-dspPurple hover:scale-105 transition-all">
                Save password
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;