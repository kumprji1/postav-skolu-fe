import React, { useRef, useState, useEffect } from "react";
import { useHttp } from "../../../hooks/http-hook";
import { generateUploadURL } from "../../../utils/s3";
import SwingSpinner from "../Spinners/SwingSpinner";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const { sendRequest } = useHttp();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [s3_url, setS3_url] = useState("");

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const postImageToS3 = async () => {
    setIsLoading(true)
    const url = await generateUploadURL();
    // await sendRequest(url, "PUT", {file}, {
    //   "Content-Type": "multipart/form-data",
    // });
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const imageUrl = url.split("?")[0];
    setS3_url(imageUrl);
    setShowConfirm(false);
    setIsLoading(false)
    props.onInput("basePart", "photo", imageUrl, []);
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setShowConfirm(true);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      setShowConfirm(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Prosím nahrajte obrázek</p>}
        </div>
        <button
          className="btn--secondary"
          onClick={(e) => {
            e.preventDefault();
            pickImageHandler();
          }}
        >
          Vybrat obrázek
        </button>
        {file && showConfirm && (
          <button
          style={{
            marginTop: '0.5rem'
          }}
            className="btn--primary"
            onClick={(e) => {
              e.preventDefault();
              postImageToS3();
            }}
          >
            Prtvrď obrázek
          </button>
        )}
      </div>
      {/* {!isValid && <p>{props.errorText}</p>} */}
      {isLoading && <SwingSpinner isLoading={isLoading} />}
    </div>
  );
};

export default ImageUpload;
