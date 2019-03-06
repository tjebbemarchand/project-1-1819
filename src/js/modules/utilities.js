function limitBookTitle (title, limit = 20) {
    const newTitle = [];
    // Check if the title is above the limit.
    if (title.length > limit) {
        // Split the title on the spaces.
        title.split(' ').reduce(function(acc, cur) {
            // If the current + the next word is lower then the limit.
            if (acc + cur.length <= limit) {
                newTitle.push(cur); // Push the word into the array.
            }
            return acc + cur.length; // Return the length of the current word.
        }, 0);
        return `${newTitle.join(' ')}...`; // Add three dots on the word.
    }
    return title;
}

export {
    limitBookTitle
}