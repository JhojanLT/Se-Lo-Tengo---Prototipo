import { IonContent, IonPage } from "@ionic/react";
import "./Perfil.scss";
import { Header } from "../components/Header";
import PostStatus from "../atoms/PostStatus";

const Tab5: React.FC = () => {
  return (
    <IonPage>
      <Header color={"primary"} page={"Perfil"} />
      <IonContent color="light">
        <PostStatus />
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
