import { IonContent, IonPage } from "@ionic/react";
import "./Dealers.scss";
import Card from "../atoms/Card";
import { Header } from "../components/Header";
import { POSTS } from "../utils/Constants/lists";

const Dealers: React.FC = () => {
  return (
    <IonPage>
      <Header page={"Dealers"} color={"secondary"} searchBar={true} />

      <IonContent color="light">
        {POSTS.map((fav) => (
          <Card
            key={fav.id}
            id={fav.id}
            image={fav.profileImage}
            userName={fav.userName}
            description={fav.major}
            contact={fav.contact}
            variant="contact"
          ></Card>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Dealers;
