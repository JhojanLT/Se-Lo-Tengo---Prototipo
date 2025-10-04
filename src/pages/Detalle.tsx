import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButtons, IonBackButton } from "@ionic/react";
import { POSTS } from "../utils/Constants/lists";

import { useParams } from "react-router-dom";

const DetalleArticulo: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // <- obtiene el id desde la URL
  const articulo = POSTS.find((item) => item.id == id);

  if (!articulo) {
    return <p>No se encontró el articulo</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Volver" color="light" />
          </IonButtons>
          <IonTitle>{articulo.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonImg src={articulo.image} alt={articulo.name} style={{ borderRadius: "12px", marginBottom: "16px" }} />
        <h2>{articulo.name}</h2>
        <p>{articulo.description}</p>
        <p>
          <strong>Precio:</strong> {articulo.price}
        </p>
      </IonContent>
    </IonPage>
  );
};

export default DetalleArticulo;
