import React, { useState, useCallback, useRef, useEffect } from "react";

import { Button } from "..";
import style from "./Crop.module.css";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";

export default function Crop({ setBase64 }) {
  const [upImg, setUpImg] = useState();
  const [cropped, setCropped] = useState(false);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    aspect: 9 / 9,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const generateBase64 = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    const base64 = canvas.toDataURL("image/png", 0.7).split(";base64,")[1];
    setBase64({ base64, name: upImg.name });
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCropped(false);
      setCrop({
        unit: "%",
        width: 100,
        aspect: 9 / 9,
      });
      setUpImg(null);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setBase64(null);
        setUpImg({ result: reader.result, name: e.target.files[0].name });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,

      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        {!upImg ? (
          <>
            <label htmlFor="inputImage" className={style.inputImg}>
              Clique para selecionar uma imagem
            </label>
            <input
              id="inputImage"
              type="file"
              accept="image/*"
              onChange={onSelectFile}
            />
          </>
        ) : (
          <>
            <label htmlFor="inputImage" className={style.preview}>
              <input
                id="inputImage"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
              />
              <canvas ref={previewCanvasRef}></canvas>
            </label>
          </>
        )}
      </div>
      {upImg && !cropped && (
        <div className={style.crop}>
          <div>
            <ReactCrop
              locked={true}
              src={upImg.result}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop({ locked: true, ...c })}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <aside className={style.buttonContainer}>
              <button
                onClick={() => {
                  setBase64(null);
                  setUpImg(null);
                }}
              >
                Cancelar
              </button>
              <Button
                onClick={() => {
                  setCropped(true);
                  generateBase64(previewCanvasRef.current, completedCrop);
                }}
              >
                Concluir
              </Button>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
