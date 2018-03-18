export const hotelsn = state => {
  return state.hotel.hotelsn;
}

export const hotel = state => {
    return state.hotel;
}

export const isHotelSNCorrect = state => {
  if (state.hotelsn && state.hotelsn.length > 0) {
    return true;
  } else {
    return false;
  }
}
