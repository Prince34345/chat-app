import { create } from "zustand";

export const useModal = create((set, get) => ({
    isModal: false,
    onOpen: () => {
        set({isModal: true})
    },
    onClose: () => {
        set({isModal: false})
    },
}))