function GetObjects(){

    return fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects", {
        method: "GET"
        });
}

export default GetObjects;