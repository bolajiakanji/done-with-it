const getPluralisedWord = (number, word) => {
    if (!number) return 0 + " " + word
    if (number === 1) return 1 + " " + word
    if (number > 1) return number + " " + word + 's'
}

export default getPluralisedWord