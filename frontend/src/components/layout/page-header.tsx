interface PageHeaderProps {
  title: string;
  description?: string;
  /** The page's one primary action */
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-8">
      <div>
        <h1 className="text-[24px] leading-8 font-[650] text-neutral-950 md:text-page-title">{title}</h1>
        {description && <p className="mt-1 text-body-lg text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0 [&>*]:w-full sm:[&>*]:w-auto">{action}</div>}
    </div>
  );
}
