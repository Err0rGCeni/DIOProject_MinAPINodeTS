import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({
    logger: true
})

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
})

interface IDriverParams {
    id: string
}

const drivers = [
    { id: 1, name: "Max Verstappen", team: "RB Racing" },
    { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
    { id: 3, name: "Lando Norris", team: "McLaren" },
]

const teams = [
    { id: 1, name: "Mercedes", base: "UK" },
    { id: 2, name: "McLaren", base: "UK" },
    { id: 3, name: "RB Racing", base: "UK" },
]

server.get("/teams", async (req, res) => {
    res.type("application/json").code(200)
    return teams
})

server.get("/drivers", async (req, res) => {
    res.type("application/json").code(200)
    return drivers
})

server.get<{ Params: IDriverParams }>("/drivers/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const driver = drivers.find(e => e.id === id)

    if (!driver) {
        res.type("aplpication/json").code(404)
        return { message: "Driver Not Found" }
    } else {
        res.type("application/json").code(200)
        return { driver }
    }
})

server.listen({ port: 3333 }, () => {
    console.log("Server init");
})
