export type Classification = 'opportunity' | 'noise' | 'risk' | 'reputation';

interface ClassificationBadgeProps {
  classification: Classification | null | undefined;
  size?: 'sm' | 'md';
}

export function ClassificationBadge({ classification, size = 'md' }: ClassificationBadgeProps) {
  if (!classification) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-border text-text-muted`}>
        Unclassified
      </span>
    );
  }

  const config = {
    opportunity: {
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      label: 'Opportunity',
    },
    noise: {
      bg: 'bg-gray-500/20',
      text: 'text-gray-400',
      label: 'Noise',
    },
    risk: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      label: 'Risk',
    },
    reputation: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      label: 'Reputation',
    },
  };

  const { bg, text, label } = config[classification];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center ${sizeClasses} rounded-full font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
}
