module.exports = {
    format_time: (date) => {
        const options = {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        };
        return date.toLocaleTimeString("en-US", options);
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(
            date
        ).getDate()}/${new Date(date).getFullYear()}`;
    },
};
