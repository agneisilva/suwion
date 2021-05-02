var cleanRegex = (value) => {
    return value?.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

exports.cleanRegex = cleanRegex;