import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
// import { ToDoItem } from '../models'

type ToDoItem = {
  id: number;
  value: string;
}

const tableName = 'todoData'
const imageTable = 'image'

enablePromise(true)

class Database {
  private connection: SQLiteDatabase

  constructor(connection: SQLiteDatabase) {
    this.connection = connection
  }

  static async getDBConnection() {
    return openDatabase({ name: 'main.db', location: 'default', createFromLocation: '~main.db' })
  }

  async createTable() {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      )`

      return this.connection.executeSql(query)
  }

  async getTodoItems(): Promise<ToDoItem[]> {
    try {
      const todoItems: ToDoItem[] = []
      const results = await this.connection.executeSql(`SELECT rowid as id,value FROM ${tableName}`)
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          todoItems.push(result.rows.item(index))
        }
      })
      return todoItems
    } catch (error) {
      console.error(error)
      throw Error('Failed to get todoItems !!!')
    }
  }

  async saveTodoItems(todoItems: ToDoItem[]) {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
      todoItems.map(i => `(${i.id}, '${i.value}')`).join(',')
  
    return this.connection.executeSql(insertQuery)
  }

  async deleteTodoItem(id: number) {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`
    await this.connection.executeSql(deleteQuery)
  }

  async deleteTable() {
    const query = `drop table ${tableName}`
  
    await this.connection.executeSql(query)
  }

  async getImages(): Promise<{source: string}[]> {
    try {
      const images: {source: string}[] = []
      const results = await this.connection.executeSql(`SELECT id, type, source FROM ${imageTable}`)
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          images.push(result.rows.item(index))
        }
      })
      return images
    } catch (error) {
      console.error(error)
      throw Error('Failed to get todoItems !!!')
    }
  }
}

export default Database
