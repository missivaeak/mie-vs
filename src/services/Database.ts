import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import type ImageType from '../types/ImageType'

const imageTable = 'image'
const settingTable = 'setting'
const startingPointImageTable = 'startingpoint_image'

enablePromise(true)

export default class Database {
  private connection: Promise<SQLiteDatabase>

  constructor() {
    this.connection = openDatabase({
      name: 'main.db',
      location: 'default',
      createFromLocation: '~main.db'
    })
  }

  async ping() {
    const query = `SELECT * FROM setting WHERE variable = ?;`
    const results = await (await this.connection).executeSql(query, ["first_run"])
    const firstRun = results[0].rows.item(0).value as string

    return {firstRun}
  }

  async setSetting(variable: string, value: string) {
    const query =
      `INSERT OR REPLACE INTO ${settingTable}(variable, value) values(?, ?)`

    return (await this.connection).executeSql(query, [variable, value])
  }

  async setStartingPointImage(imageId: number) {
    const deleteQuery = `DELETE FROM ${startingPointImageTable}`
    const insertQuery = `INSERT INTO ${startingPointImageTable}(image_id) values(?)`

    await (await this.connection).executeSql(deleteQuery)
    return (await this.connection).executeSql(insertQuery, [imageId])
  }

  async getStartingPointImage() {
    const query = `
      SELECT
        i.id, i.format, i.source, s.image_id
      FROM
        ${imageTable} as i, ${startingPointImageTable} as s
      WHERE 
        i.id = s.image_id
      `
    const results = await (await this.connection).executeSql(query)
    const image = results[0].rows.item(0)

    return {
      format: image.format as string,
      id: image.id as number,
      source: image.source as string
    }
  }

  async getImages(): Promise<Array<ImageType>> {
    const images: Array<ImageType> = []
    const query = `SELECT id, format, source FROM ${imageTable}`
    const results = await (await this.connection).executeSql(query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        images.push(result.rows.item(index))
      }
    })
    return images
  }

  async saveImage(path: string, format: string) {
    const query =
      `INSERT INTO image(format, source) values(?, ?)`

    const results = await (await this.connection).executeSql(query, [format, path])

    return {
      id: results[0].insertId as number,
      format,
      source: path
    }
  }

  // async createTable() {
  //   // create table if not exists
  //   const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
  //         value TEXT NOT NULL
  //     )`

  //     return this.connection.executeSql(query)
  // }

  // async getTodoItems(): Promise<ToDoItem[]> {
  //   try {
  //     const todoItems: ToDoItem[] = []
  //     const results = await this.connection.executeSql(`SELECT rowid as id,value FROM ${tableName}`)
  //     results.forEach(result => {
  //       for (let index = 0; index < result.rows.length; index++) {
  //         todoItems.push(result.rows.item(index))
  //       }
  //     })
  //     return todoItems
  //   } catch (error) {
  //     console.error(error)
  //     throw Error('Failed to get todoItems !!!')
  //   }
  // }

  // async saveTodoItems(todoItems: ToDoItem[]) {
  //   const insertQuery =
  //     `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
  //     todoItems.map(i => `(${i.id}, '${i.value}')`).join(',')
  
  //   return this.connection.executeSql(insertQuery)
  // }

  // async deleteTodoItem(id: number) {
  //   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`
  //   await this.connection.executeSql(deleteQuery)
  // }

  // async deleteTable() {
  //   const query = `drop table ${tableName}`
  
  //   await this.connection.executeSql(query)
  // }
}
