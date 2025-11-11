import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 👈 Rol por defecto
  const [errorMessage, setErrorMessage] = useState("");
  const router = useIonRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1️⃣ Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Guardar en Firestore con rol seleccionado
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role, // 👈 Guarda el rol seleccionado
        createdAt: new Date(),
      });

      // 3️⃣ Redirigir a la app
      router.push("/articulos", "forward");
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

          {/* 👇 Nuevo selector de rol */}
          <IonSelect
            label="Tipo de usuario"
            value={role}
            onIonChange={(e) => setRole(e.detail.value)}
            interface="popover"
            className="ion-margin-top"
          >
            <IonSelectOption value="user">Usuario común</IonSelectOption>
            <IonSelectOption value="admin">Administrador</IonSelectOption>
          </IonSelect>

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
