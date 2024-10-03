import { useEffect, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { reaction } from 'mobx';
import ChatBubble from '../../components/chat-bubble/chatBubble';
import ChatTextArea from '../../components/chat-text-area/chatTextArea';
import { BelongsTo } from '../../models/enums/chatBubble';
import store from '../../store/store';
import ErrorFetch from '../../models/errors/errorFetch';
import { ErrorName } from '../../models/errors/enum/errorName';
import alertStore from '../../store/alertStore';
import { AlertType } from '../../models/enums/alertType';

const MainChat = observer(() => {
  const chatRef = useRef<HTMLDivElement>(null);

  const localStore = useLocalObservable(() => ({
    lockSendResponse: true,
    isWaifuTyping: false,

    setLockSendResponse(lock: boolean) {
      this.lockSendResponse = lock;
    },

    setIsWaifuTyping(isTyping: boolean) {
      this.isWaifuTyping = isTyping;
    },
  }));

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUserSentResponse = async (userMessageToBeSent: string) => {
    localStore.setLockSendResponse(true);
    localStore.setIsWaifuTyping(true);
    try {
      await store.generateChat(userMessageToBeSent);
    } catch (err: any) {
      if (err instanceof ErrorFetch) {
        switch (err.errorName) {
          case ErrorName.CONNECTION_REFUSED:
            alertStore.addAlert({
              type: AlertType.ERROR,
              message: 'Make sure the the LM Studio is running and with it\'s server on. Check the simplified "Usage guide" at: https://github.com/2D-girls-enjoyer/MyWaifu',
            });
            break;
          case ErrorName.IRREGULAR_LOADED_MODEL_QUANTITY:
            alertStore.addAlert({
              type: AlertType.ERROR,
              message: 'LmStudio should be loaded with one model only. Check the simplified "Usage guide" at: https://github.com/2D-girls-enjoyer/MyWaifu',
            });
            break;
          default:
            alertStore.addAlert({ type: AlertType.UNKNOWN, message: 'Unknown UI error occured' });
        }
      }
    }

    localStore.setIsWaifuTyping(false);
    localStore.setLockSendResponse(false);
  };

  const loadWaifuChatToLocalStore = async () => {
    await store.loadWaifuChat();
    localStore.setLockSendResponse(false);
  };

  const renderChat = () => (store.chat?.length > 0
    ? store.chat.map((reply) => (
      <div
        key={`${reply.sender}-${reply.date}`}
        className={
              `flex w-full mb-8 ${reply.sender !== store.waifuName ? 'justify-end' : 'justify-start'}`
            }
      >
        <ChatBubble
          belongsTo={
                reply.sender !== store.waifuName
                  ? BelongsTo.USER
                  : BelongsTo.WAIFU
              }
          textDisplay={reply.content}
        />
      </div>
    ))
    : (
      <div className="flex w-full h-full justify-center">
        <p className="text-3xl font-extrabold text-primary-text-color/90 self-center">
          SELECT A WAIFU TO CHAT WITH
        </p>
      </div>
    )
  );

  useEffect(() => {
    const waifuNameDisposer = reaction(
      () => store.waifuName,
      () => {
        loadWaifuChatToLocalStore();
      },
    );

    return () => {
      waifuNameDisposer();
    };
  });

  useEffect(() => {
    scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.chat.length]);

  return (
    <div className="flex flex-col w-full h-full bg-chat-background px-2">
      <div
        className="basis-11/12 grow-0 px-2 pt-7 overflow-y-auto"
      >
        {renderChat()}
        <div ref={chatRef} />
      </div>
      <div className="flex w-full flex-col items-end basis-1/12 mb-2">
        <div className="basis-1/2 w-full">
          <ChatTextArea
            lockSendResponse={localStore.lockSendResponse}
            onUserSendResponse={({ currentText }) => { handleUserSentResponse(currentText); }}
          />
        </div>
        <div className="h-8 w-full">
          {localStore.isWaifuTyping && (
          <span className="flex w-full space-x-1 mt-2 pl-2">
            <div className="flex space-x-2 items-center">
              <div className="h-1 w-1 bg-secondary-color rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="h-1 w-1 bg-secondary-color rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="h-1 w-1 bg-secondary-color rounded-full animate-bounce" />
            </div>
            <p className="font-bold text-sm text-primary-text-color/60">
              {store.waifuName}
              {' '}
              is typing
            </p>
          </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default MainChat;
