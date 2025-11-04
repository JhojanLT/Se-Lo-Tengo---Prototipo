import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Header } from "../components/Header";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    console.log("Iniciar sesión con:", email, password);
    history.push("/tabs/Articulos");
    // Aquí luego añadiremos la autenticación con Firebase
  };

  return (
    <IonPage>
      <Header page="Iniciar Sesión" color="primary" />
      <IonContent className="ion-padding">
        <IonInput placeholder="Correo electrónico" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        <IonInput
          placeholder="Contraseña"
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleLogin}>
          Entrar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
