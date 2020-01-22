const getTime = (dateObj) => {
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
}

const nth = (d) => {
    if (d > 3 && d < 21) return 'th'; 
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

const getDate = (dateObj) => {
    let date = dateObj.getDate()
    let month = ["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"][dateObj.getMonth()]
    let year = dateObj.getFullYear()
    let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dateObj.getDay()]

    let dateWithOrdinal = `${date}${nth(date)}`

    let strDate = `${day}, ${dateWithOrdinal} ${month} ${year}`

    return strDate
}


const time = (timestamp) => {
    let dateObj = new Date(timestamp)
    return `${getDate(dateObj)} - ${getTime(dateObj)}`
}

export default time