import { useEffect, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { reaction } from 'mobx';
import ChatBubble from '../../components/chat-bubble/chatBubble';
import ChatTextArea from '../../components/chat-text-area/chatTextArea';
import { BelongsTo } from '../../enums/chatBubble';
import store from '../../store/store';
import { IReply } from '../../interfaces/ApiRequests';
import http from '../../infra/http';

const MainChat = observer(() => {
  const chatRef = useRef<HTMLDivElement>(null);

  const localStore = useLocalObservable(() => ({
    chat: [] as IReply[],
    lockSendResponse: true,

    appendReply(reply: IReply) {
      this.chat.push(reply);
    },

    setChat(replies: IReply[]) {
      this.chat = replies;
    },

    setLockSendResponse(lock: boolean) {
      this.lockSendResponse = lock;
    },
  }));

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUserSentResponse = async (userMessageToBeSent: string) => {
    localStore.setLockSendResponse(true);
    const waifuResponsePromise = http.generateWaifuResponse({
      userReply: userMessageToBeSent,
    });
    localStore.appendReply({
      content: userMessageToBeSent,
      sender: 'User',
      date: new Date().toString(),
    });

    const { response } = await waifuResponsePromise;
    localStore.appendReply({
      content: response,
      sender: store.waifuName,
      date: new Date().toString(),
    });

    localStore.setLockSendResponse(false);
  };

  const loadWaifuChatToLocalStore = async () => {
    const { chatSummary } = await http.getWaifuChat();
    localStore.setChat(chatSummary);
    localStore.setLockSendResponse(false);
  };

  const renderChat = () => (localStore.chat?.length > 0
    ? localStore.chat.map((reply) => (
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
  }, [localStore.chat.length]);

  return (
    <div className="flex flex-col w-full h-full bg-chat-background px-2">
      <div
        className="basis-11/12 grow-0 px-2 pt-7 overflow-y-auto"
      >
        {renderChat()}
        <div ref={chatRef} />
      </div>
      <div className="flex items-end basis-1/12 mb-8">
        <ChatTextArea
          lockSendResponse={localStore.lockSendResponse}
          onUserSendResponse={({ currentText }) => { handleUserSentResponse(currentText); }}
        />
      </div>
    </div>
  );
});

export default MainChat;
