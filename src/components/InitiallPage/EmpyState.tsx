import { Link } from "@tanstack/react-router";

const EmptyState = () => {
  return (
    <div className=" flex h-full flex-col items-center justify-between">
      <Link to="/new">
        <div className="absolute left-1/2 top-1/2 mb-3 flex aspect-square w-[100vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400">
          <div className=" text-center">
            <div className=" text-2xl font-druk text-black">
              СОЗДАТЬ НОВОЕ <br />
              ЗАДАНИЕ
            </div>
          </div>
        </div>
      </Link>
      <div className=" text-nowrap p-2 text-center text-sm text-neutral-400">
        <div>
          У тебя пока нету никаких заданий. Выбери новое <br />
          из списка доступных или создай свое
          <br />
          совершенно новое!
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
