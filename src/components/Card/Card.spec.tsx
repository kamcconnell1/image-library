import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Images } from '../../testData';
import Card from './Card';

describe('Card', () => {
  const { id, url, filename, sizeInBytes, description, favorited } = Images[0];

  const renderComponent = (onClick?: typeof jest.fn, onFavouriteClick?: typeof jest.fn) => {
    return {
      ...render(
        <Card
          id={id}
          url={url}
          filename={filename}
          sizeInBytes={sizeInBytes}
          description={description}
          isFavorited={favorited}
          onClick={onClick}
          onFavoriteClick={onFavouriteClick}
        />
      ),
      user: userEvent.setup()
    };
  };

  it('renders correctly', () => {
    renderComponent();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', url);
    expect(image).toHaveAttribute('alt', description);
    expect(screen.getByText(filename)).toBeInTheDocument();
    expect(screen.getByText('4.8 MB')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders correctly with a button wrapper if onClick prop passed', async () => {
    const onClick = jest.fn();
    const { user } = renderComponent(onClick);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toBeCalledWith(id);
  });

  it('renders favorited icon is onFavoriteClick passed', async () => {
    const onClick = jest.fn();
    const { user } = renderComponent(undefined, onClick);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Favorite');

    await user.click(button);
    expect(onClick).toBeCalledWith(id);
  });
});
