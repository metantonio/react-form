import React, { useEffect } from "react";
import Swal from "sweetalert2";

// Rendering individual images
const Image = ({ image }) => {
  return (
    <div className="col-sm-11">
      <img
        alt={`img - ${image.id}`}
        src={image.src}
        className="file-img"
        width={"200px"}
        height={"200px"}
      />
    </div>
  );
};

// ImageList Component//
const ImageGrid = ({ images, setImages, handleChange }) => {

  const deleteItems = (indexItem) => {
    let updatedImages = images.filter((todo, index2) => index2 !== indexItem)
    console.log(images)
    setImages(images.filter((todo, index2) => index2 !== indexItem))
    Swal({ text: "Elimina visualmente pero sigue subiendo al servidor", incon: "info" })
  };
  useEffect(() => { }, [images])
  // render each image by calling Image component
  const renderImage = (image, index) => {
    return <> <Image image={image} key={`${image.id}-image`} /> </>;
  };

  // Return the list of files//
  return (
    <div className="container">
      <div className="row d-flex">{
        images.map((item, index) => {
          return <li className="row flex-column" key={index}>
            {
              renderImage(item, index)
            }
            <i className="fas fa-eye text-end " alt="Ocultar" onClick={() => deleteItems(index)} />
          </li>
        })
      }
        <input
          type="text"
          value='Pegar Imagen Ctrl + V'
          className="form-control col-4"
          id="image"
          onPaste={handleChange}
          required />
      </div>
    </div>
  );
};

export default ImageGrid;