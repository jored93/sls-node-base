export async function handler(event: any){
    console.log('Event', event)

    return {
        statusCode: 200,
        body: JSON.stringify({
            foo: "bar"
        })
    }
}