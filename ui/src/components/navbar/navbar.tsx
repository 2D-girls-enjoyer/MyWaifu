import { API_DOMAIN } from '../../constants/network';
import store from '../../store/store';

interface NavbarProps {
  onUsernameModalClick: VoidFunction,
  onWaifuSelectModalClick: VoidFunction,
}

function Navbar({ onUsernameModalClick, onWaifuSelectModalClick }: NavbarProps) {
  return (
    <div className="flex bg-color-navbar-background drop-shadow-sm h-full w-full">
      <div className="basis-1/3 flex justify-center">
        {store.waifuName !== '' && (
        <img
          className="rounded-md h-12 w-12 mr-2 self-center"
          src={`${API_DOMAIN}/static/${store.waifuName}/profile.jpg`}
          loading="lazy"
        />
        )}
        <h3 className="text-primary-text-color text-2xl font-extrabold self-center">
          {store.waifuName === '' ? 'MyWaifu Project' : store.waifuName}
        </h3>
      </div>
      <div className="basis-2/3 flex flex-row space-x-5 justify-end pr-8">
        <button
          onClick={onWaifuSelectModalClick}
          type="button"
          className="h-fit self-center outline outline-4 outline-offset-1
          outline-primary-color rounded-md text-xl text-primary-text-color font-bold p-0.5 "
        >
          SELECT WAIFU
        </button>
        <button
          onClick={onUsernameModalClick}
          type="button"
          className="h-fit self-center outline outline-4 outline-offset-1
          outline-primary-color rounded-md text-xl text-primary-text-color font-bold p-0.5 "
        >
          SET USERNAME
        </button>
      </div>
    </div>
  );
}

export default Navbar;
