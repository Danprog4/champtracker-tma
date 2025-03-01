import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

interface DrawerAlertProps {
  desc: string;
  title: string;
  question: string;
  handleFunc: () => void;
  bgColor: string;
}

export const DrawerAlert = ({
  desc,
  title,
  handleFunc,
  question,
  bgColor,
}: DrawerAlertProps) => {
  return (
    <Drawer noBodyStyles={true} dismissible={false}>
      <DrawerTrigger>
        <button
          className={`flex h-[45px] w-[94vw] items-center justify-center rounded-md ${bgColor} p-[10px]`}>
          <span className="text-xs font-druk ">{title}</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-800 border-none">
        <DrawerHeader>
          <DrawerTitle className="text-white text-start font-light">
            {question}
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="font-druk text-xs flex justify-center">
          <button
            onClick={handleFunc}
            className="bg-red-500 text-white px-4 py-2 rounded-md h-[45px]">
            УДАЛИТЬ
          </button>
          <DrawerClose asChild>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md h-[45px] mb-5">
              ОТМЕНИТЬ
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
