import { API_DOMAIN } from '../../constants';
import store from '../../store/store';
import Tooltip from '../tooltip/tooltip';

interface NavbarProps {
  onMenuClick: VoidFunction,
  onDeleteChatClick: VoidFunction,
}

function Navbar({ onMenuClick, onDeleteChatClick }: NavbarProps) {
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
              <div className="self-center">
                <Tooltip message="Delete current chat">
                  <button
                    type="button"
                    onClick={onDeleteChatClick}
                    className="flex rounded w-7 h-7
                justify-center outline outline-1 outline-primary-color"
                  >
                    <span className="basis-1/6 material-icons primary md-24 sm:md-18
                lg:md-24 self-center justify-center"
                    >
                      delete_forever
                    </span>
                  </button>
                </Tooltip>
              </div>

              <img
                className="rounded-md ml-2 h-12 w-12 mr-2 self-center"
                src={`${API_DOMAIN}/static/${store.waifuName}/profile.jpg`}
                loading="lazy"
              />
              <p className="text-primary-text-color lg:text-2xl font-bold self-center">{store.waifuName}</p>
            </div>
          )}
        </div>
        <button
          onClick={onMenuClick}
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
