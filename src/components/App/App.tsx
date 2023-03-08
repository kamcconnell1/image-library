import { useEffect, useState } from 'react';
import { Image } from '../../api';
import { deleteImage, fetchImages, toggleFavorited } from '../../features/images/imagesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ImageGrid from '../ImageGrid';
import InfoPanel from '../InfoPanel';
import Tab from '../Tab';
import Tabs from '../Tabs';
import styles from './App.module.css';

const App = () => {
  const [favorited, setFavorited] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image>();
  const [selectedTab, setSelectedTab] = useState<string>('recently-added');

  const dispatch = useAppDispatch();

  const { images, status, error } = useAppSelector((state) => state.images);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchImages());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (images && !selectedImage) setSelectedImage(images[0]);
  }, [images]);

  useEffect(() => {
    if (images) {
      const favorited = images
        .filter((image) => image.favorited === true)
        .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
      setFavorited(favorited);
    }
  }, [images]);

  const onTabClick = (id: string) => setSelectedTab(id);

  const onImageClick = (id: string) => {
    const image = images.find((i) => i.id === id);
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleToggleFavourite = (id: string) => {
    const date = new Date().toISOString();
    dispatch(toggleFavorited({ id, date }));
    if (id === selectedImage?.id) {
      setSelectedImage({ ...selectedImage, favorited: !selectedImage?.favorited, updatedAt: date });
    }
  };

  const onDeleteClick = (id: string) => {
    dispatch(deleteImage(id));
    const newSelectedImage = (selectedTab === 'recently-added' ? images : favorited).find(
      (i) => i.id !== id
    );
    setSelectedImage(newSelectedImage);
  };

  return (
    <div className={styles.app}>
      <div className={styles.leftPane}>
        <h1 className={styles.title}>Photos</h1>
        <Tabs label="Photo tabs">
          <Tab
            id="recently-added"
            title="Recently Added"
            onClick={onTabClick}
            selectedTabId={selectedTab}
            aria-controls="recently-added-panel"
          />
          <Tab
            id="favorited"
            title="Favorited"
            onClick={onTabClick}
            selectedTabId={selectedTab}
            aria-controls="favorited-panel"
          />
        </Tabs>
        {error ? (
          <div>Oops, something went wrong. Please try again later.</div>
        ) : (
          <ImageGrid
            selectedTabId={selectedTab}
            selectedImageId={selectedImage?.id}
            data={selectedTab === 'recently-added' ? images : favorited}
            onImageClick={onImageClick}
            isLoading={status === 'idle' || status === 'loading'}
          />
        )}
      </div>
      <div className={styles.rightPane}>
        <InfoPanel
          image={selectedImage}
          onFavoriteClick={handleToggleFavourite}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

export default App;
