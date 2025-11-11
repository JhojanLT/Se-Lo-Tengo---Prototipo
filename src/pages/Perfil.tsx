import { IonAvatar, IonContent, IonIcon, IonImg, IonPage } from "@ionic/react";
import "./Perfil.scss";
import { Header } from "../components/Header";
import RatingStars from "../atoms/Rating Stars";
import { createOutline } from "ionicons/icons";

import "./Perfil.scss";
import PublicationCard from "../atoms/PublicationCard";
import TabBar from "../components/TabBar";

const Perfil: React.FC = () => {
  // useBackButton(); // Temporalmente desactivado para diagnosticar

  return (
    <IonPage>
      <Header color={"primary"} page={"Perfil"} bellIcon />
      <IonContent color="light" style={{ paddingBottom: "76px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Imagen de perfil */}
            <IonAvatar style={{ width: "120px", height: "120px" }}>
              <IonImg
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="Foto de perfil"
                style={{ objectFit: "cover" }}
              />
            </IonAvatar>

            {/* Botón de edición */}
            <IonIcon icon={createOutline} className="edit-icon" />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <RatingStars rating={2.6} />
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#333",
          }}
        >
          {/* Contenedor del nombre y el ícono */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "500",
              }}
            >
              Anita
            </h2>
          </div>

          {/* Profesión */}
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "16px",
              color: "#666",
            }}
          >
            Ingeniería Industrial
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "90%" }}>
            <PublicationCard
              title="Nombre del artículo"
              description="Descripción del artículo"
              price="$50.000"
              image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              type="ofrecida"
            />

            <PublicationCard
              title="Nombre del artículo"
              description="Descripción del artículo"
              price="$80.000"
              image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
              type="tomada"
            />
          </div>
        </div>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default Perfil;
