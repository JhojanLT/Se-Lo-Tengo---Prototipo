import { IonContent, IonPage } from "@ionic/react";
import "./Dealers.scss";
import Card from "../atoms/Card";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface IDealers {
  id: string;
  carreer: string;
  image: string;
  userName: string;
  userType: string;
  contact?: string;
}

const Dealers: React.FC = () => {
  const [dealers, setDealers] = useState<IDealers[]>([]);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dealers"));
        const fetchedDealers: IDealers[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<IDealers, "id">),
        }));
        setDealers(fetchedDealers);
        console.log("Usuarios cargados:", fetchedDealers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchDealers();
  }, []);

  return (
    <IonPage>
      <Header page="Dealers" color="secondary" searchBar arrowBackIcon />

      <IonContent color="light">
        {dealers.length > 0 ? (
          dealers.map((dealer) => (
            <Card
              key={dealer.id}
              id={dealer.id}
              image={dealer.image}
              userName={dealer.userName}
              description={dealer.carreer}
              contact={dealer.contact || "Sin contacto disponible"}
              variant="contact"
            />
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>No hay dealers registrados aún.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dealers;
