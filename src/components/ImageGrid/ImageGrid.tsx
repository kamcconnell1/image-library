import { Image } from '../../api';
import Card from '../Card';
import styles from './ImageGrid.module.css';

interface ImageGridProps {
  selectedTabId: string;
  selectedImageId: string | undefined;
  data: Image[];
  onImageClick: (id: string) => void;
  isLoading: boolean;
}

const ImageGrid = ({
  selectedTabId,
  selectedImageId,
  data,
  onImageClick,
  isLoading
}: ImageGridProps) => {
  if (isLoading) return <div>Loading...</div>;
  return (
    <div
      className={styles.grid}
      role="tabpanel"
      id={`${selectedTabId}-panel`}
      aria-labelledby={selectedTabId}>
      {data.length > 0 ? (
        data.map((image) => (
          <Card
            key={image.id}
            id={image.id}
            url={image.url}
            filename={image.filename}
            sizeInBytes={image.sizeInBytes}
            description={image.description}
            onClick={onImageClick}
            isSelected={image.id === selectedImageId}
          />
        ))
      ) : (
        <div>You have no images to view</div>
      )}
    </div>
  );
};
export default ImageGrid;
