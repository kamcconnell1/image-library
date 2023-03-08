import { render, screen } from '@testing-library/react';
import { Image } from '../../api';
import { Images } from '../../testData';
import ImageGrid from './ImageGrid';

describe('ImageGrid', () => {
  const onClick = jest.fn();
  const renderComponent = (isLoading: boolean, images: Image[]) =>
    render(
      <ImageGrid
        selectedTabId="tab-1"
        selectedImageId={Images[0].id}
        data={images}
        onImageClick={onClick}
        isLoading={isLoading}
      />
    );

  it('renders images correctly', () => {
    renderComponent(false, Images);

    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-1');
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('renders empty data message if no images provided', () => {
    renderComponent(false, []);

    expect(screen.getByText('You have no images to view')).toBeInTheDocument();
  });

  it('renders loading message correctly', () => {
    renderComponent(true, []);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
