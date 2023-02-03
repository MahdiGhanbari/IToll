class DB {
  constructor() {
    // check file variable in local storage
    let data = window.localStorage.getItem('file')
    if(data) {
      this.file = JSON.parse(data)
    } else {
      const init = new Array()
      window.localStorage.setItem('file', JSON.stringify(init))
      this.file = init
    }
  }

  save() {
    window.localStorage.setItem('file', JSON.stringify(this.file))
  }

  getData() {
    return this.file
  }

  update(id, modifiedItem) {
    return new Promise((resolve, reject) => {
      try {
        this.file[id] = modifiedItem
        this.save()
        resolve(true) 
      } catch {
        reject(false)
      }
    })  
  }

  create(newItem) {
    // TODO: validate the newItem
    return new Promise((resolve, reject) => {
      try {
        this.file.push(newItem)
        this.save()
        resolve(true) 
      } catch {
        reject(false)
      }
    })  
  }

  delete(id) {
    // TODO: validate the id
    return new Promise((resolve, reject) => {
      try {
        this.file.splice(id, 1)
        this.save()
        resolve(this.file)
      } catch {
        reject(false)
      }
    })
  }

}


export default {
    install(vue) {
      vue.prototype.$db = new DB()
    }
}