'use client'

import { useState, useEffect } from "react"

interface Todo {
  id: string
  todo: string
  completed: boolean
  user?: {
    id: string
    firstName: string
    lastName: string
  }
}

export default function Home() {
  const [todo, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query {
                getTodos {
                  id
                  todo
                  completed
                  user {
                    id
                    firstName
                    lastName  
                  }
                }
              }
            `
          })
        })
        const result = await response.json()
        if (result.data && result.data.getTodos) {
          setTodos(result.data.getTodos)
        }
      } catch (error) {
        console.error("Error fetching todos:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>Todo Item:</h1>

      {todo && todo.map((t) => (
        <div key={t?.id}>
          <h2>{t?.todo}</h2>
          <p>Completed: {t?.completed ? "Yes" : "No"}</p>
          <p>User: {t?.user?.firstName} {t?.user?.lastName}</p>
        </div>
      ))}
    </>
  )
}
