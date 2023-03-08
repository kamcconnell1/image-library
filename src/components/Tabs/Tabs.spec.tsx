import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tab from '../Tab';
import Tabs from './Tabs';

describe('Tabs', () => {
  const onTabClick = jest.fn();
  const selectedTab = 'a';

  const renderComponent = () =>
    render(
      <Tabs label="Test-tabs">
        <Tab
          id="a"
          title="Tab 1"
          onClick={onTabClick}
          selectedTabId={selectedTab}
          aria-controls="recently-added-panel"
        />
        <Tab
          id="b"
          title="Tab 2"
          onClick={onTabClick}
          selectedTabId={selectedTab}
          aria-controls="favorited-panel"
        />
      </Tabs>
    );

  it('renders correctly', () => {
    renderComponent();

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Test-tabs');
    expect(screen.getAllByRole('tab')).toHaveLength(2);

    expect(screen.getByText('Tab 1').closest('button')).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    renderComponent();
    const tab = screen.getAllByRole('tab')[0];
    await user.click(tab);
    expect(onTabClick).toBeCalledWith('a');
  });
});
