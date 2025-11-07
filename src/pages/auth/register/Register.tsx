import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { IonPage, IonContent, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useIonRouter } from "@ionic/react";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useIonRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/tabs/Articulos", "forward");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setErrorMessage("Error al registrar. Intenta con otro correo o verifica tu conexión.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleRegister}>
          <IonInput
            label="Correo electrónico"
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value ?? "")}
            required
          />
          <IonInput
            label="Contraseña"
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value ?? "")}
            required
          />

          <IonButton expand="block" type="submit" className="ion-margin-top">
            Registrarse
          </IonButton>

          <IonButton expand="block" fill="clear" onClick={() => router.push("/login")} className="ion-margin-top">
            ¿Ya tienes cuenta? Inicia sesión
          </IonButton>

          {errorMessage && (
            <IonText color="danger" className="ion-text-center">
              <p>{errorMessage}</p>
            </IonText>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
