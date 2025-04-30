import colors from "../config/colors"

const getLikesColor = (user, likesArray) => {
    const isUserLikes = likesArray?.find(userLike => userLike === user)
  return  isUserLikes ? colors.primary: '#99ccff'
}

export default getLikesColor