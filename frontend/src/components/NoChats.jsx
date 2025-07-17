import { MessageSquareText } from 'lucide-react'
const NoChats = () => {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MessageSquareText className="mx-auto w-12 h-12 mb-2 text-indigo-300" />
            <p className="text-lg font-medium">No conversation selected</p>
            <p className="text-sm text-gray-400">
              Please select a user to begin chatting
            </p>
          </div>
   </div>
  )
}

export default NoChats