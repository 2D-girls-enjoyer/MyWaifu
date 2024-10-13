import { PropsWithChildren, useRef } from 'react';

interface TooltipProps {
  message: string,

}

function Tooltip({ message, children }: PropsWithChildren<TooltipProps>) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${clientX - left}px`;
      }}
      className="group relative inline-block"
    >
      {children}
      <span
        ref={tooltipRef}
        className="invisible group-hover:visible opacity-0
      group-hover:opacity-100 transition bg-color-modal-background text-primary-text-color p-1
      absolute top-full mt-2 outline outline-1 outline-primary-color whitespace-nowrap"
      >
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
