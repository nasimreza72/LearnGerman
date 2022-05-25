import mongoose from "mongoose"

// https://mongoosejs.com/docs/plugins.html#example
// mongoose.plugin(function dropVersionFromJSONPlugin(schema, options) {
//     schema.options.toJSON = {
//         transform: function(document, documentAsJSON, options) {
//             delete documentAsJSON.__v
//             return documentAsJSON
//         }
//     }
// })


export function connect() {
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
    const connStr = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

    // Mongoose connection events
    const { connection } = mongoose
    connection.on("connecting",      () => console.log("[DB] connecting"))
    connection.on("connected",       () => console.log("[DB] connected"))
    connection.on("disconnecting",   () => console.log("[DB] disconnecting"))
    connection.on("disconnected",    () => console.log("[DB] disconnected"))
    connection.on("reconnected",     () => console.log("[DB] reconnected"))
    connection.on("error",           error => console.log("[DB] error", error))

    // Mongoose - start to connect
    mongoose.connect(connStr)
}