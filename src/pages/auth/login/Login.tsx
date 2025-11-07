import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { Header } from "../../../components/Header";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../../firebase/auth";
import { useAuth } from "../../../context/authContext";

const Login: React.FC = () => {
  const { userLoggedIn } = useAuth();
  const router = useIonRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Redirigir si ya está logueado
  useEffect(() => {
    if (userLoggedIn) {
      router.push("/tabs/Articulos", "forward");
    }
  }, [userLoggedIn, router]);

  // 🔹 Manejar inicio de sesión con correo y contraseña
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningIn) return;

    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
      router.push("/tabs/Articulos", "forward");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error desconocido al iniciar sesión");
      }
      setIsSigningIn(false);
    }
  };

  // 🔹 Manejar inicio de sesión con Google
  const onGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSigningIn) return;

    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
      router.push("/tabs/Articulos", "forward");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error desconocido al iniciar con Google");
      }
      setIsSigningIn(false);
    }
  };

  // 🔹 Ir al registro
  const goToRegister = () => {
    router.push("/register", "forward");
  };

  return (
    <IonPage>
      <Header page="Iniciar Sesión" color="primary" logoutButton={false} />
      <IonContent className="ion-padding">
        <form onSubmit={onSubmit}>
          <IonInput
            placeholder="Correo electrónico"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value ?? "")}
          />
          <IonInput
            placeholder="Contraseña"
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value ?? "")}
          />

          <IonButton expand="block" type="submit" disabled={isSigningIn}>
            Entrar
          </IonButton>

          <IonButton expand="block" color="secondary" onClick={onGoogleSignIn} disabled={isSigningIn}>
            Iniciar con Google
          </IonButton>

          <IonButton expand="block" fill="clear" onClick={goToRegister}>
            Crear cuenta nueva
          </IonButton>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
