export const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <div className="flex flex-col text-center">
    <span className="text-xs font-light leading-3">{label}</span>
    <span>{date}</span>
  </div>
);
