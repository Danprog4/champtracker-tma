import { Link } from "@tanstack/react-router";

const EmptyState = () => {
  return (
    <div className="mt-10 flex h-screen flex-col items-center justify-center">
      <Link to="/new">
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[100vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400">
          <div className="relative text-center">
            <div className="mb-2 text-4xl  text-black">+</div>
            <div className="mb-11 text-3xl  text-black">
              СОЗДАТЬ НОВОЕ <br />
              ЗАДАНИЕ
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-4 text-nowrap p-2 text-center text-sm text-gray-400">
        <div>
          У тебя пока нету никаких заданий. Выбери новый <br />
          из списка доступных или создай свой
          <br />
          совершенно новый!
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
