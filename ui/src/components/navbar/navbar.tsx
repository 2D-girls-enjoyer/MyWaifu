import { API_DOMAIN } from '../../constants/network';
import store from '../../store/store';

interface NavbarProps {
  onMenuClick: VoidFunction
}

function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <div className="flex bg-color-navbar-background drop-shadow-sm h-full w-full">
      <div className="basis-1/3 flex justify-center">
        <p className="text-primary-text-color lg:text-4xl md:text-xl sm:text-xs font-extrabold self-center">
          MyWaifu
        </p>
      </div>
      <div className="basis-full flex flex-row w-full">
        <div className="basis-full">
          {store.waifuName !== '' && (
            <div className="ml-6 lg:ml-10 md:ml-8 sm:ml-6 h-full w-full flex self-center">
              <img
                className="rounded-md h-12 w-12 mr-2 self-center"
                src={`${API_DOMAIN}/static/${store.waifuName}/profile.jpg`}
                loading="lazy"
              />
              <p className="text-primary-text-color lg:text-2xl font-bold self-center">{store.waifuName}</p>
            </div>

          )}
        </div>
        <button
          onClick={() => onMenuClick()}
          type="button"
          aria-label="Menu"
          className="mr-8 space-y-1"
        >
          <div className="w-6 h-1 bg-primary-color" />
          <div className="w-6 h-1 bg-primary-color" />
          <div className="w-6 h-1 bg-primary-color" />
        </button>

      </div>
    </div>
  );
}

export default Navbar;
