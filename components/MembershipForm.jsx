"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { ImUserPlus } from "react-icons/im";
import { submitMembershipApplication, getoptions, getMembershipDetails } from "@/lib/api";
import { ArrowRight } from "lucide-react";

// ✅ GST Calculator Helper
function calculateGST(fee, gstPercent) {
  const gstAmount = (fee * gstPercent) / 100;
  return {
    gstAmount,
    total: fee + gstAmount,
  };
}

// ✅ Yup Validation Schema
const getSchema = (category) =>
  yup.object().shape({
    category: yup.string().required("Select membership category"),
    organization: yup.string().required("Name is required"),
    contactPerson: yup.string().required("Contact person is required"),
    address: yup.string().required("Address is required"),
    telephone: yup.string().notRequired(),
    mobile: yup.string().required("Mobile number is required"),
    email: yup.string().email().required("Email is required"),
    facebook: yup.string().url("Invalid Facebook URL").notRequired(),
    twitter: yup.string().url("Invalid Twitter URL").notRequired(),
    linkedin: yup.string().url("Invalid LinkedIn URL").notRequired(),
    nominees:
      category === "CORPORATE"
        ? yup.array().of(
          yup.object().shape({
            name: yup.string().required("Name required"),
            designation: yup.string().required("Designation required"),
            email: yup.string().email().required("Email required"),
            mobile: yup.string().required("Mobile required"),
          })
        )
        : yup.array().notRequired(),
    agree: yup.boolean().oneOf([true], "You must accept terms"),
  });

export default function MembershipForm() {
  const [category, setCategory] = useState("CORPORATE");

  // ✅ Dynamic Fees State
  const [fees, setFees] = useState({
    CORPORATE: { base: 0, gst: 0, total: 0 },
    INDIVIDUAL: { base: 0, gst: 0, total: 0 },
    STUDENT: { base: 0, gst: 0, total: 0 },
  });

  // ✅ Fetch Fees from API
  useEffect(() => {
    async function fetchFees() {
      try {
        const response = await getoptions();
        const options = response?.data; // ✅ Accessing `data` from the response

        const gstPercent = parseFloat(options.GST || 0);

        const calculate = (fee) => {
          const gstAmount = (fee * gstPercent) / 100;
          return {
            base: fee,
            gst: gstAmount,
            total: fee + gstAmount,
          };
        };

        setFees({
          CORPORATE: calculate(parseFloat(options.corporate || 0)),
          INDIVIDUAL: calculate(parseFloat(options.individual || 0)),
          STUDENT: calculate(parseFloat(options.student || 0)),
        });
      } catch (err) {
        console.error("Error fetching membership fees:", err);
      }
    }

    fetchFees();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(getSchema(category)),
    defaultValues: {
      category: "CORPORATE",
      nominees: Array(5).fill({
        name: "",
        designation: "",
        email: "",
        mobile: "",
      }),
      agree: false,
    },
  });

  const { fields, append } = useFieldArray({ control, name: "nominees" });

  useEffect(() => {
    setValue("category", category);
    trigger();
    if (category !== "CORPORATE") {
      setValue("nominees", []);
    } else {
      setValue(
        "nominees",
        Array(5).fill({ name: "", designation: "", email: "", mobile: "" })
      );
    }
  }, [category, setValue, trigger]);

  // ✅ Calculate Total Payable Amount
  const calculateTotalAmount = () => {
    const baseAmount = fees[category]?.total || 0;
    const extraNominees =
      category === "CORPORATE" ? Math.max(0, fields.length - 5) : 0;
    const extraNomineeCost = 690;
    return baseAmount + extraNominees * extraNomineeCost;
  };


  /* ----------------- Patch Membership Details ----------------- */
  useEffect(() => {
    async function fetchMembershipDetails() {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const email = storedUser?.email;
        const user_id = storedUser?.id;
        // console.log(user_id);


        if (!email) {
          console.warn("No email found in localStorage.user");
          return;
        }

        const res = await getMembershipDetails({ id: user_id });

        if (res?.status) {
          const details = res.data;

          const organization = details.org_name;
          const contactPerson = details.con_person;
          const address = details.address;
          const telephone = details.phone;
          const mobile = details.mobile;
          const useremail = details.email;
          const facebook = details.facebook;
          const twitter = details.twitter;
          const linkedin = details.linkedin;

          // console.log(details);

          const nomineesData =
            details.members && details.members !== ""
              ? JSON.parse(details.members)
              : Array(5).fill({
                name: "",
                designation: "",
                email: "",
                mobile: "",
              });

          const apiCategory =
            details.mem_category?.toUpperCase() || "CORPORATE";
          setCategory(apiCategory);

          reset({
            category: apiCategory,
            organization: organization,
            contactPerson: contactPerson, // Not in API
            address: address, // Not in API
            telephone: telephone,
            mobile: mobile,
            email: useremail,
            facebook: facebook,
            twitter: twitter,
            linkedin: linkedin,
            nominees: nomineesData,
            agree: false,
          });
        }
      } catch (error) {
        // console.error("Error fetching membership details:", error);
      }
    }

    fetchMembershipDetails();
  }, [reset]);
  // ✅ Form Submit
  const onSubmit = async (data) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const user_id = storedUser?.id;

      const payload = {
        id: user_id,
        category: data.category.toLowerCase(),
      };

      if (data.category.toUpperCase() === "CORPORATE") {
        // ✅ Corporate fields (with _c suffix as per backend)
        payload.companyname_c = data.organization;
        payload.contactperson_c = data.contactPerson;
        payload.address1_c = data.address;
        payload.phoneno_c = data.telephone || "";
        payload.mobileno_c = data.mobile;
        payload.emailid_c = data.email;
        payload.fb_c = data.facebook || "";
        payload.twi_c = data.twitter || "";
        payload.ln_c = data.linkedin || "";

        // ✅ Corporate nominees (converted to name0, email0 style)
        payload.tot_mem = data.nominees.length;
        data.nominees.forEach((nom, index) => {
          payload[`name${index}`] = nom.name;
          payload[`designation${index}`] = nom.designation;
          payload[`email${index}`] = nom.email;
          payload[`mobile${index}`] = nom.mobile;
        });

      } else {
        // ✅ Individual/Student fields (with _i suffix as per backend)
        payload.companyname_i = data.organization;
        payload.contactperson_i = data.contactPerson;
        payload.address1_i = data.address;
        payload.phoneno_i = data.telephone || "";
        payload.mobileno_i = data.mobile;
        payload.emailid_i = data.email;
        payload.fb_i = data.facebook || "";
        payload.twi_i = data.twitter || "";
        payload.ln_i = data.linkedin || "";
      }

      // ✅ Submit to backend
      const res = await submitMembershipApplication(payload);

      if (res?.payment && res?.redirect_url) {
        const {
          amount,
          email,
          firstname,
          phone,
          productinfo,
          txn_id,
          surl,
          furl,
          udf1,
          udf2,
          hash_string,
          merchant_key,
        } = res.payment;

        // ✅ Auto-submit to PayU
        const fields = {
          key: merchant_key,
          txnid: txn_id,
          amount: parseFloat(amount).toFixed(2),
          productinfo,
          firstname,
          email,
          phone,
          udf1,
          udf2,
          surl,
          furl,
          hash: hash_string,
          service_provider: "payu_paisa",
        };

        const form = document.createElement("form");
        form.method = "POST";
        form.action = res.redirect_url;

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error("Payment initiation failed.");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong!", "error");
    }
  };


  const handleAddNominee = async () => {
    if (fields.length >= 5) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "After five nominees, every additional nominee will cost Rs.690 (Including GST). Proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, add nominee",
        cancelButtonText: "Cancel",
      });
      if (!result.isConfirmed) return;
    }
    append({ name: "", designation: "", email: "", mobile: "" });
  };

  return (
    <section className="bg-black text-white mt-10 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center uppercase">
          Membership Application Form
        </h2>

        <p className="text-gray-300 mb-10 text-center">We hereby apply for Membership to THE ADVERTISING CLUB MADRAS , if selected we will be goverened by
          <br />The By – Laws and rules and regulations of the club . “ Annual Subscription ‘’
        </p>



        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Category Selection */}
          <div>
            <p className="text-lg font-semibold mb-2">
              Category of Membership *
            </p>
            <div className="flex gap-6 flex-wrap">
              {Object.keys(fees).map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("category")}
                    checked={category === type}
                    onChange={() => setCategory(type)}
                    className="accent-primary w-5 h-5"
                  />
                  <span className="capitalize text-white">
                    {type} Rs. {fees[type]?.total || 0}/-
                  </span>
                </label>
              ))}
            </div>
            {errors.category && (
              <p className="text-primary text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Organization Info */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label>
                {category === "INDIVIDUAL"
                  ? "Name of the Individual"
                  : category === "STUDENT"
                    ? "Name of the Student"
                    : "Name of the Organisation"}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                {...register("organization")}
                className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {errors.organization && (
                <p className="text-primary text-sm">
                  {errors.organization.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label>
                Contact Person <span className="text-primary">*</span>
              </label>
              <input
                {...register("contactPerson")}
                className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {errors.contactPerson && (
                <p className="text-primary text-sm">
                  {errors.contactPerson.message}
                </p>
              )}
            </div>

            <div className="md:row-span-2 md:col-span-2">
              <label>
                Address <span className="text-primary">*</span>
              </label>
              <textarea
                {...register("address")}
                rows={5}
                className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {errors.address && (
                <p className="text-primary text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label>
                Mobile Number <span className="text-primary">*</span>
              </label>
              <input
                {...register("mobile")}
                className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {errors.mobile && (
                <p className="text-primary text-sm">{errors.mobile.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label>Telephone</label>
              <input
                {...register("telephone")}
                className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label>
                Email ID <span className="text-primary">*</span>
              </label>
              <input
                {...register("email")}
                className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {errors.email && (
                <p className="text-primary text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Social Links in single row */}
            <div className="md:col-span-4 grid md:grid-cols-3 gap-4">
              <div>
                <label>Facebook</label>
                <input
                  {...register("facebook")}
                  placeholder="https://facebook.com/..."
                  className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
                />
              </div>
              <div>
                <label>Twitter</label>
                <input
                  {...register("twitter")}
                  placeholder="https://twitter.com/..."
                  className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
                />
              </div>
              <div>
                <label>LinkedIn</label>
                <input
                  {...register("linkedin")}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full p-3 rounded bg-gray-900 border border-gray-600 text-white"
                />
              </div>
            </div>
          </div>

          {/* Nominees */}
          {category === "CORPORATE" && (
            <div>
              <h3 className="text-2xl font-bold uppercase font-asgard text-primary mb-2">
                Members Nominated
              </h3>

              <p className="text-sm text-gray-300 mb-4">
                <span className="text-primary font-semibold">Note:</span> After
                five nominees, every additional nominee will be payable sum of
                rupees <span className="text-primary font-semibold">690</span>{" "}
                (Inclusive of GST).
              </p>

              <div className="flex justify-end mb-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleAddNominee}
                  className="mt-8 inline-flex font-asgard items-center"
                >
                  <span className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-primary dark:hover:bg-primary transition-all duration-300">
                    Add Nominee
                  </span>
                  <span className="px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-primary dark:hover:bg-primary transition-all duration-300 flex items-center justify-center">
                    <ImUserPlus className="h-5 w-5" />
                  </span>
                </motion.button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-6 pb-6 border-b border-gray-700"
                >
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Nominee {index + 1}
                  </h4>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="block mb-1 text-sm text-gray-300">
                        Name
                      </label>
                      <input
                        placeholder="Name"
                        {...register(`nominees[${index}].name`)}
                        className="p-2 w-full rounded bg-gray-900 border border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-300">
                        Designation
                      </label>
                      <input
                        placeholder="Designation"
                        {...register(`nominees[${index}].designation`)}
                        className="p-2 w-full rounded bg-gray-900 border border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-300">
                        Email
                      </label>
                      <input
                        placeholder="Email"
                        {...register(`nominees[${index}].email`)}
                        className="p-2 w-full rounded bg-gray-900 border border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm text-gray-300">
                        Mobile
                      </label>
                      <input
                        placeholder="Mobile"
                        {...register(`nominees[${index}].mobile`)}
                        className="p-2 w-full rounded bg-gray-900 border border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payment Info */}
          <div className="space-y-6 text-sm text-gray-300">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-600 space-y-4">
              <p>
                <strong className="text-white block mb-1">
                  Payment Breakup Details:
                </strong>
                Rs. 5000/- + 18% (CGST 9%, SGST 9%) ={" "}
                <strong className="text-primary">5900/-</strong> for Corporates
              </p>
              <p>
                Rs. 2000/- + 18% (CGST 9%, SGST 9%) ={" "}
                <strong className="text-primary">2360/-</strong> for Individuals
              </p>
              <p>
                Rs. 1000/- + 18% (CGST 9%, SGST 9%) ={" "}
                <strong className="text-primary">1180/-</strong> for Students
              </p>
              <p className="mt-2">
                <strong>Offline Payment:</strong> Cheques should be drawn in
                favour of{" "}
                <strong className="text-white">
                  “Advertising Club Madras”
                </strong>
              </p>
              <p className="italic">
                Note: Any name/address change must be notified to the
                Secretariat.
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:advertisingclubmadras@gmail.com"
                  className="text-primary underline"
                >
                  advertisingclubmadras@gmail.com
                </a>
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-600">
              <p>
                <strong className="block text-white font-semibold mb-1">
                  Selected Membership Category:
                </strong>
                <span className="text-primary">{category}</span>
              </p>

              <p className="mt-4">
                <strong className="block text-white font-semibold mb-1">
                  {category === "CORPORATE"
                    ? "Amount Payable: (Up to five nominees)"
                    : "Amount Payable:"}
                </strong>
                <span className="text-primary">
                  Rs. {calculateTotalAmount()}{" "}
                  <span className="text-white">(Including Service Tax)</span>
                </span>
              </p>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("agree")}
                className="accent-primary mt-1"
              />
              <label className="text-sm font-asgard">
                I agree to the{" "}
                <span className="text-primary">Terms and Conditions</span>.
              </label>
            </div>
            {errors.agree && (
              <p className="text-primary text-sm">{errors.agree.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 inline-flex font-primary items-center"
          >
            <span className="px-6 py-3 bg-primary text-black rounded-full font-bold hover:bg-white transition">
              Submit
            </span>
            <span className="px-4 py-3 bg-primary text-black rounded-full flex items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </span>
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
