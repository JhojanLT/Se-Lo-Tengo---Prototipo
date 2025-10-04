import { IonButton, IonButtons, IonHeader, IonIcon, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import Notifications from "../atoms/Notifications";

interface HeaderProps {
  page: string;
  color: string;
  searchBar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ page, color, searchBar = false }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar color={color} className="articulos-toolbar">
          <IonButtons slot="start">
            <IonButton>
              <IonIcon color="light" slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle color="light" className="articulos-title">
            {page}
          </IonTitle>

          <Notifications />
        </IonToolbar>
        {searchBar && (
          <IonToolbar color={color} className="articulos-searchbar-toolbar">
            {searchBar && <IonSearchbar animated={true} color="light" placeholder="Buscar" />}
          </IonToolbar>
        )}
      </IonHeader>
    </>
  );
};
