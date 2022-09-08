'use strict'

import autocannon from 'autocannon';
import axios from "axios"

const urlInput = 'localhost:3003/api/v1/fibonacci/input';
const requests = Array.from({length: 10000}, () =>
    Math.floor(Math.random() * 1000)).map((number) =>
    ({
        setupRequest: (req) => {
            req.method = 'POST';
            req.body = JSON.stringify({
                fibIndex: number
            });
            return req;
        },
        onResponse: (status, body, context) => {
             axios.get(`http://localhost:3003/api/v1/fibonacci/output?ticket=${body.ticket}`)
                .then((e) => console.log(e));

        }
    }));
console.log(requests)

async function testInput() {
    const result = await autocannon({
        url: urlInput,
        requests: requests,
        headers: {
            "content-type": "application/json",
        },
        //overallRate: 10000,
    })

}

await testInput()
