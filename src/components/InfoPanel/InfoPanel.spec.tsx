import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Image } from '../../api';
import { Images } from '../../testData';
import InfoPanel from './InfoPanel';

describe('InfoPanel', () => {
  const onFavoriteClick = jest.fn();
  const onDeleteClick = jest.fn();
  const renderComponent = (image?: Image) => {
    return {
      ...render(
        <InfoPanel
          image={image || Images[0]}
          onFavoriteClick={onFavoriteClick}
          onDeleteClick={onDeleteClick}
        />
      ),
      user: userEvent.setup()
    };
  };

  it('renders correctly', () => {
    renderComponent();

    expect(screen.getByText('Dimensions')).toBeInTheDocument();
    expect(screen.getByText('3200 x 4800')).toBeInTheDocument();
    expect(screen.getByText('An image')).toBeInTheDocument();
  });

  it('does not display "Description" if image does not have one', () => {
    renderComponent({ ...Images[0], description: undefined });

    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('renders delete button correctly', async () => {
    const { user } = renderComponent();
    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);

    expect(onDeleteClick).toBeCalledWith(Images[0].id);
  });
});
