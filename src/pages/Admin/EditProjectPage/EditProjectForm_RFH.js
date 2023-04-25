import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { useHttp } from "../../../hooks/http-hook";

import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const EditProjectForm = (props) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { sendRequest } = useHttp();
  // Form (react-hook-form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: props.project.title,
      desc: props.project.desc,
      urlTitle: props.project.urlTitle,
      photo: props.project.photo,
    },
  });

  const onSubmit = async (data) => {
    try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/edit-project/${props.project._id}`, 'PATCH', JSON.stringify(data), {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        })
        if (responseData.msg === 'OK') navigate(`/projekt/${data.urlTitle}`)
    } catch (err) {}
  };

  return (
    <form className="edit-project-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="input-text"
        placeholder="Název"
        {...register("title", { required: "Zadejte jméno", maxLength: 80 })}
      />
      {errors.title && <p role="alert">{errors.title?.message}</p>}
      <textarea
        {...register("desc", {
          required: "Zadejte popis projektu",
          maxLength: 1000,
        })}
      />
      <input
        type="text"
        className="input-text"
        placeholder="URL Název"
        {...register("urlTitle", {
          required: "Zadejte url-adresu projektu",
          min: 3,
          maxLength: 100,
        })}
      />
      <input
        type="text"
        className="input-text"
        placeholder="Obrázek"
        {...register("photo", {
          required: "Zadejte URL obrázku",
          maxLength: 2000,
        })}
      />
      {Object.keys(errors).length === 0 && <input type="submit" className="btn-warning-outline" value='Aktualizovat' />} 
    </form>
  );
};

export default EditProjectForm;
