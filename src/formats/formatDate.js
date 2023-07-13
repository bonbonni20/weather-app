const formatDate = (dateValue, type) => {
    const date = new Date(dateValue * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }
    const formattedDate = date.toLocaleDateString("en-GB", options)
    const [dayString, dateString, timeString] = formattedDate.split(", ")
    if(type === "current"){
    const capitaliseAm = (str) => (str === str.toLowerCase()) ? str.toUpperCase() : str
    const formattedTimeString = timeString.split(" ").map((str) => capitaliseAm(str)).join('')
    return dayString + (" ") + dateString + (" ") + formattedTimeString}
    
    if(type === "daily"){
        const  monthString = dateString.split(" ")[1]
        const includeStringInDate = (str) => {
            if (!isNaN(str)){
                switch(str){
                    case '1': return str + "st";
                    case '2': return str + "nd";
                    case '3': return str + "rd";
                    default: return str + "th";
                }
            }
          }
          const formattedDateString = dateString.split(' ').map((str) => includeStringInDate(str)).join(' ' + monthString)
          return dayString + " " + formattedDateString;
    }
    if(type === "forecastDisplay") {
        const options = {weekday: "short", day:"numeric", month:"long" }
        const formattedDate = date.toLocaleDateString("en-GB", options)
        const [dayString, dateString] = formattedDate.split(", ")
        const  monthString = dateString.split(" ")[1]
        const includeStringInDate = (str) => {
            if (!isNaN(str)){
                switch(str){
                    case '1': return str + "st";
                    case '2': return str + "nd";
                    case '3': return str + "rd";
                    default: return str + "th";
                }
            }
          }
          const formattedDateString = dateString.split(' ').map((str) => includeStringInDate(str)).join(' ' + monthString)
          return dayString + " " + formattedDateString;
    }
    
}

export {formatDate}