/**
 * These values are the values supported by the news api and used for filtering the API call
 */
export const getCountries = () => {
    return [
        {key: "ar", value: "Argentina"},
        {key: "am", value: "Armenia"},
        {key: "au", value: "Australia"},
        {key: "at", value: "Austria"},
        {key: "by", value: "Belarus"},
        {key: "be", value: "Belgium"},
        {key: "bo", value: "Bolivia"},
        {key: "br", value: "Brazil"},
        {key: "bg", value: "Bulgaria"},
        {key: "ca", value: "Canada"},
        {key: "cl", value: "Chile"},
        {key: "cn", value: "China"},
        {key: "co", value: "Colombia"},
        {key: "hr", value: "Croatia"},
        {key: "cz", value: "Czechia"},
        {key: "ec", value: "Ecuador"},
        {key: "eg", value: "Egypt"},
        {key: "fr", value: "France"},
        {key: "de", value: "Germany"},
        {key: "gr", value: "Greece"},
        {key: "hn", value: "Honduras"},
        {key: "hk", value: "Hong Kong"},
        {key: "in", value: "India"},
        {key: "id", value: "Indonesia"},
        {key: "ir", value: "Iran"},
        {key: "ie", value: "Ireland"},
        {key: "il", value: "Israel"},
        {key: "it", value: "Italy"},
        {key: "jp", value: "Japan"},
        {key: "kr", value: "Korea"},
        {key: "mx", value: "Mexico"},
        {key: "nl", value: "Netherlands"},
        {key: "nz", value: "New Zealand"},
        {key: "ni", value: "Nicaragua"},
        {key: "pk", value: "Pakistan"},
        {key: "pa", value: "Panama"},
        {key: "pe", value: "Peru"},
        {key: "pl", value: "Poland"},
        {key: "pt", value: "Portugal"},
        {key: "qa", value: "Qatar"},
        {key: "ro", value: "Romania"},
        {key: "ru", value: "Russia"},
        {key: "sa", value: "Saudi Arabia"},
        {key: "za", value: "South Africa"},
        {key: "es", value: "Spain"},
        {key: "ch", value: "Switzerland"},
        {key: "sy", value: "Syria"},
        {key: "tw", value: "Taiwan"},
        {key: "th", value: "Thailand"},
        {key: "tr", value: "Turkey"},
        {key: "ua", value: "Ukraine"},
        {key: "gb", value: "United Kingdom"},
        {key: "us", value: "United States Of America"},
        {key: "uy", value: "Uruguay"},
        {key: "ve", value: "Venezuela"}
    ];
};

export const getCategories = () => {
    return ["general", "science", "sports", "business", "health", "entertainment", "tech", "politics", "food", "travel"].map((category) => {
        return {key: category, value: category.charAt(0).toUpperCase() + category.slice(1)}
    });
};
