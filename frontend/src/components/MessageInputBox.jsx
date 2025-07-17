import { Image,  Send,  X } from "lucide-react"
import { useRef, useState } from "react"
import { useChat } from "../hooks/useChat";
import toast from "react-hot-toast";
 
const MessageInputBox = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChat()
  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
           toast.error("Please Select an Image File.");
           return;
      }      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
  }
  const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      } 
  }
  const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!text.trim() && !imagePreview) {
          return;
      }     
      try {
         await sendMessage({text: text.trim(), image: imagePreview ? imagePreview : null})
         setText("");
         setImagePreview(null);
         if (fileInputRef.current) {
            fileInputRef.current.value = "";
         }

      } catch (error) {
         console.log("Failed to Send Message", error);
         toast.error("Message Can't be send.");
      }
  }

  return (
    <>
     
    <div className="mt-4 border-t-[.7px] border-t-indigo-500 pt-4">
            {
                     imagePreview && (
                       <div className="mb-3 flex items-center gap-2">
                           <div className="relative">
                              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
                              <button onClick={removeImage} className="absolute -top-2 -right-2 bg-indigo-500 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center" type="button">
                                <X className="size-4 text-yellow-400  rounded-4xl"/>
                              </button>
                           </div>
                       </div>
                   )
                }
          <form className="flex items-center gap-3" onSubmit={handleSendMessage}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none bg-gray-100 text-gray-400 cursor"
            />
         
            <input accept="image/*" ref={fileInputRef} type="file" onChange={handleImageChange} className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`text-gray-400 cursor-pointer ${imagePreview ? "text-yellow-400" : "text-zinc-400"}`}
            >
              <Image className="w-5 h-5" />
            </button>
            <button
              disabled={!text.trim() && !imagePreview}
              type="submit"
              onClick={handleSendMessage}
              className="p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
    </>
  )
}

export default MessageInputBox