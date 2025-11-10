import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import "./Articulos.scss";
import Card from "../atoms/Card";
import { Header } from "../components/Header";

interface IArticles {
  description: string;
  id: string;
  image: string;
  title: string;
  price: string;
  userName: string;
  type: string;
}
const Articulos: React.FC = () => {
  const [articles, setArticles] = useState<IArticles[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<IArticles, "id">),
        }));
        setArticles(fetchedArticles);
        console.log("Artículos cargados:", fetchedArticles);
      } catch (error) {
        console.error("Error al cargar artículos:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <IonPage>
      <Header page="Articulos" color="secondary" searchBar arrowBackIcon bellIcon />
      <IonContent color="light">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Card
              id={article.id}
              image={article.image}
              title={article.title}
              description={article.description}
              price={article.price}
              userName={article.userName || "Anónimo"}
              variant={article.type}
            />
          ))
        ) : (
          <p>No hay artículos publicados aún.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Articulos;
