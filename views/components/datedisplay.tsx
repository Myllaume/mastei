interface DateDisplayProps {
  timestamp: number;
  options?: Intl.DateTimeFormatOptions;
}

// short and ling ?

function DateDisplay({ timestamp, options = {} }: DateDisplayProps) {
  const date = new Date(timestamp);

  const formatter = new Intl.DateTimeFormat('fr-FR', {
    ...options,
    // weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    timeZone: 'Europe/Paris', // set the timezone to French timezone
  });

  const formattedDate = formatter.format(date);

  return <div>{formattedDate}</div>;
}

export { DateDisplay };
