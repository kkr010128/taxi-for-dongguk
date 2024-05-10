import { ArrayList } from "../util/utilities.js";
const myRoomList = new ArrayList(10);

function setMyRoomList(array) {
    for(let item in array) {
        myRoomList.add(item);
    }
}

export { myRoomList, setMyRoomList };