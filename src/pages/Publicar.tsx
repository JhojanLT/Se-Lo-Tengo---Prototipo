import React, { useState } from "react";
import {
  IonPage,
  IonIcon,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonItem,
  IonLabel,
  IonImg,
} from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import "./Publicar.scss";
import CustomButton from "../atoms/CustomButton";
import { Header } from "../components/Header";
import TabBar from "../components/TabBar";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";

const Publicar: React.FC = () => {
  // useBackButton(); // Temporalmente desactivado para diagnosticar

  const initialStateValues = {
    image: "",
    title: "",
    type: "",
    description: "",
    price: "",
  };

  const [values, setValues] = useState(initialStateValues);

  // ✅ Obtenemos la instancia de Firebase Auth

  //Función genérica para actualizar cualquier campo
  const handleChange = (field: string, value: string | number | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  //Tomar o seleccionar foto
  const takePicture = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Devuelve la imagen en base64
        source: CameraSource.Prompt, // Permite elegir cámara o galería
      });

      handleChange("image", photo.dataUrl!);
    } catch (error) {
      console.log("Error al tomar foto:", error);
    }
  };

  // Guardar en Firebase con datos del usuario autenticado
  const addOrEditArticle = async (articleObject: object) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Debes iniciar sesión para publicar un artículo.");
        return;
      }

      // Extraemos datos del usuario logueado
      const userName = user.displayName || "Usuario anónimo";
      const profileImage = user.photoURL || "";
      const userId = user.uid;

      // Publicamos con toda la info
      await addDoc(collection(db, "articles"), {
        ...articleObject,
        userName,
        profileImage,
        userId,
        createdAt: serverTimestamp(),
      });

      console.log("Datos publicados correctamente:", articleObject);
      alert("Artículo publicado con éxito");

      // Limpiar formulario
      setValues(initialStateValues);
    } catch (error) {
      console.error("Error al publicar el artículo:", error);
      alert("Error al publicar el artículo");
    }
  };

  //Publicar (mostrar datos)
  const handlePublish = () => {
    addOrEditArticle(values);
  };

  return (
    <IonPage className="publicar-page">
      {/* Header */}
      <Header page={"Publicar"} color={"primary"} />

      <IonContent className="ion-padding publicar-page" color="light" style={{ paddingBottom: "76px" }}>
        {/* Ruta */}
        <p className="ruta">Artículos &gt; Publicar</p>

        {/* Campo título */}
        <IonItem color="medium">
          <IonLabel position="stacked">Título</IonLabel>
          <IonTextarea
            placeholder="Nombra tu publicación"
            value={values.title}
            onIonChange={(e) => handleChange("title", e.detail.value!)}
          ></IonTextarea>
        </IonItem>

        {/* Tipo de publicación */}
        <IonSelect
          className="custom-select"
          label="Tipo de publicación"
          labelPlacement="floating"
          fill="outline"
          value={values.type}
          onIonChange={(e) => handleChange("type", e.detail.value!)}
        >
          <IonSelectOption value="articulo">Artículo</IonSelectOption>
          <IonSelectOption value="servicio">Servicio</IonSelectOption>
          <IonSelectOption value="solicitud">Solicitud</IonSelectOption>
        </IonSelect>

        {/* Descripción */}
        <IonItem color="medium">
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            placeholder="Escribe una descripción"
            value={values.description}
            onIonChange={(e) => handleChange("description", e.detail.value!)}
          ></IonTextarea>
        </IonItem>

        {/* Imagen */}
        <div className="image-center">
          {values.image ? (
            <IonImg src={values.image} className="preview-img" onClick={takePicture} />
          ) : (
            <div onClick={takePicture} className="image-upload" style={{ backgroundColor: "white", cursor: "pointer" }}>
              <IonIcon icon={imageOutline} className="image-upload-icon" />
            </div>
          )}
        </div>

        {/* Precio */}
        <IonItem color="medium" className="precio-content">
          <IonLabel position="stacked">Precio</IonLabel>
          <IonInput
            type="number"
            placeholder="Ej: 50.000"
            value={values.price}
            onIonChange={(e) => handleChange("price", e.detail.value!)}
          ></IonInput>
        </IonItem>

        {/* Botón publicar */}
        <CustomButton action="Publicar" onClick={handlePublish} />
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default Publicar;
