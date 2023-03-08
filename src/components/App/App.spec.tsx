import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Images } from '../../testData';
import App from './App';

const server = setupServer(
  rest.get('https://agencyanalytics-api.vercel.app/images.json', (req, res, ctx) => {
    return res(ctx.json(Images));
  })
);

describe('App', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  const renderComponent = () => {
    return {
      ...render(
        <Provider store={store}>
          <App />
        </Provider>
      ),
      user: userEvent.setup()
    };
  };

  const waitForLoaded = async () =>
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

  it('renders correctly', async () => {
    renderComponent();

    expect(screen.getByText('Recently Added').closest('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await waitForLoaded();

    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveAttribute('aria-labelledby', 'recently-added');

    const imagesReturned = within(tabpanel).getAllByRole('button');
    expect(imagesReturned).toHaveLength(3);

    await waitFor(() =>
      expect(imagesReturned[0].parentElement).toHaveAttribute('aria-selected', 'true')
    );

    const filename = Images[0].filename;
    const name = within(imagesReturned[0].parentElement as HTMLElement).getByText(filename);
    expect(name).toBeInTheDocument();
    expect(screen.getAllByText(filename)).toHaveLength(2);
  });

  it('shows favorited images on tab click', async () => {
    const { user } = renderComponent();

    await waitForLoaded();

    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveAttribute('aria-labelledby', 'recently-added');

    await user.click(screen.getByText('Favorited'));
    expect(tabpanel).toHaveAttribute('aria-labelledby', 'favorited');

    const imagesReturned = within(tabpanel).getAllByRole('button');
    expect(imagesReturned).toHaveLength(1);
  });

  it('allows a user to select a new image and favourite it', async () => {
    const { user } = renderComponent();

    await waitForLoaded();

    const tabpanel = screen.getByRole('tabpanel');
    const imagesReturned = within(tabpanel).getAllByRole('button');
    expect(imagesReturned).toHaveLength(3);

    expect(imagesReturned[0].parentElement).toHaveAttribute('aria-selected', 'true');

    await user.click(imagesReturned[2]);
    expect(imagesReturned[2].parentElement).toHaveAttribute('aria-selected', 'true');

    const filename = Images[2].filename;
    const name = within(imagesReturned[2].parentElement as HTMLElement).getByText(filename);
    expect(name).toBeInTheDocument();
    expect(screen.getAllByText(filename)).toHaveLength(2);

    await user.click(screen.getByLabelText('Favorite'));
    await user.click(screen.getByText('Favorited'));

    const favoritedImages = within(tabpanel).getAllByRole('button');
    expect(favoritedImages).toHaveLength(2);
  });

  it('allows a user to delete an image', async () => {
    const { user } = renderComponent();

    await waitForLoaded();

    await user.click(screen.getByText('Delete'));

    const tabpanel = screen.getByRole('tabpanel');
    const imagesReturned = within(tabpanel).getAllByRole('button');
    expect(imagesReturned).toHaveLength(2);
  });
});
