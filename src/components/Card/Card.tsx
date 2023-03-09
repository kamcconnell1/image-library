import classNames from 'classnames';
import { HeartIcon } from '../../assets/HeartIcon';
import styles from './Card.module.css';

interface CardProps {
  id: string;
  url: string;
  filename: string;
  sizeInBytes: number;
  description: string | undefined;
  className?: string;
  onClick?: (id: string) => void;
  onFavoriteClick?: (id: string) => void;
  isFavorited?: boolean;
  isSelected?: boolean;
}

interface ImageWrapperProps {
  children: React.ReactNode;
  hasWrapper: boolean;
  wrapper: (chldren: React.ReactNode) => React.ReactElement;
}

const ImageWrapper = ({ hasWrapper, wrapper, children }: ImageWrapperProps) =>
  hasWrapper ? wrapper(children) : <>{children}</>;

const Card = ({
  id,
  url,
  filename,
  sizeInBytes,
  description,
  className,
  onClick,
  onFavoriteClick,
  isFavorited,
  isSelected
}: CardProps) => {
  const sizeInMB = Number((sizeInBytes / Math.pow(1024, 2)).toFixed(1));
  return (
    <div
      className={classNames(styles.card, className)}
      aria-selected={isSelected}
      data-testid={`card-${filename}`}>
      <ImageWrapper
        hasWrapper={onClick ? true : false}
        wrapper={(children) => (
          <button
            onClick={onClick && (() => onClick(id))}
            className={styles.imageButton}
            aria-label="Show image detail">
            {children}
          </button>
        )}>
        <img
          className={classNames(styles.image, { [styles.selected]: isSelected })}
          src={url}
          alt={description ? description : filename}
        />
      </ImageWrapper>
      <div className={styles.text}>
        <div className={styles.row}>
          <p className={styles.filename}>{filename}</p>
          {onFavoriteClick && (
            <button
              className={classNames(styles.favoriteButton, {
                [styles.favorited]: isFavorited
              })}
              onClick={() => onFavoriteClick(id)}
              aria-label="Favorite">
              <HeartIcon aria-selected={isFavorited} />
            </button>
          )}
        </div>
        <p className={styles.size}>{`${sizeInMB} MB`}</p>
      </div>
    </div>
  );
};

export default Card;
