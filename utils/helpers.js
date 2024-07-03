module.exports = {
    format_time: (date) => {
        const localDate = new Date(date);
        const options = {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        };
        return localDate.toLocaleTimeString("en-US", options);
    },
    format_date: (date) => {
        const localDate = new Date(date);
        return `${localDate.getMonth() + 1
            }/${localDate.getDate()}/${localDate.getFullYear()}`;
    },
    truncate: (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + "...";
        }
        return text;
    },
};
