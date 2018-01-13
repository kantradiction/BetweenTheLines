export function ownerAuthHeader() {
    // return authorization header with jwt token
    let owner = localStorage.getItem('owner');

    if (owner && owner.token) {
        return { 'Authorization': 'Bearer ' + owner.token };
    } else {
        return {};
    }
}