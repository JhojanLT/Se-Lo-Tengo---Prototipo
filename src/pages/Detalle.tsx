import { IonPage, IonContent, IonImg, IonAvatar, IonSpinner } from "@ionic/react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import "./Detalle.scss";
import PayPalButton from "../atoms/PaypalButtonComponent";
import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DetalleArticulo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articulo, setArticulo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticulo({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No se encontró el artículo con ese ID");
        }
      } catch (error) {
        console.error("Error al obtener el artículo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <IonSpinner name="crescent" />
          <p>Cargando artículo...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (!articulo) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <p>No se encontró el artículo.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header page={articulo.userName || "Detalle"} color="tertiary" smallTitle arrowBackIcon />

      <IonContent className="detalle-content" color="light">
        {/* Avatar del usuario */}
        {articulo.profileImage && (
          <IonAvatar className="detalle-avatar">
            <IonImg src={articulo.profileImage} alt={articulo.userName} />
          </IonAvatar>
        )}

        {/* Título */}
        <h2 className="detalle-titulo" style={{ padding: "0 1rem" }}>
          {articulo.title}
        </h2>

        {/* Imagen principal */}
        {articulo.image && <IonImg className="detalle-imagen" src={articulo.image} alt={articulo.title} />}

        {/* Precio */}
        {articulo.price && <p className="detalle-precio">${articulo.price}</p>}

        {/* Descripción */}
        <p className="detalle-descripcion">{articulo.description}</p>

        {/* Botón de PayPal solo si es un artículo con precio */}
        {articulo.price && <PayPalButton />}
      </IonContent>
    </IonPage>
  );
};

export default DetalleArticulo;
