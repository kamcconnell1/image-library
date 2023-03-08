import { Image } from '../../api';
import { formatDate } from '../../utils/formatDate';
import Card from '../Card';
import styles from './InfoPanel.module.css';

interface InfoPanelProps {
  image?: Image;
  onFavoriteClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

const EntityInfo = ({ title, data }: { title: string; data: string }) => {
  return (
    <div className={styles.entityInfo}>
      <p className={styles.entityInfoTitle}>{title}</p>
      <p className={styles.entityInfoData}>{data}</p>
    </div>
  );
};

const Divider = () => <hr className={styles.divider} />;

const InfoPanel = ({ image, onFavoriteClick, onDeleteClick }: InfoPanelProps) => {
  if (!image) return <div>Loading...</div>;
  const {
    id,
    url,
    filename,
    sizeInBytes,
    description,
    uploadedBy,
    createdAt,
    updatedAt,
    dimensions,
    resolution,
    favorited
  } = image;

  return (
    <div className={styles.infoPanel}>
      <Card
        url={url}
        filename={filename}
        sizeInBytes={sizeInBytes}
        description={description}
        className={styles.card}
        id={id}
        isFavorited={favorited}
        onFavoriteClick={onFavoriteClick}
      />
      <section className={styles.information}>
        <h2 className={styles.title}>Information</h2>
        <Divider />
        <EntityInfo title="Uploaded by" data={uploadedBy} />
        <Divider />
        <EntityInfo title="Created" data={formatDate(createdAt)} />
        <Divider />
        <EntityInfo title="Last modified" data={formatDate(updatedAt)} />
        <Divider />
        <EntityInfo title="Dimensions" data={`${dimensions.width} x ${dimensions.height}`} />
        <Divider />
        <EntityInfo title="Resolution" data={`${resolution.width} x ${resolution.height}`} />
        <Divider />
      </section>
      <section>
        {description ? (
          <>
            <h2 className={styles.title}>Description</h2>
            <p className={styles.description}>{description}</p>
          </>
        ) : null}
        <button className={styles.deleteButton} onClick={() => onDeleteClick(id)}>
          Delete
        </button>
      </section>
    </div>
  );
};

export default InfoPanel;
