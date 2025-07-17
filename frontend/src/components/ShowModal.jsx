import { useModal } from "../hooks/useModal"

const ShowModal = ({title, children}) => {
  const {isModal, onClose} = useModal();
  return (
    <>
    {isModal && <div className="fixed top-0 left-0 right-0 bottom-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h1 className="ml-4 tracking-wider font-semibold">{title}</h1>
           <div className="ml-4 mt-4">
             {children}
           </div>
            <div className="mt-6 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>}
    </>
  )
}

export default ShowModal