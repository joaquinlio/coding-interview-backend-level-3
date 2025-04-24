export interface IRepository<T> {
  create(item: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  update(id: number, item: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<void>;
}
