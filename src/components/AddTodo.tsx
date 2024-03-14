import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation, MutationFunction } from "react-query";
import { useNavigate } from "react-router-dom";

interface TodoData {
  todo: string;
  date: string;
  completed: boolean;
}

const AddTodo = () => {
  const navigate = useNavigate();

  const { mutate: mutateAddTodo } = useMutation<void, Error, TodoData>(
    (payload) => axios.post("http://localhost:8000/data", payload),
    {
      onSuccess: () => {
        navigate("/");
        alert("Data Added successfully");
      },
      onError: () => {
        alert("error");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      todo: "",
      date: "",
    },
    validationSchema: Yup.object({
      todo: Yup.string().required("Todo is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await mutateAddTodo({
        todo: values.todo,
        date: values.date,
        completed: false,
      });
      resetForm();
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter Todo"
            name="todo"
            value={formik.values.todo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.todo && formik.errors.todo ? (
            <div className="error">{formik.errors.todo}</div>
          ) : null}
        </div>
        <div className="date-input">
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="error">{formik.errors.date}</div>
          ) : null}
        </div>
        <div className="button-container">
          <button className="action-button" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
