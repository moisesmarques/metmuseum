function GetObject(id){
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`, {
        method: "GET"
        });
}

export default GetObject;