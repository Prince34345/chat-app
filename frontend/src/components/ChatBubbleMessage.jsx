import clsx from 'clsx';
import placeholderImg from '../assets/img.jpg'

const ChatMessageBubble = ({ selectedUser, isSender, message, image, time }) => {
  return (
      <div
      className={clsx(
        'flex items-end gap-2 my-5',
        isSender ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Avatar */}
      {!isSender && (
        <img
          src={selectedUser?.image || placeholderImg}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      )}

      {/* Message Bubble */}
      <div
        className={clsx(
          'relative max-w-[70%] px-3 py-2 rounded-lg text-sm',
          isSender
            ? 'bg-indigo-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        )}
      >
        {/* Image */}
        {image && (
          <img
            src={image}
            alt="sent media"
            className="mb-2 w-full max-h-52 rounded-md object-cover"
          />
        )}

        {/* Text */}
        {message && <p className="whitespace-pre-wrap">{message}</p>}

        {/* Time */}
        <span
          className={clsx(
            'block text-xs mt-1',
            isSender ? 'text-blue-200' : 'text-gray-500'
          )}
        >
          {time}
        </span>

        {/* Bubble Tail */}
       
      </div>

      {/* Sender's avatar (optional) */}
      {isSender && (
        <img
          src={selectedUser?.image || placeholderImg}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default ChatMessageBubble;