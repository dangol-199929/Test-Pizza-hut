export type Props =  {
    modalType: string,
    confirmHeading: string,
    btnName: string,
    cancelBtnName?: string,
    children?:any,
    showModal: boolean,
    btnFunction: () => void,
    cancelFuntion: () => void,
    isLoading: boolean,
}