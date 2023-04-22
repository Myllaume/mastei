interface DateDisplayProps {
  timestamp: number;
  className?: string;
  options?: Intl.DateTimeFormatOptions;
}

function DateDisplay({ timestamp, className, options = {} }: DateDisplayProps) {
  const date = new Date(timestamp);

  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#syntax
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/Paris', // set to French timezone
    ...options,
  });

  const formattedDate = formatter.format(date);

  return <label className={className}>{formattedDate}</label>;
}

export { DateDisplay };
