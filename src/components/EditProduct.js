import { useFormik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { string } from "yup";
import { addEditedProduct } from "../features/productSlice.js";
import { editOneProduct } from "../services/productservice";
import "./css/register.css";
function EditProduct({ product, setShow }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const formvalidation = yup.object({
    title: string().required("Enter title of product").min(4),
    image: string().required("Provide image of the product").min(10),
    description: string().required("Enter description of product").min(10),
    price: string().required("Enter Product price").min(2).max(4),
  });

  const insertProduct = async (values) => {
    values._id = product._id;
    const response = await editOneProduct(values, user.token);
    if (!response.success) {
      setFieldError("title", response.message);
      toast.error("Error while editing product");
    } else {
      const updatedProduct = {
        _id: product._id,
        title: values.title,
        image:values.image,
        description: values.description,
        price: values.price,
      };
      dispatch(addEditedProduct(updatedProduct));
      setShow(false);
      toast.success("Product edited successfully");
    }
  };
  const {
    formik,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: {
      title: product.title || "",
      image:product.image ||"",
      description: product.description || "",
      price: product.price || "",
    },
    validationSchema: formvalidation,
    onSubmit: (values) => {
      insertProduct(values);
    },
  });

  return (
    <div className="">
      <Form onSubmit={handleSubmit}>
        {touched.title && errors.title ? (
          <div className="error">{errors.title}</div>
        ) : (
          ""
        )}

        <Form.Group as={Row} className="mb-3" controlId="formtitle">
          <Form.Label column sm={4}>
            Title
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Product Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        {touched.image && errors.image ? (
          <div className="error">{errors.image}</div>
        ) : (
          ""
        )}
        <Form.Group as={Row} className="mb-3" controlId="image">
          <Form.Label column sm={4}>
            Product Image
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Product Image"
              name="image"
              value={values.image}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        {touched.description && errors.description ? (
          <div className="error">{errors.description}</div>
        ) : (
          ""
        )}

        <Form.Group as={Row} className="mb-3" controlId="description">
          <Form.Label column sm={4}>
            Product Description
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              placeholder="Product Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        {touched.price && errors.price ? (
          <div className="error">{errors.price}</div>
        ) : (
          ""
        )}

        <Form.Group as={Row} className="mb-3" controlId="price">
          <Form.Label column sm={4}>
            Product Price
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Price of Product"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ textAlign: "center" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditProduct;
