import axios from "axios";
import { url } from "./defautlurl";

export default function fetchDataAPI(
  endpoint,
  method = "GET",
  body,
  contentType = "application/json; charset=utf8; odata.metadata=minimal; odata.streaming=true"
) {
  const token = JSON.parse(localStorage.getItem("token"));
  return axios({
    headers: {
      "Content-Type": contentType,
      Authorization: token,
      Accept: "application/json",
    },
    method: method,
    url: `${url}/${endpoint}`,
    data: body,
  });
}
