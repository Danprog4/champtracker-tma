import { Link } from "@tanstack/react-router";
import { BarsIcon } from "@/icons/Bars";
import { PlusIcon } from "@/icons/Plus";

const Header = () => {
  return (
    <div className="fixed z-10 flex w-full justify-between h-[11vh] bg-black p-3 pt-14">
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
