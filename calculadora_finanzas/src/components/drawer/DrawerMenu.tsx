import { Button } from "../tremor/Button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../tremor/Drawer";
import "./DrawerMenu.css";

export const DrawerMenu = () => (
  <div className="flex justify-center nav-box-container-mobile-menu">
    <Drawer>
      <DrawerTrigger asChild>
        <button>
          <svg
            className="nav-box-icon-mobile"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="undefined"
            viewBox="0 -960 960 960"
          >
            <path d="M120-240v-80h720v80zm0-200v-80h720v80zm0-200v-80h720v80z"></path>
          </svg>
        </button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg" style={{ zIndex: 999 }}>
        <DrawerHeader>
          <DrawerTitle>Account Created Successfully</DrawerTitle>
          <DrawerDescription className="mt-1 text-sm">
            Your account has been created successfully. You can now login to
            your account. For more information, please contact us.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          This is they body of the drawer, content goes here.
        </DrawerBody>
        <DrawerFooter className="mt-6">
          <DrawerClose asChild>
            <Button
              className="mt-2 w-full sm:mt-0 sm:w-fit"
              variant="secondary"
            >
              Go back
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button className="w-full sm:w-fit">Ok, got it!</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
);
