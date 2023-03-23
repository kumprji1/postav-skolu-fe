import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { useHttp } from "../../../hooks/http-hook";

import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const CreateDonatableForm = (props) => {
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
      title: '',
      desc: '',
      photo: '',
      demandedMoney: '',
      preparedPrices: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/create-donatable/${props.projectId}`, 'POST', JSON.stringify(data), {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        })
        console.log('data:', data)
        if (responseData.msg === 'OK') navigate(-1)
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
      placeholder="Popis"
        {...register("desc", {
          required: "Zadejte popis projektu",
          maxLength: 1000,
        })}
      />
      <input
        type="text"
        className="input-text"
        placeholder="Kolik chcete vybrat"
        {...register("demandedMoney", {
          required: "Zadejte vybíranou částku",
          min: 3,
          maxLength: 100,
        })}
      />
      <input
        type="text"
        className="input-text"
        placeholder="100,200,500"
        {...register("preparedPrices", {
          required: "Zadejte předpřipravené částky",
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
      {Object.keys(errors).length === 0 && <input type="submit" className="btn-warning-outline" value='Vytvořit darovatelný box' />} 
    </form>
  );
};

export default CreateDonatableForm;
