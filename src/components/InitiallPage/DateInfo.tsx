export const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <div className="flex flex-col text-center">
    <span className="text-[10px] font-light leading-3 font-druk ">{label}</span>
    <span className="">{date}</span>
  </div>
);
