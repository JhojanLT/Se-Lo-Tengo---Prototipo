import { IonAvatar, IonCard, IonCardContent, IonIcon, IonImg } from "@ionic/react";
import "./Card.scss";
import { heart, heartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/SavedContext";
import { useHistory } from "react-router-dom";

export interface CardProps {
  id: string;
  image?: string;
  profileImage?: string;
  title?: string;
  description?: string;
  price?: string;
  variant?: string;
  userName?: string;
  major?: string;
  postType?: "product" | "service" | "request";
  contact?: string;
  active?: boolean;
}

export type variant = "article" | "contact" | "saved";

const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  userName,
  profileImage,
  description,
  price,
  variant = "article",
  active,
  contact,
}) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [activeHeart, setActiveHeart] = useState(active || favorites.includes(id));

  const history = useHistory();

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
        <IonAvatar className="card-image">
          <IonImg src={image} alt={variant === "article" ? image : profileImage} className={`card-image ${variant}`} />
        </IonAvatar>
        <div className="card-info">
          <h2 className={`card-name ${variant}`}>{variant === "article" ? title : userName}</h2>
          <p className={`card-description ${variant}`}>{description}</p>

          <div className="price-container">
            <p className={`card-price ${variant}`}>{variant === "article" ? price : contact}</p>
            {variant === "article" && (
              <IonIcon
                icon={activeHeart ? heart : heartOutline}
                aria-hidden="true"
                style={{ fontSize: "28px", color: "#e0355aff" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              />
            )}
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Card;
