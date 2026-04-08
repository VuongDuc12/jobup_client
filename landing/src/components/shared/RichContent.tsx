"use client";

interface RichContentProps {
  html?: string | null;
  emptyText?: string;
  className?: string;
}

const baseRichContentClassName = [
  "break-words text-gray-600",
  "[&_p]:my-0 [&_p]:leading-relaxed",
  "[&_p+p]:mt-0",
  "[&_span]:inline [&_span]:align-baseline [&_span]:m-0",
  "[&_ul]:my-0 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:my-0 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:mb-0",
  "[&_a]:text-brand-yellow [&_a]:underline [&_a]:underline-offset-4",
  "[&_img]:my-0 [&_img]:inline-block [&_img]:h-auto [&_img]:max-w-full [&_img]:w-auto [&_img]:rounded-xl",
  "[&_svg]:inline-block [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:align-middle",
  "[&_[data-inline-icon]]:m-0 [&_[data-inline-icon]]:mr-2 [&_[data-inline-icon]]:inline-flex [&_[data-inline-icon]]:size-9 [&_[data-inline-icon]]:align-middle [&_[data-inline-icon]]:items-center [&_[data-inline-icon]]:justify-center [&_[data-inline-icon]]:rounded-full",
  "[&_[data-inline-icon]]:border [&_[data-inline-icon]]:border-brand-yellow/20 [&_[data-inline-icon]]:bg-brand-yellow/10 [&_[data-inline-icon]]:text-brand-yellow",
  "[&_[data-inline-icon]_i]:text-sm [&_[data-inline-icon]_i]:leading-none",
].join(" ");

export default function RichContent({
  html,
  emptyText = "Đang cập nhật.",
  className,
}: RichContentProps) {
  if (!html || !html.trim()) {
    return <p className="text-gray-500">{emptyText}</p>;
  }

  return (
    <div
      className={[baseRichContentClassName, className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
