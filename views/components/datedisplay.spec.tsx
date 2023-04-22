import { render } from '@testing-library/react';
import { DateDisplay } from './datedisplay';

describe('DateDisplay', () => {
  const timestamp = 1619418241000; // April 26, 2021 15:24:01 (UTC)

  it('should render default formatted date', () => {
    const { queryByText } = render(<DateDisplay timestamp={timestamp} />);

    expect(queryByText('26/04/2021')).toBeTruthy();
  });

  it('should render custom formatted date', () => {
    const { queryByText } = render(
      <DateDisplay
        timestamp={timestamp}
        options={{
          weekday: 'long',
          year: undefined,
          month: 'long',
          day: 'numeric',
        }}
      />
    );

    expect(queryByText('lundi 26 avril')).toBeTruthy();
  });

  it('should apply className prop', () => {
    const { container } = render(<DateDisplay timestamp={timestamp} className="toto" />);

    expect((container.firstChild as HTMLSpanElement).classList.contains('toto')).toBeTruthy();
  });
});
