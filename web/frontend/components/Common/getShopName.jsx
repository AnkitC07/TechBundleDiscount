const getShopName = () => {
    return window.location.ancestorOrigins[0].replaceAll("https://", "");
}

export default getShopName