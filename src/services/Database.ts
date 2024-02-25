import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'

import Picture from '../classes/Picture'
import Container from '../classes/references/Container'
import ReferenceOptions from '../classes/references/ReferenceOptions'

const tbls = {
  picture: 'picture',
  setting: 'setting',
  startingPointPicture: 'startingpoint_picture',
  startingPointContainer: 'startingpoint_container',
  pictureContainer: 'picture_x_container',
  pictureScene: 'picture_x_scene',
  containerScene: 'container_x_scene',
  containerContainer: 'container_x_container',
}

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
      `INSERT OR REPLACE INTO ${tbls.setting}(variable, value) values(?, ?)`

    return (await this.connection).executeSql(query, [variable, value])
  }

  async getStartingPoint() {
    const query = `SELECT * FROM ${tbls.startingPointContainer}`
    const containers: Array<Container> = []
    const results = await (await this.connection).executeSql(query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        containers.push(result.rows.item(index))
      }
    })

    const picture = await this.getStartingPointPicture()
    const options: ReferenceOptions = {
      type: 'startingPoint',
      name: 'Hem',
      description: 'Appens utgångspunkten.'
    }

    return new Container(options, picture, 0)
  }

  async setStartingPointPicture(pictureId: number) {
    const deleteQuery = `DELETE FROM ${tbls.startingPointPicture}`
    const insertQuery = `INSERT INTO ${tbls.startingPointPicture}(picture_id) values(?)`

    await (await this.connection).executeSql(deleteQuery)
    await (await this.connection).executeSql(insertQuery, [pictureId])

    return
  }

  async getStartingPointPicture() {
    const query = `
      SELECT
        i.id, i.format, i.source, s.picture_id
      FROM
        ${tbls.picture} as i, ${tbls.startingPointPicture} as s
      WHERE 
        i.id = s.picture_id
      `
    const results = await (await this.connection).executeSql(query)
    const picture = results[0].rows.item(0)

    return new Picture(picture.source, picture.databaseId, picture.format)
  }

  async getPictures() {
    const pictures: Array<Picture> = []
    const query = `SELECT id, format, source FROM ${tbls.picture}`
    const results = await (await this.connection).executeSql(query)
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const data = result.rows.item(index)
        const picture = new Picture(data.source, data.databaseId, data.format)
        pictures.push(picture)
      }
    })
    return pictures
  }

  async savePicture(path: string, format: string) {
    const query =
      `INSERT INTO picture(format, source) values(?, ?)`

    const results = await (await this.connection).executeSql(query, [format, path])

    return new Picture(path, results[0].insertId, format)
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
