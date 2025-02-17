import { Link } from "@tanstack/react-router";
import { BarsIcon } from "@/icons/Bars";
import { PlusIcon } from "@/icons/Plus";

const Header = () => {
  return (
    <div className="fixed z-10 flex w-full justify-between bg-black pb-2 pl-5 pr-5 pt-10">
      <Link to="/about">
        <BarsIcon />
      </Link>
      <Link to="/new">
        <PlusIcon />
      </Link>
    </div>
  );
};

export default Header;
