const publicKey = args[0]
const paymentIntent = args[1]

const apiResponse = await Functions.makeHttpRequest({
    url: "https://strase-nine.vercel.app/api/chain/verify/test",
    method: "POST",
    data: {
        "publishableKey": publicKey,
        "paymentIntent": paymentIntent,
    }
})

if (apiResponse.error) {
    console.error(apiResponse.error)
    throw Error("Request failed", apiResponse.error)
}

const { data } = apiResponse;

return Functions.encodeString(data.result)