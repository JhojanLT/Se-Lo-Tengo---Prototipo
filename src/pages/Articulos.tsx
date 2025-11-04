import { IonContent, IonPage } from "@ionic/react";
import "./Articulos.scss";
import Card from "../atoms/Card";
import { Header } from "../components/Header";
import { POSTS } from "../utils/Constants/lists";

const Articulos: React.FC = () => {
  return (
    <IonPage>
      <Header page="Articulos" color="secondary" searchBar arrowBackIcon bellIcon />
      <IonContent color="light">
        {POSTS.map((fav) => (
          <Card
            key={fav.id}
            id={fav.id}
            image={fav.image}
            description={fav.description}
            price={fav.price}
            variant={fav.variant}
            title={fav.title}
            userName={fav.userName}
          ></Card>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Articulos;
