export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  role: Role;
};

export type Role = "admin" | "user";
