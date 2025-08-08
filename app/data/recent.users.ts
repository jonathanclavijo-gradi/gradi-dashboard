type User = {
  id: number;
  name: string;
  email: string;
  joinedAt: string;
}

export const recentUsers: User[] = [
  { id: 1, name: "Sophie Martin", email: "sophie@test.com", joinedAt: "2025-08-01" },
  { id: 2, name: "Jean Dupont", email: "jean@test.com", joinedAt: "2025-07-30" },
  { id: 3, name: "Camille Petit", email: "camille@test.com", joinedAt: "2025-07-28" },
];
