import { IonBackButton, IonButtons, IonHeader, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Notifications from "../atoms/Notifications";
import { arrowBack } from "ionicons/icons";

import "./Header.scss";

interface HeaderProps {
  page: string | undefined;
  color: string;
  searchBar?: boolean;
  smallTitle?: boolean;
  arrowBackIcon?: boolean;
  bellIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  page,
  color,
  searchBar = false,
  arrowBackIcon = false,
  smallTitle = false,
  bellIcon = false,
}) => {
  return (
    <IonHeader>
      <IonToolbar color={color} className="articulos-toolbar">
        {arrowBackIcon && (
          <div style={{ paddingLeft: "1rem" }}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" color="light" icon={arrowBack} text="" />
            </IonButtons>
          </div>
        )}
        <IonTitle color="light" className={`title-style ${smallTitle ? "small" : ""}`}>
          {page}
        </IonTitle>
        {bellIcon && <Notifications />}
      </IonToolbar>
      {searchBar && (
        <IonToolbar color={color} className="articulos-searchbar-toolbar">
          {searchBar && <IonSearchbar animated={true} color="light" placeholder="Buscar" />}
        </IonToolbar>
      )}
    </IonHeader>
  );
};
