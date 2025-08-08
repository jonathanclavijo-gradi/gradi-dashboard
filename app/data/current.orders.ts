type Order = {
  id: string;
  customer: string;
  total: string;
  status: string;
  date: string;
}

export const orders: Order[] = [
  { id: "ORD001", customer: "Sophie Martin", total: "$230.00", status: "Completado", date: "2025-08-01" },
  { id: "ORD002", customer: "Jean Dupont", total: "$89.99", status: "Pendiente", date: "2025-07-31" },
  { id: "ORD003", customer: "Camille Petit", total: "$120.50", status: "Cancelado", date: "2025-07-30" },
];