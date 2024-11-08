export interface SimpleCrud {
  id: string;
  name?: string;
  description: string;
  number?: string;
  color?: string;
}
export type CrudWhithName = Pick<SimpleCrud, "id" | "name">;
