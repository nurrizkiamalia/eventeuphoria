"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { Button } from "@/components/ui/button";
import useEvent from "@/hooks/useEvent";
import { IoAdd } from "react-icons/io5";
import { BiMinusCircle } from "react-icons/bi";
import { EventValues } from "@/types/datatypes";
import { categories } from "@/data/data";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Event name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  location: Yup.string().required("Location is required"),
  city: Yup.string().required("City is required"),
  eventType: Yup.string().required("Event type is required"),
  category: Yup.string().required("Category is required"),
  ticketTiers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Tier name is required"),
        price: Yup.number().min(0, "Price must be non-negative"),
        totalSeats: Yup.number()
          .required("Total seats are required")
          .min(1, "Must have at least one seat"),
      })
    )
    .required("Ticket tiers are required"),
  eventVouchers: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.string().required("Voucher code is required"),
        discountPercentage: Yup.number()
          .required("Discount percentage is required")
          .min(0, "Discount must be non-negative"),
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date().required("End date is required"),
      })
    )
    .nullable(),
  referralQuota: Yup.number().notRequired(),
});

interface FormEventProps {
  initialValues: EventValues;
  onSubmit: (values: EventValues) => Promise<void>;
}

const FormEvent: React.FC<FormEventProps> = ({ initialValues, onSubmit }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);
  const { loading } = useEvent();

  const handleSubmit = async (values: EventValues, { setSubmitting }: any) => {
    setFormValues(values);
    setShowConfirmation(true);
    setSubmitting(false);
  };

  const handleConfirm = async () => {
    if (formValues) {
      await onSubmit(formValues);
      setShowConfirmation(false);
    }
  };

  const fieldContainer = "flex flex-col gap-1";
  const fieldStyle = "shadow-boxed rounded-xl p-2";
  const errorStyle = "text-[12px] text-red-600";
  const labelStyle = "font-semibold";

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div className={fieldContainer}>
              <label htmlFor="name" className={labelStyle}>
                Event Name
              </label>
              <Field name="name" type="text" className={fieldStyle} value={values.name || ""} />
              <ErrorMessage
                name="name"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="category" className={labelStyle}>
                Category
              </label>
              <Field name="category" as="select" className={fieldStyle} value={values.category || ""}>
                <option value="" label="Select category" />
                {categories.map((category) => (
                  <option key={category.category} value={category.category} label={category.category} />
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="description" className={labelStyle}>
                Description
              </label>
              <Field name="description" as="textarea" className={fieldStyle} value={values.description || ""} />
              <ErrorMessage
                name="description"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className="flex gap-3 w-full">
              <div className={fieldContainer}>
                <label htmlFor="date" className={labelStyle}>
                  Date
                </label>
                <Field name="date" type="date" className={fieldStyle} value={values.date || ""} />
                <ErrorMessage
                  name="date"
                  component="div"
                  className={errorStyle}
                />
              </div>

              <div className={fieldContainer}>
                <label htmlFor="time" className={labelStyle}>
                  Time
                </label>
                <Field name="time" type="time" className={fieldStyle} value={values.time || ""} />
                <ErrorMessage
                  name="time"
                  component="div"
                  className={errorStyle}
                />
              </div>
            </div>

            <div className={fieldContainer}>
              <label htmlFor="location" className={labelStyle}>
                Location
              </label>
              <Field name="location" type="text" className={fieldStyle} value={values.location || ""} />
              <ErrorMessage
                name="location"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="city" className={labelStyle}>
                City
              </label>
              <Field name="city" type="text" className={fieldStyle} value={values.city || ""} />
              <ErrorMessage name="city" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="eventType" className={labelStyle}>
                Event Type
              </label>
              <Field name="eventType" as="select" className={fieldStyle} value={values.eventType || ""}>
                <option value="" label="Select event type" />
                <option value="Paid" label="Paid" />
                <option value="Free" label="Free" />
              </Field>
              <ErrorMessage
                name="eventType"
                component="div"
                className={errorStyle}
              />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="ticketTiers" className={labelStyle}>
                Ticket Tiers
              </label>
              <FieldArray name="ticketTiers">
                {({ push, remove }) => (
                  <>
                    {values.ticketTiers.map((tier, index) => (
                      <div key={index} className="my-2 border p-2 rounded">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold">
                            Tier {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            <BiMinusCircle size={24} />
                          </button>
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`ticketTiers[${index}].name`}
                            className={labelStyle}
                          >
                            Tier Name
                          </label>
                          <Field
                            name={`ticketTiers[${index}].name`}
                            type="text"
                            className={fieldStyle}
                            value={tier.name || ""}
                          />
                          <ErrorMessage
                            name={`ticketTiers[${index}].name`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`ticketTiers[${index}].price`}
                            className={labelStyle}
                          >
                            Price
                          </label>
                          <Field
                            name={`ticketTiers[${index}].price`}
                            type="number"
                            className={fieldStyle}
                            value={tier.price || 0}
                          />
                          <ErrorMessage
                            name={`ticketTiers[${index}].price`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`ticketTiers[${index}].totalSeats`}
                            className={labelStyle}
                          >
                            Total Seats
                          </label>
                          <Field
                            name={`ticketTiers[${index}].totalSeats`}
                            type="number"
                            className={fieldStyle}
                            value={tier.totalSeats || 0}
                          />
                          <ErrorMessage
                            name={`ticketTiers[${index}].totalSeats`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        push({ name: "", price: 0, totalSeats: 0 })
                      }
                    >
                      <IoAdd size={24} /> Add Tier
                    </Button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className={fieldContainer}>
              <label htmlFor="eventVouchers" className={labelStyle}>
                Vouchers
              </label>
              <FieldArray name="eventVouchers">
                {({ push, remove }) => (
                  <>
                    {values.eventVouchers.map((voucher, index) => (
                      <div key={index} className="my-2 border p-2 rounded">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold">
                            Voucher {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            <BiMinusCircle size={24} />
                          </button>
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`eventVouchers[${index}].code`}
                            className={labelStyle}
                          >
                            Voucher Code
                          </label>
                          <Field
                            name={`eventVouchers[${index}].code`}
                            type="text"
                            className={fieldStyle}
                            value={voucher.code || ""}
                          />
                          <ErrorMessage
                            name={`eventVouchers[${index}].code`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`eventVouchers[${index}].discountPercentage`}
                            className={labelStyle}
                          >
                            Discount Percentage
                          </label>
                          <Field
                            name={`eventVouchers[${index}].discountPercentage`}
                            type="number"
                            className={fieldStyle}
                            value={voucher.discountPercentage || "0"}
                          />
                          <ErrorMessage
                            name={`eventVouchers[${index}].discountPercentage`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`eventVouchers[${index}].startDate`}
                            className={labelStyle}
                          >
                            Start Date
                          </label>
                          <Field
                            name={`eventVouchers[${index}].startDate`}
                            type="date"
                            className={fieldStyle}
                            value={voucher.startDate || ""}
                          />
                          <ErrorMessage
                            name={`eventVouchers[${index}].startDate`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                        <div className={fieldContainer}>
                          <label
                            htmlFor={`eventVouchers[${index}].endDate`}
                            className={labelStyle}
                          >
                            End Date
                          </label>
                          <Field
                            name={`eventVouchers[${index}].endDate`}
                            type="date"
                            className={fieldStyle}
                            value={voucher.endDate || ""}
                          />
                          <ErrorMessage
                            name={`eventVouchers[${index}].endDate`}
                            component="div"
                            className={errorStyle}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          code: "",
                          discountPercentage: 0,
                          startDate: "",
                          endDate: "",
                        })
                      }
                    >
                      <IoAdd size={24} /> Add Voucher
                    </Button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className={fieldContainer}>
              <label htmlFor="referralQuota" className={labelStyle}>
                Referral Quota
              </label>
              <Field
                name="referralQuota"
                type="number"
                className={fieldStyle}
                value={values.referralQuota || 0}
              />
              <ErrorMessage
                name="referralQuota"
                component="div"
                className={errorStyle}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      {showConfirmation && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmation(false)}
          title="Confirm Submission"
          message="Are you sure you want to submit this event?"
        />
      )}
    </>
  );
};

export default FormEvent;
