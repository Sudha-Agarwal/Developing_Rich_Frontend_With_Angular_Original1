export class Todo {
    constructor(id:string,title: string, 
        description: string,dueDate:string,
        completed:boolean) {
      this.id = 
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.completed = completed;
    }
  
    public id?: string;
    public title?: string;
    public description?: string;
    public dueDate?: string;
    public completed?: boolean;
  }