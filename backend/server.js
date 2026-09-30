
import express from "express"
import pool from "./db.js"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            error: "TOKEN REQUIRED"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            error: "INVALID TOKEN"
        })
    }
}

app.get("/", authMiddleware, (req, res) => {
    res.send("MOTHERFUCK")
})

app.get("/users", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "ERROR FOR FOUND USERS"
        })
    }
})

app.get("/users/:id", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [req.params.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "USER NOT FOUND"
            })
        }

        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "SERVER ERROR"
        })
    }
})

app.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [name, email, hashedPassword]
        )

        res.status(201).json({
            id: result.rows[0].id,
            name,
            email
        })
    } catch (err) {
        console.error(err)

        if (err.code === "23505") {
            return res.status(409).json({
                error: "EMAIL ALREADY REGISTERED"
            })
        }

        res.status(500).json({
            error: "SERVER ERROR"
        })
    }
})

app.put("/users/:id", authMiddleware, async (req, res) => {
    try {
        const { name, email } = req.body

        const result = await pool.query(
            `UPDATE users
             SET name = $1, email = $2
             WHERE id = $3`,
            [name, email, req.params.id]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "USER NOT FOUND"
            })
        }

        res.json({
            id: req.params.id,
            name,
            email
        })
    } catch (err) {
        console.error(err)

        if (err.code === "23505") {
            return res.status(409).json({
                error: "DATA ALREADY EXISTS"
            })
        }

        res.status(500).json({
            error: "SERVER ERROR"
        })
    }
})

app.delete("/users/:id", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1",
            [req.params.id]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "USER NOT FOUND"
            })
        }

        res.json({
            message: "USER DELETED"
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            error: "SERVER ERROR"
        })
    }
})

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "INVALID EMAIL OR PASSWORD"
            })
        }

        const user = result.rows[0]

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordCorrect) {
            return res.status(401).json({
                error: "INVALID EMAIL OR PASSWORD"
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.json({
            message: "LOGIN SUCCESS",
            token
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            error: "SERVER ERROR"
        })
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})