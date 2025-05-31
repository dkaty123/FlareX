
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingCardProps {
  showHeader?: boolean;
  headerHeight?: string;
  contentLines?: number;
  className?: string;
}

const LoadingCard = ({ 
  showHeader = true, 
  headerHeight = "h-6", 
  contentLines = 3,
  className = ""
}: LoadingCardProps) => {
  return (
    <Card className={`bg-black/20 border-purple-800/50 ${className}`}>
      {showHeader && (
        <CardHeader className="pb-2">
          <Skeleton className={`${headerHeight} w-3/4 bg-purple-800/30`} />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: contentLines }).map((_, index) => (
          <Skeleton 
            key={index} 
            className={`h-4 bg-purple-800/30 ${
              index === contentLines - 1 ? 'w-2/3' : 'w-full'
            }`} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default LoadingCard;
