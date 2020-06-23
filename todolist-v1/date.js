module.exports.getDate = getDate;

function getDate() {
    let today = new Date();
    let currentDay = today.getDay();

    let dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = new Date().toLocaleDateString("en-KZ", dateOptions);

    return day;
}