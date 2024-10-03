import { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import Modal from './components/modal/modal';
import Navbar from './components/navbar/navbar';
import MainChat from './pages/main-chat/mainChat';
import store from './store/store';
import http from './infra/http';
import { API_DOMAIN } from './constants';
import Slidebar from './components/slidebar/slidebar';
import AlertStack from './components/alert-stack/alertStack';

const App = observer(() => {
  const localStore = useLocalObservable(() => ({
    waifuList: [] as string[],
    openSlidebar: false,
    openChatDeletionModal: false,
    openUsernameModal: false,
    openSelectWaifuModal: false,

    setWaifuList(waifuList: string[]) {
      this.waifuList = waifuList;
    },
    setOpenSlidebar(isOpen: boolean) {
      this.openSlidebar = isOpen;
    },
    setOpenChatDeletionModal(isOpen: boolean) {
      this.openChatDeletionModal = isOpen;
    },
    setOpenUsernameModal(isOpen: boolean) {
      this.openUsernameModal = isOpen;
    },
    setOpenSelectWaifuModal(isOpen: boolean) {
      this.openSelectWaifuModal = isOpen;
    },
  }));

  const deleteCurrentChat = async () => {
    await store.deleteWaifuChat();
    localStore.setOpenChatDeletionModal(false);
  };

  const saveUsername = () => {
    store.saveUsername();
    localStore.setOpenUsernameModal(false);
  };

  const onUsernameInputKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveUsername();
    }
  };

  const openWaifuSelectionModel = async () => {
    const waifuListPromise = http.getWaifus();
    localStore.setOpenSelectWaifuModal(true);
    localStore.setWaifuList((await waifuListPromise).waifus);
  };

  const selectWaifu = async (waifu: string) => {
    await store.selectWaifu(waifu);
    localStore.setOpenSelectWaifuModal(false);
    localStore.setOpenSlidebar(false);
  };

  useEffect(() => {
    async function firstLoadUsername() {
      if (store.username === '') {
        await store.loadUsername();
      }
    }

    firstLoadUsername();
  }, []);

  return (
    <main className="theme-main">
      <div className="w-dvw h-dvh flex flex-col overscroll-contain">
        <div className="absolute z-50 left-1/2 transform -translate-x-1/2 w-fit h-min mt-4">
          <AlertStack />
        </div>
        <div className="sticky top-0 w-full flex-none h-16">
          <Navbar
            onMenuClick={() => localStore.setOpenSlidebar(true)}
            onDeleteChatClick={() => localStore.setOpenChatDeletionModal(true)}
          />
        </div>
        <div className="w-full h-full flex flex-row overflow-y-hidden">
          <div className="bg-black basis-1/3">
            <p className="text-white pl-3 pt-3">Waifu live reaction soon</p>
          </div>
          <div className="basis-full">
            <MainChat />
          </div>
        </div>
      </div>

      {/* Modals and slidebars */}

      {/* Menu Slidebar */}
      <Slidebar
        onClose={() => { localStore.setOpenSlidebar(false); }}
        onWaifuSelectModalClick={openWaifuSelectionModel}
        onUsernameModalClick={() => localStore.setOpenUsernameModal(true)}
        open={localStore.openSlidebar}
      />

      {/* Chat deletion modal */}
      <Modal
        onClose={() => localStore.setOpenChatDeletionModal(false)}
        confirmationBtnText="Delete"
        onConfirmationBtnClick={deleteCurrentChat}
        onCancelBtnClick={() => localStore.setOpenChatDeletionModal(false)}
        open={localStore.openChatDeletionModal}
      >
        <div className="text-center w-96">
          <h3 className="text-primary-text-color font-bold">
            DELETE CURRENT CHAT
          </h3>
          <p className="text-sm text-primary-text-color/60 mb-6">
            You will delete current chat forever
          </p>
        </div>
      </Modal>

      {/* Waifu selection modal */}
      <Modal
        onClose={() => localStore.setOpenSelectWaifuModal(false)}
        onConfirmationBtnClick={() => {}}
        onCancelBtnClick={() => localStore.setOpenSelectWaifuModal(false)}
        open={localStore.openSelectWaifuModal}
      >
        <div className="text-center w-96">
          <h3 className="text-primary-text-color font-bold">
            CHOOSE YOUR WAIFU
          </h3>
          <div className="flex my-9 px-12">
            {localStore.waifuList.map((waifu) => (
              <button
                type="button"
                key={waifu}
                onClick={async () => selectWaifu(waifu)}
                className="flex flex-row p-2 w-full mb-3 cursor-pointer outline
                outline-offset-0 outline-2 outline-primary-color rounded-sm shadow-md"
              >
                <span className="place-self-center inline-flex h-3 w-4 rounded-full bg-primary-color opacity-75 mr-3" />
                <img
                  className="rounded-md h-11 w-11"
                  src={`${API_DOMAIN}/static/${waifu}/profile.jpg`}
                  loading="lazy"
                />
                <p className="pl-1 w-full my-2 mx-1 text-left
                  font-extrabold text-primary-text-color text-lg"
                >
                  {waifu}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Username modal */}
      <Modal
        onClose={() => localStore.setOpenUsernameModal(false)}
        confirmationBtnText="Save"
        onConfirmationBtnClick={saveUsername}
        onCancelBtnClick={() => localStore.setOpenUsernameModal(false)}
        open={localStore.openUsernameModal}
      >
        <div className="text-center w-96">
          <h3 className="text-primary-text-color font-bold">
            SET USERNAME
          </h3>
          <p className="text-sm text-primary-text-color/60">
            How do you want your waifu to call you?
          </p>
          <textarea
            className="rounded w-full p-2 mt-8 bg-user-bubble outline-none
            font-semibold m-0 text-user-bubble-text resize-none"
            placeholder="Username"
            onChange={(e) => store.setUsername(e.target.value)}
            onKeyDown={onUsernameInputKeydown}
            value={store.username}
            rows={1}
          />
        </div>
      </Modal>
    </main>
  );
});

export default App;
