export type typeUser = { uuid: string; username: string };
export type typeMessage = { from: string; username: string; message: string };

export type typeNotification = { [uuid: string]: { isHave: boolean } };
