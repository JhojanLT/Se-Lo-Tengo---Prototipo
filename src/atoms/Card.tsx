import { IonCard, IonCardContent, IonIcon, IonImg } from "@ionic/react";
import "./Card.scss";
import { heart, heartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/SavedContext";
import { useHistory } from "react-router-dom";

export interface CardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price?: string;
  variant?: variant;
  active?: boolean;
  user?: string;
  carrera?: string;
  tipoPublicacion?: "artículo" | "servicio" | "solicitud";
}

export type variant = "article" | "contact" | "saved";

const Card: React.FC<CardProps> = ({ id, image, name, description, price, variant = "article", active }) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [activeHeart, setActiveHeart] = useState(active || favorites.includes(id));

  const history = useHistory(); // ✅ aquí inicializamos el hook

  useEffect(() => {
    setActiveHeart(favorites.includes(id));
  }, [favorites]);

  const onClick = () => {
    if (!activeHeart) {
      addFavorite(id);
    } else {
      removeFavorite(id);
    }
    setActiveHeart(!activeHeart);
  };

  return (
    <IonCard className="card-custom" onClick={() => history.push(`/articulo/${id}`)}>
      <IonCardContent className="card-content">
        <IonImg src={image} alt={name} className={`card-image ${variant}`} />

        <div className="card-info">
          <h2 className={`card-name ${variant}`}>{name}</h2>
          <p className={`card-description ${variant}`}>{description}</p>

          {price && (
            <div className="price-container">
              <p className={`card-price ${variant}`}>{price}</p>
              {variant === "article" && (
                <IonIcon
                  icon={activeHeart ? heart : heartOutline}
                  aria-hidden="true"
                  style={{ fontSize: "35px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                />
              )}
            </div>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Card;
