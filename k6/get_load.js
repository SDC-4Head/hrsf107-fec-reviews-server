import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 10,
  duration: '10s',
}

export default function() {
  let num = Math.floor((Math.random() * 10000000) + 1)
  let res = http.get(`http://localhost:3000/rooms/${num}`);
  check(res, {
    'status is 200': r => r.status === 200,
  })
  sleep(1);
};