import { Redirect, Route, Link } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Articulos from "./pages/Articulos";
import Dealers from "./pages/Dealers";
import Publicar from "./pages/Publicar";
import Guardado from "./pages/Guardado";
import Perfil from "./pages/Perfil";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import DetalleArticulo from "./pages/Detalle";

import { addCircleOutline, heartOutline, homeOutline, peopleOutline, personOutline } from "ionicons/icons";
import { FavoritesProvider } from "./context/SavedContext";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <FavoritesProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* Rutas dentro de Tabs */}
            <Route exact path="/tabs/articulos" component={Articulos} />
            <Route exact path="/tabs/dealers" component={Dealers} />
            <Route exact path="/tabs/publicar" component={Publicar} />
            <Route exact path="/tabs/guardado" component={Guardado} />
            <Route exact path="/tabs/perfil" component={Perfil} />

            {/* Rutas fuera de Tabs */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/articulo/:id" component={DetalleArticulo} />
            <Redirect exact from="/" to="/login" />
            <Redirect exact from="/tabs" to="/tabs/articulos" />
          </IonRouterOutlet>

          {/* TabBar */}
          <IonTabBar slot="bottom" color="primary" style={{ minHeight: "76px" }}>
            <IonTabButton tab="articulos">
              <Link to="/tabs/articulos" style={{ textDecoration: "none", color: "inherit" }}>
                <IonIcon icon={homeOutline} />
                <IonLabel>Artículos</IonLabel>
              </Link>
            </IonTabButton>

            <IonTabButton tab="dealers">
              <Link to="/tabs/dealers" style={{ textDecoration: "none", color: "inherit" }}>
                <IonIcon icon={peopleOutline} />
                <IonLabel>Dealers</IonLabel>
              </Link>
            </IonTabButton>

            <IonTabButton tab="publicar">
              <Link to="/tabs/publicar" style={{ textDecoration: "none", color: "inherit" }}>
                <IonIcon icon={addCircleOutline} />
                <IonLabel>Publicar</IonLabel>
              </Link>
            </IonTabButton>

            <IonTabButton tab="guardado">
              <Link to="/tabs/guardado" style={{ textDecoration: "none", color: "inherit" }}>
                <IonIcon icon={heartOutline} />
                <IonLabel>Guardado</IonLabel>
              </Link>
            </IonTabButton>

            <IonTabButton tab="perfil">
              <Link to="/tabs/perfil" style={{ textDecoration: "none", color: "inherit" }}>
                <IonIcon icon={personOutline} />
                <IonLabel>Perfil</IonLabel>
              </Link>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </FavoritesProvider>
);

export default App;
