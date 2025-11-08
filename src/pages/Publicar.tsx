import React, { useState } from "react";
import {
  IonPage,
  IonButton,
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
import { calendarOutline, imageOutline, cameraOutline } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import "./Publicar.scss";
import CustomButton from "../atoms/CustomButton";
import { Header } from "../components/Header";

const Publicar: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  // Función para abrir la cámara o galería
  const takePicture = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Devuelve la imagen en base64
        source: CameraSource.Prompt, // Permite elegir cámara o galería
      });

      setImage(photo.dataUrl!);
    } catch (error) {
      console.log("Error al tomar foto:", error);
    }
  };

  return (
    <IonPage className="publicar-page">
      {/* Header */}
      <Header page={"Publicar"} color={"primary"} arrowBackIcon />

      <IonContent className="ion-padding publicar-page" color="light">
        {/* Ruta */}
        <p className="ruta">Artículos &gt; Publicar</p>

        {/* Campo título */}
        <IonItem color="medium">
          <IonLabel position="stacked">Título</IonLabel>
          <IonTextarea placeholder="Nombra tu publicación"></IonTextarea>
        </IonItem>

        {/* Tipo de publicación */}
        <IonSelect className="custom-select" label="Tipo de publicación" labelPlacement="floating" fill="outline">
          <IonSelectOption value="articulo">Artículo</IonSelectOption>
          <IonSelectOption value="servicio">Servicio</IonSelectOption>
          <IonSelectOption value="solicitud">Solicitud</IonSelectOption>
        </IonSelect>

        {/* Descripción */}
        <IonItem color="medium">
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea placeholder="Escribe una descripción"></IonTextarea>
        </IonItem>

        {/* Imagen */}
        <div className="image-center">
          {image ? (
            <IonImg src={image} className="preview-img" />
          ) : (
            <div className="image-upload" style={{ backgroundColor: "white" }}>
              <IonIcon icon={imageOutline} className="image-upload-icon" />
            </div>
          )}
          <IonButton onClick={takePicture} fill="outline" color="primary">
            <IonIcon icon={cameraOutline} slot="start" />
            Tomar o elegir foto
          </IonButton>
        </div>

        {/* Precio */}
        <IonItem color="medium" className="precio-content">
          <IonLabel position="stacked">Precio</IonLabel>
          <IonInput type="number" placeholder="Ej: 50.000"></IonInput>
        </IonItem>

        {/* Botón publicar */}
        <CustomButton action="Publicar" />
      </IonContent>
    </IonPage>
  );
};

export default Publicar;
