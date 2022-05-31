import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function NewIdeaModal({open, setOpen, message, setMessage, innerRef, onClick}) {
 

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={innerRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className='p-4'>

              <div className="rounded-xl w-full font-mono">
                  <h3 className='text-xl font-semibold py-1 text-gray-800'>New Idea</h3>
                  <p className='text-xs text-gray-700'>Add your idea for our community to vote on.</p>
                    <textarea
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="outline-none border bg-gray-100 rounded-lg w-full max-w-lg p-2 mt-3"
                      rows={3}
                    ></textarea>
                  </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-end w-full font-mono">
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-pink-800 hover:bg-pink-600 text-base font-medium text-white  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClick}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={innerRef}
                  >
                    Cancel
                  </button>
                </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
