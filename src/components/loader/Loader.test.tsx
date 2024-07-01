import { render, screen, within } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('displays the loader when loading is true', () => {
    render(<Loader loading={true} render={() => <div>Content</div>} />);

    const backdrop = screen.getByTestId('loader');

    expect(backdrop).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('does not display the loader when loading is false', () => {
    const content = 'Content';

    render(<Loader loading={false} render={() => <div>{content}</div>} />);

    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('applies custom color and styles', () => {
    const customColor = '#000';
    const sx = { opacity: 0.5 };

    render(
      <Loader
        loading={true}
        color={customColor}
        sx={sx}
        render={() => <div>Content</div>}
      />
    );
    const backdrop = screen.getByTestId('loader');
    const circularProgress = within(backdrop).queryByRole('progressbar', { hidden: true });

    expect(circularProgress).toBeTruthy();
    expect(circularProgress).toHaveClass('MuiCircularProgress-colorPrimary');
  });

});
