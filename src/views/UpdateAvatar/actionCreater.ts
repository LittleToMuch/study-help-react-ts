import { SetAvatar } from '../../store/state'

export const setAvatar = (params: SetAvatar) => {
  return {
    type: 'setAvatar',
    payload: {
      avatar: params.avatar
    }
  }
}