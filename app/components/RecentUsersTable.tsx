import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from "./ui/table";
import { recentUsers } from "~/data/recent.users";

export default function RecentUsersTable() {
  return (
    <Table className="bg-zinc-600 rounded-2xl">
      <TableCaption>Lista de usuarios registrados</TableCaption>
      <TableHeader className="rounded-lg">
        <TableRow className="bg-zinc-500 border-0 rounded-lg">
          <TableHead className="text-zinc-300">ID</TableHead>
          <TableHead className="text-zinc-300">Nombre</TableHead>
          <TableHead className="text-zinc-300">Email</TableHead>
          <TableHead className="text-right text-zinc-300">Fecha de registro</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {recentUsers && recentUsers.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="p-3">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">{user.joinedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}