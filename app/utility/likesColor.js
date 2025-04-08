const getLikesColor = (user, likesArray) => {
    const isUserLikes = likesArray.find(userLike => userLike === user)
  return  isUserLikes ? 'red': 'orange'
}

export default getLikesColor