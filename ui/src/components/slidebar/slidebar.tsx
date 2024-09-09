interface SlidebarProps {
  open: boolean,
  onClose: VoidFunction,
  onUsernameModalClick: VoidFunction,
  onWaifuSelectModalClick: VoidFunction,
}

function Slidebar({
  open, onClose, onUsernameModalClick, onWaifuSelectModalClick,
}: SlidebarProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors 
      ${open ? 'visible bg-black/50' : 'invisible'}`}
    >
      <div
        onClick={(e) => { e.stopPropagation(); }}
        className={`flex flex-col px-2 bg-color-modal-background absolute right-0 
          shadow w-3/6 sm:w-3/6 lg:w-1/6 h-dvh transition-all 
        ${open ? 'opacity-100' : 'translate-x-12 opacity-0'}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-1 right-3 rounded-lg"
        >
          <p className="text-3xl font-mono font-extrabold font text-secondary-color">X</p>
        </button>

        <p className="basis-1/12 mt-4 text-primary-text-color lg:text-3xl md:text-xl sm:text-xs font-extrabold self-center">
          MENU
        </p>

        <div className="basis-11/12 divide-y divide-secondary-color">
          <div
            onClick={() => { onWaifuSelectModalClick(); }}
            className="flex content-center p-2 cursor-pointer"
          >
            <span className="basis-1/6 material-icons primary md-36 sm:md-24 lg:md-36">diversity_1</span>
            <p className="basis-5/6 pl-3 self-center text-lg font-bold text-primary-text-color">WAIFUS</p>
          </div>
          <div
            onClick={() => { onUsernameModalClick(); }}
            className="flex content-center p-2 cursor-pointer"
          >
            <span className="basis-1/6 material-icons primary md-36 sm:md-24 lg:md-36">account_circle</span>
            <p className="basis-5/6 pl-3 self-center text-lg font-bold text-primary-text-color">USERNAME</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Slidebar;
