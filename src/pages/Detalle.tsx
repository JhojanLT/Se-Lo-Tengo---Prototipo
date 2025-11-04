import { IonPage, IonContent, IonImg, IonAvatar } from "@ionic/react";
import { POSTS } from "../utils/Constants/lists";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import CustomButton from "../atoms/CustomButton";
import "./Detalle.scss";

const DetalleArticulo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articulo = POSTS.find((item) => item.id == id);

  if (!articulo) {
    return <p>No se encontró el artículo</p>;
  }

  return (
    <IonPage>
      <Header page={articulo.userName} color="tertiary" smallTitle arrowBackIcon />

      <IonContent className="detalle-content" color="light">
        <IonAvatar className="detalle-avatar">
          <IonImg src={articulo.profileImage} alt={articulo.userName} />
        </IonAvatar>

        <h2 className="detalle-titulo" style={{ padding: "0 1rem" }}>
          {articulo.title}
        </h2>

        <IonImg className="detalle-imagen" src={articulo.image} alt={articulo.userName} />

        <p className="detalle-precio">{articulo.price}</p>
        <p className="detalle-descripcion">{articulo.description}</p>

        <CustomButton action="Obtener" />
      </IonContent>
    </IonPage>
  );
};

export default DetalleArticulo;
